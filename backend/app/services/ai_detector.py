import os
import json

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)


def ai_phishing_analysis(url, webpage_text=""):

    try:

        prompt = f"""
You are an advanced AI cybersecurity phishing detection system.

Analyze this URL and webpage content carefully.

URL:
{url}

Website Content:
{webpage_text[:4000]}

IMPORTANT:
Even if webpage content is missing,
analyze the URL structure itself.

Tasks:
1. Determine if this is PHISHING or LEGITIMATE
2. Give risk score from 0-100
3. Explain reasons

Return STRICT JSON ONLY.

Example:
{{
  "prediction": "PHISHING",
  "final_score": 82,
  "reasons": [
    "Suspicious fake brand domain",
    "Credential phishing indicators"
  ]
}}
"""

        response = client.chat.completions.create(
            model="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.1
        )

        result = response.choices[0].message.content

        print("AI RAW RESPONSE:", result)

        parsed = json.loads(result)

        return parsed

    except Exception as e:

        print("AI ERROR:", str(e))

        return {
            "prediction": "ERROR",
            "final_score": 0,
            "reasons": [str(e)]
        }