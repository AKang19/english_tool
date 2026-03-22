from fastapi import APIRouter

from app.schemas import GenerateRequest, GenerateResponse
from app.services.llm_service import generate_words

router = APIRouter(prefix="/api", tags=["llm"])


@router.post("/generate", response_model=GenerateResponse)
async def generate(request: GenerateRequest):
    results = await generate_words(request)
    return GenerateResponse(results=results)
