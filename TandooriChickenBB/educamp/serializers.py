from rest_framework import serializers
from .models import AudioFile

# app/serializers.py
class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model  = AudioFile
        fields = ["id","audio_path","text_file_path","duration_sec","created_at"]

class AudioFileDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model  = AudioFile
        fields = ["id","audio_path","text_file_path",
                  "summary","qa_pairs","duration_sec","created_at"]

