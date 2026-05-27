"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        name: "Vineet Sharma",
        instagram: "Vineet.sharma.8888",
        instaUrl: "https://www.instagram.com/Vineet.sharma.8888",
        image: "/reviews/vineet.jpeg",
        quote: "Monark FX is Best place to actually learn trading, not just theory. Mentors at Monark FX are responsive and supportive throughout. Happy to be in Monark FX family. We Grow together.",
    },
    {
        id: 2,
        name: "Mukul",
        instagram: "mukulgupta022",
        instaUrl: "https://www.instagram.com/mukulgupta022",
        image: "/reviews/mukul.jpeg",
        quote: "The concepts weren't clear to me before, but the way everything is explained has made it much easier to understand. I've felt real growth in my knowledge and confidence. I would definitely recommend this institute to others.",
    },
    {
        id: 3,
        name: "Piyush",
        instagram: "_pyranth",
        instaUrl: "https://www.instagram.com/_pyranth",
        image: "/reviews/piyush.jpeg",
        quote: "Joined MonarkFX and my entire approach to trading transformed completely.",
    },
    {
        id: 4,
        name: "Sidharth",
        instagram: "sidharth_gudhenia",
        instaUrl: "https://www.instagram.com/sidharth_gudhenia",
        image: "/reviews/sidharth.jpeg",
        quote: "Monark FX is genuinely one of the best platforms to learn Forex, Crypto, and the Indian markets. The team is highly supportive and always available to guide you. I've personally noticed a significant boost in my trading knowledge and confidence. Strongly recommended for anyone who wants to start from scratch and grow into a professional trader.",
    },
    {
        id: 5,
        name: "Abhishek",
        instagram: "_abhishek_prajapati01",
        instaUrl: "https://www.instagram.com/_abhishek_prajapati01",
        image: "/reviews/abhishek.jpeg",
        quote: "My experience with MONARK FX INSTITUTE has been excellent. It is truly one of the best institutes for Forex trading. The mentorship, live market guidance, and strong focus on risk management really help in building confidence and consistency.",
    },
    {
        id: 6,
        name: "Ishaan Makkar",
        instagram: "ishaan.makkar",
        instaUrl: "https://www.instagram.com/ishaan.makkar",
        image: "/reviews/ishaan-makkar.jpeg",
        quote: "I've had a positive experience with MonarkFX Trading Institute. The team is knowledgeable, approachable, and provides consistent support. What stands out is their practical approach, including real-time market insights and well-organized study material. I would recommend MonarkFX to anyone serious about learning trading.",
    },
    {
        id: 7,
        name: "Venu Narwal",
        instagram: "heyvenunarwal",
        instaUrl: "https://www.instagram.com/heyvenunarwal",
        image: "/reviews/heyvenunarwal.jpeg",
        quote: "I joined Monark FX when I had started losing faith in the traditional 9–5 routine. What I really appreciate is that they don't just focus on theory — they guide you on how the real market works. The best part is the mindset they build. They teach you how to think like a trader and become consistent.",
    },
    {
        id: 8,
        name: "Govind",
        instagram: "_itsgovindofficial_",
        instaUrl: "https://www.instagram.com/_itsgovindofficial_/",
        image: "/reviews/itsgovindofficial.jpeg",
        quote: "I was searching for the best trading institute in Delhi then I found Monark FX. After a few days I was able to trade in a very professional manner. The best part is their trading community and teachers. Dinesh sir tries to deliver each and every thing in a very clear and systematic manner. Monark FX is one of the best institutes.",
    },
    {
        id: 9,
        name: "Surender Singh",
        instagram: "surender_singh13",
        instaUrl: "https://www.instagram.com/surender_singh13",
        image: "/reviews/surender.jpeg",
        quote: "I recently completed my trading course at Monark FX, and it has been a great learning experience. The mentors are highly supportive and explain topics like technical analysis, risk management, and live market trading with real examples. Highly recommended for beginners as well as aspiring traders.",
    },
    {
        id: 10,
        name: "Rahul Miglani",
        instagram: "rahul_miglani21",
        instaUrl: "https://www.instagram.com/rahul_miglani21/",
        image: "/reviews/rahul.jpeg",
        quote: "I've been learning forex for 6 months but true value was added when I joined Monark Institute. Dinesh sir helped me with a different style of trading and knowledge which is not available online. I am grateful to be a part of their trading floor. I have felt real confidence in planning and executing trades. Highly recommended.",
    },
    {
        id: 11,
        name: "Kirat",
        instagram: "kirat_marwahh",
        instaUrl: "https://www.instagram.com/kirat_marwahh",
        image: "/reviews/kirat.jpeg",
        quote: "Monark FX provided a comprehensive learning experience with clear explanations and practical examples. The trainers were knowledgeable and patient, making complex concepts easier to understand. The support system was responsive, addressing doubts promptly. I feel more equipped to make informed decisions in the market now.",
    },
    {
        id: 12,
        name: "Sidharth Gudhenia",
        instagram: "sidharth_gudhenia",
        instaUrl: "https://www.instagram.com/sidharth_gudhenia",
        image: "/reviews/sidharth (2).jpeg",
        quote: "Monark FX is genuinely one of the best platforms to learn Forex, Crypto, and the Indian markets. The environment is positive and keeps you motivated. I've personally noticed a significant boost in my trading knowledge and confidence for their clear setup and disciplined rules.",
    },
];

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const active = testimonials[activeIndex];

    const next = () => { setActiveIndex(prev => (prev + 1) % testimonials.length); resetTimer(); };
    const go = (i: number) => { setActiveIndex(i); resetTimer(); };

    // Auto-advance every 6 seconds
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(next, 6000);
    };
    React.useEffect(() => {
        resetTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, []);

    return (
        <section ref={ref} className="relative w-full overflow-hidden bg-white py-24 sm:py-32"
            style={{ borderTop: "1px solid #F0F0F0" }}>

            {/* Dot grid bg */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(rgba(215,38,56,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            <div className="relative max-w-5xl mx-auto px-6 sm:px-8">

                {/* Section label + heading */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                        <span className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            Student Reviews
                        </span>
                        <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                    </div>
                    <h2 className="font-black text-zinc-950 leading-[1.05] tracking-[-0.03em]"
                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 4vw, 48px)" }}>
                        What Our Students{" "}
                        <span style={{ color: "#D72638" }}>Say About Us</span>
                    </h2>
                </motion.div>

                {/* Main split layout */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-center cursor-pointer"
                    onClick={next}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* LEFT — quote */}
                    <div className="space-y-7">
                        {/* Counter */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id + "-label"}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}
                                className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-zinc-400"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                <span className="w-6 h-px bg-zinc-300" />
                                MonarkFX Student
                            </motion.div>
                        </AnimatePresence>

                        {/* Quote */}
                        <div className="relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.blockquote
                                    key={active.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -40 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-2xl sm:text-3xl  font-light leading-[1.35] tracking-tight text-zinc-900"
                                    style={{ fontFamily: "var(--font-playfair), serif" }}
                                >
                                    &ldquo;{active.quote}&rdquo;
                                </motion.blockquote>
                            </AnimatePresence>
                        </div>

                        {/* Author */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.15 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-8 h-px bg-zinc-300" />
                                <div>
                                    <p className="text-sm font-bold text-zinc-900"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                        {active.name}
                                    </p>
                                    {active.instagram ? (
                                        <a
                                            href={active.instaUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={e => e.stopPropagation()}
                                            className="text-[11px] font-semibold no-underline flex items-center gap-1"
                                            style={{ color: "#E1306C", fontFamily: "var(--font-dm-sans), sans-serif" }}
                                        >
                                            @{active.instagram}
                                            <ArrowRight className="w-3 h-3" />
                                        </a>
                                    ) : (
                                        <p className="text-xs text-zinc-400"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                                            MonarkFX Mentorship Student
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT — image */}
                    <div className="relative w-full md:w-52 h-72 md:h-80 shrink-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id + "-img"}
                                initial={{ opacity: 0, filter: "blur(16px)", scale: 1.04 }}
                                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                exit={{ opacity: 0, filter: "blur(16px)", scale: 0.96 }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0"
                            >
                                <div className="w-full h-full rounded-2xl overflow-hidden"
                                    style={{ border: "1.5px solid #EBEBEB", boxShadow: "0 20px 48px rgba(0,0,0,0.1)" }}>
                                    <Image
                                        src={active.image}
                                        alt={active.name}
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 768px) 100vw, 208px"
                                    />
                                    {/* Red gradient bottom */}
                                    <div className="absolute inset-0"
                                        style={{ background: "linear-gradient(to top, rgba(215,38,56,0.35) 0%, transparent 50%)" }} />
                                    {/* Name bottom */}
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <p className="text-white font-black text-[13px] leading-tight"
                                            style={{ fontFamily: "var(--font-playfair), serif", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                                            {active.name}
                                        </p>
                                        {active.instagram && (
                                            <a href={active.instaUrl} target="_blank" rel="noopener noreferrer"
                                                onClick={e => e.stopPropagation()}
                                                className="text-[10px] font-semibold no-underline"
                                                style={{ color: "#FFB3C6" }}>
                                                @{active.instagram}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Next hint */}
                        <motion.div
                            animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.85 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-zinc-400 whitespace-nowrap"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            <span>Next</span>
                            <ArrowUpRight className="w-3 h-3" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Dots */}
                <div className="flex items-center gap-2 mt-14 flex-wrap">
                    {testimonials.map((t, i) => (
                        <button
                            key={i}
                            onClick={() => go(i)}
                            className="relative p-1 cursor-pointer"
                            title={t.name}
                        >
                            <span className={`block rounded-full transition-all duration-300 ${i === activeIndex
                                ? "w-6 h-2 bg-[#D72638]"
                                : "w-2 h-2 bg-zinc-300 hover:bg-zinc-400"
                                }`} />
                        </button>
                    ))}
                    <span className="ml-2 text-xs text-zinc-400"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        {activeIndex + 1} / {testimonials.length}
                    </span>
                </div>
            </div>
        </section>
    );
}
