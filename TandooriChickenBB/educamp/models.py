from django.db import models

class AudioFile(models.Model):
    audio_path = models.CharField(max_length=500)  # Store just the file path as string
    text_file_path = models.CharField(max_length=500, null=True, blank=True)  # Optional text file path
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.audio_path
