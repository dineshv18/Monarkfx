"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    Plus,
    Minus,
    ArrowRight,
    ArrowLeft,
    Clock,
    Wrench,
    GraduationCap,
    Target,
    ClipboardCheck,
    ListChecks,
    Wifi,
    MapPin,
    Briefcase,
    HelpCircle,
    ShieldAlert,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { Program } from "../programs-data";

const WHATSAPP = "https://wa.me/918750475852?text=";
const enrollUrl = (name: string, mode?: "Online" | "Offline", price?: string) =>
    `${WHATSAPP}${encodeURIComponent(
        `Hi MonarkFX Team,\n\nI want to enroll in the *${name}* program.\n` +
        (mode ? `*Mode:* ${mode}\n` : "") +
        (price ? `*Price:* ₹${price} + GST\n` : "") +
        `\nPlease share batch details, schedule and payment options.\n\nThank you!`
    )}`;

/* ── Section shell ── */
function Section({
    id,
    kicker,
    title,
    subtitle,
    icon: Icon,
    children,
    dark,
}: {
    id: string;
    kicker: string;
    title: string;
    subtitle?: string;
    icon: React.ElementType;
    children: React.ReactNode;
    dark?: boolean;
}) {
    return (
        <section
            id={id}
            className="px-5 sm:px-8 py-10 sm:py-14"
            style={{
                background: dark ? "#0B1E3F" : "#fff",
                borderTop: dark ? "none" : "1px solid #F0F0F0",
            }}
        >
            <div className="max-w-[1000px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="inline-flex items-center gap-2.5 mb-3">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{
                                background: "rgba(232,185,35,0.1)",
                                border: "1px solid rgba(232,185,35,0.2)",
                            }}
                        >
                            <Icon className="w-4 h-4 text-[#E8B923]" />
                        </div>
                        <span
                            className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#E8B923]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            {kicker}
                        </span>
                    </div>
                    <h2
                        className="font-black leading-[1.1] tracking-[-0.03em]"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(24px, 3vw, 36px)",
                            color: dark ? "#fff" : "#0B1E3F",
                        }}
                    >
                        {title}
                    </h2>
                    {subtitle && (
                        <p
                            className="mt-2.5 leading-[1.7] font-light"
                            style={{
                                fontFamily: "var(--font-dm-sans), sans-serif",
                                fontSize: "clamp(14px, 1.1vw, 16px)",
                                color: dark ? "rgba(255,255,255,0.55)" : "#666",
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </motion.div>
                {children}
            </div>
        </section>
    );
}

function BulletList({
    items,
    dark,
}: {
    items: string[];
    dark?: boolean;
}) {
    return (
        <ul className="flex flex-col gap-3">
            {items.map((it, i) => (
                <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="flex items-start gap-3"
                >
                    <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-[1px]"
                        style={{
                            background: dark ? "rgba(232,185,35,0.18)" : "#ECFDF5",
                            border: dark
                                ? "1px solid rgba(232,185,35,0.3)"
                                : "1px solid #A7F3D0",
                        }}
                    >
                        <Check
                            className={`w-2.5 h-2.5 ${dark ? "text-[#E8B923]" : "text-emerald-500"
                                }`}
                            strokeWidth={3.5}
                        />
                    </span>
                    <span
                        className="text-[13px] sm:text-[14px] leading-[1.6]"
                        style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            color: dark ? "rgba(255,255,255,0.75)" : "#444",
                        }}
                    >
                        {it}
                    </span>
                </motion.li>
            ))}
        </ul>
    );
}

