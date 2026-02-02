import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/ui/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full relative bg-[#030712] text-white overflow-hidden">
        {/* 🌌 Cosmic Background Effects */}
        <div className="fixed inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 z-0"></div>
        </div>

        {/* 🧊 Content Layer */}
        <div className="relative z-10 flex flex-col items-center min-h-screen">
          <Navbar />

          <main className="w-full max-w-7xl px-4 pt-32 pb-20 flex flex-col items-center flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>

          <footer className="w-full text-center py-6 text-gray-500 text-sm border-t border-white/5 backdrop-blur-sm">
            <p>© {new Date().getFullYear()} MatrixSRT. Built for Creators.</p>
          </footer>
        </div>
      </div>
    </Router>
  )
}

export default App

