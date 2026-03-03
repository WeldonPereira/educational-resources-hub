from fastapi import APIRouter
from pydantic import BaseModel
from app.ai.ai_service import AIService

router = APIRouter(prefix="/ai", tags=["AI"])


class AIRequest(BaseModel):
    title: str
    type: str


@router.post("/generate-description")
def generate_description(data: AIRequest):
    return AIService.generate_description(data.title, data.type)
