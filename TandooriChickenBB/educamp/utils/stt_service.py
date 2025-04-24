import openai
import os
from dotenv import load_dotenv

class SpeechToTextService:
    def __init__(self):
        load_dotenv()
        openai.api_key = os.getenv("OPENAI_API_KEY")
        self.model = "whisper-1"
    
    def transcribe(self, audio_file_path, language="en"):
        try:
            print(audio_file_path)
            with open(audio_file_path, 'rb') as f:
                response = openai.Audio.transcribe(
                    model=self.model,
                    file=f,
                    language=language
                )
                print(response['text'])
                return response['text']
        except Exception as e:
            raise RuntimeError(f"Transcription failed: {e}")
