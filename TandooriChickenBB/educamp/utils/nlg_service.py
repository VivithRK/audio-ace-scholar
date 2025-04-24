import os
import openai
import json

openai.api_key = os.getenv("OPENAI_API_KEY")

SYSTEM_PROMPT = """You are an academic assistant. Return a JSON object with two keys:
- "summary": a concise summary of the transcript.
- "qa_pairs": a list of Q&A pairs, each with keys "question" and "answer".
Example output:
{
  "summary": "This lecture covers ...",
  "qa_pairs": [
    {"question": "What is ...?", "answer": "..."},
    ...
  ]
}
"""

class NLGService:
    def generate(self, transcript: str, n_questions: int = 5):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": transcript}
                ],
                temperature=0.4,
                max_tokens=1000
            )
            content = response.choices[0].message.content
            
            # Optional: Print raw output for debugging
            print("Raw GPT output:", content)
            
            return json.loads(content)
        except json.JSONDecodeError:
            raise ValueError("OpenAI did not return valid JSON")
        except Exception as e:
            raise RuntimeError(f"OpenAI error: {str(e)}")
