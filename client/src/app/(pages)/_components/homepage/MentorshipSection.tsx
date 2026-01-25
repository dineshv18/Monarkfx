"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pillars = [
    { title: "Psychology", desc: "Mindset & emotional control" },
    { title: "Risk", desc: "Capital & position management" },
    { title: "Planning", desc: "Strategy & analysis" },
    { title: "Performance", desc: "Tracking & improvement" },
    { title: "Discipline", desc: "Consistency & routine" },
];

const MentorshipSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-10 md:py-12 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-[#525252] text-xs tracking-[0.3em] uppercase block mb-3">
                            Our Method
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Mentorship Framework
                        </h2>
                        <p className="text-[#737373] leading-relaxed mb-8 max-w-md">
                            Our structured mentorship program focuses on five core pillars
                            that transform aspiring traders into disciplined market participants.
                        </p>

                        {/* Center Label */}
                        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-red-900/30 bg-red-950/10">
                            <div className="w-2 h-2 rounded-full bg-red-700" />
                            <span
                                className="text-white font-medium"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                Complete Trader Development
                            </span>
                        </div>
                    </motion.div>

                    {/* Right: Pillars List */}
                    <div className="space-y-4">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, x: 30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                className="flex items-center gap-6 p-5 rounded-xl border border-zinc-900 hover:border-red-900/30 transition-colors"
                                style={{
                                    background: "linear-gradient(135deg, rgba(20,20,20,0.5) 0%, rgba(15,15,15,0.5) 100%)",
                                }}
                            >
                                {/* Number */}
                                <span className="text-red-700 font-bold text-lg min-w-[24px]">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Content */}
                                <div>
                                    <h3
                                        className="text-white font-medium"
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                        {pillar.title}
                                    </h3>
                                    <p className="text-[#525252] text-sm">
                                        {pillar.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MentorshipSection;
