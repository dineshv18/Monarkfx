"use client";

import React, { useState, useEffect, CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

/* ── Cybercore animated beam background ── */
function CybercoreBackground() {
    const [beams, setBeams] = useState<Array<{
        id: number;
        type: "primary" | "secondary";
        style: CSSProperties;
    }>>([]);

    useEffect(() => {
        const generated = Array.from({ length: 70 }).map((_, i) => {
            const dur = Math.random() * 3 + 5;
            return {
                id: i,
                type: (Math.random() < 0.15 ? "secondary" : "primary") as "primary" | "secondary",
                style: {
                    left: `${Math.random() * 100}%`,
                    width: `${Math.floor(Math.random() * 2) + 1}px`,
                    animationDelay: `${Math.random() * 6}s`,
                    animationDuration: `${dur}s, ${dur}s`,
                } as CSSProperties,
            };
        });
        setBeams(generated);
    }, []);

    return (
        <>
            <style>{`
                .cyber-scene {
                    position: absolute;
                    inset: 0;
                    background: #000308;
                    overflow: hidden;
                }
                .cyber-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(215,38,56,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(215,38,56,0.08) 1px, transparent 1px);
                    background-size: 52px 52px;
                    animation: moveGrid 8s linear infinite;
                }
                .cyber-floor {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 160%;
                    height: 55%;
                    background: radial-gradient(ellipse at 50% 100%, rgba(215,38,56,0.18) 0%, rgba(0,3,8,0) 65%);
                    animation: floorGlow 5s ease-in-out infinite alternate;
                }
                .cyber-center-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60%;
                    height: 80%;
                    background: radial-gradient(ellipse, rgba(215,38,56,0.1) 0%, transparent 68%);
                    pointer-events: none;
                }
                .cyber-beams {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                }
                .cyber-beam {
                    position: absolute;
                    bottom: 0;
                    height: 60%;
                    border-radius: 2px;
                    animation: rise var(--rise-dur, 7s) linear infinite,
                               fade var(--fade-dur, 7s) linear infinite;
                }
                .cyber-beam.primary {
                    background: linear-gradient(to top, rgba(215,38,56,0.9), rgba(215,38,56,0.4) 60%, transparent);
                    box-shadow: 0 0 8px rgba(215,38,56,0.6);
                }
                .cyber-beam.secondary {
                    background: linear-gradient(to top, rgba(255,255,255,0.6), rgba(255,100,80,0.3) 50%, transparent);
                    box-shadow: 0 0 12px rgba(255,80,60,0.4);
                }
                @keyframes rise {
                    0%   { transform: translateY(0%); opacity: 0; }
                    10%  { opacity: 1; }
                    100% { transform: translateY(-180%); opacity: 0; }
                }
                @keyframes fade {
                    0%, 100% { opacity: 0; }
                    5%, 85%  { opacity: 0.9; }
                }
                @keyframes floorGlow {
                    0%   { transform: translateX(-50%) scale(0.95); opacity: 0.7; }
                    100% { transform: translateX(-50%) scale(1.05); opacity: 1; }
                }
                @keyframes moveGrid {
                    from { background-position: 0 0; }
                    to   { background-position: -52px -52px; }
                }
            `}</style>

            <div className="cyber-scene">
                <div className="cyber-grid" />
                <div className="cyber-floor" />
                <div className="cyber-center-glow" />
                <div className="cyber-beams">
                    {beams.map(b => (
                        <div key={b.id} className={`cyber-beam ${b.type}`} style={b.style} />
                    ))}
                </div>
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

            {/* Top red accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
                style={{ background: "linear-gradient(90deg, transparent, #D72638 30%, #D72638 70%, transparent)" }} />

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
                            style={{ background: "rgba(215,38,56,0.12)", border: "1px solid rgba(215,38,56,0.3)", backdropFilter: "blur(8px)" }}
                        >
                            <span className="inline-flex items-center text-[11px] font-extrabold uppercase tracking-[0.12em] rounded-full py-0.5 px-2.5"
                                style={{ background: "#D72638", color: "#fff", fontFamily: "var(--font-dm-sans), sans-serif" }}>
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
                            textShadow: "0 0 40px rgba(215,38,56,0.25), 0 2px 20px rgba(0,0,0,0.8)",
                        }}
                    >
                        {titleAccent ? (
                            <>
                                {title}{" "}
                                <span style={{ color: "#FF4D60", textShadow: "0 0 32px rgba(215,38,56,0.6)" }}>
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
                                        whileHover={{ y: -2, borderColor: "rgba(215,38,56,0.6)", color: "#fff" }}
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

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.05))" }} />
        </section>
    );
}
