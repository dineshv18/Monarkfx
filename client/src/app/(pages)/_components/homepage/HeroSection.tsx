"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BANNERS = [
    {
        desktop: "/banner.png",
        mobile: "/mobile banner 1st.png",
        alt: "MonarkFX Banner 1",
    },
    {
        desktop: "/monark banner copy a.png",
        mobile: "/mobile banner 2nd.png",
        alt: "MonarkFX Banner 2",
    },
    {
        desktop: "/monark banner copy.png",
        mobile: "/mobile banner 3rd.png",
        alt: "MonarkFX Banner 3",
    },
];

const HeroSection = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((c) => (c + 1) % BANNERS.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((c) => (c - 1 + BANNERS.length) % BANNERS.length);
    }, []);

    useEffect(() => {
        const id = setInterval(next, 4000);
        return () => clearInterval(id);
    }, [next]);

    return (
        <section className="w-full overflow-hidden relative">
            <AnimatePresence mode="sync" initial={false} custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={{
                        enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%" }),
                        center: { x: 0 },
                        exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%" }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
                >
                    {/* Desktop */}
                    <Image
                        src={BANNERS[current].desktop}
                        alt={BANNERS[current].alt}
                        width={1920}
                        height={640}
                        className="w-full h-auto hidden sm:block"
                        priority={current === 0}
                        sizes="100vw"
                    />
                    {/* Mobile */}
                    <Image
                        src={BANNERS[current].mobile}
                        alt={BANNERS[current].alt}
                        width={800}
                        height={450}
                        className="w-full h-auto block sm:hidden"
                        priority={current === 0}
                        sizes="100vw"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Invisible current slide to hold height */}
            <div aria-hidden style={{ visibility: "hidden" }}>
                <Image
                    src={BANNERS[current].desktop}
                    alt=""
                    width={1920}
                    height={640}
                    className="w-full h-auto hidden sm:block"
                    sizes="100vw"
                />
                <Image
                    src={BANNERS[current].mobile}
                    alt=""
                    width={800}
                    height={450}
                    className="w-full h-auto block sm:hidden"
                    sizes="100vw"
                />
            </div>

            <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 flex items-center justify-center transition-colors backdrop-blur-sm"
                aria-label="Previous"
            >
                <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 flex items-center justify-center transition-colors backdrop-blur-sm"
                aria-label="Next"
            >
                <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                {BANNERS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                        className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50"}`}
                        aria-label={`Slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
