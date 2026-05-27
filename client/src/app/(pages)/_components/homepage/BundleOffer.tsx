"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Star, Clock, Flame, Zap, TrendingUp, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlinePsychology, MdSecurity, MdEventNote, MdTrendingUp, MdLoop, MdGroups } from "react-icons/md";
import { useId } from "react";
import Image from "next/image";

const WHATSAPP_URL = `https://wa.me/918750475852?text=${encodeURIComponent("Hi MonarkFX Team,\n\nI want to enroll in the *Mastery Combo* program (Indian + Forex + Crypto — All 3 Courses, 4 Months). Please share batch details and schedule.\n\nThank you!")}`;

/* ── Dot Pattern ── */
function DotPattern({ width = 20, height = 20, className = "" }: { width?: number; height?: number; className?: string }) {
    const id = useId();
    return (
        <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
            <defs>
                <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
                    <circle cx={1} cy={1} r={0.8} fill="currentColor" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
    );
}

/* ── Orbital Timeline ── */
interface OrbitalItem {
    id: number;
    title: string;
    desc: string;
    icon: React.ElementType;
    color: string;
}

const orbitalItems: OrbitalItem[] = [
    { id: 1, title: "Psychology",        desc: "Trade without fear or greed",            icon: MdOutlinePsychology, color: "#D72638" },
    { id: 2, title: "Risk Management",   desc: "Protect your capital first",             icon: MdSecurity,          color: "#0EA5E9" },
    { id: 3, title: "Strategic Planning",desc: "Every entry has a clear reason",         icon: MdEventNote,         color: "#F59E0B" },
    { id: 4, title: "Performance",       desc: "Review, refine, and repeat",             icon: MdTrendingUp,        color: "#10B981" },
    { id: 5, title: "Discipline",        desc: "The edge lives in the process",          icon: MdLoop,              color: "#8B5CF6" },
    { id: 6, title: "Live Mentorship",   desc: "3 sessions/week with mentors",           icon: MdGroups,            color: "#D72638" },
];

