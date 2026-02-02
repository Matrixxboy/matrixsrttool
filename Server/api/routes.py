from fastapi import APIRouter, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
import shutil
import os
import uuid
import logging
import json
from typing import Dict
from services.audio import extract_audio
from services.transcription import transcribe_audio
from services.subtitle import generate_srt

router = APIRouter()

# Directories
UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Persistence File
JOBS_FILE = "jobs.json"

logger = logging.getLogger(__name__)

def load_jobs() -> Dict[str, Dict]:
    if os.path.exists(JOBS_FILE):
        try:
            with open(JOBS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Failed to load jobs: {e}")
    return {}

def save_jobs():
    try:
        with open(JOBS_FILE, "w", encoding="utf-8") as f:
            json.dump(jobs, f, indent=4)
    except Exception as e:
        logger.error(f"Failed to save jobs: {e}")

# Load jobs on startup
jobs: Dict[str, Dict] = load_jobs()

async def process_transcription(job_id: str, video_path: str, language: str, mode: str, words_per_line: int = None, original_filename: str = None):
    """
    Background task to handle the full transcription pipeline.
    """
    try:
        jobs[job_id]["status"] = "processing"
        jobs[job_id]["message"] = "Extracting audio..."
        jobs[job_id]["progress"] = 5
        save_jobs()
        
        # 1. Extract Audio
        audio_path = os.path.join(UPLOAD_DIR, f"{job_id}.wav")
        extract_audio(video_path, audio_path)
        
        jobs[job_id]["message"] = "Transcribing..."
        jobs[job_id]["progress"] = 15
        save_jobs()
        
        # Callback to update progress from transcription service
        def update_progress(data):
            # Map transcription progress (0-100) to overall job progress (15-90)
            # data can be a simple number or a dict if we want more info
            if isinstance(data, (int, float)):
                scaled_progress = 15 + (data * 0.75) 
                jobs[job_id]["progress"] = int(scaled_progress)
                save_jobs()

        # 2. Transcribe
        segments = transcribe_audio(audio_path, language, mode, words_per_line=words_per_line, progress_callback=update_progress)
        
        jobs[job_id]["message"] = "Generating subtitles..."
        jobs[job_id]["progress"] = 95
        save_jobs()
        
        # 3. Generate SRT
        srt_content = generate_srt(segments)
        
        # Determine SRT filename
        if original_filename:
             base_name = os.path.splitext(original_filename)[0]
             srt_filename = f"{base_name}.srt"
        else:
             srt_filename = f"{job_id}.srt"
             
        srt_path = os.path.join(OUTPUT_DIR, srt_filename)
        
        with open(srt_path, "w", encoding="utf-8") as f:
            f.write(srt_content)
            
        jobs[job_id]["status"] = "completed"
        jobs[job_id]["message"] = "Done"
        jobs[job_id]["progress"] = 100
        jobs[job_id]["srt_path"] = srt_path
        jobs[job_id]["download_filename"] = srt_filename # Store the friendly name for download
        save_jobs()
        
        # Cleanup audio/video temp files (optional - keeping for debug for now)
        # os.remove(video_path)
        # os.remove(audio_path)
        
    except Exception as e:
        logger.error(f"Job {job_id} failed: {e}")
        jobs[job_id]["status"] = "failed"
        jobs[job_id]["message"] = str(e)
        save_jobs()

@router.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    """
    Uploads a video file and returns a temporary file ID.
    """
    file_id = str(uuid.uuid4())
    file_extension = os.path.splitext(file.filename)[1]
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}{file_extension}")
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {
        "file_id": file_id, 
        "file_path": file_path,
        "original_filename": file.filename
    }

@router.post("/transcribe")
async def start_transcription(
    background_tasks: BackgroundTasks,
    file_path: str = Form(...),
    language: str = Form(...),
    mode: str = Form(...),
    words_per_line: int = Form(None),
    original_filename: str = Form(None)
):
    """
    Starts the transcription process in the background.
    """
    job_id = str(uuid.uuid4())
    jobs[job_id] = {
        "status": "pending",
        "message": "Queued",
        "progress": 0,
        "srt_path": None
    }
    save_jobs()
    
    background_tasks.add_task(process_transcription, job_id, file_path, language, mode, words_per_line, original_filename)
    
    return {"job_id": job_id}

@router.get("/status/{job_id}")
async def get_status(job_id: str):
    if job_id not in jobs:
        # Try reloading just in case another worker updated it (though we are single process usually)
        # global jobs
        # jobs = load_jobs()
        pass
        
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return jobs[job_id]

@router.get("/download/{job_id}")
async def download_subtitle(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
        
    if jobs[job_id]["status"] != "completed":
        raise HTTPException(status_code=400, detail="Job not completed")
    
    # Verify file exists
    if not os.path.exists(jobs[job_id]["srt_path"]):
         raise HTTPException(status_code=404, detail="SRT file missing from disk")

    # Use the friendly filename if available, otherwise default
    download_name = jobs[job_id].get("download_filename", "subtitles.srt")

    return FileResponse(
        jobs[job_id]["srt_path"], 
        media_type="application/x-subrip", 
        filename=download_name
    )
