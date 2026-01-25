"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Target, Video, GraduationCap, Briefcase, Clock } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "ISO Certified Education",
        desc: "Quality assured under 21008:2018",
    },
    {
        icon: Target,
        title: "Institutional Framework",
        desc: "Professional methodology",
    },
    {
        icon: Video,
        title: "Live Market Sessions",
        desc: "Real-time analysis & training",
    },
    {
        icon: Clock,
        title: "Flexible Learning",
        desc: "Online & offline modes",
    },
    {
        icon: GraduationCap,
        title: "Certification Program",
        desc: "ISO certified credentials",
    },
    {
        icon: Briefcase,
        title: "Career Opportunity",
        desc: "Join MX team pathway",
    },
];

const WhyChooseUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-10 md:py-12 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#525252] text-xs tracking-[0.3em] uppercase block mb-3">
                        Our Approach
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-white"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Why Monark FX
                    </h2>
                </motion.div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="group p-6 rounded-xl border border-zinc-900 hover:border-red-900/30 transition-colors"
                            style={{
                                background: "linear-gradient(135deg, rgba(20,20,20,0.5) 0%, rgba(15,15,15,0.5) 100%)",
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-red-950/30">
                                    <feature.icon className="w-5 h-5 text-red-700" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3
                                        className="text-white font-medium mb-1"
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                        {feature.title}
                                    </h3>
                                    <p className="text-[#525252] text-sm">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
