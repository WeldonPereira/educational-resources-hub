from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str
    APP_ENV: str = "development"
    AI_PROVIDER: str = "gemini"
    AI_ENABLED: bool = True

    APP_NAME: str = "Educational Resources Hub"
    AI_API_KEY: str = ""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
