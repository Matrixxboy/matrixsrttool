import os
import subprocess
from pathlib import Path

def extract_audio(video_path: str, output_path: str) -> str:
    """
    Extracts audio from a video file using FFmpeg.
    Returns the path to the extracted audio file.
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")

    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # FFmpeg command to extract audio
    # -y: overwrite output files
    # -i: input file
    # -vn: no video
    # -acodec: audio codec (pcm_s16le for compatibility)
    # -ar: audio rate (16000 is good for Whisper)
    # -ac: audio channels (1 for mono)
    command = [
        "ffmpeg",
        "-y",
        "-i", video_path,
        "-vn",
        "-acodec", "pcm_s16le",
        "-ar", "16000",
        "-ac", "1",
        output_path
    ]

    try:
        subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"FFmpeg failed: {e.stderr.decode()}")
    
    return output_path
