import React, { useState } from 'react';
import { Upload, FileVideo, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadVideo, startTranscription } from '../api';

const UploadForm = ({ onJobCreated, onError }) => {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState('native');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setProgress(0);
    
    try {
      // 1. Upload
      const uploadRes = await uploadVideo(file, (percent) => {
        setProgress(percent);
      });
      
      const filePath = uploadRes.file_path;
      
      // 2. Transcribe
      const transcribeRes = await startTranscription(filePath, language, mode);
      
      onJobCreated(transcribeRes.job_id);
      
    } catch (err) {
      console.error(err);
      onError("Failed to start process. Check backend connection.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
        <FileVideo className="text-blue-500" /> New Transcription
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Input */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
            <input 
                type="file" 
                accept="video/*" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {file ? (
                <div className="flex flex-col items-center text-green-400">
                    <CheckCircle size={32} className="mb-2" />
                    <span className="text-sm truncate max-w-full px-2">{file.name}</span>
                </div>
            ) : (
                <div className="flex flex-col items-center text-gray-400">
                    <Upload size={32} className="mb-2" />
                    <span className="text-sm">Click or Drag video file here</span>
                </div>
            )}
        </div>

        {/* Language Selection */}
        <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Language</label>
            <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="gu">Gujarati</option>
            </select>
        </div>

        {/* Mode Selection */}
        {(language === 'hi' || language === 'gu') && (
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Output Script</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="mode" 
                            value="native" 
                            checked={mode === 'native'}
                            onChange={(e) => setMode(e.target.value)}
                            className="bg-gray-700 text-blue-500"
                        />
                        <span className="text-gray-300">Native Script</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="mode" 
                            value="english" 
                            checked={mode === 'english'}
                            onChange={(e) => setMode(e.target.value)}
                            className="bg-gray-700 text-blue-500"
                        />
                        <span className="text-gray-300">English Alphabet</span>
                    </label>
                </div>
            </div>
        )}

        {/* Submit */}
        <button 
            type="submit" 
            disabled={!file || uploading}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
                !file || uploading 
                ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/20'
            }`}
        >
            {uploading ? `Uploading ${progress}%` : 'Start Transcription'}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
