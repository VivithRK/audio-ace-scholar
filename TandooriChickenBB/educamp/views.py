# app/views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils.stt_service import SpeechToTextService
from .utils.text_to_summerize_service import TextToSummarizeService
from .models import AudioFile
from django.conf import settings
from pydub import AudioSegment

from .serializers import AudioFileSerializer, AudioFileDetailSerializer
import os, json

@api_view(["POST"])
def speech_to_text(request):
    if "audio_file" not in request.FILES:
        return Response({"error": "No audio file provided"}, status=400)

    f = request.FILES["audio_file"]
    base, ext = os.path.splitext(f.name)
    ext = ext.lower() if ext.lower() in [".mp3",".wav",".m4a",".webm"] else ".mp3"

    # 1️⃣ Save audio under MEDIA_ROOT/audio_files/
    audio_rel = f"audio_files/{base}{ext}"
    audio_abs = os.path.join(settings.MEDIA_ROOT, audio_rel)
    os.makedirs(os.path.dirname(audio_abs), exist_ok=True)
    with open(audio_abs, "wb+") as dst:
        for chunk in f.chunks(): dst.write(chunk)

    # Get audio duration
    audio_info = AudioSegment.from_file(audio_abs)
    duration_sec = int(audio_info.duration_seconds)

    # 2️⃣ STT
    transcript = SpeechToTextService().transcribe(audio_abs)

    # 3️⃣ Use TextToSummarizeService instead of NLGService
    summarize_out = TextToSummarizeService().generate(transcript)
    summary       = summarize_out["summary"]
    qa_pairs      = summarize_out["qa_pairs"]

    # 4️⃣ Save transcript
    text_rel = f"text_files/{base}.txt"
    text_abs = os.path.join(settings.MEDIA_ROOT, text_rel)
    os.makedirs(os.path.dirname(text_abs), exist_ok=True)
    with open(text_abs,"w") as fp: fp.write(transcript)

    # 5️⃣ DB record
    obj = AudioFile.objects.create(
        audio_path     = audio_rel,
        text_file_path = text_rel,
        summary        = summary,
        qa_pairs       = qa_pairs,
        duration_sec   = duration_sec,
    )
    return Response(AudioFileDetailSerializer(obj).data, status=status.HTTP_201_CREATED)

# ----------  library list  ----------
@api_view(["GET"])
def audio_files(request):
    qs = AudioFile.objects.all().order_by("-created_at")
    return Response(AudioFileSerializer(qs, many=True).data)

# ----------  detail /summary  ----------
@api_view(["GET"])
def audio_file_detail(request, pk):
    try:
        obj = AudioFile.objects.get(pk=pk)
    except AudioFile.DoesNotExist:
        return Response({"error":"Not found"}, status=404)
    return Response(AudioFileDetailSerializer(obj).data)