"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface BackgroundProps {
  title: string
  highlightedText: string
  subtitle: string
}

const Background = ({ title, highlightedText, subtitle }: BackgroundProps) => {
  return (
    <div className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(220,38,38,0.12),_transparent_50%)]" />
      </div>
    
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-32 bg-red-600/5 blur-3xl -rotate-6" />
          
          {/* Heading */}
          <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="inline-block text-white">
              {title}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                {highlightedText}
              </span>
            </span>
            
            {/* Animated underline */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-red-600">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 animate-pulse" />
            </div>
          </h2>
    
          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Background