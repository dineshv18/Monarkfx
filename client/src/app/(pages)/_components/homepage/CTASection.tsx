"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Plus, MessageCircle, TrendingUp, Users, Award } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_URL = `https://wa.me/918750475852?text=${encodeURIComponent("Hi MonarkFX Team,\n\nI want to start my trading learning journey. Please share course details and next batch schedule.\n\nThank you!")}`;
const ADVISOR_URL = `https://wa.me/918750475852?text=${encodeURIComponent("Hi MonarkFX Team,\n\nI'd like to speak with an advisor about your trading programs.\n\nThank you!")}`;

const trust = [
    { icon: TrendingUp, text: "1,000+ Traders Trained" },
    { icon: Award, text: "ISO 21008:2018 Certified" },
    { icon: Users, text: "7+ Expert Mentors" },
];

const CTASection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} className="relative bg-white overflow-hidden py-14 sm:py-16"
            style={{ borderTop: "1px solid #F0F0F0" }}>

            {/* Subtle dot grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(rgba(232,185,35,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

            {/* Red top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(232,185,35,0.08) 0%, transparent 70%)" }} />

            <div className="relative max-w-[780px] mx-auto px-6 sm:px-8">

                {/* ── CTA card with prompt layout ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-col items-center px-8 sm:px-16"
                    style={{
                        border: "1.5px solid #EBEBEB",
                        borderRadius: 4,
                        aspectRatio: "16 / 10",
                        justifyContent: "center",
                        background: "radial-gradient(40% 80% at 50% 0%, rgba(232,185,35,0.06), transparent)",
                    }}
                >
                    {/* Corner plus icons */}
                    <Plus className="absolute -top-3 -left-3 w-6 h-6 text-[#E8B923]" strokeWidth={1.5} />
                    <Plus className="absolute -top-3 -right-3 w-6 h-6 text-[#E8B923]" strokeWidth={1.5} />
                    <Plus className="absolute -bottom-3 -left-3 w-6 h-6 text-[#E8B923]" strokeWidth={1.5} />
                    <Plus className="absolute -bottom-3 -right-3 w-6 h-6 text-[#E8B923]" strokeWidth={1.5} />

                    {/* Side border lines — border already on container, remove duplicates */}

                    {/* Center dashed vertical */}
                    <div className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-zinc-200 pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10 w-full text-center">

                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.45, delay: 0.05 }}
                            className="mb-7"
                        >
                            <span className="text-[11px] font-extrabold text-[#E8B923] uppercase tracking-[0.22em]"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                Take the Leap
                            </span>
                        </motion.div>

                        {/* Headline — mixed weight like prompt */}
                        <div className="mb-6 space-y-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-wrap items-baseline justify-center gap-x-3"
                                style={{ fontSize: "clamp(30px, 5.5vw, 40px)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
                            >
                                <h2 className="font-black text-zinc-950" style={{ fontFamily: "var(--font-playfair), serif" }}>Education</h2>
                                <h2 className="font-light text-zinc-400" style={{ fontFamily: "var(--font-playfair), serif" }}>decides</h2>
                                <h2 className="font-black text-zinc-950" style={{ fontFamily: "var(--font-playfair), serif" }}>your path.</h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-wrap items-baseline justify-center gap-x-3"
                                style={{ fontSize: "clamp(30px, 5.5vw, 40px)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
                            >
                                <h2 className="font-black text-[#E8B923]" style={{ fontFamily: "var(--font-playfair), serif" }}>Discipline</h2>
                                <h2 className="font-light text-zinc-400" style={{ fontFamily: "var(--font-playfair), serif" }}>decides</h2>
                                <h2 className="font-black text-zinc-950" style={{ fontFamily: "var(--font-playfair), serif" }}>success.</h2>
                            </motion.div>
                        </div>

                        {/* Sub */}
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.26 }}
                            className="text-zinc-500 leading-[1.75] mb-10 mx-auto max-w-[460px] font-light"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(14px, 1.1vw, 17px)" }}
                        >
                            Join a community of professional traders. Master institutional frameworks and build a sustainable career in the markets.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.32 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
                        >
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="no-underline w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ y: -2, boxShadow: "0 14px 36px rgba(37,211,102,0.4)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-white font-bold text-[15px] px-8 py-4 rounded-2xl border-none cursor-pointer transition-colors duration-200"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#25D366", boxShadow: "0 6px 20px rgba(37,211,102,0.28)" }}>
                                    <FaWhatsapp size={18} />
                                    Start My Learning Path
                                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                                </motion.button>
                            </a>

                            <a href={ADVISOR_URL} target="_blank" rel="noopener noreferrer" className="no-underline w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ y: -2, borderColor: "#E8B923", color: "#E8B923" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-700 font-bold text-[15px] px-8 py-4 rounded-2xl cursor-pointer transition-all duration-200 bg-white border-2 border-zinc-200"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    <MessageCircle className="w-4 h-4" />
                                    Consult An Advisor
                                </motion.button>
                            </a>
                        </motion.div>


                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;

