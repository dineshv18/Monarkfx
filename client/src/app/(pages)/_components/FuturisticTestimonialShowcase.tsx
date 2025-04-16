"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { Testimonial } from "./testimonial";

type TestimonialType = {
  name: string;
  role: string;
  content: string;
  avatar: string;
};

export default function FuturisticTestimonialShowcase({
  limitCount,
}: {
  limitCount?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const testimonials: TestimonialType[] = [
    {
      name: "Aisha Kumar",
      role: "Senior Trader",
      content:
        "The advanced trading strategies and institutional methods I learned here completely transformed my approach to the markets. The mentorship was invaluable.",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      name: "Vikram Singh",
      role: "Day Trader",
      content:
        "This platform offers unparalleled insights into market dynamics. Their risk management techniques and strategy development frameworks are game-changers.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      name: "Priya Sharma",
      role: "Algorithmic Trader",
      content:
        "Coming from a non-finance background, I was skeptical at first. But the structured curriculum and patient mentors helped me understand complex trading concepts easily.",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      name: "Rajesh Patel",
      role: "Options Specialist",
      content:
        "The options trading module was revolutionary. I now understand the true mechanics of market pricing and volatility in a way I never did before.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      name: "Ananya Gupta",
      role: "Quantitative Analyst",
      content:
        "Their focus on quantitative methods and statistical edge finding has completely changed how I approach market analysis and trade execution.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      name: "Rahul Mehta",
      role: "Swing Trader",
      content:
        "The multi-timeframe analysis techniques and sector rotation strategies helped me improve my trade selection significantly. My consistency has improved tremendously.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ];

  const displayedTestimonials = limitCount
    ? testimonials.slice(0, limitCount)
    : testimonials;

  // Parallax background effect
  const backgroundY = useTransform(springScrollY, [0, 1], ["0%", "20%"]);

  const enterButton = () => setCursorVariant("button");
  const leaveButton = () => setCursorVariant("default");

  const cursorVariants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 45, 85, 0.2)",
      borderColor: "rgba(255, 45, 85, 0.5)",
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 45, 85, 0.3)",
      borderColor: "rgba(255, 45, 85, 0.8)",
      mixBlendMode: "difference" as const,
    },
  };

  return (
    <div
      className="w-full bg-[#090909] min-h-screen relative overflow-hidden"
      ref={containerRef}
    >
      {/* Custom cursor */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-8 h-8 rounded-full border-2 z-50 pointer-events-none mix-blend-difference"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-red-600/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-red-800/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </motion.div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            onMouseEnter={enterButton}
            onMouseLeave={leaveButton}
          >
            <span className="relative">
              Trader <span className="text-gradient-red">Success Stories</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-red-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Hear from our community of traders who have transformed their
            approach to the markets with our cutting-edge methodology.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
              whileHover={{ y: -8 }}
            >
              <Testimonial
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                avatar={testimonial.avatar}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
