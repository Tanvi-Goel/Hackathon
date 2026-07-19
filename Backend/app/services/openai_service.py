import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


def extract_skills(resume_text: str):

    prompt = f"""
You are an expert ATS Resume Parser.

Your task is to analyze ONLY the resume text below.

IMPORTANT RULES:

1. Extract the candidate's FULL NAME from the resume text ONLY.
2. NEVER use the uploaded filename.
3. NEVER guess the name.
4. Ignore company names.
5. Ignore job titles.
6. If the name cannot be found, return an empty string.

Also extract ONLY technical skills.

Include:
- Programming Languages
- Frameworks
- Libraries
- Databases
- Cloud Platforms
- DevOps
- Testing
- Version Control
- IDEs

Do NOT include:
- Soft Skills
- Companies
- Degrees
- Certifications
- Roles

Return ONLY valid JSON.

Example:

{{
    "name": "Tanvi Goel",
    "skills": [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "Git",
        "Jest"
    ]
}}

Resume Text:

{resume_text}
"""

    response = client.chat.completions.create(
        model="google/gemini-2.5-flash-lite",
        temperature=0,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    ai_response = response.choices[0].message.content.strip()

    print("\n========== AI RESPONSE ==========")
    print(ai_response)
    print("=================================\n")

    # Remove markdown if present
    ai_response = ai_response.replace("```json", "")
    ai_response = ai_response.replace("```", "")
    ai_response = ai_response.strip()

    try:
        parsed = json.loads(ai_response)

        return {
            "name": parsed.get("name", ""),
            "skills": parsed.get("skills", [])
        }

    except Exception as e:

        print("JSON Parsing Error:", e)

        return {
            "name": "",
            "skills": []
        }