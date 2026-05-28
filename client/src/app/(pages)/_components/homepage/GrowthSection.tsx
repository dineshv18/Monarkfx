"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const chartData = [
    { name: "2021", value: 40 },
    { name: "Q2", value: 90 },
    { name: "Q3", value: 140 },
    { name: "Q4", value: 200 },
    { name: "2022", value: 280 },
    { name: "Q2", value: 410 },
    { name: "Q3", value: 580 },
    { name: "Q4", value: 720 },
    { name: "2023", value: 900 },
    { name: "Q2", value: 1100 },
    { name: "Q3", value: 1380 },
    { name: "2024", value: 1700 },
];

const stats = [
    { value: "1,000+", label: "Students Trained" },
    { value: "7+", label: "Expert Mentors" },
    { value: "1,000+", label: "Live Sessions" },
    { value: "4.7★", label: "Google Rating" },
];

const GrowthSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            style={{
                position: "relative",
                background: "#fff",
                overflow: "hidden",
                padding: "100px 0 80px",
                borderTop: "1px solid #F0F0F0",
            }}
        >
            {/* Faint red glow top-right */}
            <div style={{
                position: "absolute", top: 0, right: 0,
                width: 500, height: 500,
                background: "radial-gradient(circle, rgba(215,38,56,0.06) 0%, transparent 70%)",
                transform: "translate(20%, -20%)",
                pointerEvents: "none",
            }} />

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginBottom: 56 }}
                >
                    {/* Label */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 32, height: 2, background: "#D72638", borderRadius: 2 }} />
                        <span style={{
                            fontFamily: "var(--font-inter), sans-serif", fontSize: 12, fontWeight: 800,
                            color: "#D72638", letterSpacing: "0.2em", textTransform: "uppercase",
                        }}>
                            Our Growth
                        </span>
                    </div>

                    <h2 style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(32px, 4.5vw, 58px)",
                        fontWeight: 800, color: "#000",
                        lineHeight: 1.1, letterSpacing: "-0.02em",
                        maxWidth: 720, marginBottom: 20,
                    }}>
                        Powering India&apos;s next generation of{" "}
                        <span style={{ color: "#D72638" }}>elite traders.</span>
                    </h2>

                    <p style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "clamp(15px, 1.3vw, 18px)",
                        color: "#666", lineHeight: 1.8, maxWidth: 620,
                    }}>
                        From our first batch in 2021 to over 1,000+ trained professionals —
                        MonarkFX has been growing with purpose, discipline, and results.
                    </p>
                </motion.div>

                {/* Stats grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-6"
                    style={{ marginBottom: 48 }}
                >
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                            style={{
                                padding: "20px 0",
                                borderTop: "2px solid",
                                borderImage: i === 0
                                    ? "linear-gradient(90deg, #D72638, transparent) 1"
                                    : "linear-gradient(90deg, #E8E8E8, transparent) 1",
                            }}
                        >
                            <p style={{
                                fontFamily: "var(--font-inter), sans-serif",
                                fontSize: "clamp(28px, 3.5vw, 42px)",
                                fontWeight: 900,
                                color: i === 0 ? "#D72638" : "#0A0A0A",
                                lineHeight: 1,
                                letterSpacing: "-0.03em",
                                marginBottom: 8,
                            }}>
                                {s.value}
                            </p>
                            <p style={{
                                fontFamily: "var(--font-inter), sans-serif",
                                fontSize: 13, color: "#888", fontWeight: 600,
                                textTransform: "uppercase", letterSpacing: "0.08em",
                            }}>
                                {s.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Area Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        width: "100%", height: 200,
                        position: "relative",
                    }}
                >
                    {/* Y-axis label */}
                    <p style={{
                        position: "absolute", top: 0, left: 0,
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 11, color: "#BBB", fontWeight: 600,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                    }}>
                        Student growth
                    </p>

                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#D72638" stopOpacity={0.18} />
                                    <stop offset="95%" stopColor="#D72638" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                contentStyle={{
                                    background: "#fff",
                                    border: "1px solid #EEE",
                                    borderRadius: 10,
                                    fontSize: 12,
                                    fontFamily: "var(--font-inter), sans-serif",
                                    color: "#333",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                                }}
                                cursor={{ stroke: "#D72638", strokeWidth: 1, strokeDasharray: "4 4" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#D72638"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#colorRed)"
                                dot={false}
                                activeDot={{ r: 5, fill: "#D72638", stroke: "#fff", strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    {/* Bottom x-axis line */}
                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        height: 1, background: "#F0F0F0",
                    }} />
                </motion.div>

            </div>
        </section>
    );
};

export default GrowthSection;

