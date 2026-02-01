import React from "react"
import Card from "../components/ui/Card"
import { Github, Twitter, Linkedin } from "lucide-react"

const Credits = () => {
  return (
    <div className="max-w-3xl mx-auto w-full text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 tracking-tight">
        Credits
      </h1>

      <Card className="mb-8 border-indigo-500/20">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-6 border-4 border-gray-900 shadow-xl relative group">
          <div className="absolute inset-0 rounded-full bg-indigo-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Utsav</h2>
        <p className="text-indigo-400 font-medium mb-6 uppercase tracking-widest text-sm">
          Lead Developer
        </p>
        <p className="text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto">
          Passionate about building tools that bridge language barriers.
          MatrixSRTTool was built to make high-quality subtitling accessible to
          everyone.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="#"
            className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all"
          >
            <Github size={22} />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-[#1da1f2] hover:bg-white/10 hover:scale-110 transition-all"
          >
            <Twitter size={22} />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-[#0077b5] hover:bg-white/10 hover:scale-110 transition-all"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="text-left">
          <h3 className="font-bold text-white mb-3 text-lg">
            Open Source Libraries
          </h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{" "}
              React & Vite
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{" "}
              FastAPI & Uvicorn
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{" "}
              OpenAI Whisper
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{" "}
              FFmpeg
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{" "}
              Lucide Icons
            </li>
          </ul>
        </Card>
        <Card className="text-left">
          <h3 className="font-bold text-white mb-3 text-lg">Special Thanks</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            To the open source community for making powerful AI accessible. And
            to all the users who provide feedback to make this tool better.
          </p>
        </Card>
      </div>
    </div>
  )
}

export default Credits
