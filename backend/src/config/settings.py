from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    database_url: str
    google_api_key: str
    secret_key: str
    cors_origins: list[str] = ["http://localhost:3000"]
    app_base_url: str = "http://localhost:8000"

    class Config:
        env_file = ".env"


settings = Settings()
