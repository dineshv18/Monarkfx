"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { value: 7, suffix: "+", label: "MENTORS" },
    { value: 1000, suffix: "+", label: "SESSIONS" },
    { value: 250, suffix: "+", label: "STUDENTS" },
    { value: 4.7, suffix: "★", label: "GOOGLE RATING", isDecimal: true },
];

// Slow counter animation
const useCounter = (end: number, isInView: boolean, isDecimal?: boolean, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = isDecimal ? easeOut * end : Math.floor(easeOut * end);

            setCount(isDecimal ? Math.round(currentValue * 10) / 10 : currentValue);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, isInView, isDecimal, duration]);

    return count;
};

const StatItem = ({
    stat,
    index,
    isInView,
}: {
    stat: typeof stats[0];
    index: number;
    isInView: boolean;
}) => {
    const count = useCounter(stat.value, isInView, stat.isDecimal, 2500);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="text-center px-6 sm:px-10 lg:px-16"
        >
            <div className="flex items-baseline justify-center gap-1 mb-2">
                <span
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {stat.isDecimal ? count.toFixed(1) : count}
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    {stat.suffix}
                </span>
            </div>
            <span
                className="text-[#525252] text-[10px] sm:text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {stat.label}
            </span>
        </motion.div>
    );
};

const StatsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section ref={ref} className="relative py-16 lg:py-20 bg-[#0a0a0a] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Stats Row */}
                <div className="flex flex-wrap justify-center items-center">
                    {stats.map((stat, index) => (
                        <React.Fragment key={index}>
                            <StatItem stat={stat} index={index} isInView={isInView} />
                            {/* Red separator */}
                            {index < stats.length - 1 && (
                                <div className="hidden sm:block w-px h-12 bg-red-900/40" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Animated red line */}
                <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    className="mt-12 mx-auto max-w-3xl h-px"
                    style={{
                        background: "linear-gradient(90deg, transparent 0%, #991b1b 50%, transparent 100%)",
                    }}
                />
            </div>
        </section>
    );
};

export default StatsSection;
