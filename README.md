# MatrixSRT 🎥📝

**The Ultimate Offline Video Captioning & Transliteration Tool**

MatrixSRT is a powerful, privacy-first desktop application that automatically generates subtitles for your videos using OpenAI's Whisper model. It runs entirely locally on your machine, ensuring your data never leaves your device.

## 🚀 Why MatrixSRT?

- **💸 100% Free**: No subscriptions, no credits, no hidden fees.
- **🔒 Privacy First**: All processing happens locally. Your personal videos are never uploaded to the cloud.
- **⚡ Blazing Fast**: Save hours of manual transcription struggle. Get accurate subtitles in just 2-3 minutes!
- **🌐 Universal Support**: Works with English, Hindi, Gujarati, and many more languages.
- **🧠 Smart Transliteration**: Capabilities to convert native scripts into readable Romanized text (e.g., Hindi to Hinglish).

## ✨ Features

- **Local Processing**: Utilizes local AI models for maximum security and performance.
- **Multi-Language Support**: Robust transcription for dozens of languages powered by Whisper.
- **SRT & VTT Export**: Generate professional-grade subtitle files compatible with YouTube, Premiere Pro, VLC, and more.
- **Modern UI**: A smooth, "Precision Dark Luxury" interface built with React and Tailwind CSS.
- **Zero Configuration**: The server automatically discovers open ports and links to the client.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Python, FastAPI, Uvicorn, OpenAI Whisper
- **Tools**: FFmpeg, NumPy

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

1.  **Python 3.12+**: [Download Python](https://www.python.org/downloads/)
2.  **Node.js & npm**: [Download Node.js](https://nodejs.org/)
3.  **FFmpeg**: Required for audio processing.
    - _Windows_: `winget install ffmpeg` or download from [ffmpeg.org](https://ffmpeg.org/download.html) and add to your system PATH.
    - _Mac_: `brew install ffmpeg`
    - _Linux_: `sudo apt install ffmpeg`

## 🚀 Getting Started

Follow these steps to get MatrixSRT running on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Matrixxboy/matrixsrttool.git
cd matrixsrttool
```

### 2. Backend Setup (Server)

Navigate to the Server directory:

```bash
cd Server
```

Create a virtual environment and install dependencies:

```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows (PowerShell):
.\venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

### 3. Frontend Setup (Client)

Open a new terminal window and navigate to the Client directory:

```bash
cd Client
```

Install the dependencies:

```bash
npm install
```

## 🏃‍♂️ How to Run

### Step 1: Start the Server

In your **Server** terminal (ensure venv is activated):

```bash
python main.py
```

_The server will start (looking for an available port starting from 8000) and will automatically update the Client's configuration._

### Step 2: Start the Client

In your **Client** terminal:

```bash
npm run dev
```

### Step 3: Open in Browser

Click the link provided in the Client terminal (typically `http://localhost:5173`) to launch the application.

## 📝 Usage Guide

1.  **Upload**: Drag and drop your video file (MP4, MKV, AVI) into the upload zone.
2.  **Configure**: Select the audio language and choose your preferred output format.
3.  **Process**: Click "Start Transcription". Watch as the AI processes your video in real-time.
4.  **Download**: Once the progress bar hits 100%, download your perfectly synced `.srt` files instantly.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request or open an issue if you encounter any bugs.

---

**Built with ❤️ by [Utsav Lankapati](https://utsav-lankapati.onrender.com)**
