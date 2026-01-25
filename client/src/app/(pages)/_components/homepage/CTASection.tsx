"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CTASection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-12 md:py-24 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    {/* Big Typography Statement */}
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Education decides outcomes.
                    </h2>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#525252] leading-tight mb-16"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Discipline decides success.
                    </h2>

                    {/* Red accent line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-16 h-px mx-auto mb-12 bg-red-800"
                    />

                    {/* Minimal Button */}
                    <Link href="/courses">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-3 px-8 py-4 border border-zinc-800 hover:border-red-900/50 text-white transition-colors rounded-lg"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            <span className="text-sm tracking-wide">Start Your Learning Path</span>
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
