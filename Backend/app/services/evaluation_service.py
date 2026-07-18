import json
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


def evaluate_solution(challenge: str, solution: str):

    prompt = f"""
You are a Senior Software Engineer.

Challenge:

{challenge}

Candidate Solution:

{solution}

Evaluate the solution.

Return ONLY JSON.

Example:

{{
  "score":92,
  "level":"Advanced",
  "strengths":[
      "Good React Hooks usage"
  ],
  "improvements":[
      "Add error handling"
  ],
  "feedback":"Excellent implementation."
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