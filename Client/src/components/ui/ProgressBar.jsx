import React from "react"
import { motion } from "framer-motion"

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-white/5 relative">
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
      />
    </div>
  )
}

export default ProgressBar
