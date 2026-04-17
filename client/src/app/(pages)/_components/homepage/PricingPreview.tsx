"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, Zap, Clock, Users, Star } from "lucide-react";
import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/918750475852?text=Hi,%20I%20want%20to%20enroll%20in%20the%205-Day%20Starter%20Workshop";

const features = [
  { text: "Basics of Market Structure", highlight: false },
  { text: "Understanding Liquidity Pools", highlight: false },
  { text: "The Professional Edge System", highlight: true },
  { text: "Live Q&A Session with Mentor", highlight: false },
];

const stats = [
  { icon: <Users className="w-3.5 h-3.5" />, value: "800+", label: "Enrolled" },
  { icon: <Star className="w-3.5 h-3.5" />, value: "4.9", label: "Rating" },
  { icon: <Clock className="w-3.5 h-3.5" />, value: "5 Days", label: "Intensive" },
];

const PricingPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-[#F7F7F7] py-14 sm:py-16 overflow-hidden">

      {/* ── Subtle dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #D0D0D0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.45,
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5
                       bg-white border border-zinc-200 shadow-sm"
          >
            <Zap className="w-3 h-3 text-[#D72638] fill-[#D72638]" />
            <span
              className="text-[10px] font-black text-[#D72638] uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Pricing Preview
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-black text-zinc-950 leading-[1.05] tracking-[-0.03em] mb-4"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(34px, 5vw, 58px)",
            }}
          >
            Start Small.{" "}
            <span className="text-[#D72638]">Scale Big.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-500 max-w-xl mx-auto leading-[1.75] font-light"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(15px, 1.1vw, 18px)",
            }}
          >
            Not ready for full mentorship? Begin with our intensive starter
            workshop and master the foundational pillars of market structure.
          </motion.p>
        </div>

        {/* ── Main card ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.28 }}
          className="relative"
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-px rounded-[36px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(215,38,56,0.18) 0%, transparent 50%, rgba(215,38,56,0.08) 100%)",
            }}
          />

          <div
            className="relative rounded-[34px] overflow-hidden"
            style={{
              background: "#0C0C0C",
              border: "1.5px solid #1C1C1C",
              boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.03) inset",
            }}
          >
            {/* Top accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D72638]/50 to-transparent" />

            <div className="flex flex-col lg:flex-row items-stretch">

              {/* ── LEFT panel ── */}
              <div className="flex-1 px-7 sm:px-10 py-9 sm:py-12">
                {/* Tag */}
                <div
                  className="inline-flex items-center gap-1.5 mb-5
                             bg-[#D72638]/10 border border-[#D72638]/20
                             rounded-full px-3.5 py-1.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D72638]" />
                  <span
                    className="text-[#D72638] text-[10px] font-extrabold uppercase tracking-[0.14em]"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    Recommended for Beginners
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-white font-black leading-[1.08] tracking-[-0.02em] mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(26px, 3.2vw, 40px)",
                  }}
                >
                  5-Day Trading{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(120deg, #D72638, #FF7A7A)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Starter
                  </span>{" "}
                  Workshop
                </h3>

                <p
                  className="text-zinc-500 text-[13px] leading-[1.7] mb-8 max-w-[380px]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  5 power-packed days to go from zero to confident — with live
                  sessions, real charts, and mentor feedback.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {features.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -14 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.42 + i * 0.08, duration: 0.45 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                        style={{
                          background: item.highlight
                            ? "rgba(215,38,56,0.22)"
                            : "rgba(255,255,255,0.06)",
                          border: item.highlight
                            ? "1px solid rgba(215,38,56,0.35)"
                            : "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <Check
                          className="w-2.5 h-2.5"
                          style={{
                            color: item.highlight ? "#D72638" : "#555",
                          }}
                          strokeWidth={3}
                        />
                      </div>
                      <span
                        className="text-[13px] sm:text-[14px] leading-snug"
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          color: item.highlight ? "#fff" : "#666",
                          fontWeight: item.highlight ? 600 : 400,
                        }}
                      >
                        {item.text}
                      </span>
                      {item.highlight && (
                        <span
                          className="text-[9px] font-bold text-[#D72638] bg-[#D72638]/10
                                     border border-[#D72638]/20 rounded px-1.5 py-0.5 uppercase tracking-wide ml-auto"
                          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                          Key
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Stats strip */}
                <div className="flex flex-wrap gap-3">
                  {stats.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <span className="text-zinc-500">{s.icon}</span>
                      <span
                        className="text-white text-[12px] font-bold"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        {s.value}
                      </span>
                      <span
                        className="text-zinc-600 text-[11px]"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Divider ── */}
              <div
                className="hidden lg:block w-px self-stretch my-8"
                style={{ background: "linear-gradient(to bottom, transparent, #222, transparent)" }}
              />
              <div className="block lg:hidden h-px mx-7 sm:mx-10" style={{ background: "#1C1C1C" }} />

              {/* ── RIGHT panel — pricing ── */}
              <div
                className="lg:w-[320px] xl:w-[360px] px-7 sm:px-10 py-9 sm:py-12
                           flex flex-col justify-between"
              >
                {/* Price block */}
                <div className="mb-8">
                  {/* Original + savings */}
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span
                      className="text-zinc-600 text-[16px] line-through"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      ₹2,999
                    </span>
                    <span
                      className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-[0.1em]
                                 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-1"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      Save 66%
                    </span>
                  </div>

                  {/* Main price */}
                  <div className="flex items-end gap-1 mb-2">
                    <span
                      className="text-[#D72638] font-black leading-none"
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(56px, 7vw, 72px)",
                      }}
                    >
                      ₹999
                    </span>
                  </div>

                  <p
                    className="text-zinc-600 text-[12px] leading-[1.6] mb-5"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    Limited time introductory price.
                    <br />
                    <span className="text-zinc-500">One-time payment · Instant access</span>
                  </p>

                  {/* Countdown urgency */}
                  <div
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl mb-1"
                    style={{
                      background: "rgba(215,38,56,0.07)",
                      border: "1px solid rgba(215,38,56,0.15)",
                    }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-[#D72638] shrink-0"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.3, repeat: Infinity }}
                    />
                    <span
                      className="text-[#D72638] text-[11px] font-semibold"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      Offer price ends soon
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <Link href={WHATSAPP_URL} target="_blank" className="no-underline">
                    <motion.button
                      whileHover={{ y: -2, boxShadow: "0 16px 40px rgba(215,38,56,0.45)" }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2.5
                                 bg-[#D72638] hover:bg-[#C0202F] text-white
                                 text-[15px] font-bold py-4 sm:py-[17px] rounded-2xl
                                 border-none cursor-pointer
                                 shadow-[0_8px_24px_rgba(215,38,56,0.3)]
                                 transition-colors duration-200"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      Secure My Spot
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </motion.button>
                  </Link>

                  <Link
                    href="/pricing"
                    className="flex items-center justify-center gap-1.5 py-3
                               text-zinc-500 hover:text-zinc-200 transition-colors duration-200
                               text-[13px] no-underline"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    View all mentorship plans
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Bottom accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D72638]/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPreview;