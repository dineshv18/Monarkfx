import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function FuturisticHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated mouse parallax effect
  const calcDynamicValue = (value: number, min: number, max: number) => {
    return (value / 1000) * (max - min) + min;
  };

  const moveX = useTransform(useMotionValue(mousePosition.x), (value) =>
    calcDynamicValue(value, -15, 15)
  );

  const moveY = useTransform(useMotionValue(mousePosition.y), (value) =>
    calcDynamicValue(value, -15, 15)
  );

  // For smoother motion
  const springMoveX = useSpring(moveX, { damping: 50, stiffness: 400 });
  const springMoveY = useSpring(moveY, { damping: 50, stiffness: 400 });

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e15_1px,transparent_1px),linear-gradient(to_bottom,#22c55e15_1px,transparent_1px)] bg-[size:32px_32px]" />
        <motion.div
          className="absolute -left-20 -top-20 w-96 h-96 bg-green-500/30 rounded-full filter blur-[100px]"
          animate={{
            x: [0, 30, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-0 w-72 h-72 bg-green-600/30 rounded-full filter blur-[100px]"
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[80vh]">
          {/* Text content */}
          <motion.div
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center mb-6">
              <motion.div
                className="h-1 w-10 bg-green-500 mr-4"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.span
                className="text-gray-300 font-medium text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                TRADING REDEFINED
              </motion.span>
            </div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Master the <span className="text-gradient-green">Markets</span>{" "}
              with Precision
            </motion.h1>

            <motion.p
              className="text-lg text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Elevate your trading with institutional-grade strategies, expert
              mentorship, and cutting-edge market insights. Join thousands of
              traders who've transformed their approach.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="relative group overflow-hidden bg-[#0a0a0a] border border-green-500 text-white py-3 px-8 rounded-md transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get Started</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-800"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </motion.button>

              <Link href="/testimonials" className="block">
                <motion.button
                  className="relative group overflow-hidden bg-[#0a0a0a] border border-white/20 text-white py-3 px-8 rounded-md transition-all duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">View Success Stories</span>
                  <motion.div
                    className="absolute inset-0 bg-white/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-black overflow-hidden relative"
                  >
                    <Image
                      src={`https://randomuser.me/api/portraits/men/${20 + i
                        }.jpg`}
                      alt={`User ${i}`}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-green-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  Trusted by 10,000+ traders
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D-like trading chart visualization */}
          <motion.div
            className="flex-1 relative"
            style={{ x: springMoveX, y: springMoveY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-square max-w-xl mx-auto">
              {/* Glowing effect behind the chart */}
              <div className="absolute inset-0 bg-green-500/20 rounded-full filter blur-3xl animate-pulse" />

              {/* Simulated trading chart */}
              <motion.div
                className="absolute inset-0 rounded-lg overflow-hidden border border-white/10 backdrop-blur-sm bg-[#0a0a0a]/40"
                initial={{ y: 20 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Chart header */}
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                    <span className="text-white font-medium">BTC/USD</span>
                  </div>
                  <div className="flex items-center text-white text-sm">
                    <span className="text-green-500 font-semibold">
                      36,452.12
                    </span>
                    <span className="ml-2 text-green-500">-2.34%</span>
                  </div>
                </div>

                {/* Chart content */}
                <div className="p-4 h-full">
                  <div className="h-64 w-full relative">
                    <svg viewBox="0 0 100 40" className="w-full h-full">
                      {/* Generate stylized chart line */}
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="rgba(239, 68, 68, 0.5)"
                          />
                          <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,20 L5,18 L10,22 L15,15 L20,25 L25,18 L30,16 L35,19 L40,14 L45,21 L50,13 L55,18 L60,16 L65,22 L70,10 L75,15 L80,18 L85,13 L90,20 L95,10 L100,15"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="0.4"
                      />
                      <path
                        d="M0,20 L5,18 L10,22 L15,15 L20,25 L25,18 L30,16 L35,19 L40,14 L45,21 L50,13 L55,18 L60,16 L65,22 L70,10 L75,15 L80,18 L85,13 L90,20 L95,10 L100,15 L100,40 L0,40 Z"
                        fill="url(#gradient)"
                      />

                      {/* Animated position marker */}
                      <motion.circle
                        cx="70"
                        cy="10"
                        r="0.8"
                        fill="#ffffff"
                        animate={{
                          opacity: [1, 0.5, 1],
                          r: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>

                    {/* Grid lines */}
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="border border-white/5" />
                      ))}
                    </div>
                  </div>

                  {/* Trading indicators at bottom */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {["RSI", "MACD", "VOL"].map((indicator) => (
                      <div
                        key={indicator}
                        className="bg-white/5 rounded px-2 py-1 text-xs text-white/80"
                      >
                        {indicator}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating trading elements */}
              <motion.div
                className="absolute top-10 -right-4 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded px-3 py-2 text-white text-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, -8, 0],
                }}
                transition={{
                  delay: 1,
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <span>Entry: 34,250</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-20 -left-4 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded px-3 py-2 text-white text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, 8, 0],
                }}
                transition={{
                  delay: 1.2,
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <span>Target: 39,800</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
        <motion.div
          className="w-1 h-8 bg-gradient-to-b from-green-500 to-transparent rounded-full"
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}

// Helper to create a motion value for mouse position
function useMotionValue(value: number): MotionValue<number> {
  const motionValue = React.useMemo(() => new MotionValue(value), [value]);

  React.useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return motionValue;
}
