"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { value: 7, suffix: "+", label: "Expert Mentors", sub: "Industry veterans" },
    { value: 1000, suffix: "+", label: "Live Sessions", sub: "Conducted yearly" },
    { value: 250, suffix: "+", label: "Students Trained", sub: "Across India" },
    { value: 4.7, suffix: "★", label: "Google Rating", sub: "Verified reviews", isDecimal: true },
];

const useCounter = (end: number, isInView: boolean, isDecimal?: boolean, duration = 2200) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!isInView) return;
        let startTime: number;
        let animationFrame: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const val = isDecimal ? easeOut * end : Math.floor(easeOut * end);
            setCount(isDecimal ? Math.round(val * 10) / 10 : val);
            if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, isInView, isDecimal, duration]);
    return count;
};

const StatCard = ({
    stat,
    index,
    isInView,
}: {
    stat: typeof stats[0];
    index: number;
    isInView: boolean;
}) => {
    const count = useCounter(stat.value, isInView, stat.isDecimal, 2400);

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px 24px",
                textAlign: "center",
                zIndex: 1,
            }}
        >
            {/* Number */}
            <div
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    gap: 4,
                    marginBottom: 10,
                }}
            >
                <span
                    style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "clamp(44px, 5vw, 64px)",
                        fontWeight: 900,
                        color: "#D72638",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                    }}
                >
                    {stat.isDecimal ? count.toFixed(1) : count.toLocaleString()}
                </span>
                <span
                    style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "clamp(24px, 3vw, 36px)",
                        fontWeight: 900,
                        color: "#D72638",
                        lineHeight: 1,
                    }}
                >
                    {stat.suffix}
                </span>
            </div>

            {/* Label */}
            <p
                style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "clamp(14px, 1.4vw, 17px)",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    marginBottom: 6,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                }}
            >
                {stat.label}
            </p>

            {/* Sub label */}
            <p
                style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 12,
                    color: "#666",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                }}
            >
                {stat.sub}
            </p>
        </motion.div>
    );
};

const StatsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            style={{
                position: "relative",
                background: "#0A0A0A",
                overflow: "hidden",
                padding: "40px 0",
            }}
        >
            {/* Top red gradient fade */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "linear-gradient(90deg, transparent 0%, #D72638 30%, #D72638 70%, transparent 100%)",
                    opacity: 0.6,
                }}
            />

            {/* Subtle red center glow */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "70%",
                    height: "120%",
                    background:
                        "radial-gradient(ellipse at center, rgba(215,38,56,0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* Grid texture */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "0 24px",
                    position: "relative",
                }}
            >
                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-[1fr_1px_1fr_1px_1fr_1px_1fr] items-center">
                    {stats.map((stat, index) => (
                        <React.Fragment key={index}>
                            <StatCard stat={stat} index={index} isInView={isInView} />

                            {/* Vertical divider */}
                            {index < stats.length - 1 && (
                                <motion.div
                                    initial={{ scaleY: 0, opacity: 0 }}
                                    animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
                                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                    style={{
                                        width: 1,
                                        height: 80,
                                        background: "linear-gradient(to bottom, transparent, rgba(215,38,56,0.3), transparent)",
                                        alignSelf: "center",
                                        justifySelf: "center",
                                    }}
                                    className="hidden md:block"
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Bottom red gradient line */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "linear-gradient(90deg, transparent 0%, #D72638 30%, #D72638 70%, transparent 100%)",
                    opacity: 0.6,
                }}
            />
        </section>
    );
};

export default StatsSection;