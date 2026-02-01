import React, { useState } from "react"
import UploadForm from "../components/UploadForm"
import StatusViewer from "../components/StatusViewer"
import { Bot, Sparkles } from "lucide-react"
import Card from "../components/ui/Card"
import { motion } from "framer-motion"

const Home = () => {
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
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500 rounded-full blur-[80px] -z-10 opacity-50"></div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-flex items-center justify-center p-5 rounded-2xl mb-6
                                  bg-white/5 backdrop-blur-md border border-white/10 ring-1 ring-white/20 shadow-2xl"
        >
          <Bot
            className="text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            size={42}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-gray-400 mb-4"
        >
          MatrixSRT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg sm:text-xl text-gray-400 flex items-center justify-center gap-2 max-w-2xl mx-auto leading-relaxed"
        >
          Offline Video Transcription & Transliteration Engine{" "}
          <Sparkles size={16} className="text-amber-300" />
        </motion.p>
      </div>

      {/* Error */}
      {appError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-8 max-w-lg w-full rounded-xl
                                  bg-red-900/20 backdrop-blur border border-red-500/20
                                  px-6 py-4 text-red-300 text-sm shadow-xl"
        >
          {appError}
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full relative z-10"
      >
        {!currentJobId ? (
          <UploadForm onJobCreated={handleJobCreated} onError={setAppError} />
        ) : (
          <Card className="border-indigo-500/20 shadow-indigo-500/5">
            <StatusViewer jobId={currentJobId} onReset={handleReset} />
          </Card>
        )}
      </motion.div>
    </div>
  )
}

export default Home
