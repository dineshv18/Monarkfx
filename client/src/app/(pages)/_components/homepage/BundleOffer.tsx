"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const BundleOffer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-10 md:py-12 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    {/* Label */}
                    <span className="text-[#525252] text-xs tracking-[0.3em] uppercase block mb-8">
                        Exclusive Program
                    </span>

                    {/* Main Heading */}
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Advanced Market
                        <br />
                        <span className="relative inline-block">
                            Specialization Program
                            {/* Animated underline */}
                            <motion.span
                                initial={{ scaleX: 0, originX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-800 to-red-600"
                            />
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-[#737373] text-lg mb-12">
                        Forex + Crypto Combined
                    </p>

                    {/* Duration & Price */}
                    <div className="flex items-center justify-center gap-8 mb-12">
                        <span className="text-[#525252] text-sm">
                            Duration: 3+ Months
                        </span>
                        <span className="w-px h-4 bg-zinc-800" />
                        <span className="text-[#525252] text-sm">
                            ₹29,990
                        </span>
                    </div>

                    {/* CTA */}
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-3 text-[#a3a3a3] hover:text-white transition-colors"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            <span className="text-sm tracking-wide">Request Program Details</span>
                            <span className="w-8 h-px bg-red-800" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default BundleOffer;
