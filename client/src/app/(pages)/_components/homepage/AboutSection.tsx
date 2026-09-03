"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, Youtube, Send, Linkedin } from "lucide-react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const WHATSAPP_URL = "https://wa.me/918750475852?text=Hi,%20I'd%20like%20to%20learn%20more%20about%20MonarkFX%20mentorship";

const socials = [
  { name: "Instagram",                  icon: Instagram, href: "https://www.instagram.com/monarktraders/",    color: "#E1306C" },
  { name: "YouTube",                    icon: Youtube,   href: "https://www.youtube.com/@MonarkFX",           color: "#FF0000" },
  { name: "Telegram",                   icon: Send,      href: "https://t.me/+1002651091579",                 color: "#229ED9" },
  { name: "LinkedIn",                   icon: Linkedin,  href: "https://www.linkedin.com/company/monarkfx/",  color: "#0A66C2" },
];

const stats = [
  { value: "1,000+",  label: "Students Trained" },
  { value: "7+",    label: "Expert Mentors" },
  { value: "2021",  label: "Established" },
  { value: "4.9★",  label: "Google Rating" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 px-4 bg-[#fafafa]"
      style={{ borderTop: "1px solid #F0F0F0" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Top bar: label + socials ── */}
        <div className="flex justify-between items-center mb-10">
          <motion.div
            {...fadeUp(0)}
            animate={isInView ? fadeUp(0).animate : fadeUp(0).initial}
            className="flex items-center gap-2"
          >
            <span className="text-[#E8B923] animate-spin inline-block">✱</span>
            <span className="text-xs font-bold text-zinc-500 tracking-[0.2em] uppercase">
              About MonarkFX
            </span>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            animate={isInView ? fadeUp(0.1).animate : fadeUp(0.1).initial}
            className="flex gap-2"
          >
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-zinc-200 bg-white rounded-lg flex items-center justify-center hover:border-zinc-400 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* ── Hero image with clip path ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6"
        >
          {/* ISO badge */}
          <div
            className="absolute top-4 right-4 z-20 bg-white border border-zinc-100 rounded-2xl px-4 py-2 flex items-center gap-3 shadow-md"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FBF6E9] flex items-center justify-center">
              <span className="text-[#E8B923] font-black text-xs">ISO</span>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 leading-none">Certified</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">21008:2018</p>
            </div>
          </div>

          <svg className="w-full" viewBox="0 0 100 40" style={{ display: "block" }}>
            <defs>
              <clipPath id="about-clip" clipPathUnits="objectBoundingBox">
                <path d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z" />
              </clipPath>
            </defs>
            <image
              clipPath="url(#about-clip)"
              preserveAspectRatio="xMidYMid slice"
              width="100%"
              height="100%"
              href="/team-monarkfx.jpeg"
            />
          </svg>
        </motion.div>

        {/* ── Mini stats strip ── */}
        <motion.div
          {...fadeUp(0.3)}
          animate={isInView ? fadeUp(0.3).animate : fadeUp(0.3).initial}
          className="flex flex-wrap gap-x-6 gap-y-2 items-center mb-12 text-sm"
        >
          {stats.map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-1.5">
                <span className="text-[#E8B923] font-bold">{s.value}</span>
                <span className="text-zinc-500">{s.label}</span>
              </div>
              {i < stats.length - 1 && <span className="text-zinc-200 hidden sm:block">|</span>}
            </React.Fragment>
          ))}
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Left: headline + description */}
          <div className="md:col-span-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-zinc-900 mb-8 tracking-tight">
              {isInView && (
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.08}
                  staggerFrom="first"
                  transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.4 }}
                >
                  Building Elite Traders Through Discipline & Precision.
                </VerticalCutReveal>
              )}
            </h2>

            <motion.div
              {...fadeUp(0.5)}
              animate={isInView ? fadeUp(0.5).animate : fadeUp(0.5).initial}
              className="grid sm:grid-cols-2 gap-6 text-zinc-600 text-sm leading-relaxed"
            >
              <p>
                MonarkFX is an ISO 21008:2018 Certified Financial Market Academy. Since 2021, we've been transforming retail traders into institutional-grade professionals across Stocks, Forex, and Crypto.
              </p>
              <p>
                Our curriculum is built on real Price Action, not theory. With 7+ expert mentors, 1,000+ live sessions yearly, and a 4.9★ Google rating — we deliver results that speak for themselves.
              </p>
            </motion.div>
          </div>

          {/* Right: brand + CTA */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <motion.div
              {...fadeUp(0.6)}
              animate={isInView ? fadeUp(0.6).animate : fadeUp(0.6).initial}
              className="text-right mb-6"
            >
              <p className="text-[#E8B923] text-2xl font-black tracking-widest uppercase">MonarkFX</p>
              <p className="text-zinc-500 text-sm mt-1">Financial Market Academy</p>
            </motion.div>

            <motion.div
              {...fadeUp(0.7)}
              animate={isInView ? fadeUp(0.7).animate : fadeUp(0.7).initial}
              className="mb-6"
            >
              <p className="text-zinc-800 font-semibold text-sm mb-1">
                Ready to master the markets?
              </p>
              <p className="text-zinc-500 text-xs">
                Join our next batch. Limited seats available.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.8)}
              animate={isInView ? fadeUp(0.8).animate : fadeUp(0.8).initial}
            >
              <Link href="/contact" className="no-underline">
                <button
                  className="group flex items-center gap-2 hover:gap-4 transition-all duration-300
                             bg-zinc-900 hover:bg-black text-white text-sm font-bold
                             px-6 py-3 rounded-xl border border-zinc-700
                             shadow-lg shadow-zinc-900/20 cursor-pointer w-full justify-center md:w-auto md:justify-start"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href={WHATSAPP_URL} target="_blank" className="no-underline mt-3 block">
                <button
                  className="group flex items-center gap-2 hover:gap-4 transition-all duration-300
                             bg-[image:var(--gold-metallic)] hover:brightness-95 text-[#0B1E3F] text-sm font-bold
                             px-6 py-3 rounded-xl border border-[#E8B923]
                             shadow-lg shadow-red-900/20 cursor-pointer w-full justify-center md:w-auto md:justify-start"
                >
                  Join via WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