/* ── Curriculum accordion ── */
function ModuleAccordion({ program }: { program: Program }) {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <div className="flex flex-col gap-2.5">
            {program.curriculum.map((mod, i) => {
                const isOpen = open === i;
                return (
                    <div
                        key={i}
                        className="rounded-2xl overflow-hidden transition-all duration-200"
                        style={{
                            background: "#fff",
                            border: isOpen
                                ? "1.5px solid rgba(232,185,35,0.25)"
                                : "1.5px solid #EEE",
                            boxShadow: isOpen
                                ? "0 8px 28px rgba(232,185,35,0.06)"
                                : "0 2px 8px rgba(0,0,0,0.03)",
                        }}
                    >
                        <button
                            onClick={() => setOpen(isOpen ? null : i)}
                            className="w-full flex items-center justify-between gap-3 px-5 py-4 border-none bg-transparent cursor-pointer text-left"
                        >
                            <span
                                className="text-[14px] sm:text-[15px] font-bold text-zinc-900"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                {mod.title}
                            </span>
                            <span
                                className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                                style={{
                                    background: isOpen ? "rgba(232,185,35,0.1)" : "#F0F0F0",
                                }}
                            >
                                {isOpen ? (
                                    <Minus className="w-3 h-3 text-[#E8B923]" />
                                ) : (
                                    <Plus className="w-3 h-3 text-zinc-500" />
                                )}
                            </span>
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden"
                                >
                                    <ul className="flex flex-col gap-2 px-5 pb-5 pt-1">
                                        {mod.lessons.map((l, li) => (
                                            <li
                                                key={li}
                                                className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-zinc-600"
                                                style={{
                                                    fontFamily: "var(--font-dm-sans), sans-serif",
                                                }}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923] shrink-0 mt-[7px]" />
                                                {l}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

/* ── FAQ accordion ── */
function FaqAccordion({ program }: { program: Program }) {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <div className="flex flex-col gap-2.5">
            {program.faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                    <div
                        key={i}
                        className="rounded-2xl overflow-hidden"
                        style={{
                            background: "#fff",
                            border: isOpen
                                ? "1.5px solid rgba(232,185,35,0.25)"
                                : "1.5px solid #F0F0F0",
                        }}
                    >
                        <button
                            onClick={() => setOpen(isOpen ? null : i)}
                            className="w-full flex items-center justify-between gap-3 px-5 py-4 border-none bg-transparent cursor-pointer text-left"
                        >
                            <span
                                className="text-[14px] sm:text-[15px] font-bold text-zinc-900"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                {f.q}
                            </span>
                            <span
                                className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                                style={{
                                    background: isOpen ? "rgba(232,185,35,0.1)" : "#F0F0F0",
                                }}
                            >
                                {isOpen ? (
                                    <Minus className="w-3 h-3 text-[#E8B923]" />
                                ) : (
                                    <Plus className="w-3 h-3 text-zinc-500" />
                                )}
                            </span>
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden"
                                >
                                    <p
                                        className="text-[13px] sm:text-[14px] leading-[1.75] text-zinc-500 px-5 pb-5 font-light"
                                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                    >
                                        {f.a}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

/* ── Sticky enroll bar (mobile + desktop) ── */
function StickyEnrollBar({
    program,
    mode,
    price,
}: {
    program: Program;
    mode: "Online" | "Offline";
    price: string;
}) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 520);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 90, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-50"
                >
                    <div
                        className="mx-auto max-w-[1000px] px-3 sm:px-4 pb-3 pt-2"
                    >
                        <div
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5"
                            style={{
                                background: "#0B1E3F",
                                border: "1px solid #262626",
                                boxShadow: "0 -6px 32px rgba(0,0,0,0.28)",
                            }}
                        >
                            <div className="min-w-0 flex-1">
                                <p
                                    className="text-white font-bold text-[13px] sm:text-[14px] truncate"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                >
                                    {program.name}
                                </p>
                                <p
                                    className="text-white/45 text-[11px] sm:text-[12px]"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                >
                                    {mode} · {program.duration} · ₹{price} + GST
                                </p>
                            </div>
                            <Link
                                href={enrollUrl(program.name, mode, price)}
                                target="_blank"
                                className="no-underline shrink-0"
                            >
                                <motion.button
                                    whileTap={{ scale: 0.96 }}
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-[13px] sm:text-[14px] text-white border-none cursor-pointer"
                                    style={{
                                        fontFamily: "var(--font-dm-sans), sans-serif",
                                        background: "#25D366",
                                        boxShadow: "0 6px 18px rgba(37,211,102,0.35)",
                                    }}
                                >
                                    <FaWhatsapp size={16} />
                                    Enroll Now
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ── Main ── */
export default function ProgramView({
    program,
    related,
}: {
    program: Program;
    related: Program[];
}) {
    const [mode, setMode] = useState<"Online" | "Offline">("Offline");
    const price = mode === "Online" ? program.priceOnline : program.priceOffline;

    return (
        <main className="bg-white pb-20 sm:pb-0">
            {/* ═══ HERO ═══ */}
            <section className="relative overflow-hidden bg-[#0B1E3F] px-5 sm:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "52px 52px",
                    }}
                />
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-56 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse, rgba(232,185,35,0.16) 0%, transparent 70%)",
                    }}
                />

                <div className="relative max-w-[1000px] mx-auto">
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[13px] font-semibold mb-8 no-underline transition-colors"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                        <ArrowLeft className="w-4 h-4" /> All Courses
                    </Link>

                    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
                        <div>
                            <span
                                className="inline-block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E8B923] mb-4"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                {program.market}
                            </span>
                            <h1
                                className="font-black text-white leading-[1.05] tracking-[-0.04em] mb-5"
                                style={{
                                    fontFamily: "var(--font-playfair), serif",
                                    fontSize: "clamp(32px, 5vw, 52px)",
                                }}
                            >
                                {program.name}
                            </h1>
                            <p
                                className="text-white/60 leading-[1.75] font-light mb-8 max-w-[520px]"
                                style={{
                                    fontFamily: "var(--font-dm-sans), sans-serif",
                                    fontSize: "clamp(15px, 1.2vw, 17px)",
                                }}
                            >
                                {program.tagline}
                            </p>

                            <div className="flex items-center gap-2 text-white/70 text-[13px] font-semibold mb-5">
                                <Clock className="w-4 h-4 text-[#E8B923]" />
                                {program.duration} intensive program
                            </div>

                            {/* Mode toggle */}
                            <div
                                className="inline-flex p-1 rounded-xl mb-4"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                }}
                            >
                                {(["Offline", "Online"] as const).map((m) => {
                                    const activeMode = mode === m;
                                    return (
                                        <button
                                            key={m}
                                            type="button"
                                            onClick={() => setMode(m)}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold cursor-pointer border-none transition-all duration-200"
                                            style={{
                                                fontFamily: "var(--font-dm-sans), sans-serif",
                                                background: activeMode ? "#E8B923" : "transparent",
                                                color: activeMode ? "#fff" : "rgba(255,255,255,0.55)",
                                            }}
                                        >
                                            {m === "Online" ? (
                                                <Wifi className="w-3.5 h-3.5" />
                                            ) : (
                                                <MapPin className="w-3.5 h-3.5" />
                                            )}
                                            {m}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Dynamic price */}
                            <div className="flex items-baseline gap-2 mb-1">
                                <span
                                    className="font-black text-white leading-none"
                                    style={{
                                        fontFamily: "var(--font-playfair), serif",
                                        fontSize: "clamp(30px, 4vw, 42px)",
                                    }}
                                >
                                    ₹{price}
                                </span>
                                <span className="text-white/45 text-[13px] font-semibold">
                                    + GST
                                </span>
                            </div>
                            <p
                                className="text-white/40 text-[12px] mb-8"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                {mode} batch · interest-free EMI available
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href={enrollUrl(program.name, mode, price)}
                                    target="_blank"
                                    className="no-underline"
                                >
                                    <motion.button
                                        whileHover={{ y: -2, boxShadow: "0 14px 36px rgba(37,211,102,0.45)" }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-[14px] text-white border-none cursor-pointer"
                                        style={{
                                            fontFamily: "var(--font-dm-sans), sans-serif",
                                            background: "#25D366",
                                            boxShadow: "0 6px 20px rgba(37,211,102,0.3)",
                                        }}
                                    >
                                        <FaWhatsapp size={17} /> Enroll {mode} — ₹{price}
                                    </motion.button>
                                </Link>
                                <a href="#curriculum" className="no-underline">
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-[14px] text-white/80 cursor-pointer"
                                        style={{
                                            fontFamily: "var(--font-dm-sans), sans-serif",
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1.5px solid rgba(255,255,255,0.15)",
                                        }}
                                    >
                                        View Curriculum <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </a>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-3xl overflow-hidden aspect-[16/9] hidden lg:block bg-[#0B1E3F]"
                            style={{ border: "1.5px solid rgba(232,185,35,0.25)" }}
                        >
                            <Image
                                src={program.image}
                                alt={program.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 1024px) 0px, 460px"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ OVERVIEW ═══ */}
            <Section
                id="overview"
                kicker="Overview"
                title="Course Overview"
                icon={GraduationCap}
            >
                <p
                    className="text-[14px] sm:text-[15px] leading-[1.85] text-zinc-600 font-light"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                    {program.overview}
                </p>
            </Section>

            {/* ═══ EDUCATIONAL & RISK DISCLOSURE ═══ */}
            <section
                id="disclosure"
                className="px-5 sm:px-8 pb-14 sm:pb-16 bg-white"
            >
                <div className="max-w-[1000px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl p-6 sm:p-7"
                        style={{
                            background: "#FFFBEB",
                            border: "1.5px solid #FDE68A",
                        }}
                    >
                        <div className="flex items-center gap-2.5 mb-3">
                            <span
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{
                                    background: "#FEF3C7",
                                    border: "1px solid #FCD34D",
                                }}
                            >
                                <ShieldAlert className="w-4 h-4 text-[#B45309]" />
                            </span>
                            <div>
                                <p
                                    className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#B45309]"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                >
                                    Important
                                </p>
                                <h2
                                    className="text-[16px] sm:text-[18px] font-black text-[#78350F] leading-tight"
                                    style={{ fontFamily: "var(--font-playfair), serif" }}
                                >
                                    Educational &amp; Risk Disclosure
                                </h2>
                            </div>
                        </div>
                        <p
                            className="text-[13px] sm:text-[13.5px] leading-[1.8] text-[#92400E]"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            {program.disclosure}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ═══ FIT CHECK ═══ */}
            <Section
                id="fit-check"
                kicker="Fit Check"
                title="Who Is This Course For"
                subtitle="Before you start — make sure this program matches where you are."
                icon={Target}
            >
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3
                            className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-zinc-900 mb-4"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            This course is for
                        </h3>
                        <BulletList items={program.fitFor} />
                    </div>
                    <div>
                        <h3
                            className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-zinc-900 mb-4"
                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                            Before you start
                        </h3>
                        <BulletList items={program.beforeYouStart} />
                    </div>
                </div>
            </Section>

            {/* ═══ PREREQUISITES ═══ */}
            <Section
                id="prerequisites"
                kicker="Prerequisites"
                title="Prerequisites"
                subtitle="What you need in place before day one."
                icon={ClipboardCheck}
            >
                <BulletList items={program.prerequisites} />
            </Section>

            {/* ═══ CURRICULUM / TOPICS ═══ */}
            <Section
                id="topics"
                kicker="Curriculum"
                title="Topics You Will Learn"
                subtitle="Including but not limited to:"
                icon={ListChecks}
            >
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {program.topics.map((t, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-3 py-2.5"
                            style={{ borderBottom: "1px solid #F2F2F2" }}
                        >
                            <span className="text-[#E8B923] font-black text-[13px] shrink-0 mt-[1px]">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                                className="text-[13px] sm:text-[14px] leading-[1.6] text-zinc-700"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                {t}
                            </span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ═══ TOOLKIT ═══ */}
            <Section
                id="toolkit"
                kicker="Toolkit"
                title="What Tools Will You Learn"
                icon={Wrench}
                dark
            >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {program.tools.map((tool, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: i * 0.05 }}
                            className="flex items-center gap-3 rounded-xl px-4 py-4"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <span
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{
                                    background: "rgba(232,185,35,0.15)",
                                    border: "1px solid rgba(232,185,35,0.28)",
                                }}
                            >
                                <Wrench className="w-3.5 h-3.5 text-[#E8B923]" />
                            </span>
                            <span
                                className="text-[13px] font-semibold text-white/85"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                {tool}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* ═══ SYLLABUS BREAKDOWN ═══ */}
            <Section
                id="curriculum"
                kicker="Syllabus Breakdown"
                title="Course Content"
                subtitle="Tap a module to see what it covers."
                icon={ListChecks}
            >
                <ModuleAccordion program={program} />
            </Section>

            {/* ═══ FLEXIBILITY / MODE ═══ */}
            <Section
                id="mode"
                kicker="Flexibility"
                title="Course Mode"
                subtitle="Same curriculum, same mentors — pick the format that fits your life."
                icon={Wifi}
            >
                <div className="grid md:grid-cols-2 gap-4">
                    {program.modes.map((m, i) => {
                        const isOnline = m.name.toLowerCase().includes("online");
                        const modeKey = isOnline ? "Online" : "Offline";
                        const selected = mode === modeKey;
                        const modePrice = isOnline
                            ? program.priceOnline
                            : program.priceOffline;
                        return (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setMode(modeKey)}
                                className="text-left rounded-2xl p-6 cursor-pointer transition-all duration-200"
                                style={{
                                    background: selected ? "#FBF6E9" : "#FAFAFA",
                                    border: selected
                                        ? "1.5px solid rgba(232,185,35,0.4)"
                                        : "1.5px solid #EEE",
                                    boxShadow: selected
                                        ? "0 0 0 4px rgba(232,185,35,0.06)"
                                        : "none",
                                }}
                            >
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-2.5">
                                        <span
                                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                                            style={{
                                                background: "rgba(232,185,35,0.1)",
                                                border: "1px solid rgba(232,185,35,0.2)",
                                            }}
                                        >
                                            {isOnline ? (
                                                <Wifi className="w-4 h-4 text-[#E8B923]" />
                                            ) : (
                                                <MapPin className="w-4 h-4 text-[#E8B923]" />
                                            )}
                                        </span>
                                        <h3
                                            className="text-[16px] font-black text-zinc-900"
                                            style={{ fontFamily: "var(--font-playfair), serif" }}
                                        >
                                            {m.name}
                                        </h3>
                                    </div>
                                    <span
                                        className="text-[13px] font-black shrink-0"
                                        style={{
                                            fontFamily: "var(--font-playfair), serif",
                                            color: "#E8B923",
                                        }}
                                    >
                                        ₹{modePrice}
                                    </span>
                                </div>
                                <p
                                    className="text-[13px] leading-[1.7] text-zinc-500 font-light mb-4"
                                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                >
                                    {m.description}
                                </p>
                                <BulletList items={m.points} />
                                <span
                                    className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-extrabold uppercase tracking-[0.1em]"
                                    style={{
                                        fontFamily: "var(--font-dm-sans), sans-serif",
                                        color: selected ? "#E8B923" : "#AAA",
                                    }}
                                >
                                    {selected ? "✓ Selected" : "Tap to select this mode"}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </Section>

            {/* ═══ WHAT'S NEXT / CAREERS ═══ */}
            <Section
                id="careers"
                kicker="What's Next"
                title="Career Opportunities After Completing"
                subtitle="Paths our graduates pursue once they have a tested edge."
                icon={Briefcase}
                dark
            >
                <div className="grid sm:grid-cols-2 gap-3">
                    {program.careers.map((c, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 rounded-xl px-4 py-4"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <Briefcase className="w-4 h-4 text-[#E8B923] shrink-0" />
                            <span
                                className="text-[13px] font-semibold text-white/85"
                                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                            >
                                {c}
                            </span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ═══ FAQ ═══ */}
            <Section
                id="faq"
                kicker="Have Questions?"
                title="Frequently Asked Questions"
                icon={HelpCircle}
            >
                <FaqAccordion program={program} />
            </Section>

            {/* ═══ RELATED ═══ */}
            <section
                className="px-5 sm:px-8 py-16 bg-[#F7F7F7]"
                style={{ borderTop: "1px solid #EEE" }}
            >
                <div className="max-w-[1000px] mx-auto">
                    <h2
                        className="font-black text-zinc-900 tracking-[-0.03em] mb-8"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(22px, 3vw, 32px)",
                        }}
                    >
                        Explore Other Programs
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                        {related.map((p) => (
                            <Link
                                key={p.slug}
                                href={`/courses/programs/${p.slug}`}
                                className="no-underline group"
                            >
                                <div
                                    className="rounded-2xl overflow-hidden bg-white h-full transition-all duration-200 group-hover:-translate-y-1"
                                    style={{
                                        border: "1.5px solid #EBEBEB",
                                        boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    <div className="relative aspect-[16/9] bg-[#0B1E3F]">
                                        <Image
                                            src={p.image}
                                            alt={p.name}
                                            fill
                                            className="object-contain"
                                            sizes="500px"
                                        />
                                    </div>
                                    <div className="p-4 flex items-center justify-between">
                                        <span
                                            className="text-[12px] text-zinc-500"
                                            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                                        >
                                            {p.duration} · from ₹{p.priceOnline}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#E8B923]">
                                            View <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ FINAL CTA ═══ */}
            <section className="relative px-5 sm:px-8 py-20 sm:py-28 text-center overflow-hidden bg-[#0B1E3F]">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse, rgba(232,185,35,0.14) 0%, transparent 70%)",
                    }}
                />
                <div className="relative max-w-[640px] mx-auto">
                    <h2
                        className="font-black text-white leading-[1.05] tracking-[-0.04em] mb-4"
                        style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(28px, 5vw, 48px)",
                        }}
                    >
                        Ready to start {program.shortName}?
                    </h2>
                    <p
                        className="text-white/50 leading-[1.75] font-light mb-6"
                        style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "clamp(15px, 1.2vw, 18px)",
                        }}
                    >
                        Talk to our team on WhatsApp for the next batch date, fees and EMI
                        options.
                    </p>

                    {/* Mode toggle (final CTA) */}
                    <div
                        className="inline-flex p-1 rounded-xl mb-6"
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                        }}
                    >
                        {(["Offline", "Online"] as const).map((m) => {
                            const activeMode = mode === m;
                            return (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => setMode(m)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold cursor-pointer border-none transition-all duration-200"
                                    style={{
                                        fontFamily: "var(--font-dm-sans), sans-serif",
                                        background: activeMode ? "#E8B923" : "transparent",
                                        color: activeMode ? "#fff" : "rgba(255,255,255,0.55)",
                                    }}
                                >
                                    {m === "Online" ? (
                                        <Wifi className="w-3.5 h-3.5" />
                                    ) : (
                                        <MapPin className="w-3.5 h-3.5" />
                                    )}
                                    {m}
                                </button>
                            );
                        })}
                    </div>

                    <Link
                        href={enrollUrl(program.name, mode, price)}
                        target="_blank"
                        className="no-underline block w-full sm:w-auto sm:inline-block"
                    >
                        <motion.button
                            whileHover={{ y: -3, boxShadow: "0 20px 56px rgba(37,211,102,0.5)" }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl font-bold text-[16px] text-white border-none cursor-pointer"
                            style={{
                                fontFamily: "var(--font-dm-sans), sans-serif",
                                background: "#25D366",
                                boxShadow: "0 10px 36px rgba(37,211,102,0.32)",
                            }}
                        >
                            <FaWhatsapp size={19} /> Enroll {mode} — ₹{price} + GST
                        </motion.button>
                    </Link>
                </div>
            </section>

            <StickyEnrollBar program={program} mode={mode} price={price} />
        </main>
    );
}
