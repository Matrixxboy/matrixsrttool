import React, { useEffect, useState, useRef } from "react"
import {
  Loader2,
  CheckCircle,
  AlertOctagon,
  Download,
  RefreshCw,
} from "lucide-react"
import { getJobStatus, downloadSubtitles } from "../api"
import ProgressBar from "./ui/ProgressBar"
import Button from "./ui/Button"

const StatusViewer = ({ jobId, onReset }) => {
  const [status, setStatus] = useState("pending")
  const [message, setMessage] = useState("Initializing...")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!jobId) return

    const interval = setInterval(async () => {
      try {
        const data = await getJobStatus(jobId)
        setStatus(data.status)
        setMessage(data.message)
        // Ensure progress is a number
        if (data.progress !== undefined) {
          setProgress(data.progress)
        }

        if (data.status === "completed" || data.status === "failed") {
          clearInterval(interval)
          if (data.status === "failed") setError(data.message)
          if (data.status === "completed") setProgress(100)
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
        return "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" // Neon Emerald
      case "failed":
        return "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" // Neon Red
      case "processing":
        return "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" // Neon Amber
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="w-full text-center space-y-6 animate-fade-in p-2 sm:p-4">
      {/* Status Icon */}
      <div className="flex justify-center mb-4 transition-all duration-500">
        <div className={`p-6 rounded-full glass-panel shadow-2xl relative`}>
          {/* Glow Effect */}
          <div
            className={`absolute inset-0 rounded-full blur-xl opacity-20 ${
              status === "completed"
                ? "bg-emerald-500"
                : status === "failed"
                  ? "bg-red-500"
                  : status === "processing"
                    ? "bg-amber-500"
                    : "bg-gray-500"
            }`}
          ></div>

          <div className="relative z-10">
            {status === "processing" || status === "pending" ? (
              <Loader2 size={48} className="animate-spin text-amber-400" />
            ) : status === "completed" ? (
              <CheckCircle size={48} className="text-emerald-400" />
            ) : (
              <AlertOctagon size={48} className="text-red-500" />
            )}
          </div>
        </div>
      </div>

      {/* Status Text & Progress */}
      <div className="space-y-4">
        <div>
          <h3
            className={`text-3xl font-bold capitalize tracking-tight ${getStatusColor()}`}
          >
            {status}
          </h3>
          <p className="text-gray-400 text-lg font-medium mt-2">{message}</p>
        </div>

        {/* Real Progress Bar */}
        {(status === "processing" ||
          status === "pending" ||
          status === "completed") && (
          <div className="w-full max-w-sm mx-auto mt-6">
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <ProgressBar progress={progress} />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-6 sm:pt-8">
        {status === "completed" && (
          <Button
            onClick={() => downloadSubtitles(jobId)}
            className="w-full"
            variant="primary"
          >
            <Download size={20} /> Download Subtitles
          </Button>
        )}

        {status === "failed" && (
          <div className="text-red-400 text-sm bg-red-900/20 p-4 rounded-xl border border-red-500/20 backdrop-blur-sm">
            {error || "Unknown Error"}
          </div>
        )}

        {(status === "completed" || status === "failed") && (
          <Button onClick={onReset} variant="secondary" className="w-full">
            <RefreshCw size={18} /> Start New Transcription
          </Button>
        )}
      </div>
    </div>
  )
}

export default StatusViewer

