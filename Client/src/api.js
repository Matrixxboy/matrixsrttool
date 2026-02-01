import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Proxy in Vite config handles this
});

export const uploadVideo = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/upload', formData, {
    onUploadProgress: (progressEvent) => {
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      if (onProgress) onProgress(percentage);
    },
  });
  return response.data;
};

export const startTranscription = async (filePath, language, mode) => {
  const formData = new FormData();
  formData.append('file_path', filePath);
  formData.append('language', language);
  formData.append('mode', mode);

  const response = await api.post('/transcribe', formData);
  return response.data;
};

export const getJobStatus = async (jobId) => {
  const response = await api.get(`/status/${jobId}`);
  return response.data;
};

export const downloadSubtitles = (jobId) => {
  window.open(`/api/download/${jobId}`, '_blank');
};
