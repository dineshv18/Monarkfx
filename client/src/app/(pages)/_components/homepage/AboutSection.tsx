"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";


const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-10 md:py-12 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-[#525252] text-xs tracking-[0.3em] uppercase block mb-4">
                            About
                        </span>

                        <h2
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            <span className="text-red-600">Monark</span>
                            <span className="text-white"> FX</span>
                        </h2>

                        <div className="space-y-5 mb-10">
                            <p className="text-[#a3a3a3] leading-relaxed">
                                An ISO 21008:2018 Certified Financial Market Education Institute
                                established in 2021.
                            </p>

                            <p className="text-[#a3a3a3] leading-relaxed">
                                We specialize in structured education across Stocks, Forex &
                                Cryptocurrency — built on discipline, data analysis, and real
                                market structure.
                            </p>

                            <p className="text-[#525252] leading-relaxed">
                                With 7 dedicated mentors and 250+ students trained, we are building
                                a legacy in trading education.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Brand Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div
                            className="relative w-full max-w-md rounded-2xl p-10 text-center"
                            style={{
                                background: "linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(15,15,15,0.9) 100%)",
                                border: "1px solid rgba(50,50,50,0.4)",
                            }}
                        >
                            {/* Logo */}
                            <div className="mb-8">
                                <Image
                                    src="/logo-light.png"
                                    alt="Monark FX"
                                    width={180}
                                    height={54}
                                    className="h-14 w-auto object-contain mx-auto"
                                />
                            </div>

                            {/* Tagline */}
                            <p
                                className="text-red-700 text-sm font-medium tracking-[0.2em] uppercase mb-8"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                "Defy Limits"
                            </p>

                            {/* Badges */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-3 text-[#737373] text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-700" />
                                    <span>ISO 21008:2018 Certified</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-[#737373] text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-700" />
                                    <span>Established 2021</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-[#737373] text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-700" />
                                    <span>Education Only</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
