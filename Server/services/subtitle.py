from datetime import timedelta
from typing import List, Dict

def format_timestamp(seconds: float) -> str:
    """
    Formats seconds into SRT timestamp format: HH:MM:SS,mmm
    """
    td = timedelta(seconds=seconds)
    total_seconds = int(td.total_seconds())
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    secs = total_seconds % 60
    millis = int(td.microseconds / 1000)
    
    return f"{hours:02}:{minutes:02}:{secs:02},{millis:03}"

def generate_srt(segments: List[Dict]) -> str:
    """
    Generates SRT content from transcription segments.
    """
    srt_content = []
    
    for i, segment in enumerate(segments, start=1):
        start_time = format_timestamp(segment["start"])
        end_time = format_timestamp(segment["end"])
        text = segment["text"]
        
        srt_block = f"{i}\n{start_time} --> {end_time}\n{text}\n"
        srt_content.append(srt_block)
        
    return "\n".join(srt_content)
