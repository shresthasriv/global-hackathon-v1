import importlib
import inspect
import os
from typing import Any, Dict, Type

from fastapi import APIRouter, FastAPI, WebSocket

from .acquire import Acquire


class Manager:
    def __init__(self, app: FastAPI, prefix: str = "/api"):
        self.app = app
        self.prefix = prefix
        self.acquire = Acquire()
        self.services_dir = os.path.join(os.path.dirname(__file__), "..")
        self.mws_dir = os.path.join(os.path.dirname(__file__), "..", "..", "middleware")
        self.ws_routes: Dict[str, Type] = {}

    def register_services(self) -> None:
        if not os.path.exists(self.services_dir):
            return
        self._register_services_recursive(self.services_dir, [])

    def _register_services_recursive(self, current_dir: str, path_segments: list[str]) -> None:
        for item in os.listdir(current_dir):
            if item.startswith("__"):
                continue

            item_path = os.path.join(current_dir, item)

            if os.path.isdir(item_path):
                self._register_services_recursive(item_path, path_segments + [item])
            elif item == "service.py":
                self._register_service_from_path(path_segments)

    def _register_service_from_path(self, path_segments: list[str]) -> None:
        if not path_segments:
            return

        module_path = "services." + ".".join(path_segments) + ".service"
        api_path = f"{self.prefix}/" + "/".join(path_segments)

        print(f"[DEBUG] Attempting to register: {module_path} at {api_path}")
        try:
            service_module = importlib.import_module(module_path)
            print(f"[DEBUG] Successfully imported: {module_path}")
            service_class = next(
                (cls for name, cls in inspect.getmembers(service_module, inspect.isclass) if name.endswith("Service")),
                None
            )

            if service_class:
                init_params = inspect.signature(service_class.__init__).parameters
                if "acquire" in init_params:
                    service_instance = service_class(acquire=self.acquire)
                else:
                    service_instance = service_class()

                tag_name = path_segments[-1].replace("_", " ").title()
                tag_description = None
                
                if service_class.__doc__:
                    docstring_lines = service_class.__doc__.strip().split("\n")
                    if docstring_lines:
                        tag_description = docstring_lines[0].strip().rstrip(".")

                router = APIRouter(prefix=api_path, tags=[tag_name])

                if tag_description:
                    if not hasattr(self.app, "openapi_tags") or self.app.openapi_tags is None:
                        self.app.openapi_tags = []
                    if not any(tag.get("name") == tag_name for tag in self.app.openapi_tags):
                        self.app.openapi_tags.append({"name": tag_name, "description": tag_description})

                for method in ["get", "post", "put", "delete"]:
                    if hasattr(service_instance, method):
                        endpoint = getattr(service_instance, method)
                        router.add_api_route(path="", endpoint=endpoint, methods=[method.upper()])

                if hasattr(service_instance, "http_exposed"):
                    for route in service_instance.http_exposed:
                        self.register_ws_routes(router, service_instance, path_segments[-1])
                        http_method, sub_path = route.split("=")
                        endpoint_name = f"{http_method}_{sub_path}"
                        if hasattr(service_instance, endpoint_name):
                            endpoint = getattr(service_instance, endpoint_name)
                            router.add_api_route(path=f"/{sub_path}", endpoint=endpoint, methods=[http_method.upper()])
                            print(f"[DEBUG] Registered route: {http_method.upper()} {api_path}/{sub_path}")

                if router:
                    self.app.include_router(router)
                    print(f"[DEBUG] Router included for {api_path}")
        except ModuleNotFoundError as e:
            print(f"[DEBUG] ModuleNotFoundError for {module_path}: {e}")
        except Exception as e:
            print(f"[DEBUG] Error registering {module_path}: {e}")

    def register_middlewares(self) -> None:
        if not os.path.exists(self.mws_dir):
            return
            
        for mw_name in os.listdir(self.mws_dir):
            if mw_name.startswith("__") or not mw_name.endswith(".py"):
                continue
                
            mw_module_name = mw_name[:-3]
            mw_module_path = f"src.middleware.{mw_module_name}"
            
            try:
                mw_module = importlib.import_module(mw_module_path)
                mw_class = getattr(mw_module, "Middleware", None)
                if mw_class:
                    init_params = inspect.signature(mw_class.__init__).parameters
                    if "acquire" in init_params:
                        self.app.add_middleware(mw_class, acquire=self.acquire)
                    else:
                        self.app.add_middleware(mw_class)
            except ModuleNotFoundError:
                pass

    def register_ws_routes(self, router: APIRouter, service_instance: Any, service_name: str) -> None:
        for route in service_instance.http_exposed:
            if not route.startswith("ws="):
                continue

            _, sub_path = route.split("=")
            endpoint_name = f"ws_{sub_path}"

            if hasattr(service_instance, endpoint_name):
                endpoint = getattr(service_instance, endpoint_name)

                async def ws_endpoint(websocket: WebSocket) -> None:
                    try:
                        await endpoint(websocket)
                    except Exception as e:
                        if websocket.client_state.CONNECTED:
                            await websocket.close(code=4000, reason=str(e))

                router.add_api_websocket_route(path=f"/{sub_path}", endpoint=endpoint)
                self.ws_routes[f"{service_name}.{sub_path}"] = endpoint
