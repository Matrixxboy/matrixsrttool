import whisper
import torch
from indic_transliteration import sanscript
from typing import List, Dict
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

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

def refine_text_with_llm(text: str, mode: str) -> str:
    """
    Refines transcription using OpenRouter LLM.
    """
    api_key = os.getenv("OPENROUTER_API_KEY")
    # Basic check for placeholder or empty key
    if not api_key or "sk-or-v1" not in api_key or "your_key_here" in api_key: 
        # Note: The placeholder I wrote starts with sk-or-v1 so I should check against the exact placeholder string if I knew it, 
        # but for now let's just proceed if it looks somewhat valid or skip if obviously default.
        # Actually, let's just try to use it. If it fails, we catch the exception.
        pass

    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key
    )
    
    model_name = os.getenv("OPENROUTER_MODEL", "meta-llama/llama-3.1-8b-instruct")

    system_prompt = "You are a helpful assistant."
    user_prompt = text

    if mode == "romanized":
        system_prompt = (
            "You are a Hinglish (Hindi-English code-switching) expert. "
            "The user will provide a raw transcription that may have phonetic errors or incorrect spellings. "
            "Your goal is to convert it into natural, readable Romanized Hinglish. "
            "RULES:\n"
            "1. DO NOT translate Hindi words to English. Keep the original Hindi sentence structure.\n"
            "2. For English words used in the speech (like 'time', 'computer', 'subscribe'), MUST use their standard English spelling.\n"
            "3. For Hindi words, use natural Romanization (e.g., write 'kya' instead of 'kyA', 'hum' instead of 'ham').\n"
            "4. Fix any phonetic gibberish forced by the transcriber into meaningful Hinglish.\n"
            "\n"
            "EXAMPLES:\n"
            "Input: 'Mera naam raj hai aur aaj ham vidiyo edit karenge'\n"
            "Output: 'Mera naam Raj hai aur aaj hum video edit karenge.'\n"
            "\n"
            "Input: 'Iska taiming galat hai'\n"
            "Output: 'Iska timing galat hai.'\n"
            "\n"
            "Output ONLY the refined text. No introductory or explanation text."
        )
    elif mode == "translate":
        system_prompt = (
            "You are an expert translator. Translate the following text into natural, fluent English. "
            "Maintain the original tone and meaning. Output ONLY the translation."
        )
    else:
        return text

    try:
        response = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "https://localhost:3000", # Optional
                "X-Title": "MatrixSRTTool", # Optional
            },
            model=model_name,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"LLM Refinement Failed: {e}")
        return text

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
    initial_prompt = None
    
    if mode == "romanized":
         # Keep the prompt as a hint for Whisper, even if we refine later
         initial_prompt = (
            "Transcript in Hinglish: Namaste doston. "
            "Aaj hum computer programming aur artificial intelligence ke baare mein baat karenge. "
            "Ye bahut important topic hai. Let's start the video."
        )

    options = {
        "language": whisper_lang,
        "task": "transcribe", # Always transcribe first to capture phonetic content
        "verbose": False
    }
    
    if initial_prompt:
        options["initial_prompt"] = initial_prompt

    result = model.transcribe(audio_path, **options)
    segments = result["segments"]
    
    processed_segments = []
    
    for segment in segments:
        text = segment["text"]
        start = segment["start"]
        end = segment["end"]
        
        # Refine with LLM if mode matches
        if mode in ["romanized", "translate"]:
             text = refine_text_with_llm(text, mode)
        # Fallback for Native mode: No LLM, just raw text (or legacy logic if needed, but Native usually works fine)

        processed_segments.append({
            "start": start,
            "end": end,
            "text": text.strip()
        })

    return processed_segments
