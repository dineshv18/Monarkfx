"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import {
    AreaChart, Area, XAxis, CartesianGrid, ResponsiveContainer, Tooltip,
} from "recharts";

const WA_STARTER = `https://wa.me/918750475852?text=${encodeURIComponent("Hi MonarkFX Team,\n\nI want to enroll in the *5-Day Trading Starter Workshop* (₹999 + GST). Please share the details.\n\nThank you!")}`;
const WA_MENTORSHIP = `https://wa.me/918750475852?text=${encodeURIComponent("Hi MonarkFX Team,\n\nI am interested in the 90-Day Mentorship Program. Please share batch details, fees, and schedule.\n\nThank you!")}`;

const chartData = [
    { month: "Jan", students: 18 },
    { month: "Feb", students: 35 },
    { month: "Mar", students: 52 },
    { month: "Apr", students: 70 },
    { month: "May", students: 95 },
    { month: "Jun", students: 130 },
    { month: "Jul", students: 160 },
    { month: "Aug", students: 185 },
    { month: "Sep", students: 210 },
    { month: "Oct", students: 235 },
    { month: "Nov", students: 248 },
    { month: "Dec", students: 260 },
];

const starterFeatures = [
    "Basics of Market Structure",
    "Understanding Liquidity Pools",
    "The Professional Edge System",
    "Live Q&A Session with Mentor",
    "₹999 Credit towards Full Program",
];

const mentorshipFeatures = [
    "Indian Market, Forex & Crypto",
    "3 Sessions/Week with Mentor",
    "90-Day Intensive Framework",
    "Risk & Psychology Modules",
    "1 Month Free Trading Room",
    "ISO-Certified Certificate",
    "EMI Available — ₹6,000×3",
    "Online & Offline Batches",
    "Live Trade Reviews",
    "Priority WhatsApp Support",
];

