"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Shield, Target, Users, TrendingUp, Award,
  BookOpen, Brain, Repeat2, LineChart, Calendar, ShieldAlert, MapPin,
} from "lucide-react";
import PageHero from "../../_components/PageHero";
import CTASection from "../../_components/homepage/CTASection";
import BundleOffer from "../../_components/homepage/BundleOffer";

const pillars = [
  { icon: Brain, title: "Psychology", desc: "Mindset & emotional control — trade without fear or greed." },
  { icon: ShieldAlert, title: "Risk", desc: "Capital & position management — protect your account first." },
  { icon: Calendar, title: "Planning", desc: "Strategy & analysis — every trade has a thesis." },
  { icon: LineChart, title: "Performance", desc: "Tracking & improvement — review, refine, repeat." },
  { icon: Repeat2, title: "Discipline", desc: "Consistency & routine — the edge is in the process." },
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

      <PageHero
        badge="Our Story"
        title="Building Disciplined"
        titleAccent="Market Professionals."
        description="ISO 21008:2018 Certified Financial Education Institute — established in 2021. Transforming aspiring traders into institutional-grade professionals."
        primaryBtn={{ text: "Talk to Us on WhatsApp", href: "https://wa.me/918750475852?text=Hi%20MonarkFX,%20I%20want%20to%20know%20more%20about%20your%20academy", wa: true }}
        secondaryBtn={{ text: "View Courses", href: "/courses" }}
      />

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

      {/* ══ STORY — 3-col prompt layout ═══════════════════════ */}
      <section ref={storyRef} className="bg-[#FAFAFA] py-16 sm:py-20 px-5 sm:px-8 overflow-hidden relative">
        {/* Floating dots */}
        <motion.div className="absolute top-1/2 left-[8%] w-3 h-3 rounded-full bg-[#D72638]/25 pointer-events-none hidden lg:block"
          animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.div className="absolute bottom-1/3 right-[8%] w-4 h-4 rounded-full bg-[#D72638]/15 pointer-events-none hidden lg:block"
          animate={{ y: [0, 18, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />

        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="flex flex-col items-center mb-12 text-center gap-3">
            <span className="text-[#D72638] font-extrabold text-[11px] uppercase tracking-[0.22em] flex items-center gap-2"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              <TrendingUp className="w-3.5 h-3.5" /> Our Origin
            </span>
            <h2 className="font-black text-zinc-950 leading-[1.04] tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 52px)" }}>
              About <span className="text-[#D72638]">MonarkFX</span>
            </h2>
            <motion.div className="w-20 h-[2px] bg-[#D72638] rounded-full"
              initial={{ width: 0 }} animate={isStoryInView ? { width: 80 } : {}} transition={{ duration: 0.8, delay: 0.4 }} />
            <p className="text-zinc-500 max-w-xl text-[15px] leading-[1.75] font-light"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Founded in 2021 to transform financial market education — not through promises, but through disciplined process and institutional methodology.
            </p>
          </motion.div>

          {/* 3-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

            {/* Left services */}
            <div className="space-y-10">
              {[
                { icon: Shield,    title: "ISO Certified",         desc: "ISO 21008:2018 — only accredited trading institute in the region. Quality-assured education, verified." },
                { icon: BookOpen,  title: "Structured Learning",   desc: "Module-by-module roadmap. Theory always followed by live market practice with mentors." },
                { icon: Award,     title: "Certified Graduates",   desc: "Walk away with an ISO-verified certificate recognised by firms and prop trading desks." },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={i} className="flex flex-col group cursor-default"
                    initial={{ opacity: 0, x: -18 }} animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.55 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-[#D72638] bg-[#D72638]/10 p-2.5 rounded-xl relative transition-colors duration-300 group-hover:bg-[#D72638]/18">
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </div>
                      <h3 className="font-bold text-zinc-900 text-[15px] group-hover:text-[#D72638] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-playfair), serif" }}>{s.title}</h3>
                    </div>
                    <p className="text-zinc-500 text-[13px] leading-[1.65] pl-[52px]"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Center image */}
            <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
              <motion.div className="relative w-full max-w-[280px]"
                initial={{ opacity: 0, scale: 0.9 }} animate={isStoryInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}>
                <motion.div className="rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}>
                  <img src="/team-monarkfx.jpeg" alt="MonarkFX Academy"
                    className="w-full h-[420px] object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent flex items-end justify-center p-5">
                    <Link href="/courses" className="no-underline">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="bg-white text-[#D72638] px-4 py-2 rounded-full flex items-center gap-1.5 text-[13px] font-bold cursor-pointer">
                        View Courses <ArrowRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
                {/* Border frame */}
                <motion.div className="absolute inset-0 border-[3px] border-[#D72638]/25 rounded-2xl -m-2 z-[-1]"
                  initial={{ opacity: 0, scale: 1.1 }} animate={isStoryInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.55 }} />
                {/* Floating badge */}
                <motion.div className="absolute -top-4 -right-4 bg-[#D72638] text-white px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-[0.1em] shadow-lg"
                  initial={{ opacity: 0, y: 10 }} animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Est. 2021
                </motion.div>
                <motion.div className="absolute -bottom-3 -left-4 bg-[#0A0A0A] text-white px-3 py-1.5 rounded-xl text-[10px] font-extrabold tracking-[0.08em] shadow-lg"
                  initial={{ opacity: 0, y: -10 }} animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  ISO Certified ✓
                </motion.div>
              </motion.div>
            </div>

            {/* Right services */}
            <div className="space-y-10">
              {[
                { icon: Target,     title: "Institutional Methods", desc: "Same price action & ICT order flow concepts used by prop firms and professional traders worldwide." },
                { icon: TrendingUp, title: "Live Market Training",  desc: "3 sessions/week with mentors — trade live, learn live, grow faster with real market exposure." },
                { icon: Users,      title: "Expert Mentors",        desc: "7+ industry veterans who actively trade the markets they teach. No theory-only instructors." },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={i} className="flex flex-col group cursor-default"
                    initial={{ opacity: 0, x: 18 }} animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.55 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-[#D72638] bg-[#D72638]/10 p-2.5 rounded-xl relative transition-colors duration-300 group-hover:bg-[#D72638]/18">
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </div>
                      <h3 className="font-bold text-zinc-900 text-[15px] group-hover:text-[#D72638] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-playfair), serif" }}>{s.title}</h3>
                    </div>
                    <p className="text-zinc-500 text-[13px] leading-[1.65] pl-[52px]"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Stats row — prompt style */}
          <motion.div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 24 }} animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}>
            {[
              { icon: Award,      value: "1,000+",       label: "Students Trained" },
              { icon: Users,      value: "7+",         label: "Expert Mentors" },
              { icon: Calendar,   value: "2021",       label: "Established" },
              { icon: TrendingUp, value: "4.9★",       label: "Google Rating" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl flex flex-col items-center text-center group hover:bg-white transition-colors duration-300"
                  style={{ border: "1.5px solid #EBEBEB", boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-3 transition-colors duration-300"
                    style={{ background: "rgba(215,38,56,0.06)", border: "1px solid rgba(215,38,56,0.12)" }}>
                    <Icon className="w-4.5 h-4.5 text-[#D72638]" strokeWidth={1.8} />
                  </div>
                  <p className="font-black text-zinc-900 leading-none mb-1"
                    style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(22px, 2.5vw, 28px)" }}>
                    {s.value}
                  </p>
                  <p className="text-zinc-400 text-[10px] uppercase tracking-[0.1em] font-bold"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{s.label}</p>
                  <div className="w-8 h-[2px] bg-[#D72638] mt-2.5 rounded-full group-hover:w-12 transition-all duration-300" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ VALUES GRID ══════════════════════════════════════ */}
      <section ref={valuesRef} className="relative bg-white overflow-hidden py-16 sm:py-20 px-5 sm:px-8">

        <div className="relative max-w-[900px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4">
            <span className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              What We Stand For
            </span>
            <h2 className="font-black text-zinc-950 leading-[1.02] tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(30px, 4vw, 52px)" }}>
              The Foundation of{" "}
              <span className="text-[#D72638]">MonarkFX</span>
            </h2>
            <p className="text-zinc-500 text-[15px] leading-[1.75] font-light max-w-lg mx-auto"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Six core principles that define how we build traders — not just teach them.
            </p>
          </motion.div>

          {/* Prompt-style border grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative grid sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y border border-zinc-200">
            {[
              { icon: Shield,      title: "ISO Certified",          desc: "ISO 21008:2018 certified — only accredited trading institute in the region." },
              { icon: Target,      title: "Institutional Methods",  desc: "Same price action & order flow concepts used by prop firms worldwide." },
              { icon: BookOpen,    title: "Structured Learning",    desc: "Module-by-module roadmap — theory always followed by live practice." },
              { icon: Award,       title: "Certified Graduates",    desc: "ISO-verified certificate recognised by firms & trading desks." },
              { icon: TrendingUp,  title: "Live Market Training",   desc: "Real-time sessions daily — trade live, learn live, grow faster." },
              { icon: Users,       title: "7+ Expert Mentors",      desc: "Industry veterans who actively trade the markets they teach." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={isValuesInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="group relative p-8 sm:p-10 space-y-3 hover:bg-zinc-50 transition-colors duration-200 cursor-default">
                  {/* Left divider accent on hover */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: "#D72638" }} />
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#D72638] shrink-0" strokeWidth={2} />
                    <h3 className="font-bold text-zinc-900 text-[14px] sm:text-[15px]"
                      style={{ fontFamily: "var(--font-playfair), serif" }}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-zinc-500 text-[13px] leading-[1.65]"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


      <BundleOffer />
      <CTASection />

    </div>
  );
};

export default AboutPage;


