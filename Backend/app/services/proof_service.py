from datetime import datetime


def generate_proof_card(name, skills, evaluation):

    score = evaluation["score"]

    if score >= 90:
        level = "Advanced"
    elif score >= 75:
        level = "Intermediate"
    else:
        level = "Beginner"

    return {
        "candidateName": name,
        "verified": True,
        "overallScore": score,
        "level": level,
        "skills": skills,
        "challengeCompleted": True,
        "generatedAt": datetime.now().isoformat()
    }