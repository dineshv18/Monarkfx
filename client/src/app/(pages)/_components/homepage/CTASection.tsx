"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
    ArrowRight,
    MessageCircle,
    TrendingUp,
    Users,
    Award,
    Sparkles,
} from "lucide-react";

const WHATSAPP_URL =
    "https://wa.me/918750475852?text=Hi,%20I%20want%20to%20start%20my%20learning%20journey%20with%20MonarkFX";
const ADVISOR_URL =
    "https://wa.me/918750475852?text=Hi,%20I'd%20like%20to%20talk%20to%20an%20advisor%20about%20your%20trading%20programs";

const trust = [
    { icon: TrendingUp, text: "250+ Traders Trained" },
    { icon: Award, text: "ISO 21008:2018 Certified" },
    { icon: Users, text: "7+ Expert Mentors" },
];

const CTASection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden py-24 sm:py-32"
            style={{ background: "linear-gradient(140deg, #C81F33 0%, #8B0F1E 100%)" }}
        >
            {/* ── Grid lines ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                }}
            />

            {/* ── Radial light center ── */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                    width: "70%",
                    height: "60%",
                    background:
                        "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 70%)",
                }}
            />

            {/* ── Bottom edge vignette ── */}
            <div
                className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, transparent, rgba(100,5,20,0.45))",
                }}
            />

            {/* ── Floating orbs ── */}
            <motion.div
                animate={{ y: [-12, 12, -12], rotate: [0, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 left-[8%] w-20 h-20 rounded-full pointer-events-none hidden lg:block"
                style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                }}
            />
            <motion.div
                animate={{ y: [10, -10, 10], rotate: [0, -6, 0] }}
                transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-16 right-[7%] w-14 h-14 rounded-full pointer-events-none hidden lg:block"
                style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                }}
            />

            {/* ── Content ── */}
            <div className="relative max-w-[820px] mx-auto px-5 sm:px-8 text-center">

                {/* Label pill */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, type: "spring", stiffness: 220 }}
                    className="mb-8"
                >
                    <div
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
                        style={{
                            background: "rgba(255,255,255,0.12)",
                            border: "1px solid rgba(255,255,255,0.22)",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        <Sparkles className="w-3 h-3 text-white/70" />
                        <span
                            className="text-white/90 text-[11px] font-extrabold uppercase tracking-[0.22em]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            Take the Leap
                        </span>
                    </div>
                </motion.div>

                {/* Headline block */}
                <div className="mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-white font-black leading-[1.0] tracking-[-0.025em] mb-2"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(36px, 6.5vw, 68px)",
                        }}
                    >
                        Education decides
                        <br />your path.
                    </motion.h2>

                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="font-black italic leading-[1.0] tracking-[-0.025em]"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(36px, 6.5vw, 68px)",
                            color: "rgba(255,255,255,0.32)",
                        }}
                    >
                        Discipline decides
                        <br />success.
                    </motion.h2>
                </div>

                {/* Sub */}
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.26 }}
                    className="leading-[1.75] mb-12 mx-auto max-w-[540px]"
                    style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "clamp(16px, 1.2vw, 19px)",
                        color: "rgba(255,255,255,0.72)",
                    }}
                >
                    Join a community of professional traders. Master institutional
                    frameworks and build a sustainable career in the markets.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.34 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14"
                >
                    {/* Primary */}
                    <Link href={WHATSAPP_URL} target="_blank" className="no-underline w-full sm:w-auto">
                        <motion.button
                            whileHover={{ y: -3, boxShadow: "0 24px 56px rgba(0,0,0,0.32)" }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                         bg-white hover:bg-zinc-50 text-[#D72638]
                         text-[15px] sm:text-[16px] font-extrabold
                         px-8 sm:px-10 py-4 sm:py-[17px] rounded-2xl
                         border-none cursor-pointer
                         shadow-[0_10px_36px_rgba(0,0,0,0.2)]
                         transition-colors duration-200"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            Start My Learning Path
                            <ArrowRight className="w-[17px] h-[17px]" strokeWidth={2.5} />
                        </motion.button>
                    </Link>

                    {/* Secondary */}
                    <Link href={ADVISOR_URL} target="_blank" className="no-underline w-full sm:w-auto">
                        <motion.button
                            whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.16)" }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                         text-white text-[15px] sm:text-[16px] font-bold
                         px-8 sm:px-10 py-4 sm:py-[17px] rounded-2xl
                         cursor-pointer transition-colors duration-200"
                            style={{
                                fontFamily: "var(--font-dm-sans), sans-serif",
                                background: "rgba(255,255,255,0.1)",
                                border: "1.5px solid rgba(255,255,255,0.25)",
                                backdropFilter: "blur(8px)",
                            }}
                        >
                            <MessageCircle className="w-[17px] h-[17px]" strokeWidth={2} />
                            Consult An Advisor
                        </motion.button>
                    </Link>
                </motion.div>

                {/* ── Trust bar ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.52, duration: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
                >
                    {trust.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <React.Fragment key={i}>
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                        style={{
                                            background: "rgba(255,255,255,0.1)",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                        }}
                                    >
                                        <Icon className="w-3.5 h-3.5 text-white/60" />
                                    </div>
                                    <span
                                        className="text-[13px] sm:text-[14px] font-medium"
                                        style={{
                                            fontFamily: "var(--font-dm-sans), sans-serif",
                                            color: "rgba(255,255,255,0.6)",
                                        }}
                                    >
                                        {item.text}
                                    </span>
                                </div>
                                {i < trust.length - 1 && (
                                    <div
                                        className="hidden sm:block w-px h-4"
                                        style={{ background: "rgba(255,255,255,0.12)" }}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;