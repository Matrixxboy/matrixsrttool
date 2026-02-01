import React from "react"
import Card from "../components/ui/Card"
import { Shield, Globe, Zap, FileText } from "lucide-react"

const About = () => {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-12 text-center tracking-tight">
        About MatrixSRT
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-indigo-500/10 transition-shadow group">
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 rounded-2xl w-fit mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
            <Shield size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            100% Offline & Secure
          </h3>
          <p className="text-gray-400 leading-relaxed">
            All processing happens locally on your machine. No video data is
            ever sent to the cloud, ensuring your privacy and security.
          </p>
        </Card>

        <Card className="hover:shadow-emerald-500/10 transition-shadow group">
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4 rounded-2xl w-fit mb-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
            <Globe size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Multi-Language Support
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Powered by OpenAI's Whisper, supporting English, Hindi, Gujarati,
            and many more languages with high accuracy.
          </p>
        </Card>

        <Card className="hover:shadow-amber-500/10 transition-shadow group">
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-4 rounded-2xl w-fit mb-6 text-amber-400 group-hover:scale-110 transition-transform duration-300">
            <Zap size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Refined Transliteration
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Optional AI refinement step to convert native scripts into natural,
            readable Romanized text (Hinglish).
          </p>
        </Card>

        <Card className="hover:shadow-blue-500/10 transition-shadow group">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-2xl w-fit mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
            <FileText size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">SRT/VTT Export</h3>
          <p className="text-gray-400 leading-relaxed">
            Generate standard subtitle files compatible with YouTube, Premiere
            Pro, and all major video players.
          </p>
        </Card>
      </div>
    </div>
  )
}

export default About
