"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
    MdOutlinePsychology,
    MdSecurity,
    MdEventNote,
    MdTrendingUp,
    MdLoop,
    MdGroups,
} from "react-icons/md";

const WHATSAPP_URL = `https://wa.me/918750475852?text=${encodeURIComponent("Hi MonarkFX Team,\n\nI am interested in your Mentorship Program. Please share the details, batch schedule, and fees.\n\nThank you!")}`;

const pillars = [
    {
        icon: MdOutlinePsychology,
        title: "Psychology",
        description: "Mindset & emotional control — trade without fear or greed.",
        color: "#E8B923",
    },
    {
        icon: MdSecurity,
        title: "Risk Management",
        description: "Capital & position sizing — protect your account first.",
        color: "#0EA5E9",
    },
    {
        icon: MdEventNote,
        title: "Strategic Planning",
        description: "Analysis & trade thesis — every entry has a clear reason.",
        color: "#F59E0B",
    },
    {
        icon: MdTrendingUp,
        title: "Performance",
        description: "Tracking & improvement — review, refine, and repeat.",
        color: "#10B981",
    },
    {
        icon: MdLoop,
        title: "Discipline",
        description: "Consistency & routine — the edge lives in the process.",
        color: "#8B5CF6",
    },
    {
        icon: MdGroups,
        title: "Live Mentorship",
        description: "3 sessions/week — direct access to experienced mentors.",
        color: "#E8B923",
    },
];

const ProcessCard = ({
    item,
    index,
    isInView,
}: {
    item: typeof pillars[0];
    index: number;
    isInView: boolean;
}) => {
    const Icon = item.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group relative w-full rounded-2xl border bg-white p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
            style={{
                borderColor: "#EBEBEB",
            }}
        >
            {/* Decorative left line — desktop */}
            <div
                className="absolute -left-px top-1/2 hidden h-1/2 w-[2px] -translate-y-1/2 rounded-r-full transition-colors duration-300 md:block"
                style={{ background: "transparent" }}
            />
            <style>{`
                .group:hover .left-line { background: ${item.color} !important; }
                .group:hover .card-border { border-color: ${item.color}40 !important; box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
                .group:hover .icon-box-${index} { background: ${item.color} !important; color: white !important; }
            `}</style>

            {/* Icon */}
            <div
                className={`icon-box-${index} mb-4 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300`}
                style={{
                    background: `${item.color}12`,
                    borderColor: `${item.color}25`,
                    color: item.color,
                }}
            >
                <Icon size={24} />
            </div>

            {/* Text */}
            <h3 className="mb-1.5 text-[15px] font-bold text-zinc-900 leading-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}>
                {item.title}
            </h3>
            <p className="text-[13px] text-zinc-500 leading-[1.6]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                {item.description}
            </p>
        </motion.div>
    );
};

const MentorshipSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} className="relative w-full bg-white py-16 md:py-24 overflow-hidden"
            style={{ borderTop: "1px solid #F0F0F0" }}>

            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(rgba(232,185,35,0.035) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">

                    {/* LEFT — text + CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className="md:col-span-1 flex flex-col items-start justify-center"
                    >
                        <span className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#E8B923]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            Our Framework
                        </span>

                        <h2 className="mb-5 font-black leading-[1.05] tracking-[-0.04em] text-zinc-950"
                            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(30px, 3.5vw, 46px)" }}>
                            The{" "}
                            <span className="text-[#E8B923]">6-Pillar</span>
                            <br />Mentorship
                            <br />Framework
                        </h2>

                        <p className="mb-8 text-[15px] text-zinc-500 leading-[1.75] font-light max-w-xs"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            Built to transform aspiring traders into professional, disciplined market participants with a proven system.
                        </p>

                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="no-underline w-full sm:w-auto">
                            <motion.button
                                whileHover={{ y: -2, boxShadow: "0 14px 36px rgba(37,211,102,0.4)" }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-white font-bold text-[14px] px-7 py-3.5 rounded-2xl border-none cursor-pointer transition-colors duration-200"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#25D366", boxShadow: "0 6px 20px rgba(37,211,102,0.28)" }}>
                                <FaWhatsapp size={18} />
                                Book Mentorship Call
                                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                            </motion.button>
                        </a>

                        {/* Stats strip */}
                        <div className="flex items-center gap-6 mt-8 pt-8 border-t border-zinc-100 w-full">
                            {[
                                { v: "7+", l: "Mentors" },
                                { v: "1,000+", l: "Students" },
                                { v: "4.9★", l: "Rating" },
                            ].map((s, i) => (
                                <div key={i}>
                                    <p className="font-black text-zinc-900 leading-none text-[22px]"
                                        style={{ fontFamily: "var(--font-playfair), serif", color: i === 0 ? "#E8B923" : "#0B1E3F" }}>
                                        {s.v}
                                    </p>
                                    <p className="text-[11px] font-semibold text-zinc-400 mt-1 uppercase tracking-[0.06em]"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                        {s.l}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT — 2×3 process cards */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                        {pillars.map((item, i) => (
                            <ProcessCard key={i} item={item} index={i} isInView={isInView} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MentorshipSection;



