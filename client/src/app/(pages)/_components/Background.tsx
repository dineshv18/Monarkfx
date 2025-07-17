"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

interface BackgroundProps {
  title: string;
  highlightedText: string;
  subtitle: string;
}

const Background = ({ title, highlightedText, subtitle }: BackgroundProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.12),_transparent_50%)]" />
        </div>

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-600/10"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: 0,
            }}
            animate={
              isInView
                ? {
                    x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                    y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                    scale: [0, 1, 0],
                  }
                : {}
            }
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 30 + 10,
              height: Math.random() * 30 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-32 bg-green-600/5 blur-3xl"
            animate={
              isInView
                ? {
                    rotate: [-6, 6],
                    scale: [0.95, 1.05],
                  }
                : {}
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Heading */}
          <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <motion.span
              className="inline-block text-white"
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {title}
              <motion.span
                className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600"
                initial={{ x: 20, opacity: 0 }}
                animate={
                  isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {highlightedText}
              </motion.span>
            </motion.span>

            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-green-600 overflow-hidden"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 animate-pulse" />
            </motion.div>
          </h2>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Background;
