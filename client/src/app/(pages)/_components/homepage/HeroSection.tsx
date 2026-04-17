"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Zap, Shield, ArrowUpRight } from "lucide-react";

interface CandleData {
    open: number; high: number; low: number; close: number;
}

const WHATSAPP_URL =
    "https://wa.me/918750475852?text=Hi,%20I'd%20like%20to%20learn%20more%20about%20MonarkFX%20mentorship";

const chartTop = 20;
const chartBottom = 130;
const chartHeight = chartBottom - chartTop;
const priceMin = 100;
const priceMax = 500;
const priceRange = priceMax - priceMin;
const priceToY = (p: number) =>
    chartBottom - ((p - priceMin) / priceRange) * chartHeight;

const generateCandle = (prevClose: number): CandleData => {
    const dir = Math.random() > 0.45 ? 1 : -1;
    const change = dir * (Math.random() * 30 + 10);
    const open = prevClose;
    const close = Math.max(130, Math.min(470, open + change));
    return {
        open: Math.max(120, Math.min(480, open)),
        high: Math.min(490, Math.max(open, close) + Math.random() * 18 + 4),
        low: Math.max(110, Math.min(open, close) - Math.random() * 18 + 4),
        close: Math.max(120, Math.min(480, close)),
    };
};

const HeroSection = () => {
    const [candles, setCandles] = useState<CandleData[]>([]);
    const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);

    useEffect(() => {
        const init: CandleData[] = [];
        let p = 280;
        for (let i = 0; i < 18; i++) {
            const c = generateCandle(p);
            init.push(c);
            p = c.close;
        }
        setCandles(init);
        const iv = setInterval(() => {
            setCandles((prev) => {
                if (!prev.length) return prev;
                const n = [...prev];
                n.shift();
                n.push(generateCandle(n[n.length - 1]?.close || 280));
                return n;
            });
        }, 2200);
        return () => clearInterval(iv);
    }, []);

    const currentPrice = candles.length
        ? Math.round(candles[candles.length - 1].close)
        : 280;
    const prevPrice =
        candles.length > 1 ? Math.round(candles[candles.length - 2].close) : 280;
    const priceChange = currentPrice - prevPrice;
    const isUp = candles.length
        ? candles[candles.length - 1].close >= candles[candles.length - 1].open
        : true;

    return (
        <section className="relative overflow-hidden bg-[#FAFAFA] min-h-screen flex flex-col items-center pt-20 sm:pt-24">

            {/* ── Background ── */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(215,38,56,0.09) 0%, transparent 68%), #FAFAFA",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(215,38,56,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(215,38,56,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    maskImage:
                        "radial-gradient(ellipse 100% 55% at 50% 0%, black 0%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 100% 55% at 50% 0%, black 0%, transparent 100%)",
                }}
            />

            {/* ── HERO TEXT ── */}
            <div className="relative z-10 flex flex-col items-center text-center w-full px-5 max-w-[940px] mx-auto">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="mb-7 sm:mb-8"
                >
                    <div className="inline-flex items-center gap-2.5 px-4 py-[7px] rounded-full border border-zinc-200 bg-white shadow-sm">
                        <span
                            className="text-white text-[10px] font-extrabold tracking-[0.1em] uppercase px-2 py-0.5 rounded"
                            style={{ background: "#D72638", fontFamily: "var(--font-inter), sans-serif" }}
                        >
                            Elite
                        </span>
                        <span
                            className="text-[13px] font-semibold text-zinc-800"
                            style={{ fontFamily: "var(--font-inter), sans-serif" }}
                        >
                            MonarkFX — Premium Trading Intelligence
                        </span>
                        <ArrowRight className="w-3 h-3 text-[#D72638]" />
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-heading font-bold text-zinc-950 leading-[1.0] tracking-[-0.04em] mb-6 sm:mb-7"
                    style={{
                        fontSize: "clamp(46px, 8.5vw, 92px)",
                    }}
                >
                    Master the{" "}
                    <br className="hidden sm:block" />
                    <span className="text-[#D72638]">Market</span> Monarchy.
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.18 }}
                    className="text-zinc-500 max-w-[600px] mx-auto leading-[1.75] font-light mb-10 sm:mb-12"
                    style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "clamp(16px, 1.4vw, 20px)",
                        letterSpacing: "-0.01em",
                    }}
                >
                    The definitive framework for institutional-grade price action. Define
                    your legacy with elite mentorship and tactical discipline across stocks,
                    forex, and crypto.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.24 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-6"
                >
                    <Link href={WHATSAPP_URL} target="_blank" className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ y: -2, boxShadow: "0 18px 52px rgba(215,38,56,0.38)" }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                         bg-[#D72638] hover:bg-[#C0202F] text-white
                         text-[15px] font-extrabold px-8 py-[14px] rounded-[13px]
                         border-none cursor-pointer
                         shadow-[0_4px_22px_rgba(215,38,56,0.3)]
                         transition-colors duration-200"
                            style={{ fontFamily: "var(--font-inter), sans-serif" }}
                        >
                            Enroll via WhatsApp
                            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                        </motion.button>
                    </Link>

                    <Link href="/pricing" className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ y: -2, backgroundColor: "#F0F0F0" }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                         bg-white hover:bg-zinc-100 text-zinc-900
                         text-[15px] font-bold px-8 py-[14px] rounded-[13px]
                         border border-zinc-200 cursor-pointer
                         transition-colors duration-200"
                            style={{ fontFamily: "var(--font-inter), sans-serif" }}
                        >
                            View Pricing Plans
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Trust row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-14 sm:mb-16"
                >
                    {[
                        { icon: <Shield className="w-3 h-3 text-emerald-500" />, text: "No API dependency" },
                        { icon: <Zap className="w-3 h-3 text-[#D72638]" />, text: "Premium Content" },
                        { icon: <TrendingUp className="w-3 h-3 text-zinc-400" />, text: "Verified Systems" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            {item.icon}
                            <span
                                className="text-[12px] font-semibold text-zinc-500"
                                style={{ fontFamily: "var(--font-inter), sans-serif" }}
                            >
                                {item.text}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ── DASHBOARD MOCKUP ── */}
            <motion.div
                initial={{ opacity: 0, y: 52 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.42 }}
                className="relative z-10 w-full px-4 sm:px-6 max-w-[1120px] mx-auto"
            >
                {/* Red underglow */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        left: "50%", top: "30%",
                        transform: "translate(-50%,-50%)",
                        width: "60%", height: 160,
                        background:
                            "radial-gradient(ellipse, rgba(215,38,56,0.13) 0%, transparent 70%)",
                        filter: "blur(32px)",
                    }}
                />

                {/* Browser chrome wrapper */}
                <div
                    className="rounded-t-[18px] overflow-hidden"
                    style={{
                        border: "1.5px solid #E8E8E8",
                        borderBottom: "none",
                        boxShadow:
                            "0 -4px 48px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.025)",
                        background: "#fff",
                    }}
                >
                    {/* Browser top bar */}
                    <div className="flex items-center gap-3 px-4 sm:px-5 py-[10px] bg-[#F5F5F5] border-b border-[#EBEBEB]">
                        <div className="flex items-center gap-1.5 shrink-0">
                            {["#FF5F57", "#FFBD2E", "#28CA41"].map((c, i) => (
                                <div
                                    key={i}
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ background: c }}
                                />
                            ))}
                        </div>
                        <div
                            className="flex-1 max-w-[260px] mx-auto bg-white border border-[#E0E0E0] rounded-md px-3 py-1 flex items-center gap-2"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span
                                className="text-[11px] text-zinc-400 truncate"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                monarkfx.com/dashboard
                            </span>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5 shrink-0">
                            <motion.div
                                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.1, repeat: Infinity }}
                            />
                            <span
                                className="text-[10px] font-semibold text-emerald-500"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                LIVE
                            </span>
                        </div>
                    </div>

                    {/* ── Desktop layout ── */}
                    <div
                        className="hidden md:grid bg-white"
                        style={{ gridTemplateColumns: "210px 1fr", minHeight: 420 }}
                    >
                        {/* Sidebar */}
                        <div className="border-r border-[#F0F0F0] p-4 bg-[#FAFAFA]">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center bg-[#D72638]">
                                    <TrendingUp className="w-[13px] h-[13px] text-white" />
                                </div>
                                <span
                                    className="text-[13px] font-bold text-zinc-900"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    MonarkFX Pro
                                </span>
                            </div>

                            {[
                                { label: "Dashboard", active: true },
                                { label: "Live Charts" },
                                { label: "My Courses" },
                                { label: "Signals" },
                                { label: "Community" },
                                { label: "Reports" },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="px-3 py-[7px] rounded-[7px] mb-0.5 cursor-pointer transition-colors"
                                    style={{ background: item.active ? "#FFF0F2" : "transparent" }}
                                >
                                    <span
                                        className="text-[12px]"
                                        style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontWeight: item.active ? 600 : 400,
                                            color: item.active ? "#D72638" : "#666",
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            ))}

                            <div className="mt-5 pt-4 border-t border-[#F0F0F0]">
                                <p
                                    className="text-[10px] text-zinc-300 uppercase tracking-[0.08em] mb-2"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    Active Courses
                                </p>
                                {["Forex Mastery", "Price Action", "ICT Concepts"].map(
                                    (c, i) => (
                                        <div key={i} className="flex items-center gap-2 mb-1.5">
                                            <div
                                                className="w-[5px] h-[5px] rounded-full shrink-0"
                                                style={{
                                                    background:
                                                        i === 0 ? "#D72638" : i === 1 ? "#AAA" : "#DDD",
                                                }}
                                            />
                                            <span
                                                className="text-[11px] text-zinc-500"
                                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                            >
                                                {c}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="p-4 sm:p-5">
                            {/* Header row */}
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p
                                        className="text-[13px] text-zinc-500"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        Portfolio Overview
                                    </p>
                                    <p
                                        className="text-[11px] text-zinc-300"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        Your trading performance
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    {["1D", "1W", "1M", "1Y"].map((t, i) => (
                                        <div
                                            key={i}
                                            className="px-2.5 py-1 rounded-md cursor-pointer text-[11px] transition-colors"
                                            style={{
                                                fontFamily: "'DM Sans', sans-serif",
                                                background: i === 1 ? "#D72638" : "#F5F5F5",
                                                color: i === 1 ? "#fff" : "#888",
                                                fontWeight: i === 1 ? 600 : 400,
                                            }}
                                        >
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Metric cards — hidden on smaller desktop */}
                            <div
                                className="hidden lg:grid gap-2.5 mb-4"
                                style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
                            >
                                {[
                                    { label: "Portfolio P&L", value: "+₹24,508", badge: "+24.5%", up: true },
                                    { label: "Courses Enrolled", value: "8", badge: "2 active", up: true },
                                    { label: "Win Rate", value: "73%", badge: "+5%", up: true },
                                    { label: "Signals Used", value: "456", badge: "This month", up: false },
                                ].map((m, i) => (
                                    <div
                                        key={i}
                                        className="rounded-[11px] p-3"
                                        style={{
                                            background: "#FAFAFA",
                                            border: "1px solid #F0F0F0",
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span
                                                className="text-[10px] text-zinc-400"
                                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                            >
                                                {m.label}
                                            </span>
                                            <span
                                                className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                                                style={{
                                                    fontFamily: "'DM Sans', sans-serif",
                                                    color: m.up ? "#16a34a" : "#888",
                                                    background: m.up ? "rgba(34,197,94,0.1)" : "#F0F0F0",
                                                }}
                                            >
                                                {m.badge}
                                            </span>
                                        </div>
                                        <p
                                            className="text-[19px] font-bold text-zinc-900"
                                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                        >
                                            {m.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Chart */}
                            <div
                                className="rounded-[13px] p-4"
                                style={{
                                    background: "#0A0A0A",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <div className="flex items-center justify-between mb-2.5">
                                    <div className="flex items-baseline gap-2">
                                        <motion.span
                                            key={currentPrice}
                                            initial={{ opacity: 0.5 }}
                                            animate={{ opacity: 1 }}
                                            className="text-[20px] font-bold text-white"
                                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                        >
                                            ${currentPrice}
                                        </motion.span>
                                        <motion.span
                                            key={priceChange}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-[12px] font-semibold"
                                            style={{
                                                fontFamily: "'JetBrains Mono', monospace",
                                                color: priceChange >= 0 ? "#22c55e" : "#ef4444",
                                            }}
                                        >
                                            {priceChange >= 0 ? "+" : ""}
                                            {priceChange}
                                        </motion.span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            className="w-[5px] h-[5px] rounded-full bg-emerald-500"
                                            animate={{ opacity: [1, 0.3, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                        <span
                                            className="text-[9px] text-emerald-500 tracking-[0.12em]"
                                            style={{ fontFamily: "monospace" }}
                                        >
                                            LIVE
                                        </span>
                                        <span
                                            className="text-[9px] text-zinc-600 ml-1.5"
                                            style={{ fontFamily: "monospace" }}
                                        >
                                            NIFTY 50 • 4H
                                        </span>
                                    </div>
                                </div>

                                <svg viewBox="0 0 620 150" className="w-full" style={{ height: 150 }}>
                                    <defs>
                                        <linearGradient id="gC2" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#22c55e" />
                                            <stop offset="100%" stopColor="#16a34a" />
                                        </linearGradient>
                                        <linearGradient id="rC2" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#ef4444" />
                                            <stop offset="100%" stopColor="#dc2626" />
                                        </linearGradient>
                                        <filter id="glow3">
                                            <feGaussianBlur stdDeviation="2.5" result="b" />
                                            <feMerge>
                                                <feMergeNode in="b" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                        <filter id="sg2">
                                            <feGaussianBlur stdDeviation="1.5" result="b" />
                                            <feMerge>
                                                <feMergeNode in="b" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>

                                    {/* Grid */}
                                    <g opacity="0.18">
                                        {[30, 60, 90, 120].map((y, i) => (
                                            <line key={i} x1="10" y1={y} x2="610" y2={y} stroke="#666" strokeWidth="0.5" strokeDasharray="4,8" />
                                        ))}
                                    </g>

                                    {/* Resistance */}
                                    <line x1="10" y1={priceToY(440)} x2="610" y2={priceToY(440)} stroke="#ef4444" strokeWidth="0.7" strokeDasharray="5,5" opacity="0.45" />
                                    <rect x="10" y={priceToY(440) - 8} width="72" height="13" fill="rgba(239,68,68,0.12)" rx="3" />
                                    <text x="14" y={priceToY(440) + 1} fill="#ef4444" fontSize="7" fontFamily="monospace" fontWeight="bold">RESISTANCE</text>

                                    {/* Support */}
                                    <line x1="10" y1={priceToY(160)} x2="610" y2={priceToY(160)} stroke="#22c55e" strokeWidth="0.7" strokeDasharray="5,5" opacity="0.45" />
                                    <rect x="10" y={priceToY(160) - 1} width="52" height="13" fill="rgba(34,197,94,0.12)" rx="3" />
                                    <text x="14" y={priceToY(160) + 7} fill="#22c55e" fontSize="7" fontFamily="monospace" fontWeight="bold">SUPPORT</text>

                                    {/* MA line */}
                                    {candles.length > 2 && (
                                        <motion.path
                                            d={candles
                                                .map((c, i) => `${i === 0 ? "M" : "L"} ${15 + i * 32} ${priceToY((c.open + c.close) / 2)}`)
                                                .join(" ")}
                                            fill="none" stroke="rgba(168,85,247,0.55)" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"
                                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.8 }}
                                        />
                                    )}

                                    {/* Candles */}
                                    <AnimatePresence mode="popLayout">
                                        {candles.map((candle, i) => {
                                            const x = 15 + i * 32;
                                            const bull = candle.close >= candle.open;
                                            const hov = hoveredCandle === i;
                                            const highY = priceToY(candle.high);
                                            const lowY = priceToY(candle.low);
                                            const bodyTop = Math.min(priceToY(candle.open), priceToY(candle.close));
                                            const bodyH = Math.max(Math.abs(priceToY(candle.open) - priceToY(candle.close)), 2);
                                            return (
                                                <motion.g
                                                    key={`cd-${i}`}
                                                    initial={{ opacity: 0, scaleY: 0 }}
                                                    animate={{ opacity: 1, scaleY: 1 }}
                                                    exit={{ opacity: 0, x: -28 }}
                                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                    style={{ originY: 0.5 }}
                                                    onMouseEnter={() => setHoveredCandle(i)}
                                                    onMouseLeave={() => setHoveredCandle(null)}
                                                    className="cursor-pointer"
                                                >
                                                    {hov && (
                                                        <rect x={x - 10} y={highY - 4} width={20} height={lowY - highY + 8}
                                                            fill={bull ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)"} rx="3" />
                                                    )}
                                                    <line x1={x} y1={highY} x2={x} y2={lowY}
                                                        stroke={bull ? "#22c55e" : "#ef4444"}
                                                        strokeWidth={hov ? 1.5 : 1} strokeLinecap="round"
                                                        filter={hov ? "url(#sg2)" : ""} />
                                                    <rect x={x - 6} y={bodyTop} width={12} height={bodyH}
                                                        fill={bull ? "url(#gC2)" : "url(#rC2)"}
                                                        stroke={bull ? "#22c55e" : "#ef4444"}
                                                        strokeWidth={hov ? 1 : 0.4} rx="1.5"
                                                        filter={hov ? "url(#sg2)" : ""} />
                                                    {hov && (
                                                        <motion.g initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.12 }}>
                                                            <rect x={x - 24} y={highY - 34} width={48} height={28}
                                                                fill="rgba(0,0,0,0.9)" stroke={bull ? "#22c55e" : "#ef4444"} strokeWidth="0.8" rx="5" />
                                                            <text x={x} y={highY - 19} fill={bull ? "#22c55e" : "#ef4444"}
                                                                fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                                                                ${Math.round(candle.close)}
                                                            </text>
                                                            <text x={x} y={highY - 8} fill="#666" fontSize="7" textAnchor="middle" fontFamily="monospace">
                                                                {bull ? "▲ BULL" : "▼ BEAR"}
                                                            </text>
                                                        </motion.g>
                                                    )}
                                                </motion.g>
                                            );
                                        })}
                                    </AnimatePresence>

                                    {/* Live price line */}
                                    {candles.length > 0 && (
                                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <line x1="10" y1={priceToY(candles[candles.length - 1].close)}
                                                x2="580" y2={priceToY(candles[candles.length - 1].close)}
                                                stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" strokeDasharray="4,6" />
                                            <rect x="560" y={priceToY(candles[candles.length - 1].close) - 7}
                                                width="36" height="14" fill={isUp ? "#22c55e" : "#ef4444"} rx="3" />
                                            <text x="578" y={priceToY(candles[candles.length - 1].close) + 3}
                                                fill="#fff" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                                                {currentPrice}
                                            </text>
                                        </motion.g>
                                    )}

                                    {/* Pulse dot */}
                                    {candles.length > 0 && (
                                        <g>
                                            <motion.circle
                                                cx={15 + (candles.length - 1) * 32}
                                                cy={priceToY(candles[candles.length - 1].close)}
                                                r="5"
                                                fill={isUp ? "rgba(34,197,94,0.28)" : "rgba(239,68,68,0.28)"}
                                                animate={{ r: [5, 10, 5], opacity: [0.5, 0.1, 0.5] }}
                                                transition={{ duration: 1.6, repeat: Infinity }}
                                            />
                                            <motion.circle
                                                cx={15 + (candles.length - 1) * 32}
                                                cy={priceToY(candles[candles.length - 1].close)}
                                                r="3"
                                                fill={isUp ? "#22c55e" : "#ef4444"}
                                                filter="url(#glow3)"
                                            />
                                        </g>
                                    )}
                                </svg>

                                {/* Chart footer */}
                                <div
                                    className="flex items-center justify-between mt-2.5 pt-2.5"
                                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                                >
                                    <div className="flex items-center gap-4 sm:gap-5">
                                        {[
                                            { label: "Trend", value: isUp ? "↑ Bullish" : "↓ Bearish", color: isUp ? "#22c55e" : "#ef4444" },
                                            { label: "Timeframe", value: "4H", color: "#666" },
                                            { label: "MA(7)", value: "Purple", color: "#a855f7" },
                                        ].map((s, i) => (
                                            <div key={i}>
                                                <span className="block text-[9px] text-zinc-600">{s.label}</span>
                                                <span
                                                    className="text-[12px] font-semibold"
                                                    style={{ fontFamily: "monospace", color: s.color }}
                                                >
                                                    {s.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <motion.span
                                        className="text-[11px] font-bold text-[#D72638]"
                                        style={{ fontFamily: "monospace" }}
                                        animate={{ opacity: [1, 0.4, 1] }}
                                        transition={{ duration: 2.2, repeat: Infinity }}
                                    >
                                        INSTITUTIONAL
                                    </motion.span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Mobile chart fallback ── */}
                    <div className="block md:hidden px-4 pt-4 pb-0">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-[12px] text-zinc-400 mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>NIFTY 50 Live</p>
                                <span
                                    className="text-[22px] font-bold text-zinc-900"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                    ${currentPrice}
                                </span>
                            </div>
                            <div className="text-right">
                                <span
                                    className="text-[14px] font-semibold"
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        color: priceChange >= 0 ? "#22c55e" : "#ef4444",
                                    }}
                                >
                                    {priceChange >= 0 ? "+" : ""}{priceChange}
                                </span>
                                <p className="text-[10px] text-zinc-400 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                    {isUp ? "↑ Bullish" : "↓ Bearish"}
                                </p>
                            </div>
                        </div>

                        {/* Mobile mini-chart */}
                        <div className="rounded-xl overflow-hidden bg-[#0A0A0A] p-3">
                            <svg viewBox="0 0 360 90" className="w-full" style={{ height: 90 }}>
                                {candles.slice(-12).map((candle, i) => {
                                    const x = 10 + i * 28;
                                    const bull = candle.close >= candle.open;
                                    const highY = priceToY(candle.high);
                                    const lowY = priceToY(candle.low);
                                    const bodyTop = Math.min(priceToY(candle.open), priceToY(candle.close));
                                    const bodyH = Math.max(Math.abs(priceToY(candle.open) - priceToY(candle.close)), 2);
                                    return (
                                        <g key={i}>
                                            <line x1={x} y1={highY} x2={x} y2={lowY}
                                                stroke={bull ? "#22c55e" : "#ef4444"} strokeWidth="1" />
                                            <rect x={x - 6} y={bodyTop} width={12} height={bodyH}
                                                fill={bull ? "#22c55e" : "#ef4444"} rx="1.5" />
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>

                        {/* Mobile metric strip */}
                        <div className="grid grid-cols-3 gap-2 mt-3 mb-0">
                            {[
                                { label: "P&L", value: "+24.5%", up: true },
                                { label: "Win Rate", value: "73%", up: true },
                                { label: "Signals", value: "456", up: false },
                            ].map((m, i) => (
                                <div key={i} className="bg-zinc-50 rounded-xl p-3 border border-zinc-100 text-center">
                                    <p className="text-[10px] text-zinc-400 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{m.label}</p>
                                    <p
                                        className="text-[15px] font-bold"
                                        style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            color: m.up ? "#16a34a" : "#0A0A0A",
                                        }}
                                    >
                                        {m.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;