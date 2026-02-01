import React from "react"
import { motion } from "framer-motion"

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden group"

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20 hover:shadow-indigo-500/40 border border-indigo-500/50",
    secondary:
      "bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 hover:border-white/20",
    danger:
      "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white",
  }

  const disabledStyles = "opacity-50 cursor-not-allowed grayscale"

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ""} ${className}`}
      {...props}
    >
      {variant === "primary" && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
      )}
      {children}
    </motion.button>
  )
}

export default Button
