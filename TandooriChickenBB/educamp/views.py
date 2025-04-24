from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os

from .utils.stt_service import SpeechToTextService
from .models import AudioFile
from .serializers import AudioFileSerializer

@api_view(['POST'])
def speech_to_text(request):
    if 'audio_file' not in request.FILES:
        return JsonResponse({'error': 'No audio file provided'}, status=400)

    audio_file = request.FILES['audio_file']
    original_name = audio_file.name  # Original uploaded file name

    # Split name and extension
    base_name, ext = os.path.splitext(original_name)

    # Default to .mp3 if no valid extension
    if ext.lower() not in ['.mp3', '.wav', '.m4a', '.webm']:
        ext = '.mp3'

    audio_name = f"{base_name}{ext}"
    audio_name_without_ext = base_name

    # Save audio to media/audio_files
    audio_file_dir = 'media/audio_files'
    os.makedirs(audio_file_dir, exist_ok=True)
    audio_file_path = os.path.join(audio_file_dir, audio_name)

    with open(audio_file_path, 'wb+') as destination:
        for chunk in audio_file.chunks():
            destination.write(chunk)

    # Transcribe using OpenAI Whisper
    stt_service = SpeechToTextService()
    try:
        transcription = stt_service.transcribe(audio_file_path)

        # Save transcript to media/text_files
        text_file_dir = 'media/text_files'
        os.makedirs(text_file_dir, exist_ok=True)
        text_file_path = os.path.join(text_file_dir, f"{audio_name_without_ext}.txt")
        with open(text_file_path, 'w') as f:
            f.write(transcription)

        # Save paths to database (relative to media/)
        audio_instance = AudioFile.objects.create(
            audio_path=f'audio_files/{audio_name}',
            text_file_path=f'text_files/{audio_name_without_ext}.txt'
        )

        serializer = AudioFileSerializer(audio_instance)
        return Response(serializer.data)
    
    except Exception as e:
        return JsonResponse({'error': f'Error during transcription: {str(e)}'}, status=500)
