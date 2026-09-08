from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.question import Question
from app.models.answer import Answer
from app.models.evaluation import Evaluation
from app.schemas.answer import AnswerCreate, AnswerResponse
from app.ai.evaluator import evaluate_answer


router = APIRouter(
    prefix="/answers",
    tags=["Answers"]
)


@router.post("/", response_model=AnswerResponse)
def create_answer(
    answer_data: AnswerCreate,
    db: Session = Depends(get_db)
):
    # Find question
    question = db.get(Question, answer_data.question_id)

    if not question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    # Save candidate answer
    answer = Answer(
        question_id=answer_data.question_id,
        answer_text=answer_data.answer_text,
        audio_path=answer_data.audio_path
    )

    db.add(answer)
    db.commit()
    db.refresh(answer)

    # AI evaluation
    evaluation_data = evaluate_answer(
        question=question.question_text,
        answer=answer.answer_text
    )

    # Save evaluation
    evaluation = Evaluation(
        answer_id=answer.id,
        score=evaluation_data["score"],
        relevance=evaluation_data["relevance"],
        technical_depth=evaluation_data["technical_depth"],
        clarity=evaluation_data["clarity"],
        feedback=evaluation_data["feedback"]
    )

    db.add(evaluation)
    db.commit()
    db.refresh(evaluation)

    return answer