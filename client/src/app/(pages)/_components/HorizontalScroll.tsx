"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useRef, useState, useEffect } from "react";
import { MentorshipSection } from "./mentorship-section";
import FuturisticTestimonialShowcase from "./FuturisticTestimonialShowcase";
import EducationCards from "./EducationCards";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

interface CourseCardProps extends Course {
  scrollYProgress: any;
  index: number;
}

interface NewCourseCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  id: string;
  index: number;
}

export default function Home(): JSX.Element {
  const cardsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [cursorText, setCursorText] = useState<string>("");

  const courses: Course[] = [
    {
      id: "stp",
      title: "Indian Stock & Derivative Market",
      subtitle: "Master the Indian Markets",
      description:
        "Master technical analysis, price action, and risk management strategies for Indian markets.",
      image: "/card/c5.jpg",
      category: "STP Course",
    },
    {
      id: "fch",
      title: "World Market, Forex & Crypto",
      subtitle: "Global Trading Mastery",
      description:
        "Comprehensive training for global markets, forex trading, and cryptocurrency investments.",
      image: "/card/c6.jpg",
      category: "FCH Course",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <ReactLenis root>
      <main className="relative bg-[#090909] text-white overflow-hidden">
        <div className="relative z-10">
          {/* Live Trading Section */}
          <section className="relative min-h-screen w-full border-t border-white/5 py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -inset-[10%] opacity-20"
                animate={{
                  background: [
                    "radial-gradient(circle at 30% 30%, rgba(240, 30, 50, 0.5) 0%, rgba(9, 9, 9, 0) 70%)",
                    "radial-gradient(circle at 70% 70%, rgba(240, 30, 50, 0.5) 0%, rgba(9, 9, 9, 0) 70%)",
                    "radial-gradient(circle at 30% 70%, rgba(240, 30, 50, 0.5) 0%, rgba(9, 9, 9, 0) 70%)",
                    "radial-gradient(circle at 70% 30%, rgba(240, 30, 50, 0.5) 0%, rgba(9, 9, 9, 0) 70%)",
                    "radial-gradient(circle at 30% 30%, rgba(240, 30, 50, 0.5) 0%, rgba(9, 9, 9, 0) 70%)",
                  ],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(0,0,0,0) 0%, rgba(240,30,50,0.3) 100%)",
                    "linear-gradient(45deg, rgba(240,30,50,0.3) 0%, rgba(0,0,0,0) 100%)",
                    "linear-gradient(45deg, rgba(0,0,0,0) 0%, rgba(240,30,50,0.3) 100%)",
                  ],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-6 md:space-y-8"
                >
                  <motion.div
                    className="inline-flex items-center mb-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="relative flex h-3 w-3 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-sm font-medium text-gray-300">
                      Live Sessions Available
                    </span>
                  </motion.div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="block"
                    >
                      Live Trading Sessions
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mt-1"
                    >
                      & Expert Mentorship
                    </motion.span>
                  </h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-gray-400 text-base md:text-lg lg:text-xl max-w-xl"
                  >
                    Experience real-time market analysis, trade execution, and
                    strategy implementation with professional traders guiding
                    you through every step of your trading journey.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
                  >
                    {[
                      {
                        title: "Live Market Analysis",
                        desc: "Real-time chart reading and market interpretation",
                      },
                      {
                        title: "Trade Execution",
                        desc: "Watch experts identify and execute profitable trades",
                      },
                      {
                        title: "Personal Mentorship",
                        desc: "One-on-one guidance tailored to your trading goals",
                      },
                      {
                        title: "Strategy Implementation",
                        desc: "Apply proven strategies across various market conditions",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col p-4 bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-xl hover:bg-white/[0.05] hover:border-red-500/20 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index + 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, x: 0 }}
                      >
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.button
                    className="group flex items-center mt-6 gap-2 text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-full w-fit text-base font-semibold transition-all duration-300 cursor-link shadow-lg shadow-red-900/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setCursorText("Join Now")}
                    onMouseLeave={() => setCursorText("")}
                  >
                    Join Live Session
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.button>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative group cursor-expanded"
                >
                  {/* Animated gradient border */}
                  <div className="absolute -inset-px bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-2xl opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-1000 animate-gradient"></div>

                  {/* Card content */}
                  <div className="relative bg-gradient-to-b from-black/90 to-black/80 p-4 sm:p-5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
                    {/* Grid background for card */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                    <div className="relative">
                      {/* Main image */}
                      <div className="relative rounded-lg overflow-hidden">
                        <Image
                          src="/bg.jpeg"
                          alt="Live Trading Setup"
                          width={800}
                          height={500}
                          className="w-full h-[400px] sm:h-[450px] md:h-[500px] object-cover transform group-hover:scale-[1.02] transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                        {/* Overlay elements */}
                        <div className="absolute inset-0">
                          {/* Trading UI elements that appear on hover */}
                          <motion.div
                            className="absolute top-4 right-4 h-24 w-36 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={{ x: 20 }}
                            whileInView={{ x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <div className="w-full h-full bg-gradient-to-b from-green-500/20 to-green-500/5 rounded">
                              <div className="h-3/4 w-full relative overflow-hidden">
                                <svg
                                  className="absolute inset-0 w-full h-full"
                                  viewBox="0 0 100 50"
                                >
                                  <path
                                    d="M0,25 L10,20 L20,35 L30,15 L40,25 L50,10 L60,30 L70,20 L80,40 L90,15 L100,25"
                                    fill="none"
                                    stroke="#22c55e"
                                    strokeWidth="1.5"
                                  />
                                </svg>
                              </div>
                              <div className="h-1/4 w-full px-2 flex items-center justify-between">
                                <span className="text-xs text-green-400">
                                  +2.34%
                                </span>
                                <span className="text-xs text-white/70">
                                  NIFTY
                                </span>
                              </div>
                            </div>
                          </motion.div>

                          <motion.div
                            className="absolute top-4 left-4 h-24 w-36 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={{ x: -20 }}
                            whileInView={{ x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            <div className="w-full h-full bg-gradient-to-b from-red-500/20 to-red-500/5 rounded">
                              <div className="h-3/4 w-full relative overflow-hidden">
                                <svg
                                  className="absolute inset-0 w-full h-full"
                                  viewBox="0 0 100 50"
                                >
                                  <path
                                    d="M0,15 L10,25 L20,10 L30,30 L40,20 L50,35 L60,15 L70,25 L80,5 L90,20 L100,15"
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="1.5"
                                  />
                                </svg>
                              </div>
                              <div className="h-1/4 w-full px-2 flex items-center justify-between">
                                <span className="text-xs text-red-400">
                                  -1.87%
                                </span>
                                <span className="text-xs text-white/70">
                                  BANKNIFTY
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      {/* Content below image */}
                      <div className="mt-4 text-center">
                        <h3 className="text-xl font-bold mb-2">
                          Professional Trading Environment
                        </h3>
                        <p className="text-gray-400 text-sm">
                          State-of-the-art setup for optimal trading performance
                        </p>

                        {/* Live indicator */}
                        <div className="mt-4 inline-flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30">
                          <span className="relative flex h-3 w-3 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </span>
                          <span className="text-sm font-medium">
                            Live Trading in Progress
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        <main className="bg-[#090909]">
          <EducationCards />
        </main>

        <main className="bg-[#090909]">
          <MentorshipSection />
        </main>

        <section
          ref={sectionRef}
          className="relative text-white w-full bg-[#090909] py-20 md:py-32 overflow-hidden"
        >
          {/* Futuristic background elements */}
          <div className="absolute inset-0">
            {/* Animated grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            {/* Animated glow effects */}
            <motion.div
              className="absolute -top-[20%] right-[10%] w-[40%] h-[40%] bg-red-500/5 rounded-full blur-[120px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.15, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -bottom-[20%] left-[10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.1, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            {/* Section header */}
            <div className="text-center mb-16 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-4"
              >
                <svg
                  className="w-4 h-4 mr-2 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
                <span className="text-sm font-medium">Premium Courses</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                Master the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                  Markets
                </span>
              </motion.h2>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-6"
              ></motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-400 text-lg max-w-2xl mx-auto"
              >
                Expert-led trading courses designed to transform beginners into
                consistent profitable traders
              </motion.p>
            </div>

            {/* Introduction Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-16 hover:border-red-500/20 transition-colors duration-500"
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    Transform Your
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 ml-2">
                      Trading Journey
                    </span>
                  </h3>

                  <p className="text-gray-300">
                    Our comprehensive courses cover technical analysis, market
                    psychology, and risk management across stocks, forex, and
                    cryptocurrency markets.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Learn from professional traders with years of experience",
                      "Practice with real-world market scenarios and case studies",
                      "Access to exclusive trading community and ongoing support",
                      "Lifetime access to course updates and new materials",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <span className="flex-shrink-0 text-red-500 bg-red-500/10 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 border border-red-500/20">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="group relative flex items-center gap-2 text-white overflow-hidden bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-md text-base font-medium transition-all duration-300 mt-4"
                    onMouseEnter={() => setCursorText("Explore")}
                    onMouseLeave={() => setCursorText("")}
                  >
                    <span className="relative z-10">View All Courses</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-400/20 to-red-500/0"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-center">
                  <motion.div
                    className="relative w-40 h-40 md:w-48 md:h-48"
                    animate={{
                      rotateY: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/10 to-red-500/30 blur-xl"></div>
                    <div className="absolute inset-4 border-2 border-red-500/20 rounded-full"></div>
                    <div className="absolute inset-8 border-2 border-red-500/30 rounded-full"></div>
                    <div className="absolute inset-12 border-2 border-red-500/40 rounded-full"></div>
                    <div className="absolute inset-16 border-2 border-red-500/50 rounded-full"></div>
                    <motion.div
                      className="absolute w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/30"
                      style={{ top: "50%", left: 0, marginTop: "-8px" }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    ></motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Courses Cards - Displayed side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.map((course, index) => (
                <NewCourseCard key={course.id} {...course} index={index} />
              ))}
            </div>
          </div>
        </section>

        <FuturisticTestimonialShowcase limitCount={3} />
        <section className="py-16 bg-[#090909]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Explore Our{" "}
              <span className="text-gradient-red">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
              See how traders from all backgrounds have transformed their
              approach to the markets with our cutting-edge methodology and
              mentorship.
            </p>
            <Link href="/testimonials" className="inline-block">
              <button className="relative group overflow-hidden bg-black border border-red-500 text-white py-3 px-8 rounded-md transition-all duration-300 ease-in-out">
                <span className="relative z-10">View All Testimonials</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
              </button>
            </Link>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
}

// New course card component with better visibility and content layout
const NewCourseCard: React.FC<NewCourseCardProps> = ({
  title,
  subtitle,
  description,
  image,
  category,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm border border-white/10 hover:border-red-500/30 rounded-xl overflow-hidden h-full transition-all duration-500"
    >
      {/* Card glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/0 to-red-500/0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:from-red-500/20 group-hover:to-red-500/5 blur-sm -z-10 transition-all duration-500"></div>

      <div className="flex flex-col h-full">
        {/* Image section */}
        <div className="relative h-60 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black z-10"></div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={image}
              alt={title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-red-500/30 px-3 py-1 rounded-md text-xs font-medium z-20 group-hover:bg-red-500/80 group-hover:border-red-500 transition-all duration-500">
            {category}
          </div>

          {/* Rating badge */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1 z-20">
            <svg
              className="w-3 h-3 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span>4.9/5</span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 flex-1 flex flex-col">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 relative inline-block">
              {title}
              <div className="h-0.5 w-12 bg-red-500 mt-2 group-hover:w-full transition-all duration-500"></div>
            </h3>

            <p className="text-gray-300 text-sm mb-2">{subtitle}</p>

            <p className="text-gray-400 text-sm mb-4">{description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Technical Analysis", "Risk Management", "Psychology"].map(
                (feature, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-md text-gray-300 hover:bg-red-500/10 hover:border-red-500/30 transition-colors duration-300"
                  >
                    {feature}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Button */}
          <div className="mt-auto">
            <button className="group relative w-full flex items-center justify-center gap-2 text-white overflow-hidden bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-700 hover:to-red-800 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300">
              <span className="relative z-10">Enroll Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-400/20 to-red-500/0"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
