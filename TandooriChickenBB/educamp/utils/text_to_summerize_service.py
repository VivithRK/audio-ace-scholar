import requests
import json
import re
import os
from dotenv import load_dotenv

class TextToSummarizeService:
    def __init__(self):
        load_dotenv()
        self.url = "https://api.langflow.astra.datastax.com/lf/c8adbbaa-95c8-453d-a1a1-51839a182f36/api/v1/run/ffc2865b-39e3-40bb-9eb6-f0263afa0832"
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.getenv('LANGFLOW_API_TOKEN')}"
        }
    
    def generate(self, transcript, n_questions=5):
        try:
            payload = {
                "input_value": transcript,
                "output_type": "text",
                "input_type": "text"
            }
            
            # Send POST request to Langflow
            response = requests.post(self.url, json=payload, headers=self.headers)
            response.raise_for_status()
            
            # Parse JSON
            response_json = response.json()
            
            # Extract the actual text output
            full_text = response_json['outputs'][0]['outputs'][0]['outputs']['text']['message']
            
            # Print for debugging
            print("\n===== Extracted Langflow Output =====\n")
            print(full_text)
            print(type(full_text))
            
            # Try to parse the output as JSON
            try:
                # Check if the output contains a JSON structure
                json_match = re.search(r'({[\s\S]*})', full_text)
                if json_match:
                    json_str = json_match.group(1)
                    parsed_data = json.loads(json_str)
                    
                    # Extract summary and qa_pairs from the parsed JSON
                    summary = parsed_data.get("summary", "")
                    qa_pairs = parsed_data.get("qa_pairs", [])
                    
                    return {
                        "summary": summary,
                        "qa_pairs": qa_pairs
                    }
            except json.JSONDecodeError:
                pass
            
            # If JSON parsing fails, try to extract structured data from the text
            summary = ""
            qa_pairs = []
            
            # Extract summary
            summary_match = re.search(r'"summary":\s*"([^"]*(?:"[^"]*"[^"]*)*)"', full_text)
            if summary_match:
                summary = summary_match.group(1)
            
            # Extract QA pairs
            qa_pattern = r'"question":\s*"([^"]*)"[^}]*"answer":\s*"([^"]*)"'
            qa_matches = re.findall(qa_pattern, full_text)
            
            for q, a in qa_matches:
                qa_pairs.append({
                    "question": q,
                    "answer": a
                })
            
            return {
                "summary": summary,
                "qa_pairs": qa_pairs
            }
            
        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Error making API request: {e}")
        except (KeyError, ValueError) as e:
            raise RuntimeError(f"Error parsing response: {e}")