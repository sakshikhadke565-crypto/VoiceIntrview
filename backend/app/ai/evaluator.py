import re

from app.ai.llm import generate_response
from app.ai.prompts import EVALUATION_PROMPT


def evaluate_answer(question: str, answer: str) -> dict:
    prompt = EVALUATION_PROMPT.format(
        question=question,
        answer=answer
    )

    response = generate_response(prompt)

    score = int(re.search(r"Score:\s*(\d+)", response).group(1))
    relevance = int(re.search(r"Relevance:\s*(\d+)", response).group(1))
    technical_depth = int(
        re.search(r"Technical Depth:\s*(\d+)", response).group(1)
    )
    clarity = int(re.search(r"Clarity:\s*(\d+)", response).group(1))

    feedback_match = re.search(
        r"Feedback:\s*(.*)",
        response,
        re.DOTALL
    )

    feedback = feedback_match.group(1).strip()

    return {
        "score": score,
        "relevance": relevance,
        "technical_depth": technical_depth,
        "clarity": clarity,
        "feedback": feedback
    }