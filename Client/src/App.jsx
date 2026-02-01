import React, { useState } from "react"
import UploadForm from "./components/UploadForm"
import StatusViewer from "./components/StatusViewer"
import { Bot } from "lucide-react"

function App() {
  const [currentJobId, setCurrentJobId] = useState(null)
  const [appError, setAppError] = useState(null)

  const handleJobCreated = (jobId) => {
    setAppError(null)
    setCurrentJobId(jobId)
  }

  const handleReset = () => {
    setCurrentJobId(null)
    setAppError(null)
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans ">
      {/* 🌈 Coffee pastel background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3e7d8] via-[#e7d3bd] to-[#d6bfa7]" />

      {/* ✨ Ambient blur blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#8b5a2b]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c49a6c]/20 rounded-full blur-3xl" />

      {/* 🧊 Glass overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-10">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl">
          <div
            className="inline-flex items-center justify-center p-4 rounded-2xl mb-4
                          bg-white/30 backdrop-blur-md border border-white/40 shadow-lg"
          >
            <Bot className="text-[#6b3f1d]" size={34} />
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#4b2e1e]">
            AnyLanguage Caption
          </h1>

          <p className="mt-3 text-[#6b4a36] text-base sm:text-lg">
            Offline Video Transcription & Transliteration Engine
          </p>
        </div>

        {/* Error */}
        {appError && (
          <div
            className="mb-6 max-w-lg w-full rounded-xl
                          bg-red-500/10 backdrop-blur border border-red-500/30
                          px-4 py-3 text-red-800 text-sm"
          >
            {appError}
          </div>
        )}

        {/* Main Card (glass) */}
        <div className="w-full flex justify-center">
          <div
            className="w-full max-w-2xl rounded-3xl
                       bg-white/40 backdrop-blur-xl
                       border border-white/40
                       shadow-2xl p-2"
          >
            {!currentJobId ? (
              <UploadForm
                onJobCreated={handleJobCreated}
                onError={setAppError}
              />
            ) : (
              <StatusViewer jobId={currentJobId} onReset={handleReset} />
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-[#6b4a36]/70">
          Runs fully offline · Your data stays on your machine
        </p>
      </div>
    </div>
  )
}

export default App

