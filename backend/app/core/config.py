import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "KrishiMitra"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "krishimitra_super_secret_jwt_key_2026_agro_safe")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./krishimitra.db")

    # External APIs (Optional, with realistic fallbacks)
    WEATHER_API_KEY: str = os.getenv("WEATHER_API_KEY", "")
    MANDI_API_KEY: str = os.getenv("MANDI_API_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    # SMTP Email Configuration (Optional, with realistic simulation fallback)
    SMTP_HOST: str = os.getenv("SMTP_HOST", "")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    SMTP_TLS: bool = os.getenv("SMTP_TLS", "true").lower() in ("true", "1", "yes")
    EMAILS_FROM_EMAIL: str = os.getenv("EMAILS_FROM_EMAIL", "support@krishimitra.org")
    EMAILS_FROM_NAME: str = os.getenv("EMAILS_FROM_NAME", "KrishiMitra Smart Agriculture")

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ]

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
