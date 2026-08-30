"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Layout, Globe, Coins, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const WA = "https://wa.me/918750475852?text=";

const COURSES = [
    {
        id: "indian", slug: "indian-market-mastery", code: "IMM", name: "Indian Market Mastery",
        level: "Nifty · BankNifty · F&O · Equity",
        icon: Layout, tag: "Most Popular", tagColor: "#D72638", image: "/courses/indian.png",
        desc: "Dominate Nifty, Bank Nifty, F&O and Equity Stocks using Smart Money & ICT frameworks.",
        features: ["2 Month Intensive Program", "3 Sessions/Week with Mentor", "Nifty/BankNifty Strategies", "Risk Management Framework", "1 Month Free Trading Room"],
    },
    {
        id: "forex", slug: "forex-gold-specialist", code: "FGS", name: "Forex & Gold Specialist",
        level: "EUR/USD · GBP/JPY · XAUUSD",
        icon: Globe, tag: "Trending", tagColor: "#F59E0B", image: "/courses/forex.png",
        desc: "Master currency pairs and Gold with institutional order flow, session timing and macro setups.",
        features: ["2 Month Intensive Program", "3 Sessions/Week with Mentor", "Forex Pairs & Gold Strategies", "Global Session Timing Mastery", "1 Month Free Trading Room"],
    },
    {
        id: "crypto", slug: "crypto-institutional-edge", code: "CIE", name: "Crypto Institutional Edge",
        level: "BTC · ETH · Altcoins · Futures",
        icon: Coins, tag: "Advanced", tagColor: "#8B5CF6", image: "/courses/crypto.png",
        desc: "Dominate Spot & Futures across BTC, ETH and high-alpha altcoins with on-chain analysis.",
        features: ["2 Month Intensive Program", "3 Sessions/Week with Mentor", "Spot & Futures Execution", "On-Chain & Exchange Analysis", "1 Month Free Trading Room"],
    },
];

