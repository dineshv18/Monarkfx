"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const WA_URL = `https://wa.me/918750475852?text=${encodeURIComponent("Hi MonarkFX Team,\n\nI want to start my trading journey. Please share details about your programs.\n\nThank you!")}`;

/* ── Student avatar stack ── */
const AVATARS = [
    { src: "/reviews/vineet.jpeg", initials: "V" },
    { src: "/reviews/rahul.jpeg", initials: "R" },
    { src: "/reviews/sidharth.jpeg", initials: "S" },
    { src: "/reviews/abhishek.jpeg", initials: "A" },
    { src: "/reviews/ishaan-makkar.jpeg", initials: "I" },
];

function AvatarStack() {
    return (
        <div className="flex -space-x-3">
            {AVATARS.map((a, i) => (
                <div key={i} className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shrink-0"
                    style={{ zIndex: AVATARS.length - i, boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                    <Image src={a.src} alt={a.initials} fill className="object-cover object-top" sizes="44px" />
                </div>
            ))}
            <div className="relative w-11 h-11 rounded-full border-2 border-white flex items-center justify-center shrink-0 text-[10px] font-bold text-white"
                style={{ zIndex: 0, background: "#D72638", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                1,000+
            </div>
        </div>
    );
}

/* ── Marquee ── */
const STATS = [
    { label: "STUDENTS TRAINED", value: "1,000+", emoji: "🎓" },
    { label: "EXPERT MENTORS", value: "7+", emoji: "👨‍💼" },
    { label: "LIVE SESSIONS YEARLY", value: "1,000+", emoji: "📈" },
    { label: "GOOGLE RATING", value: "4.7★", emoji: "⭐" },
    { label: "ISO CERTIFIED ACADEMY", value: "21008:2018", emoji: "🏆" },
    { label: "YEARS OF EXCELLENCE", value: "6+", emoji: "🚀" },
];

function StatsMarquee() {
    return (
        <div className="overflow-hidden border-y border-white/10 bg-black/30 backdrop-blur-sm py-2.5">
            <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
                {[...STATS, ...STATS].map((s, i) => (
                    <div key={i} className="flex items-center gap-2.5 shrink-0">
                        <span className="font-black text-[#D72638] text-[13px] tracking-wide"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            {s.value}
                        </span>
                        <span className="font-medium text-white/60 text-[11px] uppercase tracking-[0.15em]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            {s.label}
                        </span>
                        <span className="text-sm">{s.emoji}</span>
                        <span className="text-white/20 mx-2">·</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

/* ── Main Hero ── */
export default function HeroIntro() {
    return (
        <section className="relative flex flex-col w-full overflow-hidden"
            style={{ minHeight: "100svh" }}>

            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/bg.png"
                    alt="MonarkFX Trading"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.82) 100%)" }} />
                {/* Extra dark on left for text readability */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
                {/* Red tint bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(215,38,56,0.12), transparent)" }} />
            </div>

            {/* Content — pushed to bottom */}
            <div className="relative z-10 flex flex-col justify-end flex-1">

                {/* Avatar + marquee block */}
                <div className="w-full max-w-5xl px-5 sm:px-8 lg:px-16 pb-4">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-3">
                            <AvatarStack />
                            <div>
                                <p className="text-white text-[13px] font-bold leading-tight"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    1,000+ Traders Trust MonarkFX
                                </p>
                                <p className="text-white/50 text-[11px]"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    Join India's elite trading community
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <StatsMarquee />

                {/* Main content */}
                <div className="w-full px-5 sm:px-8 lg:px-16 pb-14 sm:pb-20 pt-8">
                    <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:flex-row sm:items-end">

                        {/* Left — heading + CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full sm:w-1/2 space-y-5"
                        >
                            <h1 className="text-white font-black leading-[1.04] tracking-[-0.03em]"
                                style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(36px, 6vw, 72px)", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
                                We{" "}
                                <span style={{ color: "#FF4D60" }}>teach</span>
                                , you{" "}
                                <span style={{ color: "#FF4D60" }}>trade</span>
                                <br />
                                <span className="text-white">— that&apos;s the deal.</span>
                            </h1>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
                                    <motion.button
                                        whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(37,211,102,0.45)" }}
                                        whileTap={{ scale: 0.97 }}
                                        className="inline-flex items-center gap-2.5 text-white font-bold text-[15px] px-7 py-3.5 rounded-xl border-none cursor-pointer transition-colors duration-200"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#25D366", boxShadow: "0 6px 20px rgba(37,211,102,0.3)" }}>
                                        <FaWhatsapp size={18} />
                                        Start Learning
                                        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                                    </motion.button>
                                </a>
                                <Link href="/courses" className="no-underline">
                                    <motion.button
                                        whileHover={{ y: -2, background: "rgba(255,255,255,0.18)" }}
                                        whileTap={{ scale: 0.97 }}
                                        className="inline-flex items-center gap-2 text-white font-bold text-[15px] px-7 py-3.5 rounded-xl cursor-pointer transition-colors duration-200 border-none"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                                        View Courses
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right — tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full sm:w-1/2"
                        >
                            <p className="font-semibold italic sm:text-right leading-[1.7]"
                                style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(14px, 1.4vw, 20px)", color: "rgba(255,255,255,0.75)", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
                                From zero knowledge to institutional-grade execution — MonarkFX builds real traders with discipline, strategy, and live mentorship.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}


