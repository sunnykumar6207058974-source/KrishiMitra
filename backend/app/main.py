"""
KrishiMitra FastAPI Main Entrypoint
Phase 1: Foundation & Environment Setup
Region Focus: Assam, India (Expanding Nationally)
"""
import time
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.session import get_db
from app.database.init_db import init_db
from app.api import (
    auth, farmer, farms, crops, weather, calendar, ai, soil, market, disease
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables and seed foundational data
    init_db()
    yield

app = FastAPI(
    title="KrishiMitra API",
    description="Intelligent Agriculture Assistance Platform Backend for Indian Farmers (Phase 1: Assam Focus & National Expansion)",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS setup for Frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Phase 1: Health Check Endpoints ---

@app.get("/api/health", tags=["Health"])
@app.get("/health", tags=["Health"])
def health_check():
    """Return backend application status, version, and initial target region."""
    return {
        "status": "healthy",
        "service": "KrishiMitra Backend API",
        "version": "1.0.0",
        "initial_region_focus": "Assam, India (Expanding Nationally)",
        "docs_url": "/docs"
    }

@app.get("/api/health/db", tags=["Health"])
def database_health_check(db: Session = Depends(get_db)):
    """Check database connectivity and latency."""
    start_time = time.time()
    try:
        db.execute(text("SELECT 1"))
        latency_ms = round((time.time() - start_time) * 1000, 2)
        engine_dialect = db.bind.dialect.name
        return {
            "status": "healthy",
            "database_connected": True,
            "engine": engine_dialect,
            "latency_ms": latency_ms,
            "message": f"Successfully connected to {engine_dialect.upper()} database."
        }
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={
                "status": "unhealthy",
                "database_connected": False,
                "error": str(e),
                "message": "Database connection failed. Verify DATABASE_URL."
            }
        )

# Mount API Routers under /api
api_prefix = settings.API_V1_STR

app.include_router(auth.router, prefix=api_prefix)
app.include_router(farmer.router, prefix=api_prefix)
app.include_router(farms.router, prefix=api_prefix)
app.include_router(crops.router, prefix=api_prefix)
app.include_router(weather.router, prefix=api_prefix)
app.include_router(calendar.router, prefix=api_prefix)
app.include_router(ai.router, prefix=api_prefix)
app.include_router(soil.router, prefix=api_prefix)
app.include_router(market.router, prefix=api_prefix)
app.include_router(disease.router, prefix=api_prefix)

@app.get("/")
def root():
    return {
        "project": "KrishiMitra",
        "tagline": "Smart Farming. Better Decisions. Stronger Harvests.",
        "phase": "Phase 1 - Project Foundation",
        "initial_region": "Assam, India",
        "status": "online",
        "version": "1.0.0",
        "docs_url": "/docs"
    }