const PRICING = [
    { count: 1, label: "Any 1 Course",  months: "2 Months", online: "14,999", offline: "17,999", emiOnline: "5,000", emiOffline: "6,000", emiMonths: "3", highlight: false },
    { count: 2, label: "Any 2 Courses", months: "3 Months", online: "21,999", offline: "24,999", emiOnline: "3,700", emiOffline: "4,200", emiMonths: "6", highlight: false },
    { count: 3, label: "All 3 — Combo", months: "4 Months", online: "26,999", offline: "29,999", emiOnline: "4,500", emiOffline: "5,000", emiMonths: "6", highlight: true  },
];

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
                : prev.length < 3 ? [...prev, id] : prev
        );
    };

    const pricing = PRICING.find(p => p.count === selected.length);
    const price = pricing ? (mode === "Online" ? pricing.online : pricing.offline) : null;

    return (
        <section ref={ref} className="relative overflow-hidden" style={{ background: "#F8F8F8", padding: "100px 0 120px" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(215,38,56,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

            <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center" style={{ marginBottom: 16 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div style={{ width: 28, height: 2, background: "#D72638", borderRadius: 2 }} />
                        <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 11, fontWeight: 800, color: "#D72638", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                            Choose Your Market
                        </span>
                        <div style={{ width: 28, height: 2, background: "#D72638", borderRadius: 2 }} />
                    </div>
                    <h2 className="font-heading" style={{ fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 800, color: "#0A0A0A", lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: 12 }}>
                        Select Your{" "}
                        <span style={{ backgroundImage: "linear-gradient(135deg, #D72638, #A01020)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Course(s)
                        </span>
                    </h2>
                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(13px, 1vw, 16px)", color: "#888", maxWidth: 460, margin: "0 auto 0", lineHeight: 1.6 }}>
                        Pick 1, 2, or all 3 — price updates automatically.
                    </p>
                </motion.div>

                {/* Online/Offline toggle */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex justify-center" style={{ marginBottom: 40 }}>
                    <div className="flex bg-white rounded-xl p-1 border border-zinc-200 shadow-sm">
                        {(["Offline", "Online"] as const).map(m => (
                            <button key={m} onClick={() => setMode(m)}
                                className="px-6 py-2 rounded-[10px] text-[13px] font-bold cursor-pointer transition-all duration-200 border-none"
                                style={{
                                    fontFamily: "var(--font-dm-sans), sans-serif",
                                    background: mode === m ? "#D72638" : "transparent",
                                    color: mode === m ? "#fff" : "#999",
                                    boxShadow: mode === m ? "0 2px 8px rgba(215,38,56,0.25)" : "none",
                                }}>
                                {m}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Course Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch" style={{ marginBottom: 32 }}>
                    {COURSES.map((course, i) => {
                        const isSelected = selected.includes(course.id);
                        const Icon = course.icon;
                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 28 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full"
                            >
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.22 }}
                                    className="rounded-2xl overflow-hidden relative h-full flex flex-col"
                                    style={{
                                        border: isSelected ? "2px solid #D72638" : "1.5px solid #E8E8E8",
                                        boxShadow: isSelected
                                            ? "0 0 0 4px rgba(215,38,56,0.1), 0 24px 56px rgba(215,38,56,0.12)"
                                            : "0 4px 20px rgba(0,0,0,0.05)",
                                        background: "#fff",
                                        transition: "border-color 0.2s, box-shadow 0.2s",
                                    }}
                                >
                                    {/* Image */}
                                    <div className="relative h-44 overflow-hidden bg-[#0A0A0A]">
                                        <Image src={course.image} alt={course.name} fill className="object-cover transition-transform duration-500"
                                            style={{ transform: isSelected ? "scale(1.04)" : "scale(1)" }} sizes="33vw" />
                                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 55%, transparent 100%)" }} />

                                        {/* Select indicator */}
                                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                                            style={{
                                                background: isSelected ? "#D72638" : "rgba(0,0,0,0.4)",
                                                border: isSelected ? "none" : "1.5px solid rgba(255,255,255,0.4)",
                                                backdropFilter: "blur(4px)",
                                            }}>
                                            {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                        </div>

                                        {/* Tag top-left */}
                                        <div className="absolute top-3 left-3 flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(215,38,56,0.88)", backdropFilter: "blur(4px)" }}>
                                                <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                                            </div>
                                        </div>

                                        {/* Name bottom */}
                                        <div className="absolute bottom-3 left-4 right-10">
                                            <p className="text-white/50 text-[9px] font-bold uppercase tracking-[0.1em] mb-0.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{course.level}</p>
                                            <h3 className="text-white font-black leading-tight" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(15px, 1.3vw, 18px)", letterSpacing: "-0.02em" }}>{course.name}</h3>
                                        </div>

                                        {/* Duration bottom-right */}
                                        <div className="absolute bottom-3 right-3 flex items-center gap-1" style={{ background: "rgba(0,0,0,0.6)", padding: "2px 7px", borderRadius: 999, backdropFilter: "blur(4px)" }}>
                                            <Clock className="w-2.5 h-2.5 text-zinc-400" />
                                            <span className="text-[9px] font-semibold text-zinc-300">2 Mo</span>
                                        </div>
                                    </div>

                                    {/* Content below image */}
                                    <div className="px-4 pt-3 pb-4 flex flex-col flex-1">
                                        {/* tag row */}
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[11px] font-bold uppercase tracking-[0.08em]"
                                                style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: isSelected ? "#D72638" : "#AAA" }}>
                                                {isSelected ? "✓ Selected" : "Not selected"}
                                            </span>
                                            <span className="text-[9px] font-extrabold uppercase tracking-[0.06em] px-2 py-0.5 rounded-full"
                                                style={{ color: course.tagColor, background: `${course.tagColor}18`, border: `1px solid ${course.tagColor}40` }}>
                                                {course.tag}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-zinc-500 text-[12px] leading-[1.6] mb-3"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                            {course.desc}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-col gap-1.5 mb-4">
                                            {course.features.map((f, fi) => (
                                                <div key={fi} className="flex items-center gap-2">
                                                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                                                        <Check className="w-2 h-2 text-emerald-500" strokeWidth={3.5} />
                                                    </div>
                                                    <span className="text-zinc-600 text-[11px] leading-snug"
                                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                                        {f}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex gap-2 mt-auto pt-1">
                                            <button
                                                type="button"
                                                onClick={() => toggle(course.id)}
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-bold border cursor-pointer transition-all duration-200"
                                                style={{
                                                    fontFamily: "var(--font-dm-sans), sans-serif",
                                                    background: isSelected ? "#D72638" : "#fff",
                                                    color: isSelected ? "#fff" : "#0A0A0A",
                                                    borderColor: isSelected ? "#D72638" : "#E0E0E0",
                                                }}
                                            >
                                                {isSelected ? <><Check className="w-3.5 h-3.5" strokeWidth={3} /> Selected</> : "Select"}
                                            </button>
                                            <Link
                                                href={`/courses/programs/${course.slug}`}
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-bold no-underline transition-all duration-200"
                                                style={{
                                                    fontFamily: "var(--font-dm-sans), sans-serif",
                                                    background: "#0A0A0A",
                                                    color: "#fff",
                                                }}
                                            >
                                                View Course
                                                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Pricing tier pills */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3" style={{ marginBottom: 32 }}>
                    {PRICING.map(p => {
                        const active = selected.length === p.count;
                        const pr = mode === "Online" ? p.online : p.offline;
                        return (
                            <div key={p.count} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-200"
                                style={{
                                    background: active ? "#D72638" : "#fff",
                                    border: active ? "1.5px solid #D72638" : "1.5px solid #E8E8E8",
                                    boxShadow: active ? "0 4px 16px rgba(215,38,56,0.25)" : "none",
                                }}>
                                <span className="text-[11px] font-extrabold uppercase tracking-[0.08em]"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: active ? "#fff" : "#888" }}>
                                    {p.label}
                                </span>
                                <span className="w-px h-3" style={{ background: active ? "rgba(255,255,255,0.3)" : "#E0E0E0" }} />
                                <span className="text-[11px] font-black" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: active ? "rgba(255,255,255,0.9)" : "#AAA" }}>
                                    ₹{pr}
                                </span>
                                <span className="text-[9px] font-semibold" style={{ color: active ? "rgba(255,255,255,0.6)" : "#CCC" }}>
                                    · {p.months}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>

                {/* CTA — shows when selection made */}
                <AnimatePresence>
                    {selected.length > 0 && price && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.97 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl p-5 sm:p-6"
                            style={{ background: "#0A0A0A", border: "1px solid #1C1C1C", boxShadow: "0 20px 48px rgba(0,0,0,0.2)" }}
                        >
                            <div>
                                {(() => {
                                    const p = PRICING.find(x => x.count === selected.length)!;
                                    const emi = mode === "Online" ? p.emiOnline : p.emiOffline;
                                    return (
                                        <>
                                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.12em] mb-1.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                                {selected.length} Course{selected.length > 1 ? "s" : ""} · {mode} · {p.months}
                                            </p>
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-white font-black leading-none" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(32px, 3.5vw, 42px)" }}>
                                                    ₹{price}
                                                </span>
                                                <span className="text-white/40 text-[13px] font-semibold">+ GST</span>
                                            </div>
                                            <p className="text-[#D72638] text-[12px] font-bold mb-1" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                                EMI: ₹{emi}/mo × {p.emiMonths} months
                                            </p>
                                            <p className="text-white/25 text-[11px]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                                {selected.map(id => COURSES.find(c => c.id === id)?.name).join(" + ")}
                                            </p>
                                        </>
                                    );
                                })()}
                            </div>

                            <a href={getWAMsg(selected, mode, price)} target="_blank" rel="noopener noreferrer" className="no-underline w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ y: -3, boxShadow: "0 16px 40px rgba(37,211,102,0.45)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-extrabold text-[15px] border-none cursor-pointer"
                                    style={{
                                        fontFamily: "var(--font-dm-sans), sans-serif",
                                        background: "#25D366",
                                        color: "#fff",
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

                {/* No selection state hint */}
                {selected.length === 0 && (
                    <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
                        className="text-center text-zinc-400 text-[12px] font-medium" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        ↑ Select course(s) above to see pricing & enroll
                    </motion.p>
                )}
            </div>
        </section>
    );
};

export default CoursesSection;

