from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, ConfigDict

from app.database.connection import get_db
from app.models.interview import Interview
from app.models.question import Question
from app.models.answer import Answer
from app.models.evaluation import Evaluation


router = APIRouter(
    prefix="/results",
    tags=["Results"]
)


# ---- Response schemas (local to avoid circular imports) ----

class EvaluationResult(BaseModel):
    score: int
    relevance: int
    technical_depth: int
    clarity: int
    feedback: str

    model_config = ConfigDict(from_attributes=True)


class AnswerResult(BaseModel):
    id: int
    answer_text: str
    evaluation: EvaluationResult | None = None

    model_config = ConfigDict(from_attributes=True)


class QuestionResult(BaseModel):
    id: int
    question_number: int
    question_text: str
    difficulty: str
    answer: AnswerResult | None = None

    model_config = ConfigDict(from_attributes=True)


class InterviewResult(BaseModel):
    interview_id: int
    role: str
    experience: str
    difficulty: str
    interview_type: str
    total_questions: int
    answered_questions: int
    average_score: float | None
    questions: list[QuestionResult]

    model_config = ConfigDict(from_attributes=True)


# ---- Endpoint ----

@router.get("/interview/{interview_id}", response_model=InterviewResult)
def get_interview_results(
    interview_id: int,
    db: Session = Depends(get_db)
):
    interview = db.get(Interview, interview_id)

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    # Load questions ordered by number
    questions = (
        db.query(Question)
        .filter(Question.interview_id == interview_id)
        .order_by(Question.question_number)
        .all()
    )

    question_results: list[QuestionResult] = []
    scores: list[int] = []

    for q in questions:
        # Get the most recent answer for this question (if any)
        answer = (
            db.query(Answer)
            .filter(Answer.question_id == q.id)
            .order_by(Answer.id.desc())
            .first()
        )

        answer_result: AnswerResult | None = None

        if answer:
            # Get evaluation for this answer
            evaluation = (
                db.query(Evaluation)
                .filter(Evaluation.answer_id == answer.id)
                .first()
            )

            eval_result: EvaluationResult | None = None
            if evaluation:
                eval_result = EvaluationResult(
                    score=evaluation.score,
                    relevance=evaluation.relevance,
                    technical_depth=evaluation.technical_depth,
                    clarity=evaluation.clarity,
                    feedback=evaluation.feedback
                )
                scores.append(evaluation.score)

            answer_result = AnswerResult(
                id=answer.id,
                answer_text=answer.answer_text,
                evaluation=eval_result
            )

        question_results.append(
            QuestionResult(
                id=q.id,
                question_number=q.question_number,
                question_text=q.question_text,
                difficulty=q.difficulty,
                answer=answer_result
            )
        )

    answered_count = sum(1 for qr in question_results if qr.answer is not None)
    avg_score = (sum(scores) / len(scores)) if scores else None

    return InterviewResult(
        interview_id=interview.id,
        role=interview.role,
        experience=interview.experience,
        difficulty=interview.difficulty,
        interview_type=interview.interview_type,
        total_questions=len(question_results),
        answered_questions=answered_count,
        average_score=avg_score,
        questions=question_results
    )
