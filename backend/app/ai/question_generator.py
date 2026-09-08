from app.ai.llm import generate_response


def generate_question(
    role: str,
    experience: str,
    difficulty: str,
    interview_type: str
) -> str:

    prompt = f"""
You are an expert technical interviewer.

Generate ONE interview question.

Candidate Role: {role}
Experience: {experience}
Difficulty: {difficulty}
Interview Type: {interview_type}

Rules:
- Ask only one question.
- The question must match the candidate's role.
- Match the requested difficulty.
- Do not provide the answer.
- Return only the interview question.
"""

    return generate_response(prompt)