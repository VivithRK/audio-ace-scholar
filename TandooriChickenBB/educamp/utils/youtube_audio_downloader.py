from yt_dlp import YoutubeDL
import os

def download_audio_from_youtube(youtube_url, output_format="mp3"):
    output_path = "downloaded_audios"
    os.makedirs(output_path, exist_ok=True)
    
    # Modified options to work without FFmpeg
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': os.path.join(output_path, '%(title)s.%(ext)s'),
        'keepvideo': False,
        'quiet': False,
        'no_warnings': False
    }
    
    # Download the audio
    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(youtube_url, download=True)
        # Get file extension from downloaded file
        file_ext = info['ext']
        # Get the path of the downloaded file
        final_path = os.path.join(output_path, f"{info['title']}.{file_ext}")
    
    return final_path

# Example usage
if __name__ == "__main__":
    url = input("Enter YouTube URL: ")
    audio_path = download_audio_from_youtube(url)
    print(f"Audio saved at: {audio_path}")
