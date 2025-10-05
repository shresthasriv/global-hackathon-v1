from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    database_url: str
    google_api_key: str
    secret_key: str
    cors_origins: list[str] = ["*"]
    app_base_url: str = "https://localhost:8000"

    class Config:
        env_file = ".env"


settings = Settings()
