"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Trophy,
  ArrowRight,
  CheckCircle,
  LucideIcon,
  Target,
  Star,
  Award,
  Briefcase,
  Users,
  Book,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Background from "../../_components/Background";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
}

interface ProgramProps {
  title: string;
  shortName: string;
  description: string;
  color: string;
  image: string;
}

interface ExpertiseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface CounterProps {
  value: number;
  label: string;
  duration?: number;
  delay?: number;
}

interface CustomCursorProps {
  mousePosition: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  cursorVariant: string;
}

// Custom cursor variants
const cursorVariants = {
  default: {
    height: 32,
    width: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 59, 59, 0.3)",
    x: "-50%",
    y: "-50%",
  },
  text: {
    height: 64,
    width: 64,
    backgroundColor: "rgba(255, 59, 59, 0.1)",
    border: "1px solid rgba(255, 59, 59, 0.6)",
    x: "-50%",
    y: "-50%",
  },
  button: {
    height: 48,
    width: 48,
    backgroundColor: "rgba(255, 59, 59, 0.3)",
    border: "1px solid rgba(255, 59, 59, 0.8)",
    x: "-50%",
    y: "-50%",
  },
};

const About = () => {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Mouse position tracking for custom cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // Spring animations for smoother movements
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

  // Parallax effect refs
  const parallaxRef1 = useRef(null);
  const parallaxRef2 = useRef(null);
  const parallaxRef3 = useRef(null);

  // Enhanced parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.6, 1, 0.6]);

  // Handle mouse movement for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Functions to handle cursor variants
  const handleTextEnter = () => setCursorVariant("text");
  const handleButtonEnter = () => setCursorVariant("button");
  const handleMouseLeave = () => setCursorVariant("default");

  const programs: ProgramProps[] = [
    {
      title: "SMART TRADER PROFILE",
      shortName: "STP",
      description:
        "A national-focused course covering the Indian stock and derivative markets, teaching professional trading methods without relying on traditional indicators.",
      color: "#ff3a3a",
      image: "/program-stock.jpg",
    },
    {
      title: "FOREX CRYPTO HUSTLER",
      shortName: "FCH",
      description:
        "An internationally-oriented program teaching cryptocurrency fundamentals and forex trading strategies for global markets.",
      color: "#ff4d00",
      image: "/program-crypto.jpg",
    },
  ];

  const timelineItems: TimelineItemProps[] = [
    {
      year: "2021",
      title: "Foundation as Equity Tank",
      description:
        "Established as a premier financial market institute focused on trading education.",
    },
    {
      year: "2022",
      title: "ISO Certification",
      description:
        "Received ISO 21008:2018 certification, setting industry standards for financial education.",
    },
    {
      year: "2023",
      title: "Rebranded to Monark FX",
      description:
        "Evolved into Monark FX with expanded course offerings and global reach.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description:
        "Extended our reach internationally, building a worldwide community of traders.",
    },
  ];

  const expertiseItems: ExpertiseCardProps[] = [
    {
      icon: Users,
      title: "Personalized Mentorship",
      description:
        "One-on-one guidance from industry experts tailored to your trading goals",
    },
    {
      icon: Briefcase,
      title: "Professional Trading Training",
      description:
        "Comprehensive market analysis and trading strategies with professional traders",
    },
    {
      icon: Award,
      title: "ISO Certification",
      description:
        "Comprehensive examinations leading to internationally recognized certification",
    },
    {
      icon: Book,
      title: "Multi-timeframe Analysis",
      description:
        "Advanced techniques for analyzing markets across different timeframes",
    },
  ];

  const achievements = [
    { value: 4.7, label: "Rating from 200+ reviews" },
    { value: 1000, label: "Offline Sessions Completed" },
    { value: 250, label: "Students Trained in person" },
    { value: 7, label: "Expert Trading Professionals" },
  ];

  return (
    <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
      <main
        className="bg-black overflow-hidden relative font-plus-jakarta-sans"
        ref={container}
      >
        {/* Custom cursor */}
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
          variants={cursorVariants}
          animate={cursorVariant}
          style={{
            left: mouseX,
            top: mouseY,
          }}
        />

        {/* Background decorative elements */}
        <div className="absolute w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-red-400/10 to-transparent blur-3xl"
            style={{
              x: useTransform(scrollYProgress, [0, 1], [-300, 300]),
              y: useTransform(scrollYProgress, [0, 1], [300, -300]),
              opacity: useTransform(
                scrollYProgress,
                [0, 0.5, 1],
                [0.2, 0.4, 0.1]
              ),
            }}
          />
          <motion.div
            className="absolute right-0 top-[30%] w-[400px] h-[400px] rounded-full bg-gradient-to-l from-red-500/5 to-transparent blur-3xl"
            style={{
              x: useTransform(scrollYProgress, [0, 1], [200, -200]),
              scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2]),
              opacity: useTransform(
                scrollYProgress,
                [0, 0.5, 1],
                [0.1, 0.3, 0.1]
              ),
            }}
          />
        </div>

        <Background
          title="About Us"
          highlightedText="Monark FX"
          subtitle="Learn about our journey, vision, and expertise in the world of trading and finance."
        />

        {/* Legacy Section */}
        <section id="legacy" className="py-32 relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <motion.div
                ref={parallaxRef1}
                style={{ y: y1, scale: scale1 }}
                className="w-full md:w-1/2 relative"
              >
                <div className="relative z-10 overflow-hidden group rounded-2xl">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src="/placeholder.jpeg"
                      width={700}
                      height={500}
                      alt="Monark FX Legacy"
                      className="w-full h-auto object-cover rounded-2xl shadow-[0_10px_50px_-12px_rgba(249,0,0,0.2)] transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700 rounded-2xl"></div>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  style={{ rotate: rotate1 }}
                  className="absolute -bottom-10 -right-10 w-80 h-80 border border-green-500/30 rounded-full -z-0 opacity-70"
                ></motion.div>
                <motion.div
                  style={{
                    rotate: useTransform(scrollYProgress, [0, 1], [0, -10]),
                  }}
                  className="absolute -top-8 -left-8 w-40 h-40 border border-green-500/30 rounded-full -z-0 opacity-70"
                ></motion.div>
              </motion.div>

              <div className="w-full md:w-1/2">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onMouseEnter={handleTextEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="mb-8">
                      <motion.span
                        className="text-sm uppercase tracking-[0.2em] font-semibold text-green-500 inline-block"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        Who We Are
                      </motion.span>
                      <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mt-2">
                        Our Legacy in{" "}
                        <span className="text-green-500 relative">
                          Financial
                          <span className="absolute -bottom-2 left-0 w-full h-1 bg-green-500/20"></span>
                        </span>{" "}
                        Education
                      </h2>
                    </div>

                    <motion.p
                      className="text-gray-600 text-lg leading-relaxed mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      Monark FX is an ISO 21008:2018 Certified Institute
                      established in 2021 (formerly known as Equity Tank). We
                      are a premier financial market institute specializing in
                      trading and finance education across Stocks, Forex, and
                      Cryptocurrency markets.
                    </motion.p>

                    <motion.div
                      className="p-6 bg-gradient-to-r from-green-500/20 to-transparent border-l-4 border-green-500 rounded-r-xl shadow-sm"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <p className="italic text-green-400 font-medium">
                        "At Monark FX, we don't just teach trading; we build
                        traders who transform markets."
                      </p>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-32 bg-gradient-to-b from-white to-red-50/50 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg
              className="absolute right-0 top-0 w-1/3 h-auto text-red-50 opacity-70"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M42.5,-65.1C55.8,-56.4,67.4,-44.5,74.4,-29.7C81.4,-15,83.9,2.6,78.5,17.1C73.1,31.5,60,42.9,45.8,51.9C31.6,61,16.2,67.7,1.6,65.8C-13,63.9,-25.7,53.2,-38.9,43.1C-52.1,32.9,-65.7,23.3,-69.8,10.3C-73.9,-2.8,-68.6,-19.1,-60.1,-32.8C-51.7,-46.4,-40.1,-57.3,-27.2,-66.3C-14.3,-75.2,0,-82.1,14.1,-79.9C28.1,-77.7,42.1,-66.5,42.5,-65.1Z"
                transform="translate(100 100)"
              />
            </svg>
            <svg
              className="absolute left-0 bottom-0 w-1/4 h-auto text-red-100 opacity-40"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M38.5,-49.1C51.6,-40.7,65.3,-31.3,72.6,-17.2C79.9,-3.1,80.8,15.6,73.7,30.1C66.5,44.7,51.4,55.2,35,62.7C18.6,70.2,0.9,74.7,-17,73.2C-34.9,71.7,-53,64.1,-64.6,50.5C-76.1,36.9,-81.1,17.2,-79.3,-1.1C-77.5,-19.4,-68.8,-36.4,-55.8,-45.6C-42.9,-54.8,-25.5,-56.2,-10.5,-54.8C4.5,-53.4,9,-53.3,18.1,-51.7C27.2,-50.1,40.8,-47.1,38.5,-49.1Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
              onMouseEnter={handleTextEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.span
                className="text-sm uppercase tracking-[0.2em] font-semibold text-green-500 inline-block mb-3"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Our Evolution
              </motion.span>
              <h2 className="text-5xl font-bold text-center text-gray-800 relative inline-block">
                Our <span className="text-green-500">Journey</span>
                <motion.div
                  className="absolute -bottom-3 left-0 w-full h-1 bg-green-500/20"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-red-200 via-red-400 to-red-200"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              ></motion.div>

              {/* Timeline items */}
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className={`relative flex items-center mb-24 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="md:flex-1 md:px-12">
                    <motion.div
                      whileHover={{ scale: 1.03, y: -5 }}
                      transition={{ duration: 0.4 }}
                      onMouseEnter={handleTextEnter}
                      onMouseLeave={handleMouseLeave}
                      className={`p-8 rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] backdrop-blur-sm
                        ${
                          index % 2 === 0
                            ? "text-right md:mr-10 border-r-4 border-green-500 bg-gradient-to-br from-gray-900 to-gray-800"
                            : "md:ml-10 border-l-4 border-green-500 bg-gradient-to-br from-gray-900 to-gray-800"
                        } transition-all duration-300`}
                    >
                      <h3 className="text-2xl font-bold text-green-500 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full h-20 w-20 flex items-center justify-center font-bold text-xl shadow-lg z-10 border-4 border-white"
                    >
                      {item.year}
                    </motion.div>

                    {/* Decorative pulse effect */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <motion.div
                        className="absolute w-20 h-20 rounded-full bg-red-400/20"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0.2, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-32 relative bg-black overflow-hidden">
          {/* Background decorative elements */}
          <motion.div
            ref={parallaxRef2}
            style={{ y: y2 }}
            className="absolute top-10 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-red-50 to-transparent opacity-70 z-0 blur-xl"
          ></motion.div>
          <motion.div
            style={{ y: y3 }}
            className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-gradient-to-tr from-red-100 to-transparent opacity-50 z-0 blur-lg"
          ></motion.div>

          {/* Decorative lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-100 to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-100 to-transparent opacity-70"></div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
              onMouseEnter={handleTextEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.span
                className="text-sm uppercase tracking-[0.2em] font-semibold text-green-500 inline-block mb-3"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Our Purpose
              </motion.span>
              <h2 className="text-5xl font-bold text-gray-800">
                Vision & Mission
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
              {/* Connected line between cards */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-50 hidden md:block"></div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(249, 100, 100, 0.15)",
                }}
                onMouseEnter={handleTextEnter}
                onMouseLeave={handleMouseLeave}
                className="bg-gray-900 p-10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl transition-all duration-500 border border-green-500/20 backdrop-blur-sm relative z-10"
              >
                <div className="relative mb-8">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-red-50 rounded-full"></div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-2xl relative">
                    <Star className="h-10 w-10 text-green-500" />
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Vision
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  At Monark FX, we envision building a lasting legacy in the
                  world of trading and finance by empowering individuals with
                  the knowledge and skills to succeed in the financial markets.
                  Through expert guidance, innovative learning solutions, and a
                  commitment to excellence, we strive to create a global
                  community of confident and successful traders.
                </p>

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-0.5 h-10 bg-red-200"></div>
                  <div className="absolute top-0 right-0 w-10 h-0.5 bg-red-200"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-0.5 h-10 bg-red-200"></div>
                  <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-red-200"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(249, 100, 100, 0.15)",
                }}
                onMouseEnter={handleTextEnter}
                onMouseLeave={handleMouseLeave}
                className="bg-gray-900 p-10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl transition-all duration-500 border border-green-500/20 backdrop-blur-sm relative z-10"
              >
                <div className="relative mb-8">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-red-50 rounded-full"></div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-2xl relative">
                    <Target className="h-10 w-10 text-green-500" />
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Mission
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Our mission is to empower individuals with the knowledge and
                  skills needed to excel in trading across multiple financial
                  markets. By providing expert-led offline and online courses,
                  we build a community of informed traders and investors,
                  fostering growth and success while paving the way for a
                  lasting legacy.
                </p>

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-0.5 h-10 bg-red-200"></div>
                  <div className="absolute top-0 right-0 w-10 h-0.5 bg-red-200"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-0.5 h-10 bg-red-200"></div>
                  <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-red-200"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-32 bg-black relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg
              className="absolute left-0 top-1/4 w-1/5 h-auto text-red-50 opacity-60 transform -translate-x-1/2"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M47.5,-57.2C59.9,-45.8,67.4,-28.5,70.5,-10.2C73.5,8,72.2,27.2,62.3,40C52.5,52.9,34.2,59.4,15.4,63.9C-3.4,68.3,-22.7,70.7,-39.8,64.2C-56.8,57.6,-71.7,42.1,-77.1,23.5C-82.5,4.9,-78.4,-16.8,-68.1,-33.5C-57.8,-50.2,-41.3,-61.9,-24.5,-67.4C-7.7,-72.8,9.4,-72,25.4,-67.3C41.4,-62.6,56.3,-53.9,47.5,-57.2Z"
                transform="translate(100 100)"
              />
            </svg>
            <svg
              className="absolute right-0 bottom-1/4 w-1/4 h-auto text-red-100 opacity-50 transform translate-x-1/3"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M34.6,-42.5C46.9,-33.1,60.2,-24.7,64.8,-12.6C69.4,-0.5,65.1,15.3,57.4,28.7C49.6,42,38.3,52.8,25.1,58.6C11.9,64.4,-3.3,65.1,-17.7,61C-32.1,56.9,-45.7,48,-54.4,35.2C-63.1,22.4,-66.8,5.7,-63.3,-8.7C-59.8,-23.1,-49.1,-35.3,-36.8,-44.6C-24.4,-53.9,-10.4,-60.3,0.9,-61.3C12.2,-62.4,24.3,-58.1,34.6,-42.5Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
              onMouseEnter={handleTextEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.span
                className="text-sm uppercase tracking-[0.2em] font-semibold text-green-500 inline-block mb-3"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                What We Offer
              </motion.span>
              <h2 className="text-5xl font-bold text-gray-800 mb-5">
                Our <span className="text-green-500">Expertise</span>
              </h2>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Backed by a team of seven expert professionals, each
                specializing in different trading segments, Monark FX ensures
                that learners receive insightful and practical guidance.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertiseItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 20px 40px -15px rgba(249, 40, 40, 0.15)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                    onMouseEnter={handleButtonEnter}
                    onMouseLeave={handleMouseLeave}
                    className="group bg-gray-900 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Decorative background element */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-50 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

                    <div className="relative">
                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <IconComponent className="text-green-500 h-8 w-8" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Animated arrow on hover */}
                      <motion.div
                        className="absolute bottom-0 right-0 p-2 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.div>
                    </div>

                    {/* Top corner decoration */}
                    <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden">
                      <div className="absolute top-0 left-0 w-0.5 h-5 bg-green-500/30 group-hover:h-10 transition-all duration-500"></div>
                      <div className="absolute top-0 left-0 w-5 h-0.5 bg-green-500/30 group-hover:w-10 transition-all duration-500"></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Achievements Section with Counter Animation */}
        <section className="py-32 relative">
          {/* Advanced gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800 overflow-hidden">
            {/* Animated mesh gradients */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]"
              animate={{
                opacity: [0.5, 0.7, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08),transparent_50%)]"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1.1, 1, 1.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Decorative grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              ></div>
            </div>
          </div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
              onMouseEnter={handleTextEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.span
                className="text-sm uppercase tracking-[0.2em] font-semibold text-white/80 inline-block mb-3"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Our Impact
              </motion.span>
              <h2 className="text-5xl font-bold text-white mb-4">
                Our Achievements
              </h2>
              <motion.div
                className="h-1 w-20 bg-white/30 mx-auto rounded-full overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="h-full w-full bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                  }}
                  onMouseEnter={handleButtonEnter}
                  onMouseLeave={handleMouseLeave}
                  className="bg-white/10 backdrop-blur-sm p-10 rounded-2xl text-center border border-white/10 transition-all duration-500 relative overflow-hidden group"
                >
                  {/* Card background animations */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent transform rotate-45"></div>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0">
                    <div className="w-16 h-16 border-t border-r border-white/10 rounded-tr-2xl"></div>
                  </div>

                  <Counter
                    value={item.value}
                    label={item.label}
                    delay={index * 0.2}
                    duration={2.5}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 bg-black relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated subtle gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-transparent"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Decorative shapes */}
            <div className="absolute -bottom-32 -right-32 w-96 h-96 border border-green-500/30 rounded-full opacity-30"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 border border-green-500/30 rounded-full opacity-30"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto backdrop-blur-sm p-12 rounded-3xl border border-green-500/20 shadow-[0_10px_50px_-12px_rgba(34,197,94,0.1)]"
              onMouseEnter={handleTextEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to Start Your{" "}
                <span className="text-green-500">Trading Journey</span>?
              </motion.h2>

              <motion.p
                className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Join our expert-led community and gain the skills to succeed in
                financial markets.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.a
                  href="/contact"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 30px -10px rgba(220, 38, 38, 0.3)",
                  }}
                  onMouseEnter={handleButtonEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-medium rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 inline-flex items-center group overflow-hidden"
                >
                  {/* Button background animation on hover */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500/0 via-red-300/20 to-red-500/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                  <span className="relative z-10">Contact Us Today</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
};

// Counter animation component with enhanced design
const Counter: React.FC<CounterProps> = ({
  value,
  label,
  duration = 2,
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const inView = useRef(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && !inView.current) {
      inView.current = true;

      let start = 0;
      const isDecimal = !Number.isInteger(value);
      const decimals = isDecimal ? 1 : 0;
      const end = value;
      const incrementTime = (duration * 1000) / end;

      setTimeout(() => {
        const timer = setInterval(() => {
          start += 0.1;
          setCount(parseFloat(Math.min(start, end).toFixed(decimals)));

          if (start >= end) {
            clearInterval(timer);
          }
        }, incrementTime);

        return () => clearInterval(timer);
      }, delay * 500);
    }
  }, [isInView, value, duration, delay]);

  return (
    <div ref={ref} className="relative">
      {/* Decorative number background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/5 text-7xl font-bold select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-150">
        {value}
      </div>

      <motion.div
        className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 relative z-10"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {count}
        {value === 4.7 && <span className="text-yellow-300">/5</span>}
        {value === 7 && <span className="text-white/90">+</span>}
        {value >= 250 && <span className="text-white/90">+</span>}
      </motion.div>

      <motion.div
        className="text-white/80 font-light"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {label}
      </motion.div>
    </div>
  );
};

export default About;
