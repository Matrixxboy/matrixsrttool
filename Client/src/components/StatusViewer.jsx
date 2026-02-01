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
        // Don't stop polling on transient network errors immediately in real app, but for now:
        // setError("Connection lost");
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
      downloadTriggeredRef.current = false // Reset if status changes back (e.g. new job)
    }
  }, [status, jobId])

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "text-green-500"
      case "failed":
        return "text-red-500"
      case "processing":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 animate-fade-in">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon based on status */}
        <div className="transition-all duration-500">
          {status === "processing" || status === "pending" ? (
            <Loader2 size={48} className="animate-spin text-blue-500" />
          ) : status === "completed" ? (
            <CheckCircle size={48} className="text-green-500" />
          ) : (
            <AlertOctagon size={48} className="text-red-500" />
          )}
        </div>

        <div>
          <h3 className={`text-xl font-bold capitalize ${getStatusColor()}`}>
            {status}
          </h3>
          <p className="text-gray-400 mt-1">{message}</p>
        </div>

        {/* Actions */}
        {status === "completed" && (
          <button
            onClick={() => downloadSubtitles(jobId)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-green-900/20"
          >
            <Download size={20} /> Download SRT
          </button>
        )}

        {status === "failed" && (
          <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50 w-full break-words">
            {error || "Unknown Error"}
          </div>
        )}

        {(status === "completed" || status === "failed") && (
          <button
            onClick={onReset}
            className="mt-4 text-gray-500 hover:text-white flex items-center gap-1 text-sm pt-4 border-t border-gray-700 w-full justify-center"
          >
            <RefreshCw size={14} /> Start New
          </button>
        )}
      </div>
    </div>
  )
}

export default StatusViewer

