import React from "react"
import Card from "../components/ui/Card"
import { Shield, Globe, Zap, FileText } from "lucide-react"

const About = () => {
  return (
    <div className="max-w-4xl mx-auto w-full pb-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-12 text-center tracking-tight">
        About MatrixSRT
      </h1>
      <Card className="border-indigo-500/20">
        <div className="text-center py-4">
          <h2
            className="
          text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-6
          hover:scale-110 transition-transform duration-300"
          >
            <a href="https://twomportal.vercel.app/" target="_blank">
              The Matrix World
            </a>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            <strong>The World Of Matrix</strong> focuses on building privacy-first,
            offline-capable AI systems. <strong>MatrixSRT</strong> is our flagship video
            transcription and transliteration engine, optimized for speed and
            local processing.
          </p>

          <div className="inline-flex items-center justify-center gap-4 bg-white/5 rounded-full px-6 py-2 border border-white/10">
            <div className="flex flex-col text-left">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Lead Developer
              </span>
              <span className="text-indigo-400 font-bold">
                <a href="https://utsav-lankapati.onrender.com" target="_blank">
                  Utsav Lankapati
                </a>
              </span>
            </div>
          </div>
        </div>
      </Card>
      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-16">
        <Card className="hover:shadow-indigo-500/10 transition-shadow group">
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 rounded-2xl w-fit mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
            <Shield size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Privacy-First Processing
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Your videos are processed locally on your machine. No raw video
            files are uploaded to the cloud. Internet access is used only when
            required for models or updates.
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

      {/* How It Works */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
        How It Works
      </h2>
      <div className="grid gap-4 md:grid-cols-4 mb-16">
        {[
          {
            step: "1",
            title: "Upload",
            desc: "Select your video file (MP4, MKV, etc.)",
          },
          {
            step: "2",
            title: "Configure",
            desc: "Choose language & output mode (Native/Romanized)",
          },
          {
            step: "3",
            title: "Transcribe",
            desc: "Let the AI process the audio locally",
          },
          {
            step: "4",
            title: "Download",
            desc: "Get your perfectly synced .srt file",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-white leading-none -mt-2 -mr-2">
              {item.step}
            </div>
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* About Company */}
    </div>
  )
}

export default About
