from django.urls import path
from .views import speech_to_text

urlpatterns = [
    path('STT/', speech_to_text, name='speech_to_text'),
]

