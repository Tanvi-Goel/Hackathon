import json
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


def generate_challenge(skills):
    skill_names = ", ".join([skill["name"] for skill in skills])

    prompt = f"""
You are a Senior Software Engineer.

Candidate Skills:
{skill_names}

Generate ONE personalized coding challenge.

Rules:
- 10 minute challenge
- Medium difficulty
- Practical coding problem
- No MCQs

Return ONLY valid JSON.

Example:

{{
"title":"Employee Directory",
"difficulty":"Medium",
"duration":"10 Minutes",
"problem":"Build an employee directory using React.",
"requirements":[
"Use React Hooks",
"Use Axios",
"Implement Search",
"Pagination"
]
}}
"""

    response = client.chat.completions.create(
        model="google/gemini-2.5-flash-lite",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    result = response.choices[0].message.content

    print(result)

    result = result.replace("```json", "")
    result = result.replace("```", "")
    result = result.strip()

    return json.loads(result)