function OrbitalTimeline() {
    const [rotation, setRotation] = useState(0);
    const [activeId, setActiveId] = useState<number | null>(null);
    const rafRef = useRef<number>();

    useEffect(() => {
        if (activeId !== null) return;
        let last = performance.now();
        const tick = (now: number) => {
            const dt = now - last;
            last = now;
            setRotation(r => (r + dt * 0.025) % 360);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [activeId]);

    const RADIUS = 130;

    return (
        <div className="relative w-full flex items-center justify-center" style={{ height: 360 }}>
            {/* Center orb */}
            <div className="absolute z-10 flex items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
                    style={{ background: "#fff", boxShadow: "0 0 40px rgba(215,38,56,0.35), 0 0 0 3px rgba(215,38,56,0.2)" }}
                >
                    <Image src="/logo.png" alt="MonarkFX" width={56} height={56} className="object-contain w-full h-full" />
                </motion.div>
                {/* Orbit ring */}
                <div className="absolute w-[280px] h-[280px] rounded-full border border-[#D72638]/15 pointer-events-none" />
                <div className="absolute w-[220px] h-[220px] rounded-full border border-dashed border-[#D72638]/10 pointer-events-none" />
            </div>

            {/* Nodes */}
            {orbitalItems.map((item, idx) => {
                const angle = ((idx / orbitalItems.length) * 360 + rotation) * (Math.PI / 180);
                const x = RADIUS * Math.cos(angle);
                const y = RADIUS * Math.sin(angle);
                const isActive = activeId === item.id;
                const Icon = item.icon;
                const opacity = Math.max(0.45, 0.45 + 0.55 * ((1 + Math.sin(angle)) / 2));

                return (
                    <div
                        key={item.id}
                        className="absolute flex flex-col items-center cursor-pointer"
                        style={{ transform: `translate(${x}px, ${y}px)`, zIndex: isActive ? 30 : 10, opacity: isActive ? 1 : opacity, transition: "opacity 0.3s" }}
                        onClick={() => setActiveId(isActive ? null : item.id)}
                    >
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            animate={{ scale: isActive ? 1.3 : 1 }}
                            className="w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-md"
                            style={{
                                background: isActive ? item.color : "#fff",
                                borderColor: item.color,
                                boxShadow: isActive ? `0 0 16px ${item.color}55` : "0 2px 8px rgba(0,0,0,0.08)",
                            }}
                        >
                            <Icon size={18} color={isActive ? "#fff" : item.color} />
                        </motion.div>
                        <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.06em] text-center whitespace-nowrap"
                            style={{ color: isActive ? item.color : "#888", fontFamily: "var(--font-dm-sans), sans-serif", maxWidth: 70 }}>
                            {item.title}
                        </span>

                        {/* Popup */}
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="absolute top-12 z-40 w-44 rounded-xl p-3 shadow-xl"
                                style={{ background: "#fff", border: `1.5px solid ${item.color}30`, boxShadow: `0 12px 32px rgba(0,0,0,0.12), 0 0 0 3px ${item.color}10` }}
                            >
                                <div className="w-px h-3 mx-auto mb-2" style={{ background: item.color }} />
                                <p className="text-[11px] font-bold text-zinc-800 mb-1 leading-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>{item.title}</p>
                                <p className="text-[10px] text-zinc-500 leading-[1.5]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{item.desc}</p>
                            </motion.div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

const included = [
    { icon: <TrendingUp className="w-4 h-4" />, title: "Live Forex Sessions",        desc: "Daily live market analysis with mentors",    tag: "Daily" },
    { icon: <Zap className="w-4 h-4" />,        title: "Crypto Strategy Masterclass", desc: "Full DeFi + altcoin cycle playbook",          tag: "Lifetime" },
    { icon: <CheckCircle2 className="w-4 h-4"/>, title: "Risk Management Framework",  desc: "Institutional SL/TP & position sizing",      tag: "Pro" },
    { icon: <Users className="w-4 h-4" />,       title: "Mentor-led Trade Reviews",   desc: "Weekly 1-on-1 feedback sessions",            tag: "1-on-1" },
];

const BundleOffer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} className="relative bg-white overflow-hidden py-16 sm:py-20"
            style={{ borderTop: "1px solid #F0F0F0" }}>

            {/* Red top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D72638] to-transparent opacity-50" />

            <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* ── LEFT — dot pattern + heading block ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -28 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Quote-style bordered box with dot pattern */}
                        <div className="relative border border-[#D72638]/25 rounded-2xl overflow-hidden mb-8">
                            <DotPattern className="text-[#D72638]/08" />

                            {/* Corner squares */}
                            <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-[#D72638]" />
                            <div className="absolute -right-1.5 -top-1.5 w-3 h-3 bg-[#D72638]" />
                            <div className="absolute -left-1.5 -bottom-1.5 w-3 h-3 bg-[#D72638]" />
                            <div className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-[#D72638]" />

                            <div className="relative z-10 p-8 sm:p-10">
                                <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full"
                                    style={{ background: "rgba(215,38,56,0.06)", border: "1px solid rgba(215,38,56,0.2)" }}>
                                    <Flame className="w-3.5 h-3.5 text-[#D72638]" />
                                    <span className="text-[10px] font-extrabold text-[#D72638] uppercase tracking-[0.18em]"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                        Limited Offer
                                    </span>
                                </div>

                                <p className="text-[12px] text-[#D72638] font-bold uppercase tracking-[0.2em] mb-3"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    The Ultimate
                                </p>

                                <div className="mb-5" style={{ fontSize: "clamp(32px, 5vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.04em" }}>
                                    <div className="flex flex-wrap items-baseline gap-x-3">
                                        <h2 className="font-black text-zinc-950" style={{ fontFamily: "var(--font-playfair), serif" }}>Mastery</h2>
                                        <h2 className="font-light text-zinc-400" style={{ fontFamily: "var(--font-playfair), serif" }}>Combo</h2>
                                    </div>
                                    <div className="flex flex-wrap items-baseline gap-x-3">
                                        <h2 className="font-black text-zinc-950" style={{ fontFamily: "var(--font-playfair), serif" }}>Program</h2>
                                    </div>
                                    <h2 className="font-light text-[#D72638]" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(18px, 2vw, 26px)" }}>
                                        Indian + Forex + Crypto — All 3 Markets.
                                    </h2>
                                </div>

                                <p className="text-zinc-500 text-[14px] leading-[1.75] font-light max-w-sm"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    Master all three markets in one comprehensive 4-month curriculum with lifetime mentorship access.
                                </p>
                            </div>
                        </div>

                        {/* Price block */}
                        <div className="flex items-end gap-4 mb-2 flex-wrap">
                            <span className="text-[#D72638] font-black leading-none"
                                style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(44px, 5.5vw, 62px)" }}>
                                ₹29,999
                            </span>
                            <span className="text-zinc-400 text-[20px] line-through font-medium mb-1"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                ₹42,000
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mb-6 flex-wrap">
                            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                                <Star className="w-3 h-3 text-emerald-500" fill="currentColor" />
                                <span className="text-emerald-600 text-[11px] font-bold" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    Save ₹12,001
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3 h-3 text-zinc-400" />
                                <span className="text-zinc-400 text-[12px]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    4 Month · Lifetime Access
                                </span>
                            </div>
                        </div>

                        {/* Trust */}
                        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
                            {["No hidden fees", "EMI available", "Online & Offline"].map((t, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D72638] shrink-0" />
                                    <span className="text-zinc-500 text-[13px]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{t}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="no-underline inline-block w-full sm:w-auto">
                            <motion.button
                                whileHover={{ y: -3, boxShadow: "0 16px 40px rgba(37,211,102,0.4)" }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-white text-[15px] font-bold px-8 py-4 rounded-2xl border-none cursor-pointer transition-colors duration-200"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#25D366", boxShadow: "0 8px 24px rgba(37,211,102,0.28)" }}>
                                <FaWhatsapp size={19} />
                                Secure My Access
                                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                            </motion.button>
                        </a>
                    </motion.div>

                    {/* ── RIGHT — orbital timeline ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 28 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col"
                    >
                        {/* Orbital */}
                        <div className="relative rounded-2xl overflow-visible"
                            style={{ background: "#FAFAFA", border: "1.5px solid #F0F0F0" }}>
                            <DotPattern className="text-[#D72638]/06 rounded-2xl" />
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D72638]/30 to-transparent rounded-t-2xl" />

                            <div className="relative z-10 px-4 pt-6 pb-2 text-center">
                                <span className="text-[10px] font-extrabold text-[#D72638] uppercase tracking-[0.2em]"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    6-Pillar Framework
                                </span>
                                <p className="text-[12px] text-zinc-400 mt-0.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    Tap any node to explore
                                </p>
                            </div>

                            <div className="overflow-visible px-4 pb-4">
                                <OrbitalTimeline />
                            </div>
                        </div>

                        {/* Included items */}
                        <div className="mt-5 rounded-2xl overflow-hidden"
                            style={{ border: "1.5px solid #F0F0F0" }}>
                            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100">
                                <h3 className="text-zinc-900 text-[14px] font-bold" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    Bundle Privileges
                                </h3>
                                <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 uppercase tracking-[0.08em]"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    All-In-One
                                </span>
                            </div>
                            {included.map((item, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-zinc-50 transition-colors duration-150 group"
                                    style={{ borderBottom: i < included.length - 1 ? "1px solid #F5F5F5" : "none" }}>
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#D72638] transition-all duration-200 group-hover:bg-[#D72638]/10"
                                        style={{ background: "rgba(215,38,56,0.07)", border: "1px solid rgba(215,38,56,0.15)" }}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-zinc-900 text-[13px] font-bold leading-tight" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                            {item.title}
                                        </p>
                                        <p className="text-zinc-400 text-[11px] leading-snug" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                    <span className="text-[9px] font-bold text-zinc-400 bg-zinc-100 rounded px-1.5 py-0.5 uppercase tracking-wide shrink-0"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                        {item.tag}
                                    </span>
                                </motion.div>
                            ))}

                            {/* Footer */}
                            <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-50 border-t border-zinc-100">
                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-400 text-[12px] line-through" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>₹42,000</span>
                                    <span className="text-[#D72638] text-[14px] font-extrabold" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>₹29,999</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#D72638]"
                                        animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                                    <span className="text-zinc-400 text-[11px]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Seats filling fast</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default BundleOffer;
