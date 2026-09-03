"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const IMAGES = [
    { src: "/courses/indian.png", alt: "Indian Market Mastery" },
    { src: "/courses/forex.png",  alt: "Forex & Gold" },
    { src: "/courses/crypto.png", alt: "Crypto Edge" },
    { src: "/courses/indian.png", alt: "Live Sessions" },
    { src: "/courses/forex.png",  alt: "Expert Mentors" },
    { src: "/courses/crypto.png", alt: "Elite Community" },
    { src: "/courses/indian.png", alt: "Certified" },
];

const OFFSETS: Record<number, React.CSSProperties> = {
    1: { position: "absolute", top: "-30vh", left: "5vw",    height: "30vh", width: "35vw" },
    2: { position: "absolute", top: "-10vh", left: "-25vw",  height: "45vh", width: "20vw" },
    3: { position: "absolute", top: "0",     left: "27.5vw", height: "25vh", width: "25vw" },
    4: { position: "absolute", top: "27.5vh",left: "5vw",    height: "25vh", width: "20vw" },
    5: { position: "absolute", top: "27.5vh",left: "-22.5vw",height: "25vh", width: "30vw" },
    6: { position: "absolute", top: "22.5vh",left: "25vw",   height: "15vh", width: "15vw" },
};

export default function ZoomParallax() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    const textScale   = useTransform(scrollYProgress, [0, 0.25], [1, 0.88]);
    const scales = [
        useTransform(scrollYProgress, [0, 1], [1, 4]),
        useTransform(scrollYProgress, [0, 1], [1, 5]),
        useTransform(scrollYProgress, [0, 1], [1, 6]),
        useTransform(scrollYProgress, [0, 1], [1, 5]),
        useTransform(scrollYProgress, [0, 1], [1, 6]),
        useTransform(scrollYProgress, [0, 1], [1, 8]),
        useTransform(scrollYProgress, [0, 1], [1, 9]),
    ];

    return (
        <div ref={container} className="relative h-[250vh]">
            <div className="sticky top-0 h-screen overflow-hidden bg-[#0B1E3F]">

                {/* Centered overlay text */}
                <motion.div
                    style={{ opacity: textOpacity, scale: textScale }}
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none text-center px-6">
                    <span className="text-[11px] font-extrabold text-[#E8B923] uppercase tracking-[0.25em] mb-4 block"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        Beyond the Curriculum
                    </span>
                    <h2 className="text-white font-black tracking-[-0.04em] leading-[1.04] mb-4"
                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(38px, 5vw, 68px)" }}>
                        Scale Your <span style={{ color: "#E8B923" }}>Edge</span>
                    </h2>
                    <p className="text-white/35 text-[14px]"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        ↓ Scroll to explore
                    </p>
                </motion.div>

                {/* Parallax image layers */}
                {IMAGES.map(({ src, alt }, i) => (
                    <motion.div
                        key={i}
                        style={{ scale: scales[i] }}
                        className="absolute top-0 flex h-full w-full items-center justify-center">
                        <div style={i === 0
                            ? { height: "25vh", width: "25vw", position: "relative", overflow: "hidden" }
                            : { ...OFFSETS[i], overflow: "hidden" }
                        }>
                            <img src={src} alt={alt}
                                className="h-full w-full object-cover"
                                style={{ filter: "brightness(0.65)" }} />
                            <div className="absolute inset-0" style={{ background: "rgba(232,185,35,0.07)" }} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
