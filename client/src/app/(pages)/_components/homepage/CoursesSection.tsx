"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const courses = [
    {
        code: "IAT",
        name: "Institution Advance Trading",
        level: "Basic → Advanced",
        duration: "8+ Weeks",
    },
    {
        code: "ACT",
        name: "Alpha Crypto Trader",
        level: "Cryptocurrency Markets",
        duration: "4+ Weeks",
    },
    {
        code: "AFT",
        name: "Alpha Forex Trader",
        level: "Foreign Exchange",
        duration: "4+ Weeks",
    },
    {
        code: "MOX",
        name: "Monark Options X",
        level: "Options & Derivatives",
        duration: "3 Weeks",
    },
];

const CoursesSection = () => {
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
                    className="mb-16"
                >
                    <span className="text-[#525252] text-xs tracking-[0.3em] uppercase block mb-3">
                        Programs
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Course Catalog
                    </h2>
                </motion.div>

                {/* Course List */}
                <div className="border-t border-zinc-900">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.code}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href="/courses">
                                <div className="group border-b border-zinc-900 py-6 lg:py-8 hover:bg-white/[0.02] transition-colors cursor-pointer px-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        {/* Left: Code + Name */}
                                        <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                                            <span
                                                className="text-red-600 font-bold text-sm tracking-wider min-w-[50px]"
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                [{course.code}]
                                            </span>
                                            <h3
                                                className="text-white font-medium text-lg lg:text-xl"
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                {course.name}
                                            </h3>
                                        </div>

                                        {/* Right: Meta + CTA */}
                                        <div className="flex items-center gap-6 sm:gap-10 ml-[66px] sm:ml-0">
                                            <div className="flex items-center gap-4 sm:gap-8">
                                                <span className="text-[#525252] text-sm hidden md:block">
                                                    {course.level}
                                                </span>
                                                <span className="text-[#525252] text-sm">
                                                    {course.duration}
                                                </span>
                                            </div>

                                            <span className="flex items-center gap-2 text-[#737373] group-hover:text-red-400 transition-colors text-sm">
                                                <span className="hidden sm:inline">View Curriculum</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
