from django.db import models

# app/models.py
class AudioFile(models.Model):
    audio_path      = models.CharField(max_length=500)
    text_file_path  = models.CharField(max_length=500, blank=True)
    summary         = models.TextField(blank=True)
    qa_pairs        = models.JSONField(blank=True, null=True)
    duration_sec    = models.PositiveIntegerField(default=0)    # NEW ←
    created_at      = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.audio_path
