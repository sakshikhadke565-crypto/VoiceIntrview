"""Placeholder for Python module"""
from pydantic import BaseModel, ConfigDict


class EvaluationCreate(BaseModel):
    answer_id: int
    score: int
    relevance: int
    technical_depth: int
    clarity: int
    feedback: str


class EvaluationResponse(BaseModel):
    id: int
    answer_id: int
    score: int
    relevance: int
    technical_depth: int
    clarity: int
    feedback: str

    model_config = ConfigDict(from_attributes=True)