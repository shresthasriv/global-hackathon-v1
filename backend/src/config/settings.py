from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    gemini_api_key: str
    secret_key: str
    cors_origins: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"


settings = Settings()
