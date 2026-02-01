import React, { useState } from "react"
import { Upload, FileVideo, CheckCircle } from "lucide-react"
import { uploadVideo, startTranscription } from "../api"

const UploadForm = ({ onJobCreated, onError }) => {
  const [file, setFile] = useState(null)
  const [language, setLanguage] = useState("en")
  const [mode, setMode] = useState("native")
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    setProgress(0)

    try {
      const uploadRes = await uploadVideo(file, setProgress)
      const transcribeRes = await startTranscription(
        uploadRes.file_path,
        language,
        mode,
      )
      onJobCreated(transcribeRes.job_id)
    } catch (err) {
      onError("Failed to start transcription.", err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <h2 className="flex items-center gap-3 text-2xl font-semibold text-white mb-8 justify-center">
        <FileVideo className="text-indigo-400" />
        New Transcription
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div className="relative rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-10 text-center transition hover:border-indigo-500/50 hover:bg-white/10 group">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />

          {file ? (
            <div className="flex flex-col items-center text-emerald-400 animate-in fade-in zoom-in duration-300">
              <CheckCircle size={42} className="mb-3 drop-shadow-lg" />
              <span className="text-sm font-medium truncate max-w-full px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {file.name}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-400 group-hover:text-indigo-400 transition-colors">
              <Upload size={42} className="mb-3" />
              <p className="text-base font-medium">Click or drag video here</p>
              <p className="text-xs opacity-50 mt-2">MP4, MKV, MOV supported</p>
            </div>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2 pl-1">
            Language
          </label>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none"
            >
              <option value="en" className="bg-gray-900">
                English
              </option>
              <option value="hi" className="bg-gray-900">
                Hindi
              </option>
              <option value="gu" className="bg-gray-900">
                Gujarati
              </option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </div>
          </div>
        </div>

        {/* Output Mode */}
        {language !== "en" && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            <label className="block text-sm font-medium text-gray-400 mb-3 pl-1">
              Refinement Mode
            </label>

            <div className="grid gap-3">
              {[
                {
                  value: "native",
                  title: "Native Script",
                  desc: "Original language text",
                },
                {
                  value: "romanized",
                  title: "Hinglish / Romanized",
                  desc: "English letters pronunciation",
                },
                {
                  value: "translate",
                  title: "English Translation",
                  desc: "Translated to English",
                },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex gap-4 rounded-xl border p-4 cursor-pointer transition-all duration-200
                    ${
                      mode === opt.value
                        ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                        : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10"
                    }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value={opt.value}
                    checked={mode === opt.value}
                    onChange={(e) => setMode(e.target.value)}
                    className="mt-1 accent-indigo-500 w-4 h-4"
                  />
                  <div>
                    <p
                      className={`text-sm font-bold ${mode === opt.value ? "text-white" : "text-gray-300"}`}
                    >
                      {opt.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!file || uploading}
          className={`w-full rounded-xl py-4 text-base font-bold tracking-wide transition-all shadow-lg
            ${
              !file || uploading
                ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5"
                : "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-500/25 border border-indigo-500/50"
            }`}
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-pulse">Uploading...</span> {progress}%
            </span>
          ) : (
            "Start Transcription"
          )}
        </button>
      </form>
    </div>
  )
}

export default UploadForm

