"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

/* ── Cybercore grid background (grid only, no glow) ── */
function CybercoreBackground() {
    return (
        <>
            <style>{`
                .cyber-scene {
                    position: absolute;
                    inset: 0;
                    background: #0B1E3F;
                    overflow: hidden;
                }
                .cyber-grid {
                    position: absolute;
                    inset: -52px;
                    background-image:
                        linear-gradient(rgba(232,185,35,0.28) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(232,185,35,0.28) 1px, transparent 1px);
                    background-size: 54px 54px;
                    animation: moveGrid 8s linear infinite;
                }
                .cyber-grid-fade {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 70% 60% at 50% 45%, rgba(11,30,63,0.85) 0%, rgba(11,30,63,0.35) 55%, rgba(11,30,63,0) 100%);
                    pointer-events: none;
                }
                @keyframes moveGrid {
                    from { background-position: 0 0; }
                    to   { background-position: 54px 54px; }
                }
            `}</style>

            <div className="cyber-scene">
                <div className="cyber-grid" />
                <div className="cyber-grid-fade" />
            </div>
        </>
    );
}

/* ── PageHero ── */
interface PageHeroProps {
    badge?: string;
    title: string;
    titleAccent?: string;
    titleLine2?: string;
    description: string;
    primaryBtn?: { text: string; href: string; wa?: boolean };
    secondaryBtn?: { text: string; href: string };
}

export default function PageHero({
    badge,
    title,
    titleAccent,
    titleLine2,
    description,
    primaryBtn,
    secondaryBtn,
}: PageHeroProps) {
    return (
        <section className="relative w-full overflow-hidden" style={{ height: "80vh" }}>

            {/* Animated cybercore background */}
            <CybercoreBackground />

            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
                style={{ background: "linear-gradient(90deg, transparent, #F5D876 20%, #E8B923 50%, #F5D876 80%, transparent)" }} />

            {/* Ring overlay */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5 z-10" />

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">

                <div className="max-w-3xl w-full mx-auto">
                    {/* Badge */}
                    {badge && (
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 inline-flex items-center gap-3 rounded-full px-3 py-2"
                            style={{ background: "rgba(232,185,35,0.12)", border: "1px solid rgba(232,185,35,0.3)", backdropFilter: "blur(8px)" }}
                        >
                            <span className="inline-flex items-center text-[11px] font-extrabold uppercase tracking-[0.12em] rounded-full py-0.5 px-2.5"
                                style={{ background: "linear-gradient(135deg, #F7E7A8 0%, #E8B923 45%, #C79A1E 75%, #F5D876 100%)", color: "#0B1E3F", fontFamily: "var(--font-dm-sans), sans-serif", boxShadow: "0 2px 12px rgba(232,185,35,0.45)" }}>
                                {badge}
                            </span>
                            <span className="text-[13px] font-medium text-white/75 pr-1"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                MonarkFX Academy
                            </span>
                        </motion.div>
                    )}

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-black text-white leading-[1.04] tracking-[-0.04em] mb-6"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(40px, 7vw, 52px)",
                            textShadow: "0 0 40px rgba(232,185,35,0.25), 0 2px 20px rgba(0,0,0,0.8)",
                        }}
                    >
                        {titleAccent ? (
                            <>
                                {title}{" "}
                                <span
                                    style={{
                                        backgroundImage: "linear-gradient(135deg, #F7E7A8 0%, #E8B923 40%, #C79A1E 68%, #F5D876 100%)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        filter: "drop-shadow(0 0 28px rgba(232,185,35,0.55))",
                                    }}
                                >
                                    {titleAccent}
                                </span>
                            </>
                        ) : title}
                        {titleLine2 && (
                            <>
                                <br className="hidden sm:block" />
                                {titleLine2}
                            </>
                        )}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.22 }}
                        className="leading-[1.75] font-light mb-10 mx-auto max-w-xl"
                        style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "clamp(15px, 1.2vw, 12px)",
                            color: "rgba(255,255,255,0.65)",
                        }}
                    >
                        {description}
                    </motion.p>

                    {/* CTAs */}
                    {(primaryBtn || secondaryBtn) && (
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.32 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-3"
                        >
                            {primaryBtn && (
                                <a href={primaryBtn.href}
                                    target={primaryBtn.wa ? "_blank" : undefined}
                                    rel={primaryBtn.wa ? "noopener noreferrer" : undefined}
                                    className="no-underline w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ y: -2, boxShadow: "0 14px 36px rgba(37,211,102,0.5)" }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-white font-bold text-[15px] px-5 py-2.5 rounded-xl border-none cursor-pointer transition-colors duration-200"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#25D366", boxShadow: "0 6px 24px rgba(37,211,102,0.35)" }}>
                                        {primaryBtn.wa && <FaWhatsapp size={18} />}
                                        {primaryBtn.text}
                                        {!primaryBtn.wa && <ArrowRight className="w-4 h-4" strokeWidth={2.5} />}
                                    </motion.button>
                                </a>
                            )}
                            {secondaryBtn && (
                                <Link href={secondaryBtn.href} className="no-underline w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ y: -2, borderColor: "rgba(232,185,35,0.6)", color: "#fff" }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white/80 font-bold text-[15px] px-5 py-2.5 rounded-xl cursor-pointer transition-all duration-200 border-none"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                                        {secondaryBtn.text}
                                    </motion.button>
                                </Link>
                            )}
                        </motion.div>
                    )}
                </div>{/* end max-w wrapper */}
            </div>{/* end content absolute */}
        </section>
    );
}
