"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { GridPattern } from "@/components/ui/grid-pattern";

type Testimonial = {
    id: number;
    name: string;
    instagram: string;
    instaUrl: string;
    image: string;
    quote: string;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Vineet Sharma",
        instagram: "Vineet.sharma.8888",
        instaUrl: "https://www.instagram.com/Vineet.sharma.8888",
        image: "/reviews/vineet.jpeg",
        quote:
            "Monark FX is the best place to actually learn trading, not just theory. The mentors are responsive and supportive throughout. Happy to be in the Monark FX family — we grow together.",
    },
    {
        id: 2,
        name: "Mukul",
        instagram: "mukulgupta022",
        instaUrl: "https://www.instagram.com/mukulgupta022",
        image: "/reviews/mukul.jpeg",
        quote:
            "The concepts weren't clear to me before, but the way everything is explained has made it much easier to understand. I've felt real growth in my knowledge and confidence.",
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
            "Genuinely one of the best platforms to learn Forex, Crypto, and the Indian markets. The team is highly supportive and always available to guide you. Strongly recommended for anyone who wants to start from scratch.",
    },
    {
        id: 5,
        name: "Abhishek",
        instagram: "_abhishek_prajapati01",
        instaUrl: "https://www.instagram.com/_abhishek_prajapati01",
        image: "/reviews/abhishek.jpeg",
        quote:
            "My experience with Monark FX has been excellent. The mentorship, live market guidance, and strong focus on risk management really help in building confidence and consistency.",
    },
    {
        id: 6,
        name: "Ishaan Makkar",
        instagram: "ishaan.makkar",
        instaUrl: "https://www.instagram.com/ishaan.makkar",
        image: "/reviews/ishaan-makkar.jpeg",
        quote:
            "The team is knowledgeable, approachable, and provides consistent support. What stands out is their practical approach — real-time market insights and well-organized study material.",
    },
    {
        id: 7,
        name: "Venu Narwal",
        instagram: "heyvenunarwal",
        instaUrl: "https://www.instagram.com/heyvenunarwal",
        image: "/reviews/heyvenunarwal.jpeg",
        quote:
            "They don't just focus on theory — they guide you on how the real market works. The best part is the mindset they build. They teach you how to think like a trader and become consistent.",
    },
    {
        id: 8,
        name: "Govind",
        instagram: "_itsgovindofficial_",
        instaUrl: "https://www.instagram.com/_itsgovindofficial_/",
        image: "/reviews/itsgovindofficial.jpeg",
        quote:
            "I was searching for the best trading institute in Delhi, then I found Monark FX. After a few days I was able to trade in a very professional manner. The trading community and teachers are the best part.",
    },
    {
        id: 9,
        name: "Surender Singh",
        instagram: "surender_singh13",
        instaUrl: "https://www.instagram.com/surender_singh13",
        image: "/reviews/surender.jpeg",
        quote:
            "A great learning experience. The mentors explain technical analysis, risk management, and live market trading with real examples. Highly recommended for beginners as well as aspiring traders.",
    },
    {
        id: 10,
        name: "Rahul Miglani",
        instagram: "rahul_miglani21",
        instaUrl: "https://www.instagram.com/rahul_miglani21/",
        image: "/reviews/rahul.jpeg",
        quote:
            "I'd been learning forex for 6 months, but true value was added when I joined Monark. Dinesh sir helped me with a style of trading and knowledge that is not available online. Highly recommended.",
    },
    {
        id: 11,
        name: "Kirat",
        instagram: "kirat_marwahh",
        instaUrl: "https://www.instagram.com/kirat_marwahh",
        image: "/reviews/kirat.jpeg",
        quote:
            "Clear explanations and practical examples. The trainers were knowledgeable and patient, and the support system was responsive. I feel more equipped to make informed decisions in the market now.",
    },
    {
        id: 12,
        name: "Sidharth Gudhenia",
        instagram: "sidharth_gudhenia",
        instaUrl: "https://www.instagram.com/sidharth_gudhenia",
        image: "/reviews/sidharth (2).jpeg",
        quote:
            "The environment is positive and keeps you motivated. I've personally noticed a significant boost in my trading knowledge and confidence thanks to their clear setup and disciplined rules.",
    },
];