const PricingPreview = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="relative bg-[#F7F7F7] py-16 sm:py-20 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, #D0D0D0 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.4,
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)" }} />

            <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
                    className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 bg-white border border-zinc-200 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D72638]" />
                        <span className="text-[10px] font-black text-[#D72638] uppercase tracking-[0.16em]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            Start Small. Scale Big.
                        </span>
                    </div>
                    <h2 className="font-black text-zinc-950 leading-[1.05] tracking-[-0.03em] mb-3"
                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(32px, 5vw, 54px)" }}>
                        Simple,{" "}
                        <span className="text-[#D72638]">Transparent</span> Pricing
                    </h2>
                    <p className="text-zinc-500 max-w-lg mx-auto text-[15px] leading-[1.7] font-light"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        Begin with our 5-day workshop or go straight to full mentorship. No hidden fees.
                    </p>
                </motion.div>

                {/* Grid — prompt layout */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
                    className="bg-white rounded-2xl border border-zinc-200 overflow-hidden"
                    style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}>

                    <div className="grid grid-cols-1 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-zinc-100">

                        {/* LEFT — Starter Workshop */}
                        <div className="md:col-span-2 flex flex-col justify-between p-7 sm:p-8">
                            <div className="space-y-5">
                                <div>
                                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#D72638] bg-[#D72638]/07 border border-[#D72638]/20 px-3 py-1 rounded-full mb-3"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "rgba(215,38,56,0.06)" }}>
                                        Start Here
                                    </span>
                                    <h3 className="font-black text-zinc-900 mb-1 leading-tight"
                                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(18px, 1.5vw, 22px)" }}>
                                        5-Day Starter Workshop
                                    </h3>
                                    <p className="text-[#D72638] font-black leading-none mt-3"
                                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(36px, 4vw, 46px)" }}>
                                        ₹999
                                    </p>
                                    <p className="text-zinc-400 text-[12px] mt-1"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                        One-time · + GST
                                    </p>
                                </div>

                                <a href={WA_STARTER} target="_blank" rel="noopener noreferrer">
                                    <motion.button
                                        whileHover={{ y: -2, boxShadow: "0 10px 28px rgba(37,211,102,0.4)" }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[14px] text-white border-none cursor-pointer transition-colors duration-200 mt-2"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#25D366", boxShadow: "0 4px 14px rgba(37,211,102,0.25)" }}>
                                        <FaWhatsapp size={17} />
                                        Book My Spot
                                    </motion.button>
                                </a>

                                <div className="h-px bg-zinc-100 w-full" />

                                <ul className="space-y-2.5">
                                    {starterFeatures.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <Check className="w-4 h-4 text-[#D72638] shrink-0 mt-[1px]" strokeWidth={2.5} />
                                            <span className="text-zinc-600 text-[13px]"
                                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                                {f}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT — Mentorship */}
                        <div className="md:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">

                            {/* Right-left: pricing + chart */}
                            <div className="flex flex-col justify-between p-7 sm:p-8 space-y-5">
                                <div>
                                    <h3 className="font-black text-zinc-900 mb-1 leading-tight"
                                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(18px, 1.5vw, 22px)" }}>
                                        90-Day Mentorship
                                    </h3>
                                    <div className="flex items-baseline gap-2 mt-3">
                                        <span className="text-[#D72638] font-black leading-none"
                                            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(32px, 3.5vw, 42px)" }}>
                                            ₹17,999
                                        </span>
                                        <span className="text-zinc-400 text-[13px] font-medium">Offline + GST</span>
                                    </div>
                                    <p className="text-zinc-500 text-[12px] mt-0.5"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                        Online: ₹14,999 + GST · EMI available
                                    </p>
                                </div>

                                {/* Area chart */}
                                <div className="rounded-xl border border-zinc-100 p-3 bg-zinc-50">
                                    <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.1em] mb-1 px-1"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                        Student Growth 2024
                                    </p>
                                    <div style={{ height: 110 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#D72638" stopOpacity={0.18} />
                                                        <stop offset="95%" stopColor="#D72638" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid vertical={false} stroke="#F0F0F0" />
                                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={6}
                                                    tick={{ fontSize: 9, fill: "#AAA", fontFamily: "var(--font-dm-sans), sans-serif" }} />
                                                <Tooltip
                                                    contentStyle={{ background: "#fff", border: "1px solid #EEE", borderRadius: 8, fontSize: 11, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                                                    cursor={{ stroke: "#D72638", strokeDasharray: "4 4", strokeWidth: 1 }} />
                                                <Area type="monotone" dataKey="students" stroke="#D72638" strokeWidth={2}
                                                    fill="url(#redGrad)" dot={false}
                                                    activeDot={{ r: 4, fill: "#D72638", stroke: "#fff", strokeWidth: 2 }} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            {/* Right-right: features + CTA */}
                            <div className="p-7 sm:p-8 flex flex-col">
                                <p className="text-[12px] font-bold text-zinc-700 mb-4 uppercase tracking-[0.08em]"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                    Everything Included:
                                </p>
                                <ul className="space-y-2.5 flex-1">
                                    {mentorshipFeatures.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <Check className="w-3.5 h-3.5 text-[#D72638] shrink-0 mt-[2px]" strokeWidth={2.5} />
                                            <span className="text-zinc-600 text-[12px] sm:text-[13px]"
                                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                                {f}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <a href={WA_MENTORSHIP} target="_blank" rel="noopener noreferrer">
                                        <motion.button
                                            whileHover={{ y: -2, boxShadow: "0 10px 28px rgba(37,211,102,0.4)" }}
                                            whileTap={{ scale: 0.97 }}
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[13px] text-white border-none cursor-pointer transition-colors duration-200"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#25D366", boxShadow: "0 4px 14px rgba(37,211,102,0.25)" }}>
                                            <FaWhatsapp size={16} />
                                            Enroll Now
                                        </motion.button>
                                    </a>
                                    <Link href="/courses" className="no-underline">
                                        <motion.button
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold text-[13px] cursor-pointer border transition-colors duration-200"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "transparent", color: "#0A0A0A", borderColor: "#E0E0E0" }}>
                                            View All Plans
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default PricingPreview;
