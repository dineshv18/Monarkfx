"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    ArrowRight,
    Brain,
    ShieldAlert,
    Calendar,
    LineChart,
    Repeat2,
} from "lucide-react";

const WHATSAPP_URL =
    "https://wa.me/918076939943?text=Hi%20MonarkFX,%20I'm%20interested%20in%20your%20Mentorship%20Framework.";

const pillars = [
    { title: "Psychology", desc: "Mindset & emotional control — trade without fear or greed.", icon: Brain, number: "01" },
    { title: "Risk", desc: "Capital & position management — protect your account first.", icon: ShieldAlert, number: "02" },
    { title: "Planning", desc: "Strategy & analysis — every trade has a thesis.", icon: Calendar, number: "03" },
    { title: "Performance", desc: "Tracking & improvement — review, refine, repeat.", icon: LineChart, number: "04" },
    { title: "Discipline", desc: "Consistency & routine — the edge is in the process.", icon: Repeat2, number: "05" },
];

const credentials = ["SEBI Aware", "Live Mentorship", "ISO Certified"];

const mentorStats = [
    { value: "7+", label: "Traders" },
    { value: "250+", label: "Students" },
    { value: "4.7★", label: "Rating" },
];

/* ── Pillar row — separate for hover state ── */
const PillarRow = ({
    pillar,
    delay,
    isInView,
}: {
    pillar: (typeof pillars)[number];
    delay: number;
    isInView: boolean;
}) => {
    const [hovered, setHovered] = useState(false);
    const Icon = pillar.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl cursor-default"
                style={{
                    border: hovered ? "1.5px solid rgba(215,38,56,0.3)" : "1.5px solid #EBEBEB",
                    background: hovered ? "#fff" : "rgba(255,255,255,0.55)",
                    boxShadow: hovered ? "0 8px 28px rgba(0,0,0,0.055)" : "0 2px 10px rgba(0,0,0,0.015)",
                    transition: "border-color 0.22s, background 0.22s, box-shadow 0.22s",
                }}
            >
                {/* Number */}
                <span
                    className="text-[#D72638] font-black text-[13px] tracking-[0.05em] min-w-[26px]"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                    {pillar.number}
                </span>

                {/* Divider */}
                <div
                    className="w-px h-9 shrink-0"
                    style={{ background: hovered ? "rgba(215,38,56,0.2)" : "#EBEBEB", transition: "background 0.22s" }}
                />

                {/* Icon */}
                <div
                    className="w-10 h-10 rounded-[11px] shrink-0 flex items-center justify-center"
                    style={{
                        background: hovered ? "rgba(215,38,56,0.1)" : "rgba(215,38,56,0.05)",
                        border: hovered ? "1px solid rgba(215,38,56,0.22)" : "1px solid rgba(215,38,56,0.08)",
                        transition: "all 0.22s",
                    }}
                >
                    <Icon className="w-[17px] h-[17px] text-[#D72638]" strokeWidth={2} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <h3
                        className="text-zinc-900 font-bold text-[15px] leading-tight tracking-[-0.02em] mb-0.5"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                        {pillar.title}
                    </h3>
                    <p
                        className="text-zinc-500 text-[13px] leading-[1.55] font-light"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                        {pillar.desc}
                    </p>
                </div>

                {/* Arrow hint */}
                <ArrowRight
                    className="w-3.5 h-3.5 shrink-0 transition-all duration-200"
                    style={{ color: hovered ? "#D72638" : "transparent" }}
                />
            </motion.div>
        </motion.div>
    );
};

const MentorshipSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section
            ref={ref}
            className="relative bg-[#FAFAFA] overflow-hidden py-14 sm:py-16"
        >
            {/* ── Bottom-left glow ── */}
            <div
                className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(215,38,56,0.06) 0%, transparent 68%)" }}
            />
            {/* ── Top-right glow ── */}
            <div
                className="absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(215,38,56,0.04) 0%, transparent 70%)" }}
            />

            <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* ── LEFT — Visual card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        {/* Shadow card offset */}
                        <div
                            className="absolute -bottom-3 -right-3 w-full h-full rounded-[30px] pointer-events-none"
                            style={{ background: "rgba(215,38,56,0.04)", border: "1.5px solid rgba(215,38,56,0.08)" }}
                        />

                        {/* Main card */}
                        <div
                            className="relative rounded-[28px] overflow-hidden bg-white"
                            style={{
                                border: "1.5px solid #E8E8E8",
                                boxShadow: "0 20px 56px rgba(0,0,0,0.06)",
                            }}
                        >
                            {/* Dark visual area */}
                            <div
                                className="relative flex items-center justify-center overflow-hidden"
                                style={{
                                    height: 320,
                                    background: "linear-gradient(140deg, #0A0A0A 0%, #181818 100%)",
                                }}
                            >
                                {/* Dot grid */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
                                        backgroundSize: "44px 44px",
                                    }}
                                />
                                {/* Red center glow */}
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none"
                                    style={{ background: "radial-gradient(circle, rgba(215,38,56,0.2) 0%, transparent 68%)" }}
                                />

                                {/* MX monogram */}
                                <div className="relative z-10 text-center">
                                    <motion.div
                                        animate={{ scale: [1, 1.03, 1] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-[104px] h-[104px] rounded-full flex items-center justify-center mx-auto mb-5"
                                        style={{
                                            background: "linear-gradient(135deg, rgba(215,38,56,0.22), rgba(215,38,56,0.06))",
                                            border: "1.5px solid rgba(215,38,56,0.45)",
                                            boxShadow: "0 0 48px rgba(215,38,56,0.22)",
                                        }}
                                    >
                                        <span
                                            className="text-white font-black text-[34px] leading-none"
                                            style={{
                                                fontFamily: "var(--font-playfair), serif",
                                                textShadow: "0 2px 12px rgba(215,38,56,0.45)",
                                            }}
                                        >
                                            MX
                                        </span>
                                    </motion.div>

                                    <p
                                        className="text-white/55 text-[11px] font-extrabold uppercase tracking-[0.22em] mb-6"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        MonarkFX Mentors
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center justify-center gap-6 sm:gap-8">
                                        {mentorStats.map((s, i) => (
                                            <div key={i} className="text-center">
                                                <p
                                                    className="text-[#D72638] text-[20px] font-black leading-none mb-1"
                                                    style={{ fontFamily: "var(--font-playfair), serif" }}
                                                >
                                                    {s.value}
                                                </p>
                                                <p
                                                    className="text-white/35 text-[9px] font-bold uppercase tracking-[0.1em]"
                                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                                >
                                                    {s.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Live badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.7, type: "spring", stiffness: 240 }}
                                    className="absolute top-5 right-5 flex items-center gap-2 px-3.5 py-2 rounded-full"
                                    style={{
                                        background: "rgba(34,197,94,0.12)",
                                        border: "1px solid rgba(34,197,94,0.28)",
                                        backdropFilter: "blur(6px)",
                                    }}
                                >
                                    <motion.div
                                        className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 1.4, repeat: Infinity }}
                                    />
                                    <span
                                        className="text-emerald-400 text-[10px] font-extrabold uppercase tracking-[0.1em]"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        Live Now
                                    </span>
                                </motion.div>
                            </div>

                            {/* Credential pills */}
                            <div className="flex flex-wrap gap-2.5 px-6 py-5 bg-white border-t border-[#F0F0F0]">
                                {credentials.map((c, i) => (
                                    <span
                                        key={i}
                                        className="text-[12px] font-semibold text-zinc-500 bg-zinc-50
                               border border-zinc-200 px-4 py-1.5 rounded-full"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT — Content ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-3 mb-5">
                            <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                            <span
                                className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                Mentorship
                            </span>
                        </div>

                        {/* Heading */}
                        <h2
                            className="font-black text-zinc-950 leading-[1.03] tracking-[-0.04em] mb-4"
                            style={{
                                fontFamily: "var(--font-playfair), serif",
                                fontSize: "clamp(34px, 4vw, 54px)",
                            }}
                        >
                            Our{" "}
                            <span className="text-[#D72638]">5-Pillar</span>
                            <br />Framework
                        </h2>

                        <p
                            className="text-zinc-500 leading-[1.8] font-light mb-9 max-w-[460px]"
                            style={{
                                fontFamily: "var(--font-dm-sans), sans-serif",
                                fontSize: "clamp(15px, 1.1vw, 18px)",
                            }}
                        >
                            A high-performance standard built to transform aspiring traders
                            into professional, disciplined market participants.
                        </p>

                        {/* Pillar rows */}
                        <div className="flex flex-col gap-2.5 mb-10">
                            {pillars.map((pillar, i) => (
                                <PillarRow
                                    key={pillar.title}
                                    pillar={pillar}
                                    delay={0.3 + i * 0.09}
                                    isInView={isInView}
                                />
                            ))}
                        </div>

                        {/* CTA */}
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="no-underline inline-block w-full sm:w-auto">
                            <motion.button
                                whileHover={{ y: -3, boxShadow: "0 20px 48px rgba(215,38,56,0.38)" }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                           bg-[#D72638] hover:bg-[#C0202F] text-white
                           text-[15px] sm:text-[16px] font-bold
                           px-8 sm:px-10 py-4 sm:py-[17px] rounded-2xl
                           border-none cursor-pointer
                           shadow-[0_10px_28px_rgba(215,38,56,0.28)]
                           transition-colors duration-200"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                Book Mentorship Call
                                <ArrowRight className="w-[17px] h-[17px]" strokeWidth={2.5} />
                            </motion.button>
                        </a>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default MentorshipSection;