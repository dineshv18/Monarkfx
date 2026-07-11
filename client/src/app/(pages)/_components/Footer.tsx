"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram, Twitter, Mail, Phone, Youtube, Send,
  MapPin, ArrowUpRight, Shield,
} from "lucide-react";
import Image from "next/image";

/* ── TextHoverEffect ── */
const TextHoverEffect = ({ text }: { text: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPos, setMaskPos] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setMaskPos({
      cx: `${((cursor.x - rect.left) / rect.width) * 100}%`,
      cy: `${((cursor.y - rect.top) / rect.height) * 100}%`,
    });
  }, [cursor]);

  return (
    <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={e => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none uppercase cursor-default">
      <defs>
        <linearGradient id="mxGradient" gradientUnits="userSpaceOnUse">
          {hovered && <>
            <stop offset="0%"   stopColor="#D72638" />
            <stop offset="50%"  stopColor="#FF7A7A" />
            <stop offset="100%" stopColor="#D72638" />
          </>}
        </linearGradient>
        <radialGradient id="mxReveal" gradientUnits="userSpaceOnUse" r="25%"
          cx={maskPos.cx} cy={maskPos.cy}>
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="mxMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#mxReveal)" />
        </mask>
      </defs>
      {/* Outline stroke — always visible faint */}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3" className="fill-transparent font-[helvetica] text-7xl font-bold"
        style={{ stroke: "rgba(215,38,56,0.18)", opacity: hovered ? 0.7 : 1 }}>
        {text}
      </text>
      {/* Animated draw-in stroke */}
      <motion.text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3" className="fill-transparent font-[helvetica] text-7xl font-bold"
        style={{ stroke: "#D72638", opacity: 0.5 }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}>
        {text}
      </motion.text>
      {/* Hover reveal gradient */}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        stroke="url(#mxGradient)" strokeWidth="0.3" mask="url(#mxMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold">
        {text}
      </text>
    </svg>
  );
};

