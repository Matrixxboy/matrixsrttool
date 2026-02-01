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
    <div className="w-full max-w-lg mx-auto rounded-2xl bg-[#f7efe5] border border-[#e6d5c3] shadow-xl p-6 sm:p-8">
      {/* Header */}
      <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-semibold text-[#4b2e1e] mb-6">
        <FileVideo className="text-[#8b5a2b]" />
        New Transcription
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div className="relative rounded-xl border-2 border-dashed border-[#d6bfa7] bg-[#fbf6f0] p-8 text-center transition hover:border-[#8b5a2b]">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />

          {file ? (
            <div className="flex flex-col items-center text-[#4b7b52]">
              <CheckCircle size={36} className="mb-2" />
              <span className="text-sm font-medium truncate max-w-full px-2">
                {file.name}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-[#8b6b4f]">
              <Upload size={36} className="mb-2" />
              <p className="text-sm font-medium">Click or drag video here</p>
              <p className="text-xs opacity-70 mt-1">MP4, MKV, MOV supported</p>
            </div>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-[#5c4033] mb-1">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-lg border border-[#d6bfa7] bg-[#fffaf5] px-4 py-2 text-[#4b2e1e] focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="gu">Gujarati</option>
          </select>
        </div>

        {/* Output Mode */}
        {language !== "en" && (
          <div>
            <label className="block text-sm font-medium text-[#5c4033] mb-2">
              Output Mode
            </label>

            <div className="grid gap-2">
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
                  className={`flex gap-3 rounded-xl border p-3 cursor-pointer transition
                    ${
                      mode === opt.value
                        ? "border-[#8b5a2b] bg-[#f1e2d3]"
                        : "border-[#e6d5c3] bg-[#fffaf5] hover:bg-[#f7efe5]"
                    }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value={opt.value}
                    checked={mode === opt.value}
                    onChange={(e) => setMode(e.target.value)}
                    className="mt-1 accent-[#8b5a2b]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#4b2e1e]">
                      {opt.title}
                    </p>
                    <p className="text-xs text-[#6b4a36]">{opt.desc}</p>
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
          className={`w-full rounded-xl py-3 text-sm font-semibold transition
            ${
              !file || uploading
                ? "bg-[#cbb6a2] text-white/60 cursor-not-allowed"
                : "bg-[#8b5a2b] text-white hover:bg-[#75461f] shadow-lg"
            }`}
        >
          {uploading ? `Uploading ${progress}%` : "Start Transcription"}
        </button>
      </form>
    </div>
  )
}

export default UploadForm

