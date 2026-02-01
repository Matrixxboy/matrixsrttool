import React, { useEffect, useState, useRef } from "react"
import {
  Loader2,
  CheckCircle,
  AlertOctagon,
  Download,
  RefreshCw,
} from "lucide-react"
import { getJobStatus, downloadSubtitles } from "../api"

const StatusViewer = ({ jobId, onReset }) => {
  const [status, setStatus] = useState("pending")
  const [message, setMessage] = useState("Initializing...")
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!jobId) return

    const interval = setInterval(async () => {
      try {
        const data = await getJobStatus(jobId)
        setStatus(data.status)
        setMessage(data.message)

        if (data.status === "completed" || data.status === "failed") {
          clearInterval(interval)
          if (data.status === "failed") setError(data.message)
        }
      } catch (err) {
        console.error("Polling error", err)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [jobId])

  // Auto-download when completed
  const downloadTriggeredRef = useRef(false)
  useEffect(() => {
    if (status === "completed" && !downloadTriggeredRef.current) {
      downloadSubtitles(jobId)
      downloadTriggeredRef.current = true
    }
    if (status !== "completed" && downloadTriggeredRef.current) {
      downloadTriggeredRef.current = false // Reset
    }
  }, [status, jobId])

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "text-[#4b7b52]" // Muted Forest Green
      case "failed":
        return "text-[#c2410c]" // Burnt Sienna
      case "processing":
        return "text-[#8b5a2b]" // Coffee Brown
      default:
        return "text-[#6b4a36]" // Mocha
    }
  }

  return (
    <div className="w-full text-center space-y-6 animate-fade-in p-2 sm:p-4">
      {/* Status Icon */}
      <div className="flex justify-center mb-4 transition-all duration-500">
        <div className="p-4 rounded-full bg-[#fbf6f0] border border-[#e6d5c3] shadow-sm">
          {status === "processing" || status === "pending" ? (
            <Loader2 size={48} className="animate-spin text-[#8b5a2b]" />
          ) : status === "completed" ? (
            <CheckCircle size={48} className="text-[#4b7b52]" />
          ) : (
            <AlertOctagon size={48} className="text-[#c2410c]" />
          )}
        </div>
      </div>

      {/* Status Text */}
      <div className="space-y-2">
        <h3 className={`text-2xl font-bold capitalize ${getStatusColor()}`}>
          {status}
        </h3>
        <p className="text-[#6b4a36] text-lg font-medium">{message}</p>

        {/* Progress Bar (Fake visual for processing) */}
        {(status === "processing" || status === "pending") && (
          <div className="w-full max-w-xs mx-auto h-2 bg-[#e6d5c3] rounded-full overflow-hidden mt-4">
            <div className="h-full bg-[#8b5a2b] animate-pulse rounded-full w-2/3 mx-auto"></div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-4 sm:pt-6">
        {status === "completed" && (
          <button
            onClick={() => downloadSubtitles(jobId)}
            className="w-full flex items-center justify-center gap-2 bg-[#4b7b52] hover:bg-[#3a6140] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <Download size={20} /> Download Subtitles
          </button>
        )}

        {status === "failed" && (
          <div className="text-red-800 text-sm bg-red-100 p-4 rounded-xl border border-red-200">
            {error || "Unknown Error"}
          </div>
        )}

        {(status === "completed" || status === "failed") && (
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 text-[#6b4a36] hover:text-[#4b2e1e] hover:bg-[#fffaf5] px-6 py-3 rounded-xl font-medium transition-colors border border-transparent hover:border-[#e6d5c3]"
          >
            <RefreshCw size={18} /> Start New Transcription
          </button>
        )}
      </div>
    </div>
  )
}

export default StatusViewer

