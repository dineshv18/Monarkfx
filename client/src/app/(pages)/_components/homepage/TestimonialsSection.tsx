"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Rahul S.",
        text: "The structured approach to market analysis completely changed how I view trading. Highly professional mentorship.",
    },
    {
        name: "Priya M.",
        text: "Learned forex trading with proper risk management. The offline sessions were incredibly valuable.",
    },
    {
        name: "Amit K.",
        text: "Solid fundamentals-based crypto education. No get-rich-quick promises, just real market knowledge.",
    },
    {
        name: "Neha R.",
        text: "Options trading finally makes sense. The practical sessions helped me develop consistent strategies.",
    },
    {
        name: "Vikram P.",
        text: "The discipline-first approach sets Monark FX apart. Real education, not entertainment.",
    },
    {
        name: "Sneha T.",
        text: "Comprehensive curriculum with personal attention. Worth every session.",
    },
];

const TestimonialsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-10 md:py-12 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Google Rating Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < 4
                                        ? "text-amber-500 fill-amber-500"
                                        : "text-amber-500 fill-amber-500/60"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-white font-semibold">4.7</span>
                        <span className="text-[#525252] text-sm">Google Reviews</span>
                    </div>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-white"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        What Students Say
                    </h2>
                </motion.div>

                {/* Testimonial Wall */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="bg-[#0a0a0a] p-8 lg:p-10"
                        >
                            <p className="text-[#a3a3a3] leading-relaxed mb-6">
                                "{testimonial.text}"
                            </p>
                            <span
                                className="text-[#525252] text-sm"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                — {testimonial.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