export default function TestimonialsSection() {
    return (
        <section
            className="relative w-full overflow-hidden bg-white py-20 sm:py-28 px-5 sm:px-8"
            style={{ borderTop: "1px solid #F0F0F0" }}
        >
            {/* layered radial-gradient backdrop (brand red) */}
            <div
                aria-hidden
                className="absolute inset-0 isolate z-0 overflow-hidden pointer-events-none"
            >
                <div className="absolute top-0 left-0 h-[1280px] w-[560px] -translate-y-[350px] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(215,38,56,0.07)_0,rgba(215,38,56,0.02)_50%,rgba(215,38,56,0.01)_80%)]" />
                <div className="absolute top-0 left-0 h-[1280px] w-[240px] [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(215,38,56,0.05)_0,rgba(215,38,56,0.01)_80%,transparent_100%)]" />
                <div className="absolute top-0 right-0 h-[1280px] w-[240px] -translate-y-[350px] rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(215,38,56,0.05)_0,rgba(215,38,56,0.01)_80%,transparent_100%)]" />
            </div>

            <div className="relative mx-auto max-w-6xl">
                {/* heading */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 sm:mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
                        <span
                            className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            Student Reviews
                        </span>
                    </div>
                    <h2
                        className="font-black text-zinc-950 leading-[1.05] tracking-[-0.03em] max-w-3xl"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(28px, 4vw, 48px)",
                        }}
                    >
                        Real Traders,{" "}
                        <span style={{ color: "#D72638" }}>Real Results</span>
                    </h2>
                    <p
                        className="mt-3 text-zinc-500 leading-[1.7] font-light max-w-xl"
                        style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "clamp(14px, 1.1vw, 16px)",
                        }}
                    >
                        Hear directly from the MonarkFX community — verified reviews from
                        students learning Forex, Crypto and the Indian markets.
                    </p>
                </motion.div>

                {/* card grid — image LEFT, content RIGHT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {testimonials.map((t, index) => (
                        <motion.article
                            key={t.id}
                            initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{
                                delay: (index % 2) * 0.08 + 0.05,
                                duration: 0.55,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group relative grid grid-cols-[auto_1fr] gap-4 sm:gap-5 overflow-hidden rounded-2xl border border-dashed border-[#D72638]/30 bg-white p-4 sm:p-5 transition-colors duration-300 hover:border-[#D72638]/60"
                        >
                            {/* per-card grid pattern, masked fade from top-left */}
                            <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#D72638]/[0.06] to-[#D72638]/[0.02] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
                                    <GridPattern
                                        width={25}
                                        height={25}
                                        x={-12}
                                        y={4}
                                        strokeDasharray="3"
                                        className="absolute inset-0 h-full w-full stroke-[#D72638]/25 mix-blend-multiply"
                                    />
                                </div>
                            </div>

                            {/* left rail accent on hover */}
                            <span
                                aria-hidden
                                className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
                                style={{ background: "#D72638" }}
                            />

                            {/* LEFT — image */}
                            <div className="relative z-10 shrink-0">
                                <div
                                    className="relative w-[84px] h-[104px] sm:w-[100px] sm:h-[128px] rounded-xl overflow-hidden"
                                    style={{
                                        border: "1.5px solid #EBEBEB",
                                        boxShadow: "0 10px 26px rgba(0,0,0,0.10)",
                                    }}
                                >
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        fill
                                        loading="lazy"
                                        className="object-cover object-top"
                                        sizes="100px"
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background:
                                                "linear-gradient(to top, rgba(215,38,56,0.38) 0%, transparent 55%)",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* RIGHT — name, social, quote */}
                            <div className="relative z-10 min-w-0 flex flex-col">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p
                                            className="text-[14px] sm:text-[15px] font-bold text-zinc-900 truncate"
                                            style={{
                                                fontFamily: "var(--font-dm-sans), sans-serif",
                                            }}
                                        >
                                            {t.name}
                                        </p>
                                        <a
                                            href={t.instaUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] font-semibold no-underline"
                                            style={{
                                                color: "#D72638",
                                                fontFamily: "var(--font-dm-sans), sans-serif",
                                            }}
                                        >
                                            <FaInstagram size={12} />
                                            <span className="truncate max-w-[150px]">
                                                @{t.instagram}
                                            </span>
                                            <ArrowRight className="w-3 h-3" />
                                        </a>
                                    </div>
                                    <Quote
                                        className="w-5 h-5 shrink-0 text-[#D72638]/25"
                                        strokeWidth={2.5}
                                    />
                                </div>

                                <blockquote className="mt-3">
                                    <p
                                        className="text-[13px] sm:text-[13.5px] leading-[1.7] text-zinc-600 font-light"
                                        style={{
                                            fontFamily: "var(--font-dm-sans), sans-serif",
                                        }}
                                    >
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                </blockquote>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
