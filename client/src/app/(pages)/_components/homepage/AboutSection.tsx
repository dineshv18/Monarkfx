"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, Award } from "lucide-react";

const points = [
    { icon: <BookOpen style={{ width: 14, height: 14 }} />, text: "Live market learning with mentors" },
    { icon: <BadgeCheck style={{ width: 14, height: 14 }} />, text: "Institutional-grade curriculum" },
    { icon: <Award style={{ width: 14, height: 14 }} />, text: "Certification on successful completion" },
];

const WHATSAPP_URL = "https://wa.me/918750475852?text=Hi,%20I'd%20like%20to%20learn%20more%20about%20MonarkFX%20mentorship";

const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            style={{ position: "relative", background: "#fff", overflow: "hidden", padding: "120px 0" }}
        >
            {/* Faint red dot top-left */}
            <div style={{
                position: "absolute", top: 0, left: 0, width: 450, height: 450, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(215,38,56,0.06) 0%, transparent 70%)",
                transform: "translate(-30%, -30%)", pointerEvents: "none",
            }} />

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* ── LEFT: Image ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -32 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        style={{ position: "relative" }}
                    >
                        {/* ISO badge — floating */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.55, duration: 0.5 }}
                            style={{
                                position: "absolute", top: -20, right: -10, zIndex: 20,
                                background: "#fff",
                                border: "1px solid #EEE",
                                borderRadius: 16,
                                padding: "12px 20px",
                                boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                                display: "flex", alignItems: "center", gap: 10,
                            }}
                        >
                            <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: "#FFF0F2",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Award style={{ width: 18, height: 18, color: "#D72638" }} />
                            </div>
                            <div>
                                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 800, color: "#000", lineHeight: 1 }}>
                                    ISO Certified
                                </p>
                                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, color: "#999", marginTop: 3 }}>
                                    21008:2018
                                </p>
                            </div>
                        </motion.div>

                        {/* Est. badge — bottom-left */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.65, duration: 0.5 }}
                            style={{
                                position: "absolute", bottom: -24, left: 24, zIndex: 20,
                                background: "#000",
                                borderRadius: 16,
                                padding: "14px 24px",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                            }}
                        >
                            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 24, fontWeight: 900, color: "#D72638", lineHeight: 1 }}>
                                2021
                            </p>
                            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, color: "#666", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                                Established
                            </p>
                        </motion.div>

                        {/* Image Wrapper */}
                        <div style={{
                            position: "relative", zIndex: 1,
                            borderRadius: 32, overflow: "hidden",
                            border: "1px solid #EEE",
                            boxShadow: "0 30px 60px rgba(0,0,0,0.05)",
                        }}>
                             <div style={{
                                position: "absolute", top: 24, left: 0, width: 4, height: 100,
                                background: "linear-gradient(to bottom, #D72638, transparent)",
                                borderRadius: "0 4px 4px 0", zIndex: 10,
                            }} />
                            <Image
                                src="/bg.jpeg"
                                alt="About MonarkFX"
                                width={800}
                                height={600}
                                className="w-full object-cover"
                                style={{ height: "clamp(350px, 45vw, 550px)", display: "block" }}
                            />
                        </div>
                    </motion.div>

                    {/* ── RIGHT: Content ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 32 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.25 }}
                            style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}
                        >
                            <div style={{ width: 32, height: 2, background: "#D72638", borderRadius: 2 }} />
                            <span style={{
                                fontFamily: "var(--font-inter), sans-serif", fontSize: 12, fontWeight: 800,
                                color: "#D72638", letterSpacing: "0.2em", textTransform: "uppercase",
                            }}>
                                Prestige Education
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <h2 style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(34px, 4vw, 52px)",
                            fontWeight: 800, color: "#000",
                            lineHeight: 1.1, letterSpacing: "-0.01em",
                            marginBottom: 24,
                        }}>
                            We Build Elite{" "}
                            <span style={{
                                color: "#D72638"
                            }}>
                                Traders
                            </span>{" "}
                            Through Discipline.
                        </h2>

                        {/* Body Text */}
                        <div style={{ marginBottom: 40 }}>
                            <p style={{
                                fontFamily: "var(--font-inter), sans-serif", fontSize: 18,
                                color: "#444", lineHeight: 1.8, marginBottom: 16, fontWeight: 500,
                            }}>
                                MonarkFX is an ISO 21008:2018 Certified Financial Market Academy, dedicated to the art of institutional trading.
                            </p>
                            <p style={{
                                fontFamily: "var(--font-inter), sans-serif", fontSize: 16,
                                color: "#666", lineHeight: 1.8,
                            }}>
                                We strip away the noise and focus on the mechanics of Price Action across Equities, Forex, and Digital Assets. Our mission is to transform retail mindsets into institutional execution.
                            </p>
                        </div>

                        {/* Checklist */}
                        <div style={{ marginBottom: 48, display: "flex", flexDirection: "column", gap: 16 }}>
                            {points.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 14 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
                                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                                >
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: "rgba(215,38,56,0.08)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#D72638", flexShrink: 0,
                                    }}>
                                        {point.icon}
                                    </div>
                                    <span style={{
                                        fontFamily: "var(--font-inter), sans-serif", fontSize: 16,
                                        color: "#2A2A2A", fontWeight: 700,
                                    }}>
                                        {point.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                            <Link href={WHATSAPP_URL} target="_blank" style={{ textDecoration: "none" }}>
                                <motion.button
                                    whileHover={{ y: -4, boxShadow: "0 15px 45px rgba(215,38,56,0.25)" }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: 10,
                                        background: "#D72638", color: "#fff",
                                        fontFamily: "var(--font-inter), sans-serif", fontWeight: 800, fontSize: 16,
                                        padding: "16px 36px", borderRadius: 16, border: "none", cursor: "pointer",
                                        boxShadow: "0 8px 30px rgba(215,38,56,0.2)", transition: "all 0.3s",
                                    }}
                                >
                                    Consult our Mentors <ArrowRight style={{ width: 17, height: 17 }} />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;