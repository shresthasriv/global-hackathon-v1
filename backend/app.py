from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.middleware.error_handler import ErrorHandlerMiddleware
from src.services import memory_spaces, conversations, stories
from src.libs.config import settings

app = FastAPI(title="Memory Keeper API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(ErrorHandlerMiddleware)

app.include_router(memory_spaces.router, prefix="/api/memory-spaces", tags=["memory-spaces"])
app.include_router(conversations.router, prefix="/api/conversations", tags=["conversations"])
app.include_router(stories.router, prefix="/api/stories", tags=["stories"])

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
