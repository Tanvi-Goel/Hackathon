import json
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


def evaluate_solution(challenge: str, solution: str ,language: str = "javascript"):

    prompt = f"""
You are a Senior {language} Software Engineer.

A candidate has solved the following coding challenge.

Challenge:

{challenge}

Programming Language:

{language}

Candidate Solution:

{solution}

Evaluate the solution considering:

- Correctness
- Code Quality
- Readability
- Time Complexity
- Space Complexity
- Best Practices
- Edge Cases
- React/Python/Java conventions depending on the language

Return ONLY valid JSON.

Example:

{{
  "score": 92,
  "level": "Advanced",
  "strengths": [
    "Uses hooks correctly",
    "Readable code"
  ],
  "improvements": [
    "Add error handling",
    "Handle edge cases"
  ],
  "feedback": "Excellent implementation."
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