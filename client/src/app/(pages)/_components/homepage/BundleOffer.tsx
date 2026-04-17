"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
    ArrowRight,
    Flame,
    CheckCircle2,
    Clock,
    Users,
    TrendingUp,
    Zap,
    Star,
} from "lucide-react";

const included = [
    {
        icon: <TrendingUp className="w-[15px] h-[15px]" />,
        title: "Live Forex Sessions",
        desc: "Daily live market analysis with mentors",
        tag: "Daily",
    },
    {
        icon: <Zap className="w-[15px] h-[15px]" />,
        title: "Crypto Strategy Masterclass",
        desc: "Full DeFi + altcoin cycle playbook",
        tag: "Lifetime",
    },
    {
        icon: <CheckCircle2 className="w-[15px] h-[15px]" />,
        title: "Risk Management Framework",
        desc: "Institutional SL/TP & position sizing",
        tag: "Pro",
    },
    {
        icon: <Users className="w-[15px] h-[15px]" />,
        title: "Mentor-led Trade Reviews",
        desc: "Weekly 1-on-1 feedback sessions",
        tag: "1-on-1",
    },
];

const WHATSAPP_URL =
    "https://wa.me/918750475852?text=Hi,%20I%20want%20to%20enroll%20in%20your%20Mastery%20Combo%20program";

const BundleOffer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section
            ref={ref}
            className="relative bg-[#080808] overflow-hidden py-14 sm:py-16"
        >
            {/* ── Grid texture ── */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "52px 52px",
                }}
            />

            {/* ── Red radial glow ── */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "75%", height: "65%",
                    background:
                        "radial-gradient(ellipse, rgba(215,38,56,0.11) 0%, transparent 68%)",
                }}
            />

            {/* ── Accent line top ── */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D72638]/40 to-transparent" />

            {/* ── SAVE badge ── */}
            <motion.div
                initial={{ opacity: 0, rotate: 8, scale: 0.7 }}
                animate={isInView ? { opacity: 1, rotate: 12, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.45, type: "spring", stiffness: 200 }}
                className="absolute top-8 right-6 sm:top-10 sm:right-14 z-10
                   w-[80px] h-[80px] sm:w-[92px] sm:h-[92px] rounded-full
                   flex flex-col items-center justify-center select-none
                   shadow-[0_10px_40px_rgba(215,38,56,0.55)]"
                style={{ background: "linear-gradient(135deg, #D72638, #A01020)" }}
            >
                <span
                    className="text-white text-[10px] font-extrabold leading-none"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                    SAVE
                </span>
                <span
                    className="text-white text-[22px] font-black leading-tight"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                    40%
                </span>
            </motion.div>

            {/* ── Content ── */}
            <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 lg:gap-16 items-start">

                    {/* ── LEFT ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Limited badge */}
                        <div className="inline-flex items-center gap-2 mb-6
                            bg-[#D72638]/10 border border-[#D72638]/25
                            rounded-full px-4 py-2">
                            <Flame className="w-[13px] h-[13px] text-[#D72638]" />
                            <span
                                className="text-[11px] font-extrabold text-[#D72638] tracking-[0.14em] uppercase"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                Limited Market Access
                            </span>
                        </div>

                        {/* Heading */}
                        <h2
                            className="font-black text-white leading-[1.04] tracking-[-0.015em] mb-5"
                            style={{
                                fontFamily: "var(--font-playfair), serif",
                                fontSize: "clamp(34px, 4.5vw, 60px)",
                            }}
                        >
                            The Ultimate{" "}
                            <span
                                className="block"
                                style={{
                                    backgroundImage: "linear-gradient(120deg, #D72638 20%, #FF7A7A 80%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Mastery Combo
                            </span>
                            Program
                        </h2>

                        <p
                            className="text-zinc-500 leading-[1.75] mb-10 max-w-[480px]"
                            style={{
                                fontFamily: "var(--font-dm-sans), sans-serif",
                                fontSize: "clamp(15px, 1.1vw, 18px)",
                            }}
                        >
                            Gain lifetime access to all our mentorship tracks. Master Indian
                            Markets, Forex, and Crypto in one comprehensive curriculum.
                        </p>

                        {/* Pricing block */}
                        <div className="mb-4">
                            <div className="flex items-end gap-4 mb-3 flex-wrap">
                                <span
                                    className="text-[#D72638] font-black leading-none"
                                    style={{
                                        fontFamily: "var(--font-dm-sans), sans-serif",
                                        fontSize: "clamp(48px, 6vw, 68px)",
                                    }}
                                >
                                    ₹25,000
                                </span>
                                <span
                                    className="text-zinc-600 text-[22px] sm:text-[26px] line-through font-medium mb-1"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                >
                                    ₹42,000
                                </span>
                            </div>

                            {/* Savings pill */}
                            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5 mb-6">
                                <Star className="w-3 h-3 text-emerald-400" fill="currentColor" />
                                <span
                                    className="text-emerald-400 text-[12px] font-bold"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                >
                                    You save ₹17,000
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                                <span
                                    className="text-zinc-600 text-[13px] font-medium"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                >
                                    Special Combo Pricing — Lifetime Ownership
                                </span>
                            </div>
                        </div>

                        {/* Trust checks */}
                        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 mb-10">
                            {["No hidden fees", "Instant access", "Community included"].map(
                                (t, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D72638] shrink-0" />
                                        <span
                                            className="text-zinc-400 text-[13px]"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                        >
                                            {t}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>

                        {/* CTA */}
                        <Link href={WHATSAPP_URL} target="_blank" className="no-underline inline-block w-full sm:w-auto">
                            <motion.button
                                whileHover={{ y: -3, boxShadow: "0 24px 64px rgba(215,38,56,0.48)" }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3
                           bg-[#D72638] hover:bg-[#C0202F] text-white
                           text-[15px] sm:text-[16px] font-bold
                           px-8 sm:px-10 py-4 sm:py-5 rounded-2xl
                           border-none cursor-pointer
                           shadow-[0_10px_30px_rgba(215,38,56,0.3)]
                           transition-colors duration-200"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                Secure My Access
                                <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* ── RIGHT — Privileges card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div
                            className="rounded-[28px] overflow-hidden relative"
                            style={{
                                background: "linear-gradient(160deg, #161616 0%, #101010 100%)",
                                border: "1.5px solid #1E1E1E",
                                boxShadow: "0 40px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
                            }}
                        >
                            {/* Inner top glow */}
                            <div
                                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(215,38,56,0.3), transparent)",
                                }}
                            />

                            {/* Card header */}
                            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/[0.05]">
                                <div>
                                    <h3
                                        className="text-white text-[16px] font-bold mb-0.5"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        Bundle Privileges
                                    </h3>
                                    <p
                                        className="text-zinc-600 text-[11px]"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        Everything included, nothing extra
                                    </p>
                                </div>
                                <span
                                    className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-[0.1em]
                             bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1.5"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                >
                                    All-In-One
                                </span>
                            </div>

                            {/* Items */}
                            <div>
                                {included.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.32 + i * 0.09, duration: 0.5 }}
                                        className="flex items-start gap-4 px-6 sm:px-8 py-5 group
                               transition-colors duration-200 hover:bg-white/[0.02]"
                                        style={{
                                            borderBottom: i < included.length - 1 ? "1px solid #161616" : "none",
                                        }}
                                    >
                                        {/* Icon */}
                                        <div
                                            className="w-10 h-10 rounded-[11px] shrink-0 flex items-center justify-center text-[#D72638]
                                 transition-all duration-200 group-hover:bg-[#D72638]/20"
                                            style={{
                                                background: "rgba(215,38,56,0.1)",
                                                border: "1px solid rgba(215,38,56,0.18)",
                                            }}
                                        >
                                            {item.icon}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <p
                                                    className="text-white text-[14px] sm:text-[15px] font-bold"
                                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                                >
                                                    {item.title}
                                                </p>
                                                <span
                                                    className="text-[9px] font-bold text-zinc-500 bg-white/[0.05]
                                     border border-white/[0.06] rounded px-1.5 py-0.5 uppercase tracking-wide"
                                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                                >
                                                    {item.tag}
                                                </span>
                                            </div>
                                            <p
                                                className="text-zinc-500 text-[12px] sm:text-[13px] leading-[1.6]"
                                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                            >
                                                {item.desc}
                                            </p>
                                        </div>

                                        {/* Check */}
                                        <CheckCircle2 className="w-4 h-4 text-[#D72638]/50 shrink-0 mt-0.5
                                             group-hover:text-[#D72638] transition-colors duration-200" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Card footer */}
                            <div
                                className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
                                style={{ borderTop: "1px solid #161616" }}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="text-zinc-600 text-[12px] line-through"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        Value ₹42,000
                                    </span>
                                    <span className="w-px h-4 bg-zinc-800" />
                                    <span
                                        className="text-[#D72638] text-[15px] sm:text-[16px] font-extrabold"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        Yours for ₹25,000
                                    </span>
                                </div>

                                {/* Urgency */}
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        className="w-1.5 h-1.5 rounded-full bg-[#D72638]"
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 1.4, repeat: Infinity }}
                                    />
                                    <span
                                        className="text-zinc-500 text-[11px] font-medium"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        Seats filling fast
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Social proof below card */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="mt-4 flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
                        >
                            {[
                                { value: "1,200+", label: "Students" },
                                { value: "4.9★", label: "Rating" },
                                { value: "₹10Cr+", label: "PnL Generated" },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full
                             bg-white/[0.03] border border-white/[0.06]"
                                >
                                    <span
                                        className="text-white text-[13px] font-bold"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span
                                        className="text-zinc-600 text-[11px]"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* ── Accent line bottom ── */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D72638]/20 to-transparent" />
        </section>
    );
};

export default BundleOffer;