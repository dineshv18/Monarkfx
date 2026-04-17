"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Shield, Target, Users, TrendingUp, Award,
  BookOpen, Brain, Repeat2, LineChart, Calendar, ShieldAlert, MapPin,
} from "lucide-react";

const pillars = [
  { icon: Brain, title: "Psychology", desc: "Mindset & emotional control — trade without fear or greed." },
  { icon: ShieldAlert, title: "Risk", desc: "Capital & position management — protect your account first." },
  { icon: Calendar, title: "Planning", desc: "Strategy & analysis — every trade has a thesis." },
  { icon: LineChart, title: "Performance", desc: "Tracking & improvement — review, refine, repeat." },
  { icon: Repeat2, title: "Discipline", desc: "Consistency & routine — the edge is in the process." },
];

const values = [
  { icon: Shield, title: "ISO Certified", desc: "21008:2018 quality standard" },
  { icon: Target, title: "Institutional Methods", desc: "Pro-grade curriculum" },
  { icon: BookOpen, title: "Structured Learning", desc: "Module-by-module roadmap" },
  { icon: Award, title: "Certified Graduates", desc: "Recognised credentials" },
  { icon: TrendingUp, title: "Live Market Training", desc: "Real-time sessions daily" },
  { icon: Users, title: "Expert Mentors", desc: "7+ industry veterans" },
];

/* ─── pillar row ── */
const PillarRow = ({ p, i, isInView }: { p: typeof pillars[0]; i: number; isInView: boolean }) => {
  const [hov, setHov] = React.useState(false);
  const Icon = p.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
    >
      <motion.div
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-4 px-5 py-4 rounded-2xl cursor-default"
        style={{
          border: hov ? "1.5px solid rgba(215,38,56,0.28)" : "1.5px solid #EBEBEB",
          background: hov ? "#fff" : "rgba(255,255,255,0.6)",
          boxShadow: hov ? "0 8px 28px rgba(0,0,0,0.055)" : "0 2px 8px rgba(0,0,0,0.015)",
          transition: "border-color 0.22s, background 0.22s, box-shadow 0.22s",
        }}
      >
        <span className="font-black text-[#D72638] text-[13px] tracking-[0.05em] min-w-[26px]"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>0{i + 1}</span>
        <div className="w-px h-9 shrink-0" style={{ background: hov ? "rgba(215,38,56,0.2)" : "#E8E8E8", transition: "background 0.22s" }} />
        <div className="w-10 h-10 rounded-[11px] shrink-0 flex items-center justify-center"
          style={{
            background: hov ? "rgba(215,38,56,0.1)" : "rgba(215,38,56,0.06)",
            border: hov ? "1px solid rgba(215,38,56,0.22)" : "1px solid rgba(215,38,56,0.1)",
            transition: "all 0.22s",
          }}>
          <Icon className="w-[17px] h-[17px] text-[#D72638]" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-zinc-900 text-[15px] leading-tight tracking-[-0.02em] mb-0.5"
            style={{ fontFamily: "var(--font-playfair), serif" }}>{p.title}</h4>
          <p className="text-zinc-500 text-[13px] leading-snug font-light"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{p.desc}</p>
        </div>
        <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-all duration-200"
          style={{ color: hov ? "#D72638" : "transparent" }} />
      </motion.div>
    </motion.div>
  );
};

/* ─── value card ── */
const ValueCard = ({ v, i, isInView }: { v: typeof values[0]; i: number; isInView: boolean }) => {
  const [hov, setHov] = React.useState(false);
  const Icon = v.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.24 }}
        className="bg-white rounded-2xl p-5 sm:p-6 flex items-start gap-4 cursor-default"
        style={{
          border: hov ? "1.5px solid rgba(215,38,56,0.28)" : "1.5px solid #EBEBEB",
          boxShadow: hov ? "0 14px 40px rgba(0,0,0,0.06)" : "0 2px 14px rgba(0,0,0,0.025)",
          transition: "border-color 0.22s, box-shadow 0.22s",
        }}
      >
        <div className="w-11 h-11 rounded-[12px] shrink-0 flex items-center justify-center"
          style={{
            background: hov ? "rgba(215,38,56,0.1)" : "rgba(215,38,56,0.06)",
            border: hov ? "1px solid rgba(215,38,56,0.22)" : "1px solid rgba(215,38,56,0.1)",
            transition: "all 0.22s",
          }}>
          <Icon className="w-[18px] h-[18px] text-[#D72638]" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-bold text-zinc-900 text-[15px] sm:text-[16px] leading-snug mb-1"
            style={{ fontFamily: "var(--font-playfair), serif" }}>{v.title}</h3>
          <p className="text-zinc-500 text-[12px] sm:text-[13px] leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{v.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══ MAIN PAGE ════════════════════════════════════════════ */
