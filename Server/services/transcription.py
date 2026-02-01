import whisper
import torch
from indic_transliteration import sanscript
from typing import List, Dict

# Global model cache
model = None

def load_model(model_size="medium"):
    global model
    if model is None:
        print(f"Loading Whisper model: {model_size}...")
        device = "cuda" if torch.cuda.is_available() else "cpu"
        model = whisper.load_model(model_size, device=device)
        print("Model loaded.")
    return model

def transcribe_audio(audio_path: str, language: str, mode: str):
    """
    Transcribes audio using Whisper.
    language: 'en', 'hi', 'gu', etc.
    mode: 'native' (script), 'romanized' (transliterated to english chars), or 'translate' (english translation)
    """
    model = load_model()
    
    # Validation / Adjustment for Whisper language codes
    # Whisper supports: en, hi, gu
    whisper_lang = language
    
    # Transcribe options
    task = "transcribe"
    if mode == "translate":
        task = "translate"

    options = {
        "language": whisper_lang,
        "task": task,
        "verbose": False
    }

    result = model.transcribe(audio_path, **options)
    segments = result["segments"]
    
    # Post-processing for transliteration if needed
    processed_segments = []
    
    for segment in segments:
        text = segment["text"]
        start = segment["start"]
        end = segment["end"]
        
        # Only transliterate if mode is 'romanized' and we are not translating (translating implies English output already)
        if mode == "romanized" and task == "transcribe" and language in ["hi", "gu"]:
            if language == "hi":
                # Transliterate Hindi (Devanagari) to HK (Harvard-Kyoto) or ITRANS or similar
                try:
                    text = sanscript.transliterate(text, sanscript.DEVANAGARI, sanscript.ITRANS)
                except Exception as e:
                    print(f"Transliteration error: {e}")
            elif language == "gu":
                try:
                    text = sanscript.transliterate(text, sanscript.GUJARATI, sanscript.ITRANS)
                except Exception as e:
                    print(f"Transliteration error: {e}")
                
            # Clean up potential artifacts of transliteration if needed
            text = text.lower() 

        processed_segments.append({
            "start": start,
            "end": end,
            "text": text.strip()
        })

    return processed_segments
