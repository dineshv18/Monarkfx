"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const WA = "https://wa.me/918750475852?text=";

const COURSES = [
    {
        id: "indian", slug: "indian-market-mastery", name: "Indian Market Mastery",
        level: "Nifty · BankNifty · F&O · Equity",
        tag: "Most Popular", tagColor: "#E8B923", image: "/courses/indian.png",
        desc: "Dominate Nifty, Bank Nifty, F&O and Equity Stocks using Smart Money & ICT frameworks.",
        features: ["2 Month Intensive Program", "3 Sessions/Week with Mentor", "Nifty/BankNifty Strategies", "Risk Management Framework", "1 Month Free Trading Room"],
    },
    {
        id: "forex", slug: "forex-gold-specialist", name: "Forex & Gold Specialist",
        level: "EUR/USD · GBP/JPY · XAUUSD",
        tag: "Trending", tagColor: "#0EA5E9", image: "/courses/forex.png",
        desc: "Master currency pairs and Gold with institutional order flow, session timing and macro setups.",
        features: ["2 Month Intensive Program", "3 Sessions/Week with Mentor", "Forex Pairs & Gold Strategies", "Global Session Timing Mastery", "1 Month Free Trading Room"],
    },
    {
        id: "crypto", slug: "crypto-institutional-edge", name: "Crypto Institutional Edge",
        level: "BTC · ETH · Altcoins · Futures",
        tag: "Advanced", tagColor: "#8B5CF6", image: "/courses/crypto.png",
        desc: "Dominate Spot & Futures across BTC, ETH and high-alpha altcoins with on-chain analysis.",
        features: ["2 Month Intensive Program", "3 Sessions/Week with Mentor", "Spot & Futures Execution", "On-Chain & Exchange Analysis", "1 Month Free Trading Room"],
    },
];

const PRICING = [
    { count: 1, label: "Any 1 Course", months: "2 Months", online: "14,999", offline: "17,999", emiOnline: "5,000", emiOffline: "6,000", emiMonths: "3" },
    { count: 2, label: "Any 2 Courses", months: "3 Months", online: "21,999", offline: "24,999", emiOnline: "3,700", emiOffline: "4,200", emiMonths: "6" },
    { count: 3, label: "All 3 — Combo", months: "4 Months", online: "26,999", offline: "29,999", emiOnline: "4,500", emiOffline: "5,000", emiMonths: "6" },
];

const GOLD_GRADIENT = "linear-gradient(135deg, #F7E7A8 0%, #E8B923 45%, #C79A1E 75%, #F5D876 100%)";
const NAVY = "#0B1E3F";

function getWAMsg(selected: string[], mode: string, price: string) {
    const names = selected.map(id => COURSES.find(c => c.id === id)?.name).join(", ");
    return `${WA}${encodeURIComponent(`Hi MonarkFX Team,\n\nI want to enroll in the following course(s):\n*Course(s):* ${names}\n*Mode:* ${mode}\n*Price:* ₹${price} + GST\n\nPlease share batch details, schedule, and payment options.\n\nThank you!`)}`;
}

const CoursesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [selected, setSelected] = useState<string[]>(["forex", "crypto"]);
    const [mode, setMode] = useState<"Online" | "Offline">("Offline");

    const toggle = (id: string) => {
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    const pricing = PRICING.find(p => p.count === selected.length);
    const price = pricing ? (mode === "Online" ? pricing.online : pricing.offline) : null;

    return (
        <section ref={ref} className="relative overflow-hidden" style={{ background: "#F7F8FA", padding: "96px 0 112px" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(232,185,35,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[360px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(232,185,35,0.08) 0%, transparent 70%)" }} />

            <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center" style={{ marginBottom: 14 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                        <div style={{ width: 28, height: 2, backgroundImage: "linear-gradient(90deg,#F5D876,#E8B923 50%,#C79A1E)", borderRadius: 2 }} />
                        <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 11, fontWeight: 800, color: "#C79A1E", letterSpacing: "0.24em", textTransform: "uppercase" }}>
                            Choose Your Market
                        </span>
                        <div style={{ width: 28, height: 2, backgroundImage: "linear-gradient(90deg,#C79A1E,#E8B923 50%,#F5D876)", borderRadius: 2 }} />
                    </div>
                    <h2 className="font-heading" style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, color: NAVY, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: 14 }}>
                        Select Your{" "}
                        <span style={{ backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Course(s)
                        </span>
                    </h2>
                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(13px, 1vw, 15px)", color: "#7A8699", maxWidth: 440, margin: "0 auto", lineHeight: 1.6 }}>
                        Pick 1, 2, or all 3 — the price below updates automatically.
                    </p>
                </motion.div>

                {/* Online/Offline toggle */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex justify-center" style={{ marginBottom: 44 }}>
                    <div className="inline-flex bg-white rounded-full p-1 border border-zinc-200/80 shadow-sm">
                        {(["Offline", "Online"] as const).map(m => {
                            const on = mode === m;
                            return (
                                <button key={m} onClick={() => setMode(m)}
                                    className="px-7 py-2 rounded-full text-[13px] font-bold cursor-pointer transition-all duration-200 border-none"
                                    style={{
                                        fontFamily: "var(--font-dm-sans), sans-serif",
                                        backgroundImage: on ? GOLD_GRADIENT : "none",
                                        background: on ? undefined : "transparent",
                                        color: on ? NAVY : "#98A2B3",
                                        boxShadow: on ? "0 2px 10px rgba(232,185,35,0.4)" : "none",
                                    }}>
                                    {m}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Course Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch" style={{ marginBottom: 40 }}>
                    {COURSES.map((course, i) => {
                        const isSelected = selected.includes(course.id);
                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 28 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full"
                            >
                                <div
                                    className="rounded-2xl overflow-hidden relative h-full flex flex-col bg-white hover:-translate-y-1.5"
                                    style={{
                                        border: isSelected ? "1.5px solid rgba(232,185,35,0.9)" : "1.5px solid #EAECEF",
                                        boxShadow: isSelected
                                            ? "0 0 0 4px rgba(232,185,35,0.14), 0 24px 56px -12px rgba(232,185,35,0.28)"
                                            : "0 6px 24px -6px rgba(11,30,63,0.10)",
                                        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                                    }}
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[16/9] overflow-hidden" style={{ background: NAVY }}>
                                        <Image src={course.image} alt={course.name} fill className="object-contain transition-transform duration-500"
                                            style={{ transform: isSelected ? "scale(1.03)" : "scale(1)" }} sizes="(max-width: 768px) 100vw, 380px" />

                                        {/* Select check */}
                                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                                            style={{
                                                backgroundImage: isSelected ? GOLD_GRADIENT : "none",
                                                background: isSelected ? undefined : "rgba(0,0,0,0.45)",
                                                border: isSelected ? "none" : "1.5px solid rgba(255,255,255,0.45)",
                                                backdropFilter: "blur(4px)",
                                            }}>
                                            {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3.5} style={{ color: NAVY }} />}
                                        </div>

                                        {/* Duration */}
                                        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-[3px] rounded-full"
                                            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
                                            <Clock className="w-2.5 h-2.5 text-[#E8B923]" />
                                            <span className="text-[9px] font-bold text-white/90">2 Months</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
                                        {/* status + tag row */}
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-[0.1em]"
                                                style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: isSelected ? "#C79A1E" : "#B0B7C3" }}>
                                                {isSelected && <Check className="w-3 h-3" strokeWidth={3.5} />}
                                                {isSelected ? "Selected" : "Not selected"}
                                            </span>
                                            <span className="text-[9px] font-extrabold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full"
                                                style={{ color: course.tagColor, background: `${course.tagColor}14`, border: `1px solid ${course.tagColor}33` }}>
                                                {course.tag}
                                            </span>
                                        </div>

                                        {/* Name + level */}
                                        <h3 className="font-black leading-tight mb-1" style={{ fontFamily: "var(--font-playfair), serif", fontSize: 18, color: NAVY, letterSpacing: "-0.02em" }}>
                                            {course.name}
                                        </h3>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-3" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#9AA4B2" }}>
                                            {course.level}
                                        </p>

                                        {/* Description */}
                                        <p className="text-[12.5px] leading-[1.6] mb-4" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#5C6675" }}>
                                            {course.desc}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-col gap-2 mb-5">
                                            {course.features.map((f, fi) => (
                                                <div key={fi} className="flex items-center gap-2.5">
                                                    <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                                        style={{ background: "rgba(232,185,35,0.14)", border: "1px solid rgba(232,185,35,0.35)" }}>
                                                        <Check className="w-2 h-2 text-[#C79A1E]" strokeWidth={4} />
                                                    </span>
                                                    <span className="text-[11.5px] leading-snug" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#525C6B" }}>
                                                        {f}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-2.5 mt-auto pt-1 relative z-10">
                                            <button
                                                type="button"
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(course.id); }}
                                                aria-pressed={isSelected}
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-extrabold cursor-pointer transition-all duration-200 select-none active:scale-95"
                                                style={{
                                                    fontFamily: "var(--font-dm-sans), sans-serif",
                                                    backgroundImage: isSelected ? GOLD_GRADIENT : "none",
                                                    background: isSelected ? undefined : "#fff",
                                                    color: NAVY,
                                                    border: isSelected ? "1.5px solid transparent" : "1.5px solid #DDE1E6",
                                                }}
                                            >
                                                {isSelected ? <><Check className="w-3.5 h-3.5" strokeWidth={3.5} /> Selected</> : "Select"}
                                            </button>
                                            <Link
                                                href={`/courses/programs/${course.slug}`}
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-extrabold no-underline transition-all duration-200 hover:opacity-90"
                                                style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: NAVY, color: "#fff" }}
                                            >
                                                View Course
                                                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Pricing tier pills */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3" style={{ marginBottom: 28 }}>
                    {PRICING.map(p => {
                        const active = selected.length === p.count;
                        const pr = mode === "Online" ? p.online : p.offline;
                        return (
                            <div key={p.count} className="flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-200"
                                style={{
                                    backgroundImage: active ? GOLD_GRADIENT : "none",
                                    background: active ? undefined : "#fff",
                                    border: active ? "1.5px solid transparent" : "1.5px solid #EAECEF",
                                    boxShadow: active ? "0 6px 18px rgba(232,185,35,0.3)" : "none",
                                }}>
                                <span className="text-[11px] font-extrabold uppercase tracking-[0.06em]"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: active ? NAVY : "#7A8699" }}>
                                    {p.label}
                                </span>
                                <span className="w-px h-3" style={{ background: active ? "rgba(11,30,63,0.25)" : "#E0E0E0" }} />
                                <span className="text-[11px] font-black" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: active ? NAVY : "#98A2B3" }}>
                                    ₹{pr}
                                </span>
                                <span className="text-[9px] font-bold" style={{ color: active ? "rgba(11,30,63,0.55)" : "#C4CBD4" }}>
                                    · {p.months}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>

                {/* CTA */}
                <AnimatePresence>
                    {selected.length > 0 && price && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.97 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl p-6 sm:p-7 relative overflow-hidden"
                            style={{ background: NAVY, border: "1px solid rgba(232,185,35,0.22)", boxShadow: "0 24px 56px -16px rgba(11,30,63,0.4)" }}
                        >
                            <div className="absolute -top-16 -right-10 w-64 h-64 pointer-events-none"
                                style={{ background: "radial-gradient(circle, rgba(232,185,35,0.16) 0%, transparent 70%)" }} />
                            <div className="relative">
                                {(() => {
                                    const p = PRICING.find(x => x.count === selected.length)!;
                                    const emi = mode === "Online" ? p.emiOnline : p.emiOffline;
                                    return (
                                        <>
                                            <p className="text-white/45 text-[10px] font-bold uppercase tracking-[0.14em] mb-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                                {selected.length} Course{selected.length > 1 ? "s" : ""} · {mode} · {p.months}
                                            </p>
                                            <div className="flex items-baseline gap-2 mb-1.5">
                                                <span className="font-black leading-none" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(32px, 3.5vw, 44px)", backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                                    ₹{price}
                                                </span>
                                                <span className="text-white/45 text-[13px] font-semibold">+ GST</span>
                                            </div>
                                            <p className="text-[#E8B923] text-[12px] font-bold mb-1.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                                EMI: ₹{emi}/mo × {p.emiMonths} months
                                            </p>
                                            <p className="text-white/35 text-[11px]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                                {selected.map(id => COURSES.find(c => c.id === id)?.name).join("  +  ")}
                                            </p>
                                        </>
                                    );
                                })()}
                            </div>

                            <a href={getWAMsg(selected, mode, price)} target="_blank" rel="noopener noreferrer" className="no-underline w-full sm:w-auto relative">
                                <motion.button
                                    whileHover={{ y: -3, boxShadow: "0 16px 40px rgba(37,211,102,0.45)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-extrabold text-[15px] border-none cursor-pointer text-white"
                                    style={{
                                        fontFamily: "var(--font-dm-sans), sans-serif",
                                        background: "#25D366",
                                        boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
                                        whiteSpace: "nowrap",
                                    }}>
                                    <FaWhatsapp size={20} />
                                    Enroll via WhatsApp
                                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                                </motion.button>
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>

                {selected.length === 0 && (
                    <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
                        className="text-center text-[12px] font-medium" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#98A2B3" }}>
                        ↑ Select course(s) above to see pricing & enroll
                    </motion.p>
                )}
            </div>
        </section>
    );
};

export default CoursesSection;
