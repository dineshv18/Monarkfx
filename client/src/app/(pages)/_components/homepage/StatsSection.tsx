"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

import { ArrowUp, TrendingUp, Users, Star, Video } from "lucide-react";



const stats = [
    { value: 7, suffix: "+", label: "Expert Mentors", sub: "Industry veterans", icon: Users, isDecimal: false, isIncrease: true },
    { value: 1000, suffix: "+", label: "Live Sessions", sub: "Conducted yearly", icon: Video, isDecimal: false, isIncrease: true },
    { value: 1000, suffix: "+", label: "Students Trained", sub: "Across India", icon: TrendingUp, isDecimal: false, isIncrease: true },
    { value: 4.9, suffix: "★", label: "Google Rating", sub: "Verified reviews", icon: Star, isDecimal: true, isIncrease: true },
];

const useCounter = (end: number, active: boolean, isDecimal?: boolean, duration = 1800) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) { setCount(0); return; }
        let startTime: number;
        let raf: number;
        const animate = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(isDecimal ? Math.round(easeOut * end * 10) / 10 : Math.floor(easeOut * end));
            if (progress < 1) raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [active, end, isDecimal, duration]);
    return count;
};

/* ── Hover stat card — prompt style ── */
const HoverStatCard = ({ stat, index, sectionInView }: { stat: typeof stats[0]; index: number; sectionInView: boolean }) => {
    const [hovered, setHovered] = useState(false);
    const count = useCounter(stat.value, hovered || sectionInView, stat.isDecimal);
    const Icon = stat.icon;

    const isDark = false;
    const bg = "#FFFFFF";
    const numColor = "#D72638";
    const labelColor = "#999";
    const titleColor = "#0A0A0A";
    const subColor = "#AAA";
    const iconBg = "rgba(215,38,56,0.08)";
    const iconBorder = "rgba(215,38,56,0.15)";
    const arrowColor = "#10B981";

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex-1 cursor-default overflow-hidden"
            style={{
                background: bg,
                borderRadius: 20,
                padding: "28px 24px",
                minHeight: 140,
                border: isDark ? "1.5px solid #1C1C1C" : "1.5px solid #F0F0F0",
                boxShadow: hovered
                    ? isDark ? "0 20px 48px rgba(0,0,0,0.35)" : "0 16px 40px rgba(215,38,56,0.08)"
                    : isDark ? "0 8px 24px rgba(0,0,0,0.2)" : "0 4px 16px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.25s",
            }}
        >
            {/* Red accent top bar */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: hovered ? "#D72638" : "transparent",
                transition: "background 0.25s",
                borderRadius: "20px 20px 0 0",
            }} />

            <div className="relative w-full h-full" style={{ minHeight: 84 }}>
                {/* Default — big number */}
                <div className={`transition-all duration-300 ease-out ${hovered ? "opacity-0 -translate-y-8 pointer-events-none absolute inset-0" : "opacity-100 translate-y-0"}`}>
                    <div className="flex items-center gap-2 mb-2">
                        <ArrowUp className="w-4 h-4 shrink-0" style={{ color: arrowColor }} strokeWidth={2.5} />
                        <span className="font-black leading-none"
                            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(34px, 3.5vw, 48px)", letterSpacing: "-0.03em", color: numColor }}>
                            {stat.isDecimal ? count.toFixed(1) : count.toLocaleString()}
                            <span style={{ fontSize: "0.5em", color: numColor }}>{stat.suffix}</span>
                        </span>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em]"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: labelColor }}>
                        {stat.label}
                    </p>
                </div>

                {/* Hover — icon + detail */}
                <div className={`transition-all duration-300 ease-out ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute inset-0"}`}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: iconBg, border: `1px solid ${iconBorder}` }}>
                        <Icon className="w-5 h-5" style={{ color: "#D72638" }} strokeWidth={1.8} />
                    </div>
                    <p className="text-[13px] font-bold uppercase tracking-[0.06em] leading-tight mb-1"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: titleColor }}>
                        {stat.label}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.08em]"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: subColor }}>
                        {stat.sub}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const StatsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} style={{ position: "relative", background: "#FFFFFF", overflow: "hidden", padding: "60px 0 0", borderTop: "1px solid #F0F0F0" }}>

            {/* Red top line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #D72638 30%, #D72638 70%, transparent)", opacity: 0.7 }} />

            {/* Dot grid */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(0,0,0,0.035) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                {/* Heading */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: 48 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div style={{ width: 28, height: 2, background: "#D72638", borderRadius: 2 }} />
                        <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 11, fontWeight: 800, color: "#D72638", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                            By The Numbers
                        </span>
                        <div style={{ width: 28, height: 2, background: "#D72638", borderRadius: 2 }} />
                    </div>
                    <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 800, color: "#0A0A0A", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 640 }}>
                        Powering India&apos;s next generation of{" "}
                        <span style={{ color: "#D72638" }}>elite traders.</span>
                    </h2>
                </motion.div>


                {/* Stats grid — alternating white/black cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                    style={{ marginBottom: 56 }}>
                    {stats.map((stat, i) => (
                        <HoverStatCard key={i} stat={stat} index={i} sectionInView={isInView} />
                    ))}
                </div>
            </div>


        </section>
    );
};

export default StatsSection;
