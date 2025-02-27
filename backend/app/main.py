# Path: app/main.py
# Description: This file contains the main FastAPI application.

import toml
from datetime import datetime
from fastapi import FastAPI
from app.logger import get_logger
from app.config import get_settings
from app.routers import main_router

# Get the settings
settings = get_settings()

# Get the logger
logger = get_logger()

# Load pyproject.toml
with open("pyproject.toml", "r") as file:
    config = toml.load(file)

app = FastAPI(
    title=config["tool"]["poetry"]["name"],
    description=config["tool"]["poetry"]["description"],
    version=config["tool"]["poetry"]["version"],
    openapi_url="/api/openapi.json" if settings.ENV == "development" else None,
    docs_url="/api/docs" if settings.ENV == "development" else None,
    redoc_url="/api/redoc" if settings.ENV == "development" else None,
)

app.include_router(main_router, prefix="/api")

@app.get("/health", tags=["Internal Services"])
async def health_check():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}