const nav = [
  {
    heading: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Support", href: "/support" },
    ],
  },
  {
    heading: "Education",
    links: [
      { name: "All Courses", href: "/courses" },
      { name: "Live Classes", href: "/live-classes" },
      { name: "Registration", href: "/registration" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Disclaimer", href: "/disclaimer" },
      { name: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

const socials = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/monarkfx" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/" },
  { name: "Telegram", icon: Send, href: "https://t.me/" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/monarkfx" },
];

const contact = [
  { icon: Mail, label: "Email", value: "service@monarkfx.com", href: "mailto:service@monarkfx.com" },
  { icon: Phone, label: "Phone", value: "+91 87504 75852 / +91 93150 71969", href: "tel:+918750475852" },
  { icon: MapPin, label: "Address", value: "Uttam Nagar, New Delhi — 110059", href: "#" },
];

/* ─── social icon ─── */
const SocialIcon = ({ s }: { s: typeof socials[0] }) => {
  const Icon = s.icon;
  return (
    <motion.a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={s.name}
      whileHover={{ y: -4, scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="w-10 h-10 sm:w-11 sm:h-11 rounded-[13px] flex items-center justify-center no-underline
                 text-zinc-500 hover:text-[#D72638] hover:border-[rgba(215,38,56,0.35)]
                 hover:bg-[rgba(215,38,56,0.08)]
                 transition-colors duration-200"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <Icon className="w-[17px] h-[17px]" />
    </motion.a>
  );
};

/* ─── nav link ─── */
const FooterLink = ({ href, name }: { href: string; name: string }) => (
  <Link href={href}
    className="group flex items-center gap-1.5 no-underline transition-colors duration-200"
    style={{ width: "fit-content" }}>
    <span className="text-zinc-500 group-hover:text-white text-[14px] sm:text-[15px] font-medium transition-colors duration-200"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
      {name}
    </span>
    <ArrowUpRight className="w-3 h-3 text-zinc-700 group-hover:text-[#D72638] opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-0.5" />
  </Link>
);

/* ═══ FOOTER ════════════════════════════════════════════════ */
const Footer = () => (
  <footer className="relative overflow-hidden mt-20"
    style={{ background: "#0A0A0A", borderRadius: "36px 36px 0 0" }}>

    {/* ── Top red accent line ── */}
    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D72638]/70 to-transparent" />

    {/* ── Dot grid bg ── */}
    <div className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.028) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }} />

    {/* ── Top-right corner glow ── */}
    <div className="absolute top-0 right-0 w-[480px] h-[360px] pointer-events-none"
      style={{ background: "radial-gradient(ellipse at top right, rgba(215,38,56,0.09) 0%, transparent 68%)" }} />

    {/* ════ MAIN GRID ════════════════════════════════════════ */}
    <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-12 sm:pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr] gap-10 lg:gap-8">

        {/* ── COL 1: Brand ── */}
        <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
          {/* Logo */}
          <Link href="/" className="no-underline inline-flex items-center gap-2.5">
            <Image src="/logo-light.png" alt="Logo" width={200} height={200} />
          </Link>

          {/* Tagline */}
          <p className="text-zinc-500 text-[14px] sm:text-[15px] leading-[1.8] max-w-[250px]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Defining the standard of institutional trading education. Master the markets with elite mentorship and tactical discipline.
          </p>

          {/* ISO badge */}
          <div className="inline-flex items-center gap-2.5 self-start rounded-[12px] px-4 py-2.5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="w-6 h-6 rounded-[7px] flex items-center justify-center shrink-0"
              style={{ background: "rgba(215,38,56,0.15)" }}>
              <Shield className="w-3.5 h-3.5 text-[#D72638]" />
            </div>
            <span className="text-zinc-400 text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              ISO 21008:2018 Certified
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5 mt-1">
            {socials.map(s => <SocialIcon key={s.name} s={s} />)}
          </div>
        </div>

        {/* ── COL 2–4: Nav columns ── */}
        {nav.map(col => (
          <div key={col.heading} className="flex flex-col gap-5">
            <h4 className="text-[#D72638] text-[11px] font-extrabold uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              {col.heading}
            </h4>
            <div className="flex flex-col gap-3">
              {col.links.map(l => <FooterLink key={l.name} href={l.href} name={l.name} />)}
            </div>
          </div>
        ))}

        {/* ── COL 5: Contact ── */}
        <div className="flex flex-col gap-5">
          <h4 className="text-[#D72638] text-[11px] font-extrabold uppercase tracking-[0.22em]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Get in Touch
          </h4>

          <div className="flex flex-col gap-4">
            {contact.map((item, i) => (
              <a key={i} href={item.href}
                className="group flex items-start gap-3 no-underline">
                <div className="w-8 h-8 rounded-[9px] shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(215,38,56,0.1)", border: "1px solid rgba(215,38,56,0.2)" }}>
                  <item.icon className="w-3.5 h-3.5 text-[#D72638]" />
                </div>
                <div>
                  <p className="text-zinc-600 text-[10px] uppercase tracking-[0.1em] mb-0.5"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {item.label}
                  </p>
                  <p className="text-zinc-400 group-hover:text-white text-[13px] sm:text-[14px] leading-snug transition-colors duration-200"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a href="https://wa.me/918750475852?text=Hi,%20I%20want%20to%20learn%20more%20about%20MonarkFX"
            target="_blank" rel="noopener noreferrer" className="no-underline mt-1">
            <motion.div
              whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(215,38,56,0.38)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl cursor-pointer"
              style={{
                background: "linear-gradient(120deg, #D72638, #A01020)",
                boxShadow: "0 6px 20px rgba(215,38,56,0.28)",
              }}>
              <span className="text-white text-[13px] font-bold"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                Join via WhatsApp
              </span>
              <ArrowUpRight className="w-4 h-4 text-white shrink-0" strokeWidth={2.5} />
            </motion.div>
          </a>
        </div>

      </div>
    </div>

    {/* ── TextHoverEffect ── */}
    <div className="hidden lg:flex h-48 -mt-10 -mb-8 px-8">
      <TextHoverEffect text="MonarkFX" />
    </div>

    {/* ════ NON-REFUNDABLE NOTICE ══════════════════════════════════════ */}
    <div className="relative" style={{ borderTop: "1px solid rgba(215,38,56,0.2)", background: "rgba(215,38,56,0.04)" }}>
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-4 sm:py-5
                      flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
        <Link href="/refund-policy" className="flex items-center justify-center gap-2 group hover:underline decoration-zinc-500/30">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D72638] animate-pulse shrink-0" />
          <p className="text-zinc-400 text-[12px] sm:text-[13px] font-medium text-center"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            <span className="text-[#D72638] font-bold">NOTE:</span>{' '}
            All services and courses (online or offline) are strictly non-refundable once purchased or enrolled.
          </p>
        </Link>
      </div>
    </div>

    {/* ════ BOTTOM BAR ══════════════════════════════════════ */}
    <div className="relative" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-5 sm:py-6
                      flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">

        <p className="text-zinc-600 text-[13px] font-medium text-center sm:text-left"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
          © {new Date().getFullYear()} MonarkFX Academy. All rights reserved.
        </p>

        <a href="https://groxmedia.in" target="_blank" rel="noopener noreferrer"
          className="text-zinc-600 hover:text-white text-[13px] font-medium no-underline transition-colors duration-200"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Designed &amp; Developed by <span className="text-[#D72638]">Grox Media</span>
        </a>

        <div className="flex items-center gap-1">
          {[
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Terms", href: "/terms" },
            { name: "Disclaimer", href: "/disclaimer" },
            { name: "Refund Policy", href: "/refund-policy" },
          ].map((l, i, arr) => (
            <React.Fragment key={l.name}>
              <Link href={l.href}
                className="text-zinc-600 hover:text-white text-[13px] font-medium no-underline transition-colors duration-200 px-2"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                {l.name}
              </Link>
              {i < arr.length - 1 && (
                <span className="text-zinc-700 text-[11px]">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>

  </footer>
);

export default Footer;
