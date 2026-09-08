from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.answer import Answer
from app.models.evaluation import Evaluation
from app.schemas.evaluation import EvaluationCreate, EvaluationResponse


router = APIRouter(
    prefix="/evaluations",
    tags=["Evaluations"]
)


@router.post("/", response_model=EvaluationResponse)
def create_evaluation(
    evaluation_data: EvaluationCreate,
    db: Session = Depends(get_db)
):
    answer = db.get(Answer, evaluation_data.answer_id)

    if not answer:
        raise HTTPException(
            status_code=404,
            detail="Answer not found"
        )

    evaluation = Evaluation(
        answer_id=evaluation_data.answer_id,
        score=evaluation_data.score,
        relevance=evaluation_data.relevance,
        technical_depth=evaluation_data.technical_depth,
        clarity=evaluation_data.clarity,
        feedback=evaluation_data.feedback
    )

    db.add(evaluation)
    db.commit()
    db.refresh(evaluation)

    return evaluation


@router.get("/{answer_id}", response_model=EvaluationResponse)
def get_evaluation(
    answer_id: int,
    db: Session = Depends(get_db)
):
    evaluation = (
        db.query(Evaluation)
        .filter(Evaluation.answer_id == answer_id)
        .first()
    )

    if not evaluation:
        raise HTTPException(
            status_code=404,
            detail="Evaluation not found"
        )

    return evaluation