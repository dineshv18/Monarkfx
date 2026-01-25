"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const AboutPage = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const philosophyRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isPhilosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" });

  // Subtle grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-12 lg:py-24 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Building Disciplined
              <br />
              <span className="text-red-600">Market Professionals</span>
            </h1>

            <p className="text-[#525252] text-sm tracking-[0.2em] uppercase">
              ISO 21008:2018 Certified Financial Education Institute
            </p>
          </motion.div>
        </div>
      </section>

      {/* Institutional Values Strip */}
      <section className="py-12 border-y border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            <span className="text-[#525252] text-xs tracking-[0.2em] uppercase">Education</span>
            <span className="hidden sm:block w-px h-3 bg-red-900/50" />
            <span className="text-[#525252] text-xs tracking-[0.2em] uppercase">Discipline</span>
            <span className="hidden sm:block w-px h-3 bg-red-900/50" />
            <span className="text-[#525252] text-xs tracking-[0.2em] uppercase">Data</span>
            <span className="hidden sm:block w-px h-3 bg-red-900/50" />
            <span className="text-[#525252] text-xs tracking-[0.2em] uppercase">Structure</span>
          </div>
        </div>
      </section>

      {/* Editorial Story Block */}
      <section ref={storyRef} className="py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p
              className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Monark FX was established in <span className="text-red-600">2021</span> with a singular vision.
            </p>

            <p className="text-[#a3a3a3] leading-relaxed text-lg">
              To transform how financial market education is delivered.
              <br />
              Not through promises. Through process.
            </p>

            <p className="text-[#737373] leading-relaxed">
              We specialize in structured education across
              <br />
              Stocks, Forex & Cryptocurrency markets.
            </p>

            <p className="text-[#737373] leading-relaxed">
              Built on discipline, data analysis,
              <br />
              and real market structure understanding.
            </p>

            <p className="text-[#525252] leading-relaxed">
              Every curriculum is designed to develop complete traders,
              <br />
              not just technical analysts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Metrics - Inline */}
      <section className="py-16 border-y border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isStoryInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-10 lg:gap-16"
          >
            <div className="text-center">
              <span
                className="text-3xl lg:text-4xl font-bold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                250+
              </span>
              <span className="text-[#525252] text-xs tracking-[0.15em] uppercase block mt-1">
                Students
              </span>
            </div>

            <span className="hidden sm:block w-px h-10 bg-zinc-800" />

            <div className="text-center">
              <span
                className="text-3xl lg:text-4xl font-bold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                7+
              </span>
              <span className="text-[#525252] text-xs tracking-[0.15em] uppercase block mt-1">
                Mentors
              </span>
            </div>

            <span className="hidden sm:block w-px h-10 bg-zinc-800" />

            <div className="text-center">
              <span
                className="text-3xl lg:text-4xl font-bold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                2021
              </span>
              <span className="text-[#525252] text-xs tracking-[0.15em] uppercase block mt-1">
                Established
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mentor Philosophy Section */}
      <section ref={philosophyRef} className="py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#525252] text-xs tracking-[0.3em] uppercase block mb-6">
              Our Philosophy
            </span>

            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Mentorship Framework
            </h2>

            <div className="space-y-8">
              <p className="text-[#a3a3a3] leading-relaxed">
                Our mentors focus on five core principles:
                <br />
                <span className="text-red-600">Psychology</span>, Risk, Planning, Performance, and Discipline.
              </p>

              <p className="text-[#737373] leading-relaxed">
                Each principle is taught through structured modules.
                <br />
                Theory is always followed by practice.
              </p>

              <p className="text-[#737373] leading-relaxed">
                We do not promise results.
                <br />
                We build the foundation for them.
              </p>

              <p className="text-[#525252] leading-relaxed">
                Consistency is not taught. It is developed.
                <br />
                Through repetition, review, and refinement.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Statement */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isPhilosophyInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#525252] text-sm tracking-wide"
          >
            Monark FX™ — A legacy in trading education.
          </motion.p>
        </div>
      </section>

      {/* Bottom padding for mobile nav */}
      <div className="h-24 md:hidden" />
    </div>
  );
};

export default AboutPage;
