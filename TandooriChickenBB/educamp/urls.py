from django.urls import path
from .views import speech_to_text, audio_files, audio_file_detail

# app/urls.py
urlpatterns = [
    path("STT/", speech_to_text),
    path("audio-files/", audio_files),
    path("audio-files/<int:pk>/", audio_file_detail),
]


