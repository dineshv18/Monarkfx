"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";

type Review = {
    id: number;
    name: string;
    instagram: string;
    instaUrl: string;
    image: string;
    quote: string;
};

const REVIEWS: Review[] = [
    {
        id: 1,
        name: "Vineet Sharma",
        instagram: "Vineet.sharma.8888",
        instaUrl: "https://www.instagram.com/Vineet.sharma.8888",
        image: "/reviews/vineet.jpeg",
        quote:
            "Monark FX is the best place to actually learn trading, not just theory. The mentors are responsive and supportive throughout.",
    },
    {
        id: 2,
        name: "Mukul",
        instagram: "mukulgupta022",
        instaUrl: "https://www.instagram.com/mukulgupta022",
        image: "/reviews/mukul.jpeg",
        quote:
            "The concepts weren't clear to me before, but the way everything is explained has made it much easier. I've felt real growth in my confidence.",
    },
    {
        id: 3,
        name: "Piyush",
        instagram: "_pyranth",
        instaUrl: "https://www.instagram.com/_pyranth",
        image: "/reviews/piyush.jpeg",
        quote:
            "Joined MonarkFX and my entire approach to trading transformed completely.",
    },
    {
        id: 4,
        name: "Sidharth",
        instagram: "sidharth_gudhenia",
        instaUrl: "https://www.instagram.com/sidharth_gudhenia",
        image: "/reviews/sidharth.jpeg",
        quote:
            "Genuinely one of the best platforms to learn Forex, Crypto, and the Indian markets. Strongly recommended for anyone starting from scratch.",
    },
    {
        id: 5,
        name: "Abhishek",
        instagram: "_abhishek_prajapati01",
        instaUrl: "https://www.instagram.com/_abhishek_prajapati01",
        image: "/reviews/abhishek.jpeg",
        quote:
            "My experience with Monark FX has been excellent. The mentorship, live guidance and focus on risk management build real consistency.",
    },
    {
        id: 6,
        name: "Ishaan Makkar",
        instagram: "ishaan.makkar",
        instaUrl: "https://www.instagram.com/ishaan.makkar",
        image: "/reviews/ishaan-makkar.jpeg",
        quote:
            "The team is knowledgeable and approachable. What stands out is their practical approach — real-time market insights and organised material.",
    },
    {
        id: 7,
        name: "Venu Narwal",
        instagram: "heyvenunarwal",
        instaUrl: "https://www.instagram.com/heyvenunarwal",
        image: "/reviews/heyvenunarwal.jpeg",
        quote:
            "They don't just focus on theory — they guide you on how the real market works. The best part is the trader mindset they build.",
    },
    {
        id: 8,
        name: "Govind",
        instagram: "_itsgovindofficial_",
        instaUrl: "https://www.instagram.com/_itsgovindofficial_/",
        image: "/reviews/itsgovindofficial.jpeg",
        quote:
            "I was searching for the best trading institute in Delhi, then I found Monark FX. Within days I was trading in a professional manner.",
    },
    {
        id: 9,
        name: "Surender Singh",
        instagram: "surender_singh13",
        instaUrl: "https://www.instagram.com/surender_singh13",
        image: "/reviews/surender.jpeg",
        quote:
            "A great learning experience. The mentors explain technical analysis, risk management and live trading with real examples.",
    },
    {
        id: 10,
        name: "Rahul Miglani",
        instagram: "rahul_miglani21",
        instaUrl: "https://www.instagram.com/rahul_miglani21/",
        image: "/reviews/rahul.jpeg",
        quote:
            "True value was added when I joined Monark. Dinesh sir taught me a style of trading and knowledge that is not available online.",
    },
    {
        id: 11,
        name: "Kirat",
        instagram: "kirat_marwahh",
        instaUrl: "https://www.instagram.com/kirat_marwahh",
        image: "/reviews/kirat.jpeg",
        quote:
            "Clear explanations and practical examples. The support system was responsive. I feel more equipped to make informed market decisions now.",
    },
    {
        id: 12,
        name: "Sidharth Gudhenia",
        instagram: "sidharth_gudhenia",
        instaUrl: "https://www.instagram.com/sidharth_gudhenia",
        image: "/reviews/sidharth (2).jpeg",
        quote:
            "The environment is positive and keeps you motivated. A significant boost in my trading knowledge and confidence.",
    },
];

const NAVY = "#0B1E3F";
const GOLD = "#E8B923";
const GOLD_GRADIENT =
    "linear-gradient(135deg, #F7E7A8 0%, #E8B923 45%, #C79A1E 75%, #F5D876 100%)";
const AUTOPLAY_MS = 6000;

