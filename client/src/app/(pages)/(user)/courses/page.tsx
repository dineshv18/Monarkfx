"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    Check, ArrowRight, MessageCircle, ShieldCheck, Zap,
    Plus, Minus, Layout, Globe, Coins, Users, Clock,
    CreditCard, TrendingUp, Award, Star, Sparkles,
} from "lucide-react";
import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/918750475852?text=";
const getEnrollUrl = (course: string) =>
    `${WHATSAPP_URL}${encodeURIComponent(`Hi MonarkFX, I want to enroll in the ${course}.`)}`;

/* ─── DATA ─────────────────────────────────────────────────── */
const mentorshipBatches = [
    {
        id: "indian", title: "Indian Market Mastery", icon: Layout,
        desc: "Dominate Nifty, Bank Nifty, F&O, and Equity Stocks with institutional precision.",
        options: [
            { label: "Online", price: "15,000", emi: "5,500/mo × 3", tag: "Most Flexible" },
            { label: "Offline", price: "18,000", emi: "6,500/mo × 3", tag: "Best Experience" },
        ],
        features: [
            "6 Core Modules + Live Sessions",
            "3 Sessions/Week with Mentor",
            "Nifty/Bank Nifty Specialist Strategies",
            "Module-based Risk Frameworks",
            "1 Month Free Trading Room Access",
            "Professional Certificate",
        ],
    },
    {
        id: "forex", title: "Forex & Gold Specialist", icon: Globe,
        desc: "Master EUR/USD, GBP/JPY, and XAUUSD with institutional order flow concepts.",
        options: [
            { label: "Online", price: "15,000", emi: "5,500/mo × 3" },
            { label: "Offline", price: "18,000", emi: "6,500/mo × 3" },
        ],
        features: [
            "6 Core Modules + Live Sessions",
            "3 Sessions/Week with Mentor",
            "Forex Pairs & Gold Specialization",
            "Global Market Session Timings",
            "1 Month Free Trading Room Access",
            "Professional Certificate",
        ],
    },
    {
        id: "crypto", title: "Crypto Institutional Edge", icon: Coins,
        desc: "Dominate Spot & Futures across BTC, ETH, and high-alpha altcoin projects.",
        options: [
            { label: "Online", price: "15,000", emi: "5,500/mo × 3" },
            { label: "Offline", price: "18,000", emi: "6,500/mo × 3" },
        ],
        features: [
            "6 Core Modules + Live Sessions",
            "3 Sessions/Week with Mentor",
            "Spot & Futures Execution Alpha",
            "Exchange Setup & Wallet Security",
            "1 Month Free Trading Room Access",
            "Professional Certificate",
        ],
    },
];

const faqs = [
    { q: "Do I need prior trading experience to join?", a: "No prior knowledge is required. We start from absolute zero, covering everything from the psychological foundation to advanced institutional execution." },
    { q: "How does the EMI payment plan work?", a: "We offer no-fuss interest-free EMI options across all plans. You can split your investment into 3 or 6 monthly payments depending on the course selection." },
    { q: "What is the difference between Online and Offline batches?", a: "Online batches are held via high-definition live streaming with active Q&A. Offline batches provide in-person interaction at our academy, offering a more immersive environment for strategy backtesting." },
    { q: "Can I add another market after completing one program?", a: "Absolutely. Many students start with one market and later upgrade to our combo or add a second specialization at a significant loyalty discount." },
    { q: "Are there any student or group discounts?", a: "Yes, we support aspiring young traders. College students with valid IDs are eligible for exclusive discounts. Please consult our team via WhatsApp for details." },
    { q: "Can I cancel the Trading Room membership after the free month?", a: "Yes, the Trading Room is a subscription-based model. You have full control and can cancel or pause your membership at any time after the initial 1-month free access." },
];

/* ─── SUB-COMPONENTS ────────────────────────────────────────── */

