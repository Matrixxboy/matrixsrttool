import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
})

export const uploadVideo = async (file, onProgress) => {
  const formData = new FormData()
  formData.append("file", file)

  const response = await api.post("/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      )
      if (onProgress) onProgress(percentage)
    },
  })
  return response.data
}

export const startTranscription = async (
  filePath,
  language,
  mode,
  wordsPerLine,
  originalFilename,
) => {
  const formData = new FormData()
  formData.append("file_path", filePath)
  formData.append("language", language)
  formData.append("mode", mode)
  if (wordsPerLine) formData.append("words_per_line", wordsPerLine)
  if (originalFilename) formData.append("original_filename", originalFilename)

  const response = await api.post("/transcribe", formData)
  return response.data
}

export const getJobStatus = async (jobId) => {
  const response = await api.get(`/status/${jobId}`)
  return response.data
}

export const downloadSubtitles = (jobId) => {
  window.open(`${BASE_URL}/api/download/${jobId}`, "_blank")
}