const imageVariants = {
    enter: (dir: "left" | "right") => ({
        y: dir === "right" ? "100%" : "-100%",
        opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (dir: "left" | "right") => ({
        y: dir === "right" ? "-100%" : "100%",
        opacity: 0,
    }),
};

const textVariants = {
    enter: (dir: "left" | "right") => ({ x: dir === "right" ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: "left" | "right") => ({ x: dir === "right" ? -40 : 40, opacity: 0 }),
};

export default function TestimonialsSection() {
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState<"left" | "right">("right");
    const [paused, setPaused] = useState(false);

    const active = REVIEWS[index];

    const go = useCallback((to: number, d: "left" | "right") => {
        setDir(d);
        setIndex((to + REVIEWS.length) % REVIEWS.length);
    }, []);

    const next = useCallback(() => go(index + 1, "right"), [index, go]);
    const prev = useCallback(() => go(index - 1, "left"), [index, go]);

    // auto-advance
    useEffect(() => {
        if (paused) return;
        const t = setInterval(() => {
            setDir("right");
            setIndex((p) => (p + 1) % REVIEWS.length);
        }, AUTOPLAY_MS);
        return () => clearInterval(t);
    }, [paused, index]);

    // next 3 thumbnails after current
    const thumbs = Array.from({ length: 3 }, (_, k) => REVIEWS[(index + k + 1) % REVIEWS.length]);

    return (
        <section
            className="relative w-full overflow-hidden px-5 sm:px-8 py-20 sm:py-28"
            style={{ background: NAVY }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* bg texture + glow */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />
            <div
                aria-hidden
                className="absolute -top-20 right-0 w-[520px] h-[420px] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse, rgba(232,185,35,0.12) 0%, transparent 70%)",
                }}
            />

            <div className="relative max-w-6xl mx-auto">
                {/* heading */}
                <div className="mb-12 sm:mb-14">
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className="w-8 h-[2px] rounded-full"
                            style={{ backgroundImage: "linear-gradient(90deg,#F5D876,#E8B923,#C79A1E)" }}
                        />
                        <span
                            className="text-[11px] font-extrabold uppercase tracking-[0.24em]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: GOLD }}
                        >
                            Student Reviews
                        </span>
                    </div>
                    <h2
                        className="font-black leading-[1.05] tracking-[-0.03em] text-white max-w-2xl"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(28px, 4vw, 46px)",
                        }}
                    >
                        Real Traders,{" "}
                        <span
                            style={{
                                backgroundImage: GOLD_GRADIENT,
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Real Results
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-stretch">
                    {/* LEFT — counter + thumbnails */}
                    <div className="md:col-span-3 flex flex-row md:flex-col justify-between order-2 md:order-1">
                        <div className="flex flex-col gap-2">
                            <span
                                className="text-[13px] font-mono"
                                style={{ color: "rgba(255,255,255,0.4)" }}
                            >
                                {String(index + 1).padStart(2, "0")} /{" "}
                                {String(REVIEWS.length).padStart(2, "0")}
                            </span>
                            <span
                                className="hidden md:block text-[11px] font-bold tracking-[0.28em] uppercase [writing-mode:vertical-rl] rotate-180 mt-4"
                                style={{ color: "rgba(255,255,255,0.35)" }}
                            >
                                Testimonials
                            </span>
                        </div>

                        <div className="flex gap-2 md:mt-auto">
                            {thumbs.map((r) => {
                                const to = REVIEWS.findIndex((x) => x === r);
                                return (
                                    <button
                                        key={`${r.id}-${to}`}
                                        onClick={() => go(to, to > index ? "right" : "left")}
                                        aria-label={`View review from ${r.name}`}
                                        className="relative overflow-hidden rounded-lg w-16 h-20 md:w-[72px] md:h-[92px] opacity-60 hover:opacity-100 transition-all duration-300"
                                        style={{ border: "1px solid rgba(232,185,35,0.25)" }}
                                    >
                                        <Image
                                            src={r.image}
                                            alt={r.name}
                                            fill
                                            className="object-cover object-top"
                                            sizes="72px"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* CENTER — main image */}
                    <div className="md:col-span-4 relative h-[340px] sm:h-[420px] md:h-[460px] order-1 md:order-2">
                        <div
                            className="absolute inset-0 rounded-2xl overflow-hidden"
                            style={{ border: "1.5px solid rgba(232,185,35,0.3)", background: "#08182F" }}
                        >
                            <AnimatePresence initial={false} custom={dir}>
                                <motion.div
                                    key={index}
                                    custom={dir}
                                    variants={imageVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={active.image}
                                        alt={active.name}
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 768px) 100vw, 360px"
                                        priority
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background:
                                                "linear-gradient(to top, rgba(11,30,63,0.75) 0%, transparent 45%)",
                                        }}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT — quote + nav */}
                    <div className="md:col-span-5 flex flex-col justify-between md:pl-6 order-3">
                        <div className="relative overflow-hidden md:pt-8 min-h-[200px]">
                            <AnimatePresence initial={false} custom={dir} mode="wait">
                                <motion.div
                                    key={index}
                                    custom={dir}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <a
                                        href={active.instaUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold no-underline mb-1.5"
                                        style={{ color: GOLD }}
                                    >
                                        <FaInstagram size={13} />
                                        @{active.instagram}
                                    </a>
                                    <h3
                                        className="text-[20px] font-bold text-white"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        {active.name}
                                    </h3>
                                    <blockquote
                                        className="mt-5 text-[20px] sm:text-[24px] md:text-[26px] font-medium leading-[1.4] text-white/90"
                                        style={{ fontFamily: "var(--font-playfair), serif" }}
                                    >
                                        &ldquo;{active.quote}&rdquo;
                                    </blockquote>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-3 mt-8">
                            <button
                                onClick={prev}
                                aria-label="Previous review"
                                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-white/10"
                                style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff" }}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={next}
                                aria-label="Next review"
                                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105"
                                style={{ backgroundImage: GOLD_GRADIENT, color: NAVY }}
                            >
                                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                            </button>

                            {/* progress dots */}
                            <div className="hidden sm:flex items-center gap-1.5 ml-3">
                                {REVIEWS.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => go(i, i > index ? "right" : "left")}
                                        aria-label={`Go to review ${i + 1}`}
                                        className="rounded-full transition-all duration-300"
                                        style={{
                                            width: i === index ? 22 : 6,
                                            height: 6,
                                            background:
                                                i === index ? GOLD : "rgba(255,255,255,0.2)",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
