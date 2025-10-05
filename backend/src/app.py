from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.settings import settings
import argparse
from services.__base.manager import Manager

app = FastAPI(title="Memory Keeper API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

manager = Manager(app, prefix="/api")
manager.register_services()
manager.register_middlewares()

def main():
  parser = argparse.ArgumentParser(description="Run the FastAPI application.")
  parser.add_argument("--dev", action="store_true", help="Run in development mode with Uvicorn.")
  parser.add_argument("--host", type=str, default="0.0.0.0", help="Host to run the server on.")
  parser.add_argument("--port", type=int, default=8000, help="Port to run the server on.")
  parser.add_argument("--workers", type=int, default=4, help="Number of workers to run the server on.")
  parser.add_argument("--timeout", type=int, default=600, help="Worker timeout in seconds.")
  args = parser.parse_args()

  if args.dev:
    import uvicorn

    uvicorn.run("app:app", host=args.host, port=args.port, reload=True)
  else:
    import subprocess

    try:
      subprocess.run([
        "gunicorn",
        "src.app:app",
        "--log-level",
        "info",
        "--workers",
        f"{args.workers}",
        "--worker-class",
        "uvicorn.workers.UvicornWorker",
        "--bind",
        f"{args.host}:{args.port}",
        "--timeout",
        f"{args.timeout}",
        "--keep-alive",
        "10",
        "--graceful-timeout",
        "60",
        "--pythonpath",
        "src",
      ])
    except KeyboardInterrupt:
      print("\nServer has been shut down gracefully.")
    except Exception as e:
      print(f"An error occurred: {e}")


if __name__ == "__main__":
  main()