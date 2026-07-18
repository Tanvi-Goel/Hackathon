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
You are an expert ATS (Applicant Tracking System).

Analyze the resume below.

Extract ONLY technical skills.

For every skill return:

- name
- category
- confidence (0-100)

Categories can only be one of:

Frontend
Backend
Programming Language
Database
Cloud
DevOps
Testing
Version Control
AI Tools
Other

Return ONLY valid JSON.

Example:

{{
  "skills":[
    {{
      "name":"React",
      "category":"Frontend",
      "confidence":98
    }},
    {{
      "name":"Node.js",
      "category":"Backend",
      "confidence":96
    }},
    {{
      "name":"MongoDB",
      "category":"Database",
      "confidence":95
    }}
  ]
}}

Resume:

{resume_text}
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

    ai_response = response.choices[0].message.content

    print("\n========== AI RESPONSE ==========")
    print(ai_response)
    print("=================================\n")

    # Remove markdown if the model wraps JSON in ```json
    ai_response = ai_response.replace("```json", "")
    ai_response = ai_response.replace("```", "")
    ai_response = ai_response.strip()

    try:
        skills = json.loads(ai_response)
        return skills

    except Exception as e:
        print("JSON Parsing Error:", e)
        return {"skills": []}