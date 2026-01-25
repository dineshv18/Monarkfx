"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle, Shield } from "lucide-react";

interface CandleData {
    open: number;
    high: number;
    low: number;
    close: number;
}

const HeroSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [candles, setCandles] = useState<CandleData[]>([]);
    const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);

    // Chart dimensions
    const chartTop = 35;
    const chartBottom = 185;
    const chartHeight = chartBottom - chartTop;
    const priceMin = 100;
    const priceMax = 500;
    const priceRange = priceMax - priceMin;

    // Convert price to Y coordinate (inverted because SVG Y goes down)
    const priceToY = (price: number): number => {
        const normalized = (price - priceMin) / priceRange;
        return chartBottom - (normalized * chartHeight);
    };

    // Generate realistic candle data
    const generateCandle = (prevClose: number): CandleData => {
        const volatility = 15 + Math.random() * 25;
        const direction = Math.random() > 0.45 ? 1 : -1;
        const change = direction * (Math.random() * volatility);

        const open = prevClose;
        const close = Math.max(priceMin + 30, Math.min(priceMax - 30, open + change));

        const highExtra = Math.random() * 20 + 5;
        const lowExtra = Math.random() * 20 + 5;

        const high = Math.max(open, close) + highExtra;
        const low = Math.min(open, close) - lowExtra;

        return {
            open: Math.max(priceMin + 20, Math.min(priceMax - 20, open)),
            high: Math.min(priceMax - 10, high),
            low: Math.max(priceMin + 10, low),
            close: Math.max(priceMin + 20, Math.min(priceMax - 20, close))
        };
    };

    // Initialize candles
    useEffect(() => {
        const initialCandles: CandleData[] = [];
        let currentPrice = 300;

        for (let i = 0; i < 12; i++) {
            const candle = generateCandle(currentPrice);
            initialCandles.push(candle);
            currentPrice = candle.close;
        }

        setCandles(initialCandles);

        // Animate - add new candle every 2 seconds
        const interval = setInterval(() => {
            setCandles(prev => {
                if (prev.length === 0) return prev;

                const newCandles = [...prev];
                newCandles.shift(); // Remove first

                const lastClose = newCandles[newCandles.length - 1]?.close || 300;
                const newCandle = generateCandle(lastClose);
                newCandles.push(newCandle);

                return newCandles;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    // Background animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let offset = 0;
        let animationId: number;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Grid
            ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
            ctx.lineWidth = 1;

            for (let y = 0; y < canvas.height; y += 50) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            for (let x = 0; x < canvas.width; x += 70) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Particles
            for (let i = 0; i < 25; i++) {
                const x = ((i * 89 + offset * 0.2) % canvas.width);
                const y = ((i * 67 + Math.sin(offset * 0.008 + i) * 40) % canvas.height);

                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 69, 69, 0.04)`;
                ctx.fill();
            }

            offset += 0.5;
            animationId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Calculate current values
    const currentPrice = candles.length > 0 ? Math.round(candles[candles.length - 1].close) : 300;
    const prevPrice = candles.length > 1 ? Math.round(candles[candles.length - 2].close) : 300;
    const priceChange = currentPrice - prevPrice;
    const isUp = candles.length > 0 && candles[candles.length - 1].close >= candles[candles.length - 1].open;

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0f0f0f]">
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
            {/* Red accent gradient for branding */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Left Column */}
                    <div className="max-w-xl mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 mb-6 sm:mb-8"
                        >
                            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-full">
                                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-red-700" />
                                <span className="text-[10px] sm:text-xs font-medium text-zinc-400 tracking-wide">
                                    ISO 21008:2018 Certified Financial Education
                                </span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6"
                        >
                            Master the Financial Markets with{" "}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #991b1b 100%)",
                                }}
                            >
                                Institutional Precision
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8 sm:mb-10"
                        >
                            Professional education in Stocks, Forex & Crypto — built on
                            discipline, data and real market structure.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                        >
                            <Link href="/courses" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(153, 27, 27, 0.4)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                                    style={{ background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)" }}
                                >
                                    Explore Courses
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </Link>

                            <Link href="/contact" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.03, backgroundColor: "rgba(127, 29, 29, 0.2)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-red-400 font-semibold rounded-lg border border-red-900/50 hover:bg-red-950/20 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Talk to an Advisor
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column - Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative mt-8 lg:mt-0"
                    >
                        <motion.div
                            whileHover={{ boxShadow: "0 0 60px rgba(139, 69, 69, 0.15)" }}
                            transition={{ duration: 0.4 }}
                            className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#111111] border border-zinc-800/60"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-zinc-800/50 bg-[#0d0d0d]">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        className="w-2 h-2 rounded-full bg-green-500"
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                    <span className="text-xs text-green-500 font-mono font-medium">LIVE</span>
                                </div>
                                <span className="text-xs text-zinc-500 font-mono hidden sm:block">MARKET DATA</span>
                            </div>

                            {/* Price Display */}
                            <div className="px-4 sm:px-5 py-3 border-b border-zinc-800/30 flex items-center justify-between bg-[#0f0f0f]">
                                <div>
                                    <motion.span
                                        className="text-2xl sm:text-3xl font-bold text-white font-mono"
                                        key={currentPrice}
                                        initial={{ opacity: 0.5, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        ${currentPrice}
                                    </motion.span>
                                    <motion.span
                                        className={`ml-3 text-sm font-mono font-semibold ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}
                                        key={priceChange}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {priceChange >= 0 ? '+' : ''}{priceChange}
                                    </motion.span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-zinc-500 block">24h Vol</span>
                                    <span className="text-sm text-zinc-300 font-mono">$2.4B</span>
                                </div>
                            </div>

                            {/* Chart Area */}
                            <div className="p-4 sm:p-5 bg-[#0a0a0a]">
                                <svg
                                    viewBox="0 0 400 260"
                                    className="w-full h-auto"
                                    style={{ minHeight: '220px' }}
                                >
                                    <defs>
                                        <linearGradient id="greenCandle" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#22c55e" />
                                            <stop offset="100%" stopColor="#16a34a" />
                                        </linearGradient>
                                        <linearGradient id="redCandle" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#ef4444" />
                                            <stop offset="100%" stopColor="#dc2626" />
                                        </linearGradient>
                                        <linearGradient id="resistanceZone" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="rgba(239,68,68,0.25)" />
                                            <stop offset="100%" stopColor="rgba(239,68,68,0.05)" />
                                        </linearGradient>
                                        <linearGradient id="supportZone" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="rgba(34,197,94,0.05)" />
                                            <stop offset="100%" stopColor="rgba(34,197,94,0.25)" />
                                        </linearGradient>
                                        <linearGradient id="volumeGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="rgba(34,197,94,0.8)" />
                                            <stop offset="100%" stopColor="rgba(34,197,94,0.3)" />
                                        </linearGradient>
                                        <linearGradient id="volumeRed" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="rgba(239,68,68,0.8)" />
                                            <stop offset="100%" stopColor="rgba(239,68,68,0.3)" />
                                        </linearGradient>
                                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="3" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="2" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                        <filter id="zoneGlow" x="-10%" y="-10%" width="120%" height="120%">
                                            <feGaussianBlur stdDeviation="1" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>

                                    {/* Resistance Zone (Top) */}
                                    <motion.rect
                                        x="25"
                                        y="35"
                                        width="340"
                                        height="30"
                                        fill="url(#resistanceZone)"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0.6, 0.9, 0.6] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <line x1="25" y1="50" x2="365" y2="50" stroke="#ef4444" strokeWidth="1" strokeDasharray="6,4" opacity="0.6" />
                                    <rect x="25" y="42" width="70" height="16" fill="rgba(239,68,68,0.2)" rx="3" />
                                    <text x="30" y="53" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">RESISTANCE</text>

                                    {/* Support Zone (Bottom) */}
                                    <motion.rect
                                        x="25"
                                        y="165"
                                        width="340"
                                        height="30"
                                        fill="url(#supportZone)"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0.6, 0.9, 0.6] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                    />
                                    <line x1="25" y1="180" x2="365" y2="180" stroke="#22c55e" strokeWidth="1" strokeDasharray="6,4" opacity="0.6" />
                                    <rect x="25" y="182" width="55" height="16" fill="rgba(34,197,94,0.2)" rx="3" />
                                    <text x="30" y="193" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">SUPPORT</text>

                                    {/* Background grid */}
                                    <g opacity="0.25">
                                        {[55, 80, 105, 130, 155, 180].map((y, i) => (
                                            <line
                                                key={`h-${i}`}
                                                x1="25"
                                                y1={y}
                                                x2="365"
                                                y2={y}
                                                stroke="#444"
                                                strokeWidth="0.5"
                                                strokeDasharray="3,6"
                                            />
                                        ))}
                                        {[55, 95, 135, 175, 215, 255, 295, 335].map((x, i) => (
                                            <line
                                                key={`v-${i}`}
                                                x1={x}
                                                y1="35"
                                                x2={x}
                                                y2="195"
                                                stroke="#444"
                                                strokeWidth="0.5"
                                                strokeDasharray="3,6"
                                            />
                                        ))}
                                    </g>

                                    {/* Price labels on Y-axis */}
                                    <g fill="#666" fontSize="8" fontFamily="monospace">
                                        <text x="370" y="54" fill="#ef4444">480</text>
                                        <text x="370" y="80">400</text>
                                        <text x="370" y="110">320</text>
                                        <text x="370" y="140">240</text>
                                        <text x="370" y="170">160</text>
                                        <text x="370" y="193" fill="#22c55e">100</text>
                                    </g>

                                    {/* Volume bars at bottom */}
                                    <g>
                                        <line x1="25" y1="210" x2="365" y2="210" stroke="#333" strokeWidth="0.5" />
                                        <text x="25" y="225" fill="#555" fontSize="7" fontFamily="monospace">VOL</text>
                                        {candles.map((candle, index) => {
                                            const x = 40 + index * 26;
                                            const isBullish = candle.close >= candle.open;
                                            const volHeight = 8 + Math.random() * 25;
                                            return (
                                                <motion.rect
                                                    key={`vol-${index}`}
                                                    x={x - 5}
                                                    y={245 - volHeight}
                                                    width={10}
                                                    height={volHeight}
                                                    fill={isBullish ? "url(#volumeGreen)" : "url(#volumeRed)"}
                                                    rx="1"
                                                    initial={{ scaleY: 0 }}
                                                    animate={{ scaleY: 1 }}
                                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                                    style={{ originY: 1 }}
                                                />
                                            );
                                        })}
                                    </g>

                                    {/* Candlesticks */}
                                    <AnimatePresence mode="popLayout">
                                        {candles.map((candle, index) => {
                                            const x = 40 + index * 26;
                                            const isBullish = candle.close >= candle.open;
                                            const isHovered = hoveredCandle === index;

                                            // Calculate Y positions
                                            const highY = priceToY(candle.high);
                                            const lowY = priceToY(candle.low);
                                            const openY = priceToY(candle.open);
                                            const closeY = priceToY(candle.close);

                                            const bodyTop = Math.min(openY, closeY);
                                            const bodyHeight = Math.max(Math.abs(openY - closeY), 3);

                                            return (
                                                <motion.g
                                                    key={`candle-${index}`}
                                                    initial={{ opacity: 0, scaleY: 0 }}
                                                    animate={{ opacity: 1, scaleY: 1 }}
                                                    exit={{ opacity: 0, x: -30 }}
                                                    transition={{
                                                        duration: 0.6,
                                                        ease: [0.22, 1, 0.36, 1]
                                                    }}
                                                    style={{ originY: 0.5 }}
                                                    onMouseEnter={() => setHoveredCandle(index)}
                                                    onMouseLeave={() => setHoveredCandle(null)}
                                                    className="cursor-pointer"
                                                >
                                                    {/* Hover background */}
                                                    {isHovered && (
                                                        <motion.rect
                                                            x={x - 12}
                                                            y={highY - 5}
                                                            width={24}
                                                            height={lowY - highY + 10}
                                                            fill={isBullish ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)"}
                                                            rx="4"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                        />
                                                    )}

                                                    {/* Wick (top and bottom) */}
                                                    <motion.line
                                                        x1={x}
                                                        y1={highY}
                                                        x2={x}
                                                        y2={lowY}
                                                        stroke={isBullish ? "#22c55e" : "#ef4444"}
                                                        strokeWidth={isHovered ? 2 : 1.5}
                                                        strokeLinecap="round"
                                                        filter={isHovered ? "url(#softGlow)" : ""}
                                                    />

                                                    {/* Body */}
                                                    <motion.rect
                                                        x={x - 7}
                                                        y={bodyTop}
                                                        width={14}
                                                        height={bodyHeight}
                                                        fill={isBullish ? "url(#greenCandle)" : "url(#redCandle)"}
                                                        stroke={isBullish ? "#22c55e" : "#ef4444"}
                                                        strokeWidth={isHovered ? 1.5 : 0.5}
                                                        rx="2"
                                                        filter={isHovered ? "url(#softGlow)" : ""}
                                                        style={{
                                                            transition: "all 0.2s ease"
                                                        }}
                                                    />

                                                    {/* Tooltip */}
                                                    {isHovered && (
                                                        <motion.g
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.15 }}
                                                        >
                                                            <rect
                                                                x={x - 32}
                                                                y={highY - 42}
                                                                width={64}
                                                                height={36}
                                                                fill="rgba(0,0,0,0.95)"
                                                                stroke={isBullish ? "#22c55e" : "#ef4444"}
                                                                strokeWidth="1"
                                                                rx="6"
                                                            />
                                                            <text
                                                                x={x}
                                                                y={highY - 26}
                                                                fill={isBullish ? "#22c55e" : "#ef4444"}
                                                                fontSize="12"
                                                                fontWeight="bold"
                                                                textAnchor="middle"
                                                                fontFamily="monospace"
                                                            >
                                                                ${Math.round(candle.close)}
                                                            </text>
                                                            <text
                                                                x={x}
                                                                y={highY - 12}
                                                                fill="#888"
                                                                fontSize="9"
                                                                textAnchor="middle"
                                                                fontFamily="monospace"
                                                            >
                                                                {isBullish ? "▲ BULLISH" : "▼ BEARISH"}
                                                            </text>
                                                        </motion.g>
                                                    )}
                                                </motion.g>
                                            );
                                        })}
                                    </AnimatePresence>

                                    {/* Moving average line */}
                                    {candles.length > 2 && (
                                        <motion.path
                                            d={candles.map((c, i) => {
                                                const x = 40 + i * 26;
                                                const y = priceToY((c.open + c.close) / 2);
                                                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                                            }).join(' ')}
                                            fill="none"
                                            stroke="rgba(168, 85, 247, 0.6)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5 }}
                                        />
                                    )}

                                    {/* Current price line */}
                                    {candles.length > 0 && (
                                        <motion.g
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <line
                                                x1="25"
                                                y1={priceToY(candles[candles.length - 1].close)}
                                                x2="355"
                                                y2={priceToY(candles[candles.length - 1].close)}
                                                stroke="rgba(255,255,255,0.2)"
                                                strokeWidth="1"
                                                strokeDasharray="4,4"
                                            />
                                            {/* Price tag */}
                                            <rect
                                                x="320"
                                                y={priceToY(candles[candles.length - 1].close) - 10}
                                                width="38"
                                                height="20"
                                                fill={isUp ? "#22c55e" : "#ef4444"}
                                                rx="4"
                                            />
                                            <text
                                                x="339"
                                                y={priceToY(candles[candles.length - 1].close) + 4}
                                                fill="white"
                                                fontSize="9"
                                                fontWeight="bold"
                                                textAnchor="middle"
                                                fontFamily="monospace"
                                            >
                                                {currentPrice}
                                            </text>
                                        </motion.g>
                                    )}

                                    {/* Pulsing dot */}
                                    {candles.length > 0 && (
                                        <g>
                                            <motion.circle
                                                cx={40 + (candles.length - 1) * 26}
                                                cy={priceToY(candles[candles.length - 1].close)}
                                                r="8"
                                                fill={isUp ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}
                                                animate={{
                                                    r: [8, 14, 8],
                                                    opacity: [0.5, 0.15, 0.5]
                                                }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                            />
                                            <motion.circle
                                                cx={40 + (candles.length - 1) * 26}
                                                cy={priceToY(candles[candles.length - 1].close)}
                                                r="4"
                                                fill={isUp ? "#22c55e" : "#ef4444"}
                                                filter="url(#glow)"
                                            />
                                        </g>
                                    )}
                                </svg>

                                {/* Bottom info */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800/40">
                                    <div className="flex items-center gap-5">
                                        <div>
                                            <span className="text-[10px] text-zinc-600 block">Trend</span>
                                            <span className={`text-sm font-mono font-semibold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                                                {isUp ? "↑ Bullish" : "↓ Bearish"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-zinc-600 block">Timeframe</span>
                                            <span className="text-sm text-zinc-400 font-mono">4H</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-zinc-600 block">Analysis</span>
                                        <motion.span
                                            className="text-sm text-red-500 font-mono font-bold"
                                            animate={{ opacity: [1, 0.5, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            INSTITUTIONAL
                                        </motion.span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>



                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            whileHover={{ scale: 1.08, y: -6 }}
                            className="absolute -top-5 -right-4 sm:-right-6 bg-[#141414] backdrop-blur-md border border-red-900/40 rounded-xl px-4 py-3 cursor-pointer shadow-lg shadow-black/50"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-red-500"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                />
                                <span className="text-[10px] text-zinc-500">Students</span>
                            </div>
                            <span className="text-xl font-bold text-white font-mono">12,500+</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-5 h-8 border-2 border-zinc-700 rounded-full flex justify-center pt-2 hover:border-red-700/50 transition-colors cursor-pointer"
                >
                    <motion.div
                        className="w-1 h-2 bg-zinc-500 rounded-full"
                        animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;