"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    Check, ArrowRight, ShieldCheck,
    Plus, Minus, Layout, Globe, Coins, Clock,
    CreditCard, Award, Flame, Wifi, MapPin,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { MdSchool, MdCreditCard, MdSwapHoriz, MdPeople, MdDiscount, MdCancel } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import PageHero from "../../_components/PageHero";
import BundleOffer from "../../_components/homepage/BundleOffer";

const WHATSAPP_URL = "https://wa.me/918750475852?text=";
const getEnrollUrl = (course: string) =>
    `${WHATSAPP_URL}${encodeURIComponent(`Hi MonarkFX Team,\n\nI want to enroll in the *${course}* program. Please share batch details, fees, and schedule.\n\nThank you!`)}`;

/* ─── DATA ─────────────────────────────────────────────────── */
const mentorshipBatches = [
    {
        id: "indian", slug: "indian-market-mastery", title: "Indian Market Mastery", icon: Layout,
        image: "/courses/indian.png",
        desc: "Dominate Nifty, Bank Nifty, F&O, and Equity Stocks with institutional precision.",
        options: [
            { label: "Online", price: "14,999", originalPrice: "22,000", emi: "5,000", emiMonths: "3", duration: "2 Months", tag: "Most Flexible" },
            { label: "Offline", price: "17,999", originalPrice: "25,000", emi: "6,000", emiMonths: "3", duration: "2 Months", tag: "Best Experience" },
        ],
        features: [
            "2 Month Intensive Program",
            "3 Sessions/Week with Mentor",
            "Nifty/Bank Nifty Specialist Strategies",
            "Module-based Risk Frameworks",
            "1 Month Free Trading Room Access",
            "Professional Certificate",
        ],
    },
    {
        id: "forex", slug: "forex-gold-specialist", title: "Forex & Gold Specialist", icon: Globe,
        image: "/courses/forex.png",
        desc: "Master EUR/USD, GBP/JPY, and XAUUSD with institutional order flow concepts.",
        options: [
            { label: "Online", price: "14,999", originalPrice: "22,000", emi: "5,000", emiMonths: "3", duration: "2 Months", tag: "Most Flexible" },
            { label: "Offline", price: "17,999", originalPrice: "25,000", emi: "6,000", emiMonths: "3", duration: "2 Months", tag: "Best Experience" },
        ],
        features: [
            "2 Month Intensive Program",
            "3 Sessions/Week with Mentor",
            "Forex Pairs & Gold Specialization",
            "Global Market Session Timings",
            "1 Month Free Trading Room Access",
            "Professional Certificate",
        ],
    },
    {
        id: "crypto", slug: "crypto-institutional-edge", title: "Crypto Institutional Edge", icon: Coins,
        image: "/courses/crypto.png",
        desc: "Dominate Spot & Futures across BTC, ETH, and high-alpha altcoin projects.",
        options: [
            { label: "Online", price: "14,999", originalPrice: "22,000", emi: "5,000", emiMonths: "3", duration: "2 Months", tag: "Most Flexible" },
            { label: "Offline", price: "17,999", originalPrice: "25,000", emi: "6,000", emiMonths: "3", duration: "2 Months", tag: "Best Experience" },
        ],
        features: [
            "2 Month Intensive Program",
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
    const [mode, setMode] = useState(1); // offline first
    const opt = batch.options[mode];
    const [hovered, setHovered] = useState(false);
    const Icon = batch.icon;
    const discountPct = Math.round((1 - parseInt(opt.price.replace(",", "")) / parseInt(opt.originalPrice.replace(",", ""))) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <Link href={`/courses/programs/${batch.slug}`} className="no-underline block h-full">
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.28 }}
                className="h-full flex flex-col rounded-2xl bg-white relative overflow-hidden cursor-pointer"
                style={{
                    border: hovered ? "1.5px solid rgba(215,38,56,0.32)" : "1.5px solid #EBEBEB",
                    boxShadow: hovered ? "0 28px 64px rgba(0,0,0,0.07), 0 0 0 4px rgba(215,38,56,0.03)" : "0 8px 28px rgba(0,0,0,0.03)",
                    transition: "border-color 0.24s, box-shadow 0.24s",
                }}
            >
                {/* Image */}
                <div className="relative h-44 overflow-hidden shrink-0 bg-[#0A0A0A]">
                    <Image src={batch.image} alt={batch.title} fill
                        className="object-cover transition-transform duration-500"
                        style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
                        sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.2) 55%, transparent 100%)" }} />

                    {/* Limited offer top-left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(215,38,56,0.9)", backdropFilter: "blur(4px)" }}>
                        <Flame className="w-3 h-3 text-white" />
                        <span className="text-white text-[9px] font-extrabold uppercase tracking-[0.1em]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Limited Offer</span>
                    </div>

                    {/* Discount badge top-right */}
                    <div className="absolute top-3 right-3 w-11 h-11 rounded-full flex flex-col items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #D72638, #A01020)", boxShadow: "0 4px 12px rgba(215,38,56,0.5)" }}>
                        <span className="text-white text-[7px] font-bold leading-none">SAVE</span>
                        <span className="text-white text-[13px] font-black leading-tight">{discountPct}%</span>
                    </div>

                    {/* Icon + duration bottom */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "rgba(215,38,56,0.85)", backdropFilter: "blur(4px)" }}>
                            <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
                            <Clock className="w-3 h-3 text-[#D72638]" />
                            <span className="text-white text-[9px] font-bold">{opt.duration}</span>
                        </div>
                    </div>

                    {/* Title bottom-right */}
                    <div className="absolute bottom-3 right-3 left-28">
                        <p className="text-white font-black leading-tight text-right tracking-[-0.02em]"
                            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(13px, 1.2vw, 16px)" }}>
                            {batch.title}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col flex-1 p-5 sm:p-6 relative">
                    {/* Desc */}
                    <p className="text-zinc-500 text-[13px] leading-[1.65] font-light mb-4"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        {batch.desc}
                    </p>

                    {/* Offline / Online toggle — OFFLINE FIRST */}
                    <div className="flex bg-zinc-100 rounded-xl p-1 mb-4">
                        {[batch.options[1], batch.options[0]].map((o, i) => {
                            const actualIdx = i === 0 ? 1 : 0;
                            return (
                                <button key={o.label} onClick={(e) => { e.preventDefault(); setMode(actualIdx); }}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[10px] text-[12px] font-bold cursor-pointer transition-all duration-200 border-none"
                                    style={{
                                        fontFamily: "var(--font-dm-sans), sans-serif",
                                        background: mode === actualIdx ? "#fff" : "transparent",
                                        color: mode === actualIdx ? "#0A0A0A" : "#999",
                                        boxShadow: mode === actualIdx ? "0 2px 8px rgba(0,0,0,0.07)" : "none",
                                    }}>
                                    {actualIdx === 1
                                        ? <MapPin className="w-3 h-3" style={{ color: mode === actualIdx ? "#D72638" : "#BBB" }} />
                                        : <Wifi className="w-3 h-3" style={{ color: mode === actualIdx ? "#D72638" : "#BBB" }} />}
                                    {o.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Price block */}
                    <motion.div
                        key={`${batch.id}-${mode}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mb-5 p-4 rounded-2xl"
                        style={{ background: "linear-gradient(135deg, #FFF5F5, #FFF)", border: "1px solid rgba(215,38,56,0.12)" }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-zinc-400 text-[13px] line-through">₹{opt.originalPrice}</span>
                            <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 uppercase tracking-wide">
                                {discountPct}% off
                            </span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-zinc-900 font-black leading-none"
                                style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(36px, 4vw, 44px)" }}>
                                ₹{opt.price}
                            </span>
                            <span className="text-zinc-500 text-[13px] font-semibold">+ GST</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-3.5 h-3.5 text-[#D72638] shrink-0" />
                            <span className="text-[#D72638] text-[12px] font-bold"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                EMI: ₹{opt.emi}/mo × {opt.emiMonths} months
                            </span>
                        </div>
                    </motion.div>

                    {/* Features */}
                    <div className="flex flex-col gap-2.5 flex-1 mb-5">
                        {batch.features.map((f, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                                <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-[2px]">
                                    <Check className="w-2 h-2 text-emerald-500" strokeWidth={3.5} />
                                </div>
                                <span className="text-zinc-600 text-[12px] sm:text-[13px] leading-snug"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    {f}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* View details CTA — whole card links to the SEO course page */}
                    <div
                        className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-[14px] transition-all duration-200"
                        style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            background: hovered ? "#D72638" : "#0A0A0A",
                            color: "#fff",
                        }}>
                        View Course Details
                        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-4 h-[3px] rounded-full"
                        style={{
                            background: "linear-gradient(90deg, #D72638, rgba(215,38,56,0.1))",
                            transform: hovered ? "scaleX(1)" : "scaleX(0.12)",
                            transformOrigin: "left",
                            transition: "transform 0.36s cubic-bezier(0.22, 1, 0.36, 1)",
                            opacity: hovered ? 1 : 0.35,
                        }} />
                </div>
            </motion.div>
            </Link>
        </motion.div>
    );
};

const FAQItem = ({ faq, icon, index, inView }: { faq: typeof faqs[0]; icon: React.ReactNode; index: number; inView: boolean }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 + index * 0.06, duration: 0.5 }}
            className="rounded-2xl overflow-hidden transition-all duration-200"
            style={{
                background: open ? "#fff" : "#fff",
                border: open ? "1.5px solid rgba(215,38,56,0.25)" : "1.5px solid #F0F0F0",
                boxShadow: open ? "0 8px 28px rgba(215,38,56,0.06)" : "0 2px 8px rgba(0,0,0,0.03)",
            }}>
            <button onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 bg-none border-none cursor-pointer text-left gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-[16px] transition-colors duration-200"
                        style={{ background: open ? "rgba(215,38,56,0.1)" : "#F5F5F5", color: open ? "#D72638" : "#888" }}>
                        {icon}
                    </div>
                    <span className="text-zinc-900 text-[14px] sm:text-[15px] font-bold leading-snug"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        {faq.q}
                    </span>
                </div>
                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center transition-colors duration-200"
                    style={{ background: open ? "rgba(215,38,56,0.1)" : "#F0F0F0" }}>
                    {open
                        ? <Minus className="w-3 h-3 text-[#D72638]" />
                        : <Plus className="w-3 h-3 text-zinc-500" />}
                </div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden">
                        <p className="text-zinc-500 text-[13px] sm:text-[14px] leading-[1.75] pb-5 pl-[52px] pr-5 font-light"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            {faq.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
const CoursesPage = () => {
    const batchRef = useRef(null);
    const comboRef = useRef(null);
    const addonsRef = useRef(null);
    const faqRef = useRef(null);
    const isBatchInView = useInView(batchRef, { once: true, margin: "-60px" });
    const isComboInView = useInView(comboRef, { once: true, margin: "-60px" });
    const isAddonsInView = useInView(addonsRef, { once: true, margin: "-60px" });
    const isFaqInView = useInView(faqRef, { once: true, margin: "-60px" });

    return (
        <main className="bg-white">

            {/* ══ 1. HERO ══════════════════════════════════════════ */}
            <PageHero
                badge="Courses"
                title="Master Trading."
                titleAccent="On Your Terms."
                description="Indian Markets, Forex, or Crypto — choose your domain, embark on a 90-day elite framework, and emerge as a confident, disciplined trader."
                primaryBtn={{ text: "Enroll via WhatsApp", href: "https://wa.me/918750475852?text=Hi%20MonarkFX,%20I%20want%20to%20enroll%20in%20a%20course", wa: true }}
                secondaryBtn={{ text: "Explore Programs", href: "#programs" }}
            />

            {/* ══ 2. STARTER WORKSHOP ══════════════════════════════ */}
            <section className="py-14 sm:py-16 px-5 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="rounded overflow-hidden relative flex flex-col lg:flex-row"
                        style={{
                            background: "#0A0A0A",
                            border: "1.5px solid #1C1C1C",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
                        }}>
                        <div className="h-px w-full lg:hidden bg-gradient-to-r from-transparent via-[#D72638]/40 to-transparent absolute top-0" />
                        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D72638]/25 to-transparent" />

                        {/* Content */}
                        <div className="flex-[1.2] px-8 sm:px-12 py-10  relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded mb-7"
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

                        {/* Visual — bento pricing grid */}
                        <div className="flex-[0.75] min-h-[320px] lg:min-h-0 flex flex-col justify-center p-6 relative overflow-hidden"
                            style={{ background: "linear-gradient(140deg, #0D0D0D 0%, #0A0A0A 100%)", borderLeft: "1px solid #1C1C1C" }}>
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                                style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

                            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>What You Learn</p>

                            {/* 2×3 bento grid */}
                            <div className="grid grid-cols-2 gap-2 relative z-10">
                                {[
                                    { label: "Market Structure", sub: "Price action", hot: true },
                                    { label: "Liquidity Concepts", sub: "Smart money", hot: false },
                                    { label: "Risk Management", sub: "Position sizing", hot: false },
                                    { label: "Trade Planning", sub: "Entry & exit", hot: true },
                                    { label: "Live Sessions", sub: "Daily Q&A", hot: false },
                                    { label: "Certificate", sub: "ISO-verified", hot: true },
                                ].map((item, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.07 }}
                                        className="relative rounded-xl p-3 flex flex-col gap-1 overflow-hidden"
                                        style={{
                                            background: item.hot ? "rgba(215,38,56,0.1)" : "rgba(255,255,255,0.04)",
                                            border: item.hot ? "1px solid rgba(215,38,56,0.3)" : "1px solid rgba(255,255,255,0.07)",
                                        }}>
                                        {item.hot && (
                                            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#D72638]"
                                                style={{ boxShadow: "0 0 6px rgba(215,38,56,0.8)" }} />
                                        )}
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-3.5 h-3.5 rounded flex items-center justify-center shrink-0"
                                                style={{ background: item.hot ? "rgba(215,38,56,0.25)" : "rgba(255,255,255,0.08)" }}>
                                                <Check className="w-2 h-2" style={{ color: item.hot ? "#D72638" : "#666" }} strokeWidth={3} />
                                            </div>
                                            <p className="text-[12px] font-bold leading-tight"
                                                style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: item.hot ? "#fff" : "rgba(255,255,255,0.7)" }}>
                                                {item.label}
                                            </p>
                                        </div>
                                        <p className="text-[10px] pl-5"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: item.hot ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.25)" }}>
                                            {item.sub}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom stat */}
                            <div className="flex items-center gap-3 mt-4 pt-4 relative z-10"
                                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ background: "rgba(215,38,56,0.12)", border: "1px solid rgba(215,38,56,0.25)" }}>
                                    <Award className="w-4 h-4 text-[#D72638]" />
                                </div>
                                <div>
                                    <p className="text-white text-[12px] font-bold leading-tight"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Certified Starter</p>
                                    <p className="text-white/30 text-[10px]"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>First credential in your institutional career</p>
                                </div>
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
            <BundleOffer />

            {/* ══ 5. BEYOND CURRICULUM ══════════════════════════════ */}
            <section ref={addonsRef} className="relative bg-white overflow-hidden py-20 sm:py-28 px-5 sm:px-8">
                {/* Subtle grid */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(rgba(215,38,56,0.035) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
                {/* Radial glow behind featured card */}
                <div className="absolute right-0 bottom-0 w-[600px] h-[600px] pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 80% 80%, rgba(215,38,56,0.07) 0%, transparent 65%)" }} />

                <div className="relative max-w-[1120px] mx-auto">

                    {/* ── Header ── */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={isAddonsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
                            style={{ background: "rgba(215,38,56,0.06)", border: "1px solid rgba(215,38,56,0.15)" }}>
                            <span className="text-[10px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Beyond the Curriculum</span>
                        </div>
                        <h2 className="font-black text-zinc-950 leading-[1.02] tracking-[-0.05em] mb-4"
                            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(34px, 5vw, 58px)" }}>
                            Scale Your <span className="text-[#D72638]">Edge</span>
                        </h2>
                        <p className="text-zinc-400 max-w-[440px] mx-auto leading-[1.8] font-light"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(14px, 1vw, 17px)" }}>
                            Professional trading is a career, not a course. Stay connected with live insights, signals, and an elite community.
                        </p>
                    </motion.div>

                    {/* ── Cybernetic bento grid ── */}
                    <style>{`
                        .cy-bento-item {
                            position: relative;
                            background: #0D0D0D;
                            border: 1px solid #1C1C1C;
                            border-radius: 16px;
                            overflow: hidden;
                            cursor: default;
                            transition: border-color 0.2s, box-shadow 0.2s;
                        }
                        .cy-bento-item::before {
                            content: '';
                            position: absolute;
                            inset: 0;
                            border-radius: 16px;
                            opacity: 0;
                            background: radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(215,38,56,0.12), transparent 60%);
                            transition: opacity 0.3s;
                            pointer-events: none;
                        }
                        .cy-bento-item:hover::before { opacity: 1; }
                        .cy-bento-item:hover { border-color: rgba(215,38,56,0.35); box-shadow: 0 20px 48px rgba(0,0,0,0.35); }
                    `}</style>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={isAddonsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                        {[
                            { title: "Live Trading Room", price: "1,999", dur: "/mo", icon: "📡", desc: "Real-time market analysis and mentor-guided trade execution." },
                            { title: "Setup & Trade Analysis", price: "2,999", dur: "/mo", icon: "📊", desc: "Daily premium setups with detailed entry, SL, TP and analysis." },
                            { title: "Elite Community", price: "5,999", dur: "/yr", icon: "👥", desc: "Exclusive graduate networking events and mentor private calls." },
                            { title: "Prop Firm Prep", price: "11,999", dur: " once", icon: "🏆", desc: "Intensive training to pass global funded challenges (FTMO, etc)." },
                        ].map((plan, i) => {
                            const ref = React.useRef<HTMLDivElement>(null);
                            return (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={isAddonsInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.1 + i * 0.07 }}>
                                    <div ref={ref} className="cy-bento-item h-full flex flex-col p-5"
                                        onMouseMove={e => {
                                            if (!ref.current) return;
                                            const r = ref.current.getBoundingClientRect();
                                            ref.current.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
                                            ref.current.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
                                        }}>
                                        <span className="text-xl mb-3 block">{plan.icon}</span>
                                        <h3 className="font-bold text-[13px] text-white mb-1.5 leading-tight"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{plan.title}</h3>
                                        <p className="text-[11px] text-zinc-500 leading-[1.55] mb-4 flex-1"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{plan.desc}</p>
                                        <div className="flex items-baseline gap-0.5 mb-3.5">
                                            <span className="font-black text-[#D72638] leading-none text-[18px]"
                                                style={{ fontFamily: "var(--font-playfair), serif" }}>₹{plan.price}</span>
                                            <span className="text-[10px] font-semibold text-zinc-600 ml-0.5">{plan.dur}</span>
                                        </div>
                                        <Link href={getEnrollUrl(plan.title)} target="_blank" className="no-underline">
                                            <motion.button whileHover={{ boxShadow: "0 6px 16px rgba(37,211,102,0.4)" }} whileTap={{ scale: 0.97 }}
                                                className="w-full py-2 rounded-xl flex items-center justify-center gap-1.5 text-[12px] font-bold text-white border-none cursor-pointer transition-colors"
                                                style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#25D366" }}>
                                                <FaWhatsapp size={13} /> Inquire
                                            </motion.button>
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* ── 2 featured cards ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-4 mb-14">

                        {/* Elite Trading Lab — white premium */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={isAddonsInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.35 }}>
                            <motion.div whileHover={{ y: -6, boxShadow: "0 32px 72px rgba(0,0,0,0.08)" }}
                                transition={{ duration: 0.25 }}
                                className="h-full flex flex-col rounded-3xl p-8 sm:p-9 bg-white"
                                style={{ border: "1.5px solid #EEEEEE", boxShadow: "0 8px 32px rgba(0,0,0,0.04)" }}>
                                <div className="flex items-start justify-between mb-5">
                                    <div>
                                        <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-[0.18em] block mb-1"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Membership</span>
                                        <h3 className="font-black text-zinc-900 tracking-[-0.03em]"
                                            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(22px, 2vw, 28px)" }}>
                                            Elite Trading Lab
                                        </h3>
                                    </div>
                                    <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mt-1"
                                        style={{ background: "rgba(215,38,56,0.07)", color: "#D72638", border: "1px solid rgba(215,38,56,0.15)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                        Monthly
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-1.5 mb-1">
                                    <span className="font-black text-zinc-900 leading-none"
                                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(38px, 4vw, 50px)" }}>₹9,999</span>
                                    <span className="text-zinc-400 text-[14px] font-medium">/month</span>
                                </div>
                                <p className="text-zinc-400 text-[12px] mb-6"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>+ GST · Cancel anytime</p>

                                <div className="h-px bg-zinc-100 mb-6" />

                                <div className="flex flex-col gap-2.5 flex-1 mb-7">
                                    {["Daily Live Market Analysis", "Real-time Trade Ideas & Setups", "Mentor-led Community Calls", "Monthly Q&A with Mentors", "Trade Journal Templates", "Monthly Performance Review"].map((f, i) => (
                                        <div key={i} className="flex items-center gap-2.5">
                                            <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                                                <Check className="w-2 h-2 text-emerald-500" strokeWidth={3.5} />
                                            </div>
                                            <span className="text-zinc-600 text-[13px]"
                                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{f}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link href={getEnrollUrl("Elite Trading Lab")} target="_blank" className="no-underline">
                                    <motion.button whileHover={{ y: -2, boxShadow: "0 14px 36px rgba(37,211,102,0.4)" }} whileTap={{ scale: 0.97 }}
                                        className="w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 font-bold text-[14px] border-none cursor-pointer transition-all"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#25D366", color: "#fff", boxShadow: "0 6px 20px rgba(37,211,102,0.22)" }}>
                                        <FaWhatsapp size={17} /> Inquire Access
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Mastery Combo — dark featured */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={isAddonsInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.42 }}
                            className="relative">
                            {/* Animated border glow */}
                            <div className="absolute -inset-[1px] rounded-3xl pointer-events-none"
                                style={{ background: "linear-gradient(135deg, rgba(215,38,56,0.5), rgba(215,38,56,0.05) 50%, rgba(215,38,56,0.3))", opacity: 0.6 }} />

                            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}
                                className="relative h-full flex flex-col rounded-3xl p-8 sm:p-9 overflow-hidden"
                                style={{ background: "linear-gradient(150deg, #0D0D0D 0%, #151515 100%)", boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }}>

                                {/* Radial red glow inside card */}
                                <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                                    style={{ background: "radial-gradient(circle at 80% 20%, rgba(215,38,56,0.18) 0%, transparent 65%)" }} />
                                <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
                                    style={{ background: "radial-gradient(circle at 20% 80%, rgba(215,38,56,0.08) 0%, transparent 65%)" }} />

                                {/* Best Value badge */}
                                <div className="absolute top-6 right-6">
                                    <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full"
                                        style={{ background: "#D72638", color: "#fff", fontFamily: "var(--font-dm-sans), sans-serif", boxShadow: "0 4px 12px rgba(215,38,56,0.4)" }}>
                                        Best Value
                                    </span>
                                </div>

                                <div className="relative">
                                    <span className="text-[10px] font-extrabold text-zinc-600 uppercase tracking-[0.18em] block mb-1"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Combo Suite</span>
                                    <h3 className="font-black text-white tracking-[-0.03em] mb-4"
                                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px, 2.5vw, 32px)" }}>
                                        Mastery <span className="text-[#D72638]">Combo</span>
                                    </h3>

                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="font-black text-white leading-none"
                                            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(40px, 4.5vw, 54px)" }}>₹29,999</span>
                                        <div>
                                            <span className="text-zinc-500 text-[13px] line-through block leading-none">₹42,000</span>
                                            <span className="text-zinc-400 text-[12px]">+ GST</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 mb-6">
                                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-0.5"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Save ₹12,001</span>
                                        <span className="text-zinc-600 text-[11px]"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>· EMI ₹5,000/mo × 6</span>
                                    </div>

                                    <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
                                        {["Indian + Forex + Crypto", "4 Month Program", "All 3 Market Mentorships", "1 Year Elite Membership", "Lifetime Mentorship Access", "Priority Multi-Market Support", "Lifetime Content Access", "Personal Coaching Call"].map((f, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
                                                    style={{ background: "rgba(215,38,56,0.2)", border: "1px solid rgba(215,38,56,0.35)" }}>
                                                    <Check className="w-1.5 h-1.5 text-[#D72638]" strokeWidth={3} />
                                                </div>
                                                <span className="text-zinc-300 text-[12px]"
                                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link href={getEnrollUrl("Mastery Combo — All 3 Courses")} target="_blank" className="no-underline">
                                        <motion.button
                                            whileHover={{ y: -3, boxShadow: "0 18px 48px rgba(37,211,102,0.5)" }}
                                            whileTap={{ scale: 0.97 }}
                                            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 font-extrabold text-[15px] border-none cursor-pointer transition-all"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#25D366", color: "#fff", boxShadow: "0 8px 28px rgba(37,211,102,0.35)" }}>
                                            <FaWhatsapp size={18} /> Enroll via WhatsApp
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ── Trust metrics strip ── */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={isAddonsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-7 px-8 rounded-2xl"
                        style={{ background: "#F8F8F8", border: "1px solid #EEEEEE" }}>
                        {[
                            { value: "1,000+", label: "Students" },
                            { value: "4.9★", label: "Google Rating" },
                            { value: "ISO", label: "Certified" },
                            { value: "₹10Cr+", label: "PnL Generated" },
                        ].map((s, i) => (
                            <React.Fragment key={i}>
                                <div className="text-center">
                                    <p className="font-black text-zinc-900 leading-none mb-0.5"
                                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(18px, 2vw, 24px)" }}>
                                        {s.value}
                                    </p>
                                    <p className="text-zinc-400 text-[11px] font-semibold uppercase tracking-[0.1em]"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{s.label}</p>
                                </div>
                                {i < 3 && <div className="hidden sm:block w-px h-8 bg-zinc-200" />}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ 7. FAQ ════════════════════════════════════════════ */}
            <section ref={faqRef} className="relative bg-white py-16 sm:py-20 px-5 sm:px-8"
                style={{ borderTop: "1px solid #F0F0F0" }}>
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(rgba(215,38,56,0.03) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

                <div className="relative max-w-[1000px] mx-auto">
                    <div className="flex flex-col gap-10 md:flex-row md:gap-16">

                        {/* Left sticky — heading */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={isFaqInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="md:w-1/3">
                            <div className="md:sticky md:top-24">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                                    style={{ background: "rgba(215,38,56,0.07)", border: "1px solid rgba(215,38,56,0.15)" }}>
                                    <span className="text-[10px] font-extrabold text-[#D72638] uppercase tracking-[0.2em]"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Help Center</span>
                                </div>
                                <h2 className="font-black text-zinc-950 leading-[1.04] tracking-[-0.04em] mb-4"
                                    style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(26px, 3vw, 38px)" }}>
                                    Frequently<br />Asked<br />
                                    <span className="text-[#D72638]">Questions</span>
                                </h2>
                                <p className="text-zinc-400 text-[13px] leading-[1.7] mb-6"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    Can&apos;t find an answer? Reach us directly on WhatsApp.
                                </p>
                                <a href="https://wa.me/918750475852" target="_blank" rel="noopener noreferrer" className="no-underline">
                                    <motion.button whileHover={{ y: -2, boxShadow: "0 10px 28px rgba(37,211,102,0.4)" }} whileTap={{ scale: 0.97 }}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-[13px] font-bold border-none cursor-pointer"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#25D366", boxShadow: "0 4px 14px rgba(37,211,102,0.25)" }}>
                                        <FaWhatsapp size={15} /> Ask on WhatsApp
                                    </motion.button>
                                </a>
                            </div>
                        </motion.div>

                        {/* Right — accordion */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={isFaqInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="md:w-2/3 flex flex-col gap-2">
                            {faqs.map((faq, i) => {
                                const icons = [
                                    <MdSchool key={0} />, <MdCreditCard key={1} />, <MdSwapHoriz key={2} />,
                                    <MdPeople key={3} />, <MdDiscount key={4} />, <MdCancel key={5} />,
                                ];
                                return (
                                    <FAQItem key={i} faq={faq} icon={icons[i % icons.length]} index={i} inView={isFaqInView} />
                                );
                            })}
                        </motion.div>
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







