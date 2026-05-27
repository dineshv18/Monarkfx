"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MdSecurity, MdTrendingUp, MdVideoCall, MdSchool, MdWork, MdSpeed } from "react-icons/md";
import { GiShield } from "react-icons/gi";

/* ── Animated sub-components ── */

function PulsingShield() {
    const [active, setActive] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setActive(p => (p + 1) % 3), 900);
        return () => clearInterval(id);
    }, []);
    return (
        <div className="flex items-center justify-center gap-3 h-full">
            {[0, 1, 2].map(i => (
                <motion.div key={i}
                    animate={{ scale: active === i ? 1.15 : 1, opacity: active === i ? 1 : 0.35 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: active === i ? "rgba(215,38,56,0.25)" : "rgba(255,255,255,0.05)", border: `1px solid ${active === i ? "rgba(215,38,56,0.5)" : "rgba(255,255,255,0.08)"}` }}>
                    <GiShield size={22} color={active === i ? "#D72638" : "#555"} />
                </motion.div>
            ))}
        </div>
    );
}

function CounterAnim({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = target / 60;
        const id = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(id); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(id);
    }, [inView, target]);
    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function LivePulse() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 h-full">
            <div className="relative flex items-center justify-center w-16 h-16">
                {[0, 1, 2].map(i => (
                    <motion.div key={i}
                        className="absolute rounded-full border-2"
                        style={{ borderColor: "rgba(215,38,56,0.5)", width: 16 + i * 20, height: 16 + i * 20 }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                    />
                ))}
                <MdVideoCall size={28} color="#D72638" className="z-10 relative" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                Live Daily
            </span>
        </div>
    );
}

function CertBadge() {
    const [show, setShow] = useState(false);
    useEffect(() => { const t = setTimeout(() => setShow(true), 600); return () => clearTimeout(t); }, []);
    return (
        <div className="flex flex-col items-center justify-center h-full gap-2">
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 16 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, rgba(215,38,56,0.25), rgba(215,38,56,0.08))", border: "2px solid rgba(215,38,56,0.4)", boxShadow: "0 0 24px rgba(215,38,56,0.2)" }}>
                        <span className="text-[#D72638] font-black text-[14px]"
                            style={{ fontFamily: "var(--font-playfair), serif" }}>ISO</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 text-center"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                21008:2018
            </span>
        </div>
    );
}

