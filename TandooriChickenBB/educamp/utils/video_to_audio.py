from moviepy.editor import VideoFileClip
def video_to_audio(video_path):
    clip = VideoFileClip(video_path)
    audio_path = "output.mp3"
    clip.audio.write_audiofile(audio_path)
    return audio_path







