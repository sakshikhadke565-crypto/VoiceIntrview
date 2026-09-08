from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.interview import Interview
from app.models.question import Question
from app.schemas.question import QuestionCreate, QuestionResponse


router = APIRouter(
    prefix="/questions",
    tags=["Questions"]
)


@router.post("/", response_model=QuestionResponse)
def create_question(
    question_data: QuestionCreate,
    db: Session = Depends(get_db)
):
    interview = db.get(
        Interview,
        question_data.interview_id
    )

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    question = Question(
        interview_id=question_data.interview_id,
        question_text=question_data.question_text,
        question_number=question_data.question_number,
        difficulty=question_data.difficulty
    )

    db.add(question)
    db.commit()
    db.refresh(question)

    return question


@router.get(
    "/interview/{interview_id}",
    response_model=list[QuestionResponse]
)
def get_interview_questions(
    interview_id: int,
    db: Session = Depends(get_db)
):
    questions = (
        db.query(Question)
        .filter(Question.interview_id == interview_id)
        .order_by(Question.question_number)
        .all()
    )

    return questions