const AboutPage = () => {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const philosophyRef = useRef(null);
  const isStoryInView = useInView(storyRef, { once: true, margin: "-60px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-60px" });
  const isPhilosophyInView = useInView(philosophyRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-white">

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="relative bg-[#0A0A0A] overflow-hidden pt-28 sm:pt-36 pb-20 sm:pb-28 text-center">
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(215,38,56,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(215,38,56,0.055) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
          }} />
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(215,38,56,0.11) 0%, transparent 68%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D72638]/30 to-transparent" />

        <div className="relative z-10 max-w-[820px] mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
              style={{ background: "rgba(215,38,56,0.12)", border: "1px solid rgba(215,38,56,0.28)" }}>
              <span className="text-[#D72638] text-[11px] font-extrabold uppercase tracking-[0.18em]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Our Story</span>
            </div>

            <h1 className="font-black text-white leading-[1.0] tracking-[-0.03em] mb-5"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(40px, 7vw, 80px)" }}>
              Building Disciplined{" "}
              <br className="hidden sm:block" />
              <span style={{
                backgroundImage: "linear-gradient(120deg, #D72638, #FF7A7A)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Market Professionals
              </span>
            </h1>

            <p className="text-white/50 leading-[1.8] font-light mb-8 max-w-[500px] mx-auto"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(15px, 1.2vw, 19px)" }}>
              ISO 21008:2018 Certified Financial Education Institute — established in 2021.
            </p>

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2">
              <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors text-[13px] no-underline"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Home</Link>
              <span className="text-zinc-600 text-[12px]">›</span>
              <span className="text-[#D72638] text-[13px]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>About</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ VALUES TICKER STRIP ════════════════════════════ */}
      <div className="bg-white border-b border-zinc-100 py-4 sm:py-5">
        <div className="max-w-[880px] mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            {["Education", "Discipline", "Data", "Structure", "Precision"].map((v, i, arr) => (
              <React.Fragment key={v}>
                <span className="text-zinc-400 text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{v}</span>
                {i < arr.length - 1 && (
                  <span className="hidden sm:block w-px h-3 bg-[#D72638]/30" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ══ STORY ══════════════════════════════════════════ */}
      <section ref={storyRef} className="bg-white py-14 sm:py-16 px-5 sm:px-8">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                <span className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Our Origin</span>
              </div>

              <h2 className="font-black text-zinc-950 leading-[1.04] tracking-[-0.035em] mb-6"
                style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(30px, 3.5vw, 50px)" }}>
                MonarkFX was founded in{" "}
                <span style={{
                  backgroundImage: "linear-gradient(120deg, #D72638, #A01020)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>2021</span>
              </h2>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  "To transform how financial market education is delivered. Not through promises — through process.",
                  "We specialize in structured education across Stocks, Forex & Cryptocurrency markets.",
                  "Built on discipline, data analysis, and real market structure understanding.",
                  "Every curriculum is designed to develop complete traders, not just technical analysts.",
                ].map((text, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -14 }}
                    animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                    className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D72638] shrink-0 mt-[9px]" />
                    <p className="text-zinc-600 leading-[1.8] font-light"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(14px, 1vw, 16px)" }}>
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Link href="/courses" className="no-underline inline-block w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 14px 40px rgba(215,38,56,0.32)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                             bg-[#D72638] hover:bg-[#C0202F] text-white
                             text-[14px] sm:text-[15px] font-bold
                             px-7 py-3.5 rounded-2xl border-none cursor-pointer
                             shadow-[0_4px_18px_rgba(215,38,56,0.28)]
                             transition-colors duration-200"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Explore Our Courses
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { value: "250+", label: "Students Trained", dark: true },
                  { value: "7+", label: "Expert Mentors", dark: false },
                  { value: "4.7★", label: "Google Rating", dark: false },
                ].map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.09 }}
                    className="rounded-2xl p-4 sm:p-5 text-center"
                    style={{
                      background: s.dark ? "#0A0A0A" : "#F8F8F8",
                      border: s.dark ? "1.5px solid #1C1C1C" : "1.5px solid #EFEFEF",
                    }}>
                    <p className="text-[#D72638] font-black leading-none mb-2"
                      style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(22px, 2.5vw, 30px)" }}>
                      {s.value}
                    </p>
                    <p className="uppercase tracking-[0.08em] text-[10px]"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: s.dark ? "#555" : "#AAA" }}>
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* ISO card */}
              <div className="bg-white rounded-2xl p-5 sm:p-6"
                style={{ border: "1.5px solid #EBEBEB", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-[12px] shrink-0 flex items-center justify-center"
                    style={{ background: "rgba(215,38,56,0.07)", border: "1px solid rgba(215,38,56,0.14)" }}>
                    <Shield className="w-5 h-5 text-[#D72638]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-zinc-900 text-[14px] sm:text-[15px] font-bold leading-tight"
                      style={{ fontFamily: "var(--font-playfair), serif" }}>
                      ISO 21008:2018 Certified
                    </p>
                    <p className="text-zinc-400 text-[12px]"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      Quality Assured Education
                    </p>
                  </div>
                  <span className="text-emerald-500 text-[9px] font-extrabold uppercase tracking-[0.1em]
                                   bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1 shrink-0"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    Verified
                  </span>
                </div>
                <p className="text-zinc-500 text-[13px] sm:text-[14px] leading-[1.7]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  The only ISO-certified trading academy in the region — our quality management system ensures every student gets world-class education.
                </p>
              </div>

              {/* Established + location */}
              <div className="rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4"
                style={{ background: "linear-gradient(140deg, #0A0A0A 0%, #181818 100%)", border: "1.5px solid #1C1C1C" }}>
                <div>
                  <p className="text-zinc-600 text-[10px] uppercase tracking-[0.12em] mb-1"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Established</p>
                  <p className="text-[#D72638] font-black leading-none"
                    style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 3vw, 38px)" }}>2021</p>
                </div>
                <div className="w-px h-10 bg-white/10 shrink-0" />
                <div className="text-right">
                  <p className="text-zinc-600 text-[10px] uppercase tracking-[0.12em] mb-1"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Location</p>
                  <div className="flex items-center justify-end gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D72638] shrink-0" />
                    <p className="text-white text-[13px] sm:text-[14px] font-semibold"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      Uttam Nagar, Delhi
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ VALUES GRID ══════════════════════════════════════ */}
      <section ref={valuesRef} className="relative bg-[#F7F7F7] overflow-hidden py-14 sm:py-16 px-5 sm:px-8">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(215,38,56,0.045) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-[1120px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
              <span className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>What We Stand For</span>
              <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
            </div>
            <h2 className="font-black text-zinc-950 leading-[1.02] tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(30px, 4vw, 52px)" }}>
              Our Core{" "}
              <span className="text-[#D72638]">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {values.map((v, i) => (
              <ValueCard key={i} v={v} i={i} isInView={isValuesInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ PHILOSOPHY ══════════════════════════════════════ */}
      <section ref={philosophyRef} className="bg-[#FAFAFA] py-14 sm:py-16 px-5 sm:px-8">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                <span className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Our Philosophy</span>
              </div>

              <h2 className="font-black text-zinc-950 leading-[1.04] tracking-[-0.035em] mb-5"
                style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                The{" "}
                <span className="text-[#D72638]">5-Pillar</span>{" "}
                Mentorship Framework
              </h2>

              <div className="flex flex-col gap-4 mb-9">
                {[
                  "Our mentors focus on five core principles to build complete market professionals.",
                  "Each principle is taught through structured modules — theory always followed by practice.",
                  "We do not promise results. We build the foundation for them.",
                  "Consistency is not taught. It is developed through repetition, review, and refinement.",
                ].map((text, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={isPhilosophyInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D72638] shrink-0 mt-[9px]" />
                    <p className="text-zinc-600 leading-[1.8] font-light"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(14px, 1vw, 16px)" }}>
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Link href="/contact" className="no-underline inline-block w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 14px 40px rgba(215,38,56,0.32)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                             bg-[#D72638] hover:bg-[#C0202F] text-white
                             text-[14px] sm:text-[15px] font-bold
                             px-7 py-3.5 rounded-2xl border-none cursor-pointer
                             shadow-[0_4px_18px_rgba(215,38,56,0.28)]
                             transition-colors duration-200"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Book a Mentorship Call
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Right — pillars */}
            <div className="flex flex-col gap-2.5">
              {pillars.map((p, i) => (
                <PillarRow key={i} p={p} i={i} isInView={isPhilosophyInView} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 sm:py-32 px-5 sm:px-8 text-center"
        style={{ background: "linear-gradient(140deg, #C81F33 0%, #8B0F1E 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "54px 54px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-1/2 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 68%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Orbs */}
        <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[6%] w-16 h-16 rounded-full pointer-events-none hidden lg:block"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
        <motion.div animate={{ y: [8, -8, 8] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-14 right-[6%] w-12 h-12 rounded-full pointer-events-none hidden lg:block"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />

        <div className="relative max-w-[700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}>
            <p className="font-black text-white leading-[1.04] tracking-[-0.025em] mb-2"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 50px)" }}>
              Education decides outcomes.
            </p>
            <p className="font-black italic leading-[1.04] tracking-[-0.025em] mb-6"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px, 3.5vw, 42px)", color: "rgba(255,255,255,0.3)" }}>
              Discipline decides success.
            </p>
            <p className="text-white/45 text-[14px] sm:text-[15px] mb-10"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Monark FX™ — A legacy in trading education.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/courses" className="no-underline w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 16px 44px rgba(0,0,0,0.28)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                             bg-white hover:bg-zinc-100 text-[#D72638]
                             text-[14px] sm:text-[15px] font-extrabold
                             px-7 py-4 rounded-2xl border-none cursor-pointer
                             shadow-[0_8px_28px_rgba(0,0,0,0.18)]
                             transition-colors duration-200"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  View All Courses
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </motion.button>
              </Link>
              <Link href="/contact" className="no-underline w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.14)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                             text-white text-[14px] sm:text-[15px] font-bold
                             px-7 py-4 rounded-2xl cursor-pointer
                             transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    background: "rgba(255,255,255,0.1)",
                    border: "1.5px solid rgba(255,255,255,0.24)",
                    backdropFilter: "blur(8px)",
                  }}>
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;