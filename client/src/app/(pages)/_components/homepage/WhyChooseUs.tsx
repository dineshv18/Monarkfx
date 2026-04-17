"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Shield,
    Target,
    Video,
    GraduationCap,
    Briefcase,
    Clock,
} from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "ISO Certified Education",
        desc: "Quality assured under ISO 21008:2018 — the only certified trading academy in the region.",
        number: "01",
        accent: "Only one in region",
    },
    {
        icon: Target,
        title: "Institutional Framework",
        desc: "Learn the same methodology used by prop desks and professional traders worldwide.",
        number: "02",
        accent: null,
    },
    {
        icon: Video,
        title: "Live Market Sessions",
        desc: "Real-time analysis, trade setups and Q&A with mentors — every single trading day.",
        number: "03",
        accent: "Daily live",
    },
    {
        icon: Clock,
        title: "Flexible Learning",
        desc: "Study at your pace — online live classes, recorded sessions and offline workshops.",
        number: "04",
        accent: null,
    },
    {
        icon: GraduationCap,
        title: "Certification Program",
        desc: "Walk away with an ISO-verified certificate recognised by firms and prop trading desks.",
        number: "05",
        accent: "ISO verified",
    },
    {
        icon: Briefcase,
        title: "Career Opportunity",
        desc: "Top graduates get a direct pathway to join the MonarkFX mentor & analyst team.",
        number: "06",
        accent: null,
    },
];

const WhyChooseUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section
            ref={ref}
            className="relative bg-white overflow-hidden py-14 md:py-16"
        >
            {/* ── Dot grid ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(215,38,56,0.055) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                }}
            />

            {/* ── Top-right glow blob ── */}
            <div
                className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(215,38,56,0.07) 0%, transparent 70%)",
                }}
            />
            {/* ── Bottom-left glow blob ── */}
            <div
                className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(215,38,56,0.05) 0%, transparent 70%)",
                }}
            />

            <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8">

                {/* ── Section header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-3 mb-5">
                        <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                        <span
                            className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            The Monark Edge
                        </span>
                        <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                    </div>

                    <h2
                        className="font-black text-zinc-950 leading-[1.02] tracking-[-0.04em] mb-5"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(36px, 5vw, 58px)",
                        }}
                    >
                        Why Choose{" "}
                        <span className="text-[#D72638]">MonarkFX</span>
                    </h2>

                    <p
                        className="text-zinc-500 max-w-[500px] mx-auto leading-[1.8] font-light"
                        style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "clamp(15px, 1.1vw, 18px)",
                        }}
                    >
                        Discover the methodology that separates institutional execution
                        from retail speculation.
                    </p>
                </motion.div>

                {/* ── Feature grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 28 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.09,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <FeatureCard feature={feature} />
                        </motion.div>
                    ))}
                </div>

                {/* ── Bottom trust bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-14 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
                >
                    {[
                        { value: "1,200+", label: "Students Trained" },
                        { value: "ISO", label: "Certified Academy" },
                        { value: "4.9★", label: "Average Rating" },
                        { value: "₹10Cr+", label: "Student PnL" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <p
                                className="text-zinc-900 text-[20px] sm:text-[22px] font-black leading-none mb-1"
                                style={{ fontFamily: "var(--font-playfair), serif" }}
                            >
                                {stat.value}
                            </p>
                            <p
                                className="text-zinc-400 text-[12px] font-medium"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

/* ── Individual card — separate component for clean hover state ── */
const FeatureCard = ({
    feature,
}: {
    feature: (typeof features)[number];
}) => {
    const [hovered, setHovered] = React.useState(false);
    const Icon = feature.icon;

    return (
        <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ y: -7 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full flex flex-col rounded-[28px] p-7 sm:p-8 cursor-default overflow-hidden"
            style={{
                background: "#fff",
                border: hovered ? "1.5px solid rgba(215,38,56,0.35)" : "1.5px solid #EBEBEB",
                boxShadow: hovered
                    ? "0 24px 56px rgba(0,0,0,0.07), 0 0 0 4px rgba(215,38,56,0.04)"
                    : "0 8px 24px rgba(0,0,0,0.025)",
                transition: "border-color 0.25s, box-shadow 0.25s",
            }}
        >
            {/* Number watermark */}
            <span
                className="absolute top-5 right-6 font-black leading-none select-none"
                style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: 52,
                    color: hovered ? "rgba(215,38,56,0.06)" : "rgba(0,0,0,0.04)",
                    transition: "color 0.25s",
                    lineHeight: 1,
                }}
            >
                {feature.number}
            </span>

            {/* Icon */}
            <div
                className="w-12 h-12 rounded-[13px] flex items-center justify-center mb-5 shrink-0"
                style={{
                    background: hovered ? "rgba(215,38,56,0.1)" : "rgba(215,38,56,0.05)",
                    border: hovered
                        ? "1px solid rgba(215,38,56,0.25)"
                        : "1px solid rgba(215,38,56,0.1)",
                    transition: "all 0.25s",
                }}
            >
                <Icon
                    className="w-[20px] h-[20px] text-[#D72638]"
                    strokeWidth={1.8}
                />
            </div>

            {/* Title + accent badge */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <h3
                    className="text-zinc-900 font-bold leading-[1.25] tracking-[-0.02em]"
                    style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(16px, 1.2vw, 19px)",
                    }}
                >
                    {feature.title}
                </h3>
                {feature.accent && (
                    <span
                        className="shrink-0 text-[9px] font-extrabold text-[#D72638] uppercase
                       tracking-[0.1em] bg-[#D72638]/08 border border-[#D72638]/20
                       rounded-full px-2 py-1 mt-0.5"
                        style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            background: "rgba(215,38,56,0.06)",
                        }}
                    >
                        {feature.accent}
                    </span>
                )}
            </div>

            <p
                className="text-zinc-500 leading-[1.72] font-light flex-1"
                style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "clamp(13px, 0.9vw, 15px)",
                }}
            >
                {feature.desc}
            </p>

            {/* Bottom accent bar */}
            <div
                className="mt-6 h-[3px] rounded-full"
                style={{
                    background: "linear-gradient(90deg, #D72638, rgba(215,38,56,0.1))",
                    transform: hovered ? "scaleX(1)" : "scaleX(0.18)",
                    transformOrigin: "left",
                    transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                    opacity: hovered ? 1 : 0.5,
                }}
            />
        </motion.div>
    );
};

export default WhyChooseUs;