/* ── Main component ── */
const WhyChooseUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 28 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    });

    return (
        <section ref={ref} className="relative bg-[#0A0A0A] overflow-hidden py-16 md:py-24">
            {/* Grid texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
            {/* Red glow top */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(215,38,56,0.12) 0%, transparent 70%)" }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D72638]/35 to-transparent" />

            <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8">

                {/* Header */}
                <motion.div {...fadeUp(0)} className="text-center mb-14">
                    <div className="inline-flex items-center gap-3 mb-5">
                        <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                        <span className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            The Monark Edge
                        </span>
                        <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                    </div>
                    <h2 className="font-black text-white leading-[1.02] tracking-[-0.04em] mb-4"
                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(36px, 5vw, 60px)" }}>
                        Why Choose{" "}
                        <span className="text-[#D72638]">MonarkFX</span>
                    </h2>
                    <p className="text-zinc-500 max-w-[480px] mx-auto leading-[1.8] font-light"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(15px, 1.1vw, 18px)" }}>
                        Discover the methodology that separates institutional execution from retail speculation.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">

                    {/* 1. ISO Certified — Tall 2×2 */}
                    <motion.div {...fadeUp(0.05)}
                        className="md:col-span-2 md:row-span-2 group rounded-2xl border border-zinc-800 bg-zinc-900 p-7 flex flex-col hover:border-[#D72638]/40 transition-all duration-300 cursor-default overflow-hidden"
                        whileHover={{ scale: 1.02 }}>
                        <div className="flex-1 flex items-center justify-center">
                            <CertBadge />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center gap-2 mb-1.5">
                                <MdSecurity size={16} color="#D72638" />
                                <h3 className="text-white font-bold text-[17px]"
                                    style={{ fontFamily: "var(--font-playfair), serif" }}>
                                    ISO Certified
                                </h3>
                            </div>
                            <p className="text-zinc-500 text-[13px] leading-[1.6]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                Quality assured under ISO 21008:2018 — the only certified trading academy in the region.
                            </p>
                        </div>
                    </motion.div>

                    {/* 2. Live Sessions — 2×1 */}
                    <motion.div {...fadeUp(0.1)}
                        className="md:col-span-2 group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col hover:border-[#D72638]/40 transition-all duration-300 cursor-default overflow-hidden"
                        whileHover={{ scale: 0.98 }}>
                        <div className="flex-1">
                            <LivePulse />
                        </div>
                        <div className="mt-3">
                            <h3 className="text-white font-bold text-[16px] mb-1"
                                style={{ fontFamily: "var(--font-playfair), serif" }}>
                                Live Market Sessions
                            </h3>
                            <p className="text-zinc-500 text-[12px] leading-[1.55]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                Real-time analysis & Q&A with mentors every trading day.
                            </p>
                        </div>
                    </motion.div>

                    {/* 3. Students count — 2×2 Tall */}
                    <motion.div {...fadeUp(0.15)}
                        className="md:col-span-2 md:row-span-2 group rounded-2xl border border-zinc-800 p-7 flex flex-col hover:border-[#D72638]/40 transition-all duration-300 cursor-default overflow-hidden"
                        style={{ background: "linear-gradient(140deg, #0A0A0A 0%, #181818 100%)" }}
                        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>
                        <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
                            <p className="text-[#D72638] font-black leading-none"
                                style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(52px, 6vw, 72px)" }}>
                                <CounterAnim target={250} suffix="+" />
                            </p>
                            <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-[0.15em]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                Students Trained
                            </p>
                            <div className="flex gap-1 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D72638]"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
                                ))}
                            </div>
                        </div>
                        <div className="mt-auto">
                            <div className="flex items-center gap-2 mb-1">
                                <MdTrendingUp size={16} color="#D72638" />
                                <h3 className="text-white font-bold text-[16px]"
                                    style={{ fontFamily: "var(--font-playfair), serif" }}>
                                    Proven Results
                                </h3>
                            </div>
                            <p className="text-zinc-500 text-[12px] leading-[1.55]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                Across India — backed by verified Google reviews & student PnL.
                            </p>
                        </div>
                    </motion.div>

                    {/* 4. Flexible Learning — 2×1 */}
                    <motion.div {...fadeUp(0.2)}
                        className="md:col-span-2 group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col hover:border-[#D72638]/40 transition-all duration-300 cursor-default overflow-hidden"
                        whileHover={{ scale: 0.98 }}>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex items-center gap-3">
                                {["Online", "Offline", "Recorded"].map((label, i) => (
                                    <motion.div key={label}
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                                        className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl"
                                        style={{ background: "rgba(215,38,56,0.08)", border: "1px solid rgba(215,38,56,0.2)" }}>
                                        <MdSpeed size={18} color="#D72638" />
                                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.08em]"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                            {label}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-3">
                            <h3 className="text-white font-bold text-[16px] mb-1"
                                style={{ fontFamily: "var(--font-playfair), serif" }}>
                                Flexible Learning
                            </h3>
                            <p className="text-zinc-500 text-[12px] leading-[1.55]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                Online live classes, recorded sessions & offline workshops.
                            </p>
                        </div>
                    </motion.div>

                    {/* 5. Security — 3×1 */}
                    <motion.div {...fadeUp(0.25)}
                        className="md:col-span-3 group rounded-2xl border border-zinc-800 bg-zinc-900 p-7 flex flex-col hover:border-[#D72638]/40 transition-all duration-300 cursor-default overflow-hidden"
                        whileHover={{ scale: 0.98 }}>
                        <div className="flex-1">
                            <PulsingShield />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center gap-2 mb-1.5">
                                <MdSecurity size={15} color="#D72638" />
                                <h3 className="text-white font-bold text-[16px]"
                                    style={{ fontFamily: "var(--font-playfair), serif" }}>
                                    Institutional Framework
                                </h3>
                            </div>
                            <p className="text-zinc-500 text-[12px] leading-[1.55]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                Learn the same methodology used by prop desks and professional traders worldwide.
                            </p>
                        </div>
                    </motion.div>

                    {/* 6. Career — 3×1 */}
                    <motion.div {...fadeUp(0.3)}
                        className="md:col-span-3 group rounded-2xl border border-zinc-800 bg-zinc-900 p-7 flex flex-col hover:border-[#D72638]/40 transition-all duration-300 cursor-default overflow-hidden"
                        whileHover={{ scale: 0.98 }}>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                    style={{ background: "rgba(215,38,56,0.12)", border: "1.5px solid rgba(215,38,56,0.3)" }}>
                                    <MdWork size={28} color="#D72638" />
                                </div>
                                <div>
                                    <p className="text-[#D72638] font-black text-[22px] leading-none"
                                        style={{ fontFamily: "var(--font-playfair), serif" }}>
                                        4.7★
                                    </p>
                                    <p className="text-zinc-500 text-[11px] uppercase tracking-[0.1em] font-bold mt-1"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                        Google Rating
                                    </p>
                                </div>
                                <div className="w-px h-10 bg-zinc-700" />
                                <div>
                                    <p className="text-white font-black text-[22px] leading-none"
                                        style={{ fontFamily: "var(--font-playfair), serif" }}>
                                        7+
                                    </p>
                                    <p className="text-zinc-500 text-[11px] uppercase tracking-[0.1em] font-bold mt-1"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                        Expert Mentors
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center gap-2 mb-1.5">
                                <MdSchool size={15} color="#D72638" />
                                <h3 className="text-white font-bold text-[16px]"
                                    style={{ fontFamily: "var(--font-playfair), serif" }}>
                                    Career Opportunity
                                </h3>
                            </div>
                            <p className="text-zinc-500 text-[12px] leading-[1.55]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                Top graduates get a direct pathway to join the MonarkFX mentor & analyst team.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
