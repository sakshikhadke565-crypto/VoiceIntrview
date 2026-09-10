from app.ai.llm import generate_response


def generate_question(
    role: str,
    experience: str,
    difficulty: str,
    interview_type: str,
    question_number: int = 1,
    previous_questions: list[str] | None = None
) -> str:

    previous_section = ""
    if previous_questions:
        numbered = "\n".join(
            f"{i + 1}. {q}" for i, q in enumerate(previous_questions)
        )
        previous_section = f"""
Previously asked questions (DO NOT repeat these or ask similar ones):
{numbered}
"""

    prompt = f"""
You are an expert technical interviewer.

Generate ONE unique interview question.

Candidate Role: {role}
Experience: {experience}
Difficulty: {difficulty}
Interview Type: {interview_type}
This is question number {question_number} of 10.
{previous_section}
Rules:
- Ask only one question.
- The question must be directly relevant to the candidate's role: {role}.
- Do NOT ask Python-specific questions unless the role is Python Developer.
- Do NOT ask Java-specific questions unless the role is Java Developer.
- Match the requested difficulty level.
- Do not provide the answer.
- Do not repeat or rephrase any previously asked question.
- Return only the interview question text, nothing else.
"""

    return generate_response(prompt)