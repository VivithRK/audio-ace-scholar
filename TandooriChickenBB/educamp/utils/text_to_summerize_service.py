import requests
import json
import re

# Langflow API endpoint
url = "https://api.langflow.astra.datastax.com/lf/c8adbbaa-95c8-453d-a1a1-51839a182f36/api/v1/run/ffc2865b-39e3-40bb-9eb6-f0263afa0832"

# Request payload
payload = {
    "input_value": "hello world!",  # Replace this with your actual lecture or input
    "output_type": "text",
    "input_type": "text"
}

# Headers
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <your_token_here>"  # Replace with your actual token
}

try:
    # Send POST request to Langflow
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()

    # Parse JSON
    response_json = response.json()

    # ✅ Extract the actual text output
    full_text = response_json['outputs'][0]['outputs'][0]['outputs']['text']['message']

    # Optional: extract only from "## Smart Lecture Summary"
    start_match = re.search(r"## Smart Lecture Summary", full_text)
    extracted_text = full_text[start_match.start():].strip() if start_match else full_text.strip()

    print("\n===== Extracted Langflow Output =====\n")
    print(extracted_text)

except requests.exceptions.RequestException as e:
    print(f"Error making API request: {e}")
except (KeyError, ValueError, json.JSONDecodeError) as e:
    print(f"Error parsing response: {e}")
