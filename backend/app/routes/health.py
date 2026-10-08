"""
Health Check Route
"""

from fastapi import APIRouter
from app.models.schemas import HealthResponse

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
def health_check():
    """System health check endpoint."""
    return HealthResponse(status="ok", version="1.0.0")