const SectionLabel = ({ text }: { text: string }) => (
    <div className="inline-flex items-center gap-3 mb-5">
        <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
        <span className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            {text}
        </span>
        <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
    </div>
);

const PriceCard = ({ batch, index, isInView }: { batch: typeof mentorshipBatches[0]; index: number; isInView: boolean }) => {
    const [mode, setMode] = useState(0);
    const opt = batch.options[mode];
    const [hovered, setHovered] = useState(false);
    const Icon = batch.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.28 }}
                className="h-full flex flex-col rounded-[28px] p-7 sm:p-8 bg-white relative overflow-hidden"
                style={{
                    border: hovered ? "1.5px solid rgba(215,38,56,0.32)" : "1.5px solid #EBEBEB",
                    boxShadow: hovered ? "0 28px 64px rgba(0,0,0,0.07), 0 0 0 4px rgba(215,38,56,0.03)" : "0 8px 28px rgba(0,0,0,0.03)",
                    transition: "border-color 0.24s, box-shadow 0.24s",
                }}
            >
                {/* Number watermark */}
                <span className="absolute top-5 right-6 font-black leading-none select-none pointer-events-none"
                    style={{ fontFamily: "var(--font-playfair), serif", fontSize: 52, color: hovered ? "rgba(215,38,56,0.05)" : "rgba(0,0,0,0.035)", transition: "color 0.24s", lineHeight: 1 }}>
                    0{index + 1}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-[13px] flex items-center justify-center mb-6"
                    style={{
                        background: hovered ? "rgba(215,38,56,0.1)" : "rgba(215,38,56,0.06)",
                        border: hovered ? "1px solid rgba(215,38,56,0.25)" : "1px solid rgba(215,38,56,0.1)",
                        transition: "all 0.24s",
                    }}>
                    <Icon className="w-5 h-5 text-[#D72638]" strokeWidth={2} />
                </div>

                {/* Title + desc */}
                <h3 className="font-black text-zinc-900 tracking-[-0.025em] leading-tight mb-3"
                    style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(20px, 1.6vw, 24px)" }}>
                    {batch.title}
                </h3>
                <p className="text-zinc-500 text-[14px] leading-[1.7] font-light mb-6"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {batch.desc}
                </p>

                {/* Toggle */}
                <div className="flex bg-zinc-100 rounded-xl p-1 mb-6">
                    {batch.options.map((o, i) => (
                        <button key={o.label} onClick={() => setMode(i)}
                            className="flex-1 py-2 rounded-[10px] text-[13px] font-bold cursor-pointer transition-all duration-200 border-none"
                            style={{
                                fontFamily: "var(--font-dm-sans), sans-serif",
                                background: mode === i ? "#fff" : "transparent",
                                color: mode === i ? "#0A0A0A" : "#999",
                                boxShadow: mode === i ? "0 2px 10px rgba(0,0,0,0.07)" : "none",
                            }}>
                            {o.label}

                        </button>
                    ))}
                </div>

                {/* Price */}
                <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-zinc-900 font-black leading-none"
                            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(38px, 4vw, 46px)" }}>
                            ₹{opt.price}
                        </span>
                        <span className="text-zinc-400 text-[13px] font-semibold uppercase tracking-wide"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            + GST
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-3.5 h-3.5 text-[#D72638] shrink-0" />
                        <span className="text-zinc-500 text-[13px] font-semibold"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            EMI: ₹{opt.emi}
                        </span>
                    </div>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-3 flex-1 mb-8">
                    {batch.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="w-[18px] h-[18px] rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-[2px]">
                                <Check className="w-2.5 h-2.5 text-emerald-500" strokeWidth={3} />
                            </div>
                            <span className="text-zinc-600 text-[13px] sm:text-[14px] leading-snug font-light"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                {f}
                            </span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <Link href={getEnrollUrl(batch.title)} target="_blank" className="no-underline">
                    <motion.button
                        whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(0,0,0,0.15)" }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4 rounded-2xl flex items-center justify-center gap-2
                       bg-zinc-900 hover:bg-[#D72638] text-white text-[14px] sm:text-[15px] font-bold
                       border-none cursor-pointer
                       shadow-[0_6px_20px_rgba(0,0,0,0.1)]
                       transition-colors duration-300"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        Enroll Now
                        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </motion.button>
                </Link>

                {/* Bottom bar */}
                <div className="mt-5 h-[3px] rounded-full"
                    style={{
                        background: "linear-gradient(90deg, #D72638, rgba(215,38,56,0.1))",
                        transform: hovered ? "scaleX(1)" : "scaleX(0.15)",
                        transformOrigin: "left",
                        transition: "transform 0.36s cubic-bezier(0.22, 1, 0.36, 1)",
                        opacity: hovered ? 1 : 0.4,
                    }} />
            </motion.div>
        </motion.div>
    );
};

const FAQItem = ({ faq }: { faq: typeof faqs[0] }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-zinc-100">
            <button onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-6 bg-none border-none cursor-pointer text-left gap-4">
                <span className="text-zinc-900 text-[15px] sm:text-[17px] font-bold leading-snug"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {faq.q}
                </span>
                <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-colors duration-200"
                    style={{ background: open ? "rgba(215,38,56,0.1)" : "#F5F5F5" }}>
                    {open
                        ? <Minus className="w-3.5 h-3.5 text-[#D72638]" />
                        : <Plus className="w-3.5 h-3.5 text-zinc-500" />}
                </div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden">
                        <p className="text-zinc-500 text-[14px] sm:text-[15px] leading-[1.75] pb-6 pr-10 font-light"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            {faq.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
const CoursesPage = () => {
    const batchRef = useRef(null);
    const comboRef = useRef(null);
    const recurringRef = useRef(null);
    const faqRef = useRef(null);
    const isBatchInView = useInView(batchRef, { once: true, margin: "-60px" });
    const isComboInView = useInView(comboRef, { once: true, margin: "-60px" });
    const isRecurringInView = useInView(recurringRef, { once: true, margin: "-60px" });
    const isFaqInView = useInView(faqRef, { once: true, margin: "-60px" });

    return (
        <main className="bg-white">

            {/* ══ 1. HERO ══════════════════════════════════════════ */}
            <section className="relative overflow-hidden pt-28 sm:pt-36 pb-20 sm:pb-28 bg-[#FAFAFA] text-center">
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(rgba(215,38,56,0.045) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }} />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-64 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, rgba(215,38,56,0.09) 0%, transparent 70%)" }} />

                <div className="relative max-w-[920px] mx-auto px-5 sm:px-8">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7
                       bg-white border border-zinc-200 shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#D72638]" />
                        <span className="text-[10px] font-extrabold text-[#D72638] uppercase tracking-[0.18em]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            MonarkFX Trading Academy
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-black text-zinc-950 leading-[1.0] tracking-[-0.05em] mb-6"
                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(44px, 8vw, 88px)" }}>
                        Master Trading.{" "}
                        <br className="hidden sm:block" />
                        <span className="text-[#D72638]">On Your Terms.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-zinc-500 max-w-[600px] mx-auto leading-[1.75] font-light mb-12"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(16px, 1.3vw, 20px)" }}>
                        Indian Markets, Forex, or Crypto — choose your domain, embark on a 90-day elite framework, and emerge as a confident, disciplined trader.
                    </motion.p>

                    {/* Journey steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.3 }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-[760px] mx-auto">
                        {[
                            { num: "01", label: "Starter", sub: "Workshop" },
                            { num: "02", label: "90-Day", sub: "Mentorship" },
                            { num: "03", label: "Deep Dive", sub: "Add-ons" },
                            { num: "04", label: "Trading", sub: "Room Access" },
                        ].map((step, i) => (
                            <div key={i}
                                className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-zinc-200 shadow-sm">
                                <span className="text-[22px] font-black text-[#D72638]/25 leading-none"
                                    style={{ fontFamily: "var(--font-playfair), serif" }}>{step.num}</span>
                                <div className="w-px h-6 bg-zinc-200 shrink-0" />
                                <div>
                                    <p className="text-zinc-900 text-[13px] font-bold leading-tight"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{step.label}</p>
                                    <p className="text-zinc-400 text-[11px] font-medium"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{step.sub}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ 2. STARTER WORKSHOP ══════════════════════════════ */}
            <section className="py-14 sm:py-16 px-5 sm:px-8">
                <div className="max-w-[1120px] mx-auto">
                    <div className="rounded-[32px] overflow-hidden relative flex flex-col lg:flex-row"
                        style={{
                            background: "#0A0A0A",
                            border: "1.5px solid #1C1C1C",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
                        }}>
                        <div className="h-px w-full lg:hidden bg-gradient-to-r from-transparent via-[#D72638]/40 to-transparent absolute top-0" />
                        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D72638]/25 to-transparent" />

                        {/* Content */}
                        <div className="flex-[1.2] px-8 sm:px-12 py-10 sm:py-14 relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                                <motion.div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                                    animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                                <span className="text-white/80 text-[10px] font-extrabold uppercase tracking-[0.18em]"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    Live Enrollment Open
                                </span>
                            </div>

                            <h2 className="font-black text-white leading-[1.04] tracking-[-0.025em] mb-5"
                                style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                                Step One —{" "}
                                <span style={{
                                    backgroundImage: "linear-gradient(120deg, #D72638, #FF7A7A)",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                                }}>
                                    Trading Starter Workshop
                                </span>
                            </h2>

                            <p className="text-white/60 leading-[1.8] font-light mb-10 max-w-[480px]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(14px, 1.1vw, 17px)" }}>
                                No need to jump straight into the full program. Build your professional foundation in 5 days, identify your market, and decide your future.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                                {[
                                    { t: "Institutional Basics", s: "Zero prior knowledge required" },
                                    { t: "Risk Fundamentals", s: "Protect capital before profiting" },
                                    { t: "Daily Live Q&A", s: "Face-to-face mentor interaction" },
                                    { t: "Elite Toolkit", s: "Strategy cheat sheets included" },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
                                            style={{ background: "rgba(215,38,56,0.18)", border: "1px solid rgba(215,38,56,0.28)" }}>
                                            <Check className="w-3 h-3 text-[#D72638]" strokeWidth={3} />
                                        </div>
                                        <div>
                                            <p className="text-white text-[14px] font-bold"
                                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{item.t}</p>
                                            <p className="text-white/45 text-[12px]"
                                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{item.s}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-wrap">
                                <Link href={getEnrollUrl("5-Day Starter Workshop")} target="_blank" className="no-underline w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ y: -2, boxShadow: "0 16px 40px rgba(215,38,56,0.45)" }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                               bg-[#D72638] hover:bg-[#C0202F] text-white
                               text-[15px] font-bold px-8 py-4 rounded-2xl
                               border-none cursor-pointer
                               shadow-[0_8px_24px_rgba(215,38,56,0.32)]
                               transition-colors duration-200"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                        Join for ₹999 + GST
                                        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                                    </motion.button>
                                </Link>
                                <div>
                                    <p className="text-white/35 text-[11px] font-bold uppercase tracking-[0.1em]"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Limited Time Reward</p>
                                    <p className="text-[#D72638] text-[13px] font-extrabold"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>₹999 Credit towards MPTP</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual */}
                        <div className="flex-[0.75] min-h-[280px] lg:min-h-0 flex items-center justify-center relative"
                            style={{ background: "linear-gradient(140deg, #111 0%, #0E0E0E 100%)", borderLeft: "1px solid #1C1C1C" }}>
                            <div className="absolute inset-0"
                                style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
                                style={{ background: "radial-gradient(circle, rgba(215,38,56,0.16) 0%, transparent 68%)" }} />
                            <div className="relative z-10 text-center px-10">
                                <motion.div
                                    animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-24 h-24 rounded-[28px] flex items-center justify-center mx-auto mb-6"
                                    style={{ background: "rgba(215,38,56,0.1)", border: "1.5px solid rgba(215,38,56,0.3)", boxShadow: "0 0 40px rgba(215,38,56,0.18)" }}>
                                    <Award className="w-10 h-10 text-[#D72638]" />
                                </motion.div>
                                <h3 className="text-white font-black text-[22px] mb-2"
                                    style={{ fontFamily: "var(--font-playfair), serif" }}>Certified Starter</h3>
                                <p className="text-white/40 text-[13px] leading-relaxed"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    The first credential in your<br />institutional career.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 3. CORE MENTORSHIP BATCHES ═══════════════════════ */}
            <section ref={batchRef} className="relative bg-[#F7F7F7] overflow-hidden py-14 sm:py-16 px-5 sm:px-8">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(rgba(215,38,56,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                <div className="relative max-w-[1120px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }} animate={isBatchInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }} className="text-center mb-14">
                        <SectionLabel text="Specialized Batches" />
                        <h2 className="font-black text-zinc-950 leading-[1.02] tracking-[-0.04em] mb-4"
                            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(32px, 4vw, 54px)" }}>
                            The MPTP Framework
                        </h2>
                        <p className="text-zinc-500 max-w-[540px] mx-auto leading-[1.8] font-light"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(15px, 1.1vw, 18px)" }}>
                            Choose your primary market. Focus is the ultimate edge — master one domain before expanding your horizons.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {mentorshipBatches.map((batch, i) => (
                            <PriceCard key={batch.id} batch={batch} index={i} isInView={isBatchInView} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 4. COMBO SUITE ═══════════════════════════════════ */}
            <section ref={comboRef} className="py-14 sm:py-16 px-5 sm:px-8">
                <div className="max-w-[1120px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }} animate={isComboInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="relative rounded-[32px] overflow-hidden flex flex-col lg:flex-row"
                        style={{
                            background: "linear-gradient(140deg, #0A0A0A 0%, #181818 100%)",
                            border: "1.5px solid #1E1E1E",
                            boxShadow: "0 40px 100px rgba(0,0,0,0.28)",
                        }}>
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D72638]/35 to-transparent" />

                        {/* Left — benefits */}
                        <div className="flex-1 px-8 sm:px-12 py-10 sm:py-14">
                            <span className="inline-block bg-[#D72638] text-white text-[10px] font-extrabold uppercase tracking-[0.18em] px-3 py-1.5 rounded-md mb-6"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                Highest Value
                            </span>
                            <h2 className="font-black text-white leading-[1.04] tracking-[-0.025em] mb-5"
                                style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 3.5vw, 52px)" }}>
                                Complete Institutional{" "}
                                <span className="text-[#D72638]">Combo Suite</span>
                            </h2>
                            <p className="text-white/55 leading-[1.8] font-light mb-9 max-w-[460px]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(14px, 1.1vw, 17px)" }}>
                                Secure complete mastery across all markets. Choose one for deep focus, while getting the professional framework for all others.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {[
                                    "Save over ₹23,000 Total", "All 3 Market Mentorships",
                                    "5 Months Extended Training", "3 Months Free Trading Room",
                                    "Lifetime Content Access", "Priority Multi-Market Support",
                                ].map((label, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <ShieldCheck className="w-4 h-4 text-[#D72638] shrink-0" />
                                        <span className="text-white/80 text-[13px] sm:text-[14px] font-medium"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — pricing box */}
                        <div className="lg:w-[360px] px-8 sm:px-10 py-10 sm:py-14 flex flex-col justify-center"
                            style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                            <div className="rounded-2xl p-7 mb-6"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                <p className="text-white/40 text-[11px] font-extrabold uppercase tracking-[0.15em] mb-3"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Institutional Online</p>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-white font-black leading-none"
                                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(44px, 5vw, 40px)" }}>₹25,000</span>
                                    <span className="text-white/30 text-[15px]">+ GST</span>
                                </div>
                                <p className="text-[#D72638] text-[13px] font-bold mb-5"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>EMI: ₹6,500/mo × 6 Months</p>

                                <div className="h-px bg-white/[0.07] my-5" />

                                <p className="text-white/30 text-[11px] font-bold uppercase tracking-wide mb-1.5"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>In-Person Offline</p>
                                <p className="text-white/70 text-[20px] font-extrabold"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    ₹35,000 <span className="text-white/25 text-[13px]">+ GST</span>
                                </p>
                            </div>

                            <Link href={getEnrollUrl("Complete Combo Bundle")} target="_blank" className="no-underline">
                                <motion.button
                                    whileHover={{ y: -2, boxShadow: "0 16px 40px rgba(255,255,255,0.12)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full py-4 rounded-2xl flex items-center justify-center gap-2
                             bg-white hover:bg-zinc-100 text-zinc-900
                             text-[15px] font-extrabold border-none cursor-pointer
                             transition-colors duration-200"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    Secure the Combo
                                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ 5. RECURRING PLANS ═══════════════════════════════ */}
            <section ref={recurringRef} className="relative bg-[#F7F7F7] overflow-hidden py-14 sm:py-16 px-5 sm:px-8">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(rgba(215,38,56,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                <div className="relative max-w-[1120px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }} animate={isRecurringInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }} className="text-center mb-14">
                        <SectionLabel text="Ecosystem Membership" />
                        <h2 className="font-black text-zinc-950 leading-[1.02] tracking-[-0.04em] mb-4"
                            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(32px, 4vw, 54px)" }}>
                            Beyond the Curriculum
                        </h2>
                        <p className="text-zinc-500 max-w-[500px] mx-auto leading-[1.8] font-light"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(15px, 1.1vw, 18px)" }}>
                            Professional trading is a career, not a course. Stay connected with live insights, precise signals, and an elite community.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {[
                            { title: "Live Trading Room", price: "1,999", dur: "month", desc: "Real-time market analysis and mentor-guided trade execution.", dark: false },
                            { title: "Signal & Analysis", price: "999", dur: "month", desc: "Premium high-probability setups with precise SL/TP targets.", dark: false },
                            { title: "Elite Community", price: "4,999", dur: "year", desc: "Exclusive graduate networking events and mentor private calls.", dark: false },
                            { title: "Prop Firm Prep", price: "12,999", dur: "once", desc: "Intensive training to pass global funded challenges (FTMO, etc).", dark: true },
                        ].map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                animate={isRecurringInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.09, duration: 0.55 }}>
                                <motion.div
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.25 }}
                                    className="h-full flex flex-col rounded-[22px] p-6 sm:p-7"
                                    style={{
                                        background: plan.dark ? "#0A0A0A" : "#fff",
                                        border: plan.dark ? "1.5px solid #1C1C1C" : "1.5px solid #E8E8E8",
                                        boxShadow: plan.dark ? "0 20px 50px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,0,0,0.025)",
                                    }}>
                                    <h3 className="font-black text-[16px] uppercase tracking-[0.05em] mb-3"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: plan.dark ? "#fff" : "#0A0A0A" }}>
                                        {plan.title}
                                    </h3>
                                    <p className="text-[13px] leading-[1.65] mb-5 flex-1"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: plan.dark ? "rgba(255,255,255,0.45)" : "#777" }}>
                                        {plan.desc}
                                    </p>
                                    <div className="flex items-baseline gap-1 mb-5">
                                        <span className="font-black text-[22px] leading-none"
                                            style={{ fontFamily: "var(--font-playfair), serif", color: plan.dark ? "#D72638" : "#0A0A0A" }}>
                                            ₹{plan.price}
                                        </span>
                                        <span className="text-[11px] font-bold uppercase tracking-wide"
                                            style={{ color: plan.dark ? "rgba(255,255,255,0.25)" : "#AAA" }}>
                                            /{plan.dur}
                                        </span>
                                    </div>
                                    <Link href={getEnrollUrl(plan.title)} target="_blank" className="no-underline">
                                        <button className="w-full py-2.5 rounded-xl text-[13px] font-bold cursor-pointer transition-all duration-200 border"
                                            style={{
                                                fontFamily: "var(--font-dm-sans), sans-serif",
                                                background: plan.dark ? "#fff" : "transparent",
                                                color: plan.dark ? "#0A0A0A" : "#0A0A0A",
                                                borderColor: plan.dark ? "transparent" : "#E0E0E0",
                                            }}>
                                            Inquire Access
                                        </button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 6. STATS ══════════════════════════════════════════ */}
            <section className="py-14 sm:py-16 px-5 sm:px-8">
                <div className="max-w-[1120px] mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                        {[
                            { val: "90", unit: "Days", sub: "Elite Mentorship" },
                            { val: "3", unit: "×/Week", sub: "Live Face-Time" },
                            { val: "30", unit: "Max", sub: "Students Per Batch" },
                            { val: "EMI", unit: "", sub: "Interest-Free Plans" },
                        ].map((s, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                                className="text-center py-8 px-4 rounded-[22px] border border-zinc-200 bg-white">
                                <p className="font-black text-zinc-900 leading-none mb-2"
                                    style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 3.5vw, 38px)" }}>
                                    {s.val}{" "}
                                    <span className="text-[#D72638]" style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}>{s.unit}</span>
                                </p>
                                <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-[0.1em]"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{s.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 7. FAQ ════════════════════════════════════════════ */}
            <section ref={faqRef} className="relative bg-[#F7F7F7] py-14 sm:py-16 px-5 sm:px-8">
                <div className="max-w-[760px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }} animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }} className="text-center mb-12">
                        <SectionLabel text="Common Clarifications" />
                        <h2 className="font-black text-zinc-950 tracking-[-0.04em]"
                            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(30px, 4vw, 50px)" }}>
                            Frequently Asked Questions
                        </h2>
                    </motion.div>
                    <div>
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} faq={faq} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 8. FINAL CTA ══════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 px-5 sm:px-8 text-center overflow-hidden bg-[#0A0A0A]">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, rgba(215,38,56,0.14) 0%, transparent 70%)" }} />

                <div className="relative max-w-[680px] mx-auto">
                    <h2 className="font-black text-white leading-[1.02] tracking-[-0.04em] mb-5"
                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(34px, 5.5vw, 64px)" }}>
                        Ready to define your{" "}
                        <span className="text-[#D72638]">Legacy?</span>
                    </h2>
                    <p className="text-white/50 leading-[1.75] font-light mb-10"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(16px, 1.2vw, 20px)" }}>
                        Start with the ₹999 Workshop. Minimum risk, absolute foundation.
                    </p>
                    <Link href={getEnrollUrl("5-Day Starter Workshop")} target="_blank" className="no-underline inline-block w-full sm:w-auto">
                        <motion.button
                            whileHover={{ y: -3, boxShadow: "0 20px 56px rgba(215,38,56,0.48)" }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                         bg-[#D72638] hover:bg-[#C0202F] text-white
                         text-[16px] font-bold px-10 py-5 rounded-2xl
                         border-none cursor-pointer
                         shadow-[0_10px_36px_rgba(215,38,56,0.32)]
                         transition-colors duration-200"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            Begin Step One Now
                            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                        </motion.button>
                    </Link>
                </div>
            </section>

        </main>
    );
};

export default CoursesPage;