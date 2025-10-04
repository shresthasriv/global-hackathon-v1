from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.config.settings import settings
from src.services.__base.manager import Manager

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

@app.get("/health")
async def health():
    return {"status": "healthy", "message": "Memory Keeper API"}
