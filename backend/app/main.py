"""
Quora Duplicate Question Detector - FastAPI Application
======================================================
College Mini Project for Data Structure Lab
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.duplicate import router as duplicate_router
from app.routes.health import router as health_router

app = FastAPI(
    title="Quora Duplicate Question Detector API",
    description=(
        "A Data Structures Lab college mini project implementing Cosine Similarity "
        "using foundational data structures (Array/List, HashMap, Set, String, Sorting)."
    ),
    version="1.0.0"
)

# Configure CORS for local development and frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes with /api prefix
app.include_router(health_router, prefix="/api")
app.include_router(duplicate_router, prefix="/api")


@app.get("/", tags=["Root"])
def root_index():
    return {
        "message": "Welcome to Quora Duplicate Question Detector API",
        "version": "1.0.0",
        "docs_url": "/docs",
        "health_check": "/api/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
