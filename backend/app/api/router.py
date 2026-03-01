from fastapi import APIRouter
from app.api.v1.resources import router as resources_router
from app.api.v1.ai import router as ai_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(resources_router)
api_router.include_router(ai_router)
