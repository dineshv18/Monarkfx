"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Rahul S.",
        role: "Equity Trader",
        initials: "RS",
        text: "The structured approach to market analysis completely changed how I view trading. Highly professional mentorship.",
        stars: 5,
        color: "#D72638",
    },
    {
        name: "Priya M.",
        role: "Forex Student",
        initials: "PM",
        text: "Learned forex trading with proper risk management. The offline sessions were incredibly valuable.",
        stars: 5,
        color: "#A01020",
    },
    {
        name: "Amit K.",
        role: "Crypto Trader",
        initials: "AK",
        text: "Solid fundamentals-based crypto education. No get-rich-quick promises, just real market knowledge.",
        stars: 5,
        color: "#1A1A1A",
    },
    {
        name: "Neha R.",
        role: "Options Trader",
        initials: "NR",
        text: "Options trading finally makes sense. The practical sessions helped me develop consistent strategies.",
        stars: 5,
        color: "#D72638",
    },
    {
        name: "Vikram P.",
        role: "Swing Trader",
        initials: "VP",
        text: "The discipline-first approach sets Monark FX apart. Real education, not entertainment.",
        stars: 5,
        color: "#A01020",
    },
    {
        name: "Sneha T.",
        role: "Full-time Trader",
        initials: "ST",
        text: "Comprehensive curriculum with personal attention. Worth every session.",
        stars: 5,
        color: "#1A1A1A",
    },
];

/* ── Individual card ── */
const TestimonialCard = ({
    t,
    index,
    isInView,
}: {
    t: (typeof testimonials)[number];
    index: number;
    isInView: boolean;
}) => {
    const [hovered, setHovered] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <motion.div
                whileHover={{ y: -7 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full flex flex-col rounded-[28px] p-6 sm:p-8 overflow-hidden cursor-default bg-white"
                style={{
                    border: hovered
                        ? "1.5px solid rgba(215,38,56,0.28)"
                        : "1.5px solid #EEEEEE",
                    boxShadow: hovered
                        ? "0 28px 60px rgba(215,38,56,0.09), 0 0 0 4px rgba(215,38,56,0.03)"
                        : "0 8px 28px rgba(0,0,0,0.03)",
                    transition: "border-color 0.24s, box-shadow 0.24s",
                }}
            >
                {/* Big quote watermark */}
                <div
                    className="absolute top-4 right-6 pointer-events-none transition-opacity duration-300"
                    style={{ opacity: hovered ? 0.12 : 0.06 }}
                >
                    <Quote
                        className="w-14 h-14 text-[#D72638]"
                        fill="currentColor"
                    />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-5">
                    {[...Array(t.stars)].map((_, i) => (
                        <Star
                            key={i}
                            className="w-3.5 h-3.5 text-[#D72638]"
                            fill="currentColor"
                        />
                    ))}
                </div>

                {/* Quote text */}
                <p
                    className="text-zinc-600 italic leading-[1.85] flex-1 mb-7 relative z-10 font-light"
                    style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "clamp(14px, 0.95vw, 16px)",
                    }}
                >
                    &ldquo;{t.text}&rdquo;
                </p>

                {/* Divider */}
                <div
                    className="h-px mb-5 transition-all duration-300"
                    style={{
                        background: hovered
                            ? "linear-gradient(90deg, rgba(215,38,56,0.2), transparent)"
                            : "#F2F2F2",
                    }}
                />

                {/* Author row */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div
                            className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
                            style={{
                                background: t.color,
                                boxShadow: hovered
                                    ? `0 4px 14px ${t.color}55`
                                    : "0 2px 8px rgba(0,0,0,0.12)",
                                transition: "box-shadow 0.24s",
                            }}
                        >
                            <span
                                className="text-white text-[12px] font-extrabold"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                {t.initials}
                            </span>
                        </div>

                        <div>
                            <p
                                className="text-zinc-900 text-[14px] font-bold leading-tight mb-0.5"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                {t.name}
                            </p>
                            <p
                                className="text-zinc-400 text-[11px] font-medium"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                {t.role}
                            </p>
                        </div>
                    </div>

                    {/* Verified badge */}
                    <span
                        className="text-[9px] font-extrabold text-emerald-500 uppercase tracking-[0.1em]
                       bg-emerald-500/10 border border-emerald-500/20
                       px-2.5 py-1 rounded-full whitespace-nowrap shrink-0"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                        Verified
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
};

const TestimonialsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden py-14 sm:py-16"
            style={{
                background: "linear-gradient(180deg, #fff 0%, #FFF4F5 100%)",
            }}
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

            {/* ── Top-left blob ── */}
            <div
                className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(215,38,56,0.06) 0%, transparent 68%)",
                }}
            />

            <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14 sm:mb-16"
                >
                    {/* Google rating pill */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.1, type: "spring", stiffness: 220 }}
                        className="inline-flex items-center gap-3 bg-white border border-zinc-200
                       rounded-full px-5 py-2.5 mb-7
                       shadow-[0_8px_28px_rgba(0,0,0,0.06)]"
                    >
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-3.5 h-3.5 text-[#D72638]"
                                    fill={i < 4 ? "currentColor" : "none"}
                                />
                            ))}
                        </div>
                        <span
                            className="text-zinc-900 text-[16px] font-extrabold"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            4.7
                        </span>
                        <span className="w-px h-4 bg-zinc-200" />
                        <span
                            className="text-zinc-400 text-[12px] font-medium"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            Google Verified Reviews
                        </span>
                    </motion.div>

                    {/* Eyebrow */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                        <span
                            className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            Testimonials
                        </span>
                        <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                    </div>

                    <h2
                        className="font-black text-zinc-950 leading-[1.02] tracking-[-0.04em] mb-4"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(34px, 4.5vw, 56px)",
                        }}
                    >
                        Voices of{" "}
                        <span className="text-[#D72638]">Excellence</span>
                    </h2>

                    <p
                        className="text-zinc-500 max-w-[460px] mx-auto leading-[1.8] font-light"
                        style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "clamp(15px, 1.1vw, 18px)",
                        }}
                    >
                        Discover how our structured mentorship is transforming the trading
                        careers of our students.
                    </p>
                </motion.div>

                {/* ── Cards grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={i} t={t} index={i} isInView={isInView} />
                    ))}
                </div>

                {/* ── Bottom trust bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.72, duration: 0.5 }}
                    className="mt-14 sm:mt-16 flex items-center justify-center
                     flex-wrap gap-x-3 gap-y-2 text-center"
                >
                    <span
                        className="text-zinc-400 text-[13px] font-medium"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                        Trusted by
                    </span>
                    <span
                        className="text-[#D72638] text-[17px] font-black"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                        250+
                    </span>
                    <span
                        className="text-zinc-400 text-[13px] font-medium"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                        graduates —
                    </span>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="w-3.5 h-3.5 text-[#D72638]"
                                fill="currentColor"
                            />
                        ))}
                    </div>
                    <span
                        className="text-zinc-800 text-[14px] font-extrabold"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                        4.7 on Google
                    </span>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;