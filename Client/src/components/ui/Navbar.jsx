import React from "react"
import { NavLink } from "react-router-dom"
import { FileVideo, Info, User } from "lucide-react"

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium ${
      isActive
        ? "bg-white/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-white/10"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="glass-nav backdrop-blur-2xl rounded-full px-2 py-2 flex items-center gap-1 sm:gap-2 shadow-2xl">
        <NavLink to="/" className={linkClass}>
          <FileVideo size={18} />
          <span className="hidden sm:inline">Home</span>
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          <Info size={18} />
          <span className="hidden sm:inline">About</span>
        </NavLink>
        <NavLink to="/credits" className={linkClass}>
          <User size={18} />
          <span className="hidden sm:inline">Credits</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
