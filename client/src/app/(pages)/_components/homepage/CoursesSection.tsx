"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, TrendingUp, Bitcoin, BarChart2, Layers } from "lucide-react";
import Link from "next/link";

const courses = [
    {
        code: "IAT",
        name: "Institution Advance Trading",
        level: "Basic → Advanced",
        duration: "8+ Weeks",
        desc: "Master institutional trading concepts including Smart Money, ICT, Order Flow and advanced risk management frameworks.",
        icon: <Layers style={{ width: 20, height: 20 }} />,
        tag: "Most Popular",
        tagColor: "#D72638",
        topics: ["Smart Money Concepts", "ICT Framework", "Risk Management"],
    },
    {
        code: "ACT",
        name: "Alpha Crypto Trader",
        level: "Cryptocurrency Markets",
        duration: "4+ Weeks",
        desc: "Deep dive into crypto market structure, on-chain analysis, DeFi protocols and high-probability trade setups.",
        icon: <Bitcoin style={{ width: 20, height: 20 }} />,
        tag: "Trending",
        tagColor: "#F59E0B",
        topics: ["On-chain Analysis", "DeFi Protocols", "Altcoin Cycles"],
    },
    {
        code: "AFT",
        name: "Alpha Forex Trader",
        level: "Foreign Exchange",
        duration: "4+ Weeks",
        desc: "Learn to trade Forex like institutions — sessions, liquidity, macro-driven setups and intermarket correlations.",
        icon: <TrendingUp style={{ width: 20, height: 20 }} />,
        tag: "Beginner Friendly",
        tagColor: "#22c55e",
        topics: ["Currency Pairs", "Macro Fundamentals", "Session Trading"],
    },
    {
        code: "MOX",
        name: "Monark Options X",
        level: "Options & Derivatives",
        duration: "3 Weeks",
        desc: "Trade options with confidence — Greeks, premium selling strategies, hedging and structured expiry plays.",
        icon: <BarChart2 style={{ width: 20, height: 20 }} />,
        tag: "Advanced",
        tagColor: "#8B5CF6",
        topics: ["Options Greeks", "Premium Selling", "Hedging Strategies"],
    },
];

const WHATSAPP_URL = "https://wa.me/918750475852?text=Hi,%20I%20want%20to%20enroll%20in%20your%20trading%20program";

const CoursesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            style={{ position: "relative", background: "#F8F8F8", overflow: "hidden", padding: "120px 0" }}
        >
            {/* Subtle bg texture */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "radial-gradient(circle, rgba(215,38,56,0.03) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
            }} />

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: 64 }}
                >
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                        <div style={{ width: 32, height: 2, background: "#D72638", borderRadius: 2 }} />
                        <span style={{
                            fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 11, fontWeight: 700,
                            color: "#D72638", letterSpacing: "0.2em", textTransform: "uppercase",
                        }}>
                            Academic Excellence
                        </span>
                        <div style={{ width: 32, height: 2, background: "#D72638", borderRadius: 2 }} />
                    </div>

                    <h2 className="font-heading" style={{
                        fontSize: "clamp(36px, 5vw, 56px)",
                        fontWeight: 700, color: "#0A0A0A",
                        lineHeight: 1, letterSpacing: "-0.04em",
                        marginBottom: 16,
                    }}>
                        Boutique Trading{" "}
                        <span style={{
                            backgroundImage: "linear-gradient(135deg, #D72638, #A01020)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>
                            Programs
                        </span>
                    </h2>

                    <p style={{
                        fontFamily: "var(--font-inter), sans-serif", fontSize: 18,
                        color: "#555", maxWidth: 540, margin: "0 auto 24px",
                        lineHeight: 1.7, fontWeight: 300
                    }}>
                        Structured learning paths designed to bridge the gap between amateur trading and institutional mastery.
                    </p>

                    <Link href="/courses" style={{ textDecoration: "none" }}>
                        <motion.span
                            whileHover={{ gap: 12 }}
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 8,
                                fontFamily: "var(--font-inter), sans-serif", fontSize: 14, fontWeight: 700,
                                color: "#D72638", cursor: "pointer", transition: "all 0.2s",
                            }}
                        >
                            View Full Curriculum <ArrowRight style={{ width: 16, height: 16 }} />
                        </motion.span>
                    </Link>
                </motion.div>

                {/* ── Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.code}
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div
                                whileHover={{ y: -6, boxShadow: "0 24px 64px rgba(215,38,56,0.12)" }}
                                transition={{ duration: 0.25 }}
                                style={{
                                    background: "#fff",
                                    borderRadius: 24,
                                    border: "1px solid #EAEAEA",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                                    overflow: "hidden",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    cursor: "default",
                                }}
                            >
                                {/* Top band */}
                                <div style={{
                                    background: "#0A0A0A",
                                    padding: "24px 24px 20px",
                                    position: "relative",
                                    overflow: "hidden",
                                }}>
                                    {/* Subtle red glow */}
                                    <div style={{
                                        position: "absolute", bottom: -20, right: -20,
                                        width: 100, height: 100, borderRadius: "50%",
                                        background: "radial-gradient(circle, rgba(215,38,56,0.15) 0%, transparent 70%)",
                                    }} />

                                    {/* Code + Icon row */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                        <div style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            width: 40, height: 40,
                                            background: "rgba(215,38,56,0.1)",
                                            border: "1.5px solid rgba(215,38,56,0.25)",
                                            borderRadius: 12,
                                            color: "#D72638",
                                        }}>
                                            {course.icon}
                                        </div>
                                        <div style={{
                                            fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 10, fontWeight: 800,
                                            color: "#fff", letterSpacing: "0.1em",
                                            background: "rgba(255,255,255,0.05)",
                                            padding: "3px 8px", borderRadius: 4,
                                        }}>
                                            {course.code}
                                        </div>
                                    </div>

                                    {/* Tag badge */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <span style={{
                                            fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 9, fontWeight: 700,
                                            color: course.tagColor,
                                            background: `${course.tagColor}15`,
                                            padding: "3px 10px", borderRadius: 999,
                                            textTransform: "uppercase", letterSpacing: "0.06em",
                                        }}>
                                            {course.tag}
                                        </span>
                                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                            <Clock style={{ width: 11, height: 11, color: "#666" }} />
                                            <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 10, color: "#666", fontWeight: 500 }}>
                                                {course.duration}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                                    <p style={{
                                        fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 10, fontWeight: 700,
                                        color: "#A0A0A0", letterSpacing: "0.08em", textTransform: "uppercase",
                                        marginBottom: 6,
                                    }}>
                                        {course.level}
                                    </p>

                                    <h3 className="font-heading" style={{
                                        fontSize: 18, fontWeight: 700,
                                        color: "#0A0A0A", lineHeight: 1.3, marginBottom: 12, letterSpacing: "-0.03em"
                                    }}>
                                        {course.name}
                                    </h3>

                                    <p style={{
                                        fontFamily: "var(--font-inter), sans-serif", fontSize: 13,
                                        color: "#666", lineHeight: 1.6, marginBottom: 20, flex: 1, fontWeight: 300
                                    }}>
                                        {course.desc}
                                    </p>

                                    {/* Topics */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                                        {course.topics.map((t, i) => (
                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D72638", flexShrink: 0 }} />
                                                <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 12, color: "#555", fontWeight: 500 }}>{t}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <Link href={WHATSAPP_URL} target="_blank" style={{ textDecoration: "none" }}>
                                        <motion.div
                                            whileHover={{ background: "#A01020", y: -2 }}
                                            style={{
                                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                                background: "#D72638", color: "#fff",
                                                fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, fontSize: 13,
                                                padding: "13px 0", borderRadius: 14, cursor: "pointer",
                                                transition: "all 0.2s",
                                                boxShadow: "0 4px 14px rgba(215,38,56,0.2)",
                                            }}
                                        >
                                            Enquire Now <ArrowRight style={{ width: 14, height: 14 }} />
                                        </motion.div>
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA strip */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    style={{
                        marginTop: 64, padding: "40px",
                        background: "#0A0A0A", borderRadius: 32,
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        flexWrap: "wrap", gap: 24,
                        border: "1px solid #222",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                    }}
                >
                    <div>
                        <h4 className="font-heading" style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>
                            Confused about where to begin?
                        </h4>
                        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: "#888", fontWeight: 300 }}>
                            Speak with our head mentor for a personalized trading roadmap tailored to your goals.
                        </p>
                    </div>
                    <Link href={WHATSAPP_URL} target="_blank" style={{ textDecoration: "none" }}>
                        <motion.button
                            whileHover={{ y: -3, boxShadow: "0 15px 40px rgba(215,38,56,0.4)" }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 10,
                                background: "#D72638", color: "#fff",
                                fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, fontSize: 15,
                                padding: "16px 32px", borderRadius: 16, border: "none", cursor: "pointer",
                                transition: "all 0.2s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            Request Free Consultation <ArrowRight style={{ width: 16, height: 16 }} />
                        </motion.button>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default CoursesSection;

