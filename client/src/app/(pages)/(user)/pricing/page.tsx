"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Shield, TrendingUp, Zap, ArrowRight, CreditCard, Sparkles, Wifi, MapPin } from "lucide-react";
import Link from "next/link";

const getEnrollUrl = (course: string) =>
  `https://wa.me/918750475852?text=${encodeURIComponent(`Hi MonarkFX, I want to enroll in the ${course}.`)}`;

/* ─── DATA ─────────────────────────────────────────────────── */
const mentorshipPlans = [
  {
    title: "Indian Market Mentorship",
    description: "Nifty, Bank Nifty & Stocks. Master institutional price action.",
    features: ["90 Days Mentorship", "Live Market Sessions", "Strategy Journal", "Private Community Access"],
    popular: true,
    slug: "Indian Market Mentorship",
    options: [
      { label: "Online", price: "15,000", originalPrice: "25,000", emi: "5,500/mo × 3", tag: "Most Flexible" },
      { label: "Offline", price: "18,000", originalPrice: "28,000", emi: "6,500/mo × 3", tag: "Best Experience" },
    ],
  },
  {
    title: "Forex & Gold Mentorship",
    description: "EUR/USD, GBP/JPY & XAUUSD. Global market institutional flow.",
    features: ["90 Days Mentorship", "Session Timing Mastery", "Gold Scalping Techniques", "Risk Management Rules"],
    popular: false,
    slug: "Forex & Gold Mentorship",
    options: [
      { label: "Online", price: "15,000", originalPrice: "25,000", emi: "5,500/mo × 3", tag: "Most Flexible" },
      { label: "Offline", price: "18,000", originalPrice: "28,000", emi: "6,500/mo × 3", tag: "Best Experience" },
    ],
  },
  {
    title: "Crypto Mentorship",
    description: "BTC, ETH & Altcoins. Cycle analysis and futures trading.",
    features: ["90 Days Mentorship", "On-Chain Analysis", "Spot Portfolio Building", "Futures Scalping"],
    popular: false,
    slug: "Crypto Mentorship",
    options: [
      { label: "Online", price: "15,000", originalPrice: "20,000", emi: "5,500/mo × 3", tag: "Most Flexible" },
      { label: "Offline", price: "18,000", originalPrice: "25,000", emi: "6,500/mo × 3", tag: "Best Experience" },
    ],
  },
];

/* ─── PLAN CARD with toggle ─────────────────────────────────── */
const PlanCard = ({
  plan, index, isInView,
}: {
  plan: typeof mentorshipPlans[0]; index: number; isInView: boolean;
}) => {
  const [mode, setMode] = useState(0);
  const [hovered, setHovered] = useState(false);
  const opt = plan.options[mode];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ y: -7 }}
        transition={{ duration: 0.26 }}
        className="relative h-full flex flex-col rounded-[26px] p-7 sm:p-8 bg-white overflow-hidden"
        style={{
          border: plan.popular ? "1.5px solid rgba(215,38,56,0.4)" : "1.5px solid #EBEBEB",
          boxShadow: plan.popular
            ? "0 20px 56px rgba(215,38,56,0.1), 0 0 0 4px rgba(215,38,56,0.04)"
            : hovered ? "0 20px 48px rgba(0,0,0,0.07)" : "0 8px 28px rgba(0,0,0,0.03)",
          transition: "box-shadow 0.24s, border-color 0.24s",
        }}
      >
        {/* Popular badge */}
        {plan.popular && (
          <div className="absolute -top-px left-1/2 -translate-x-1/2">
            <span className="inline-block bg-[#D72638] text-white text-[9px] font-extrabold uppercase tracking-[0.14em] px-4 py-1.5 rounded-b-lg"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Most Popular
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-black text-zinc-900 tracking-[-0.025em] leading-tight mb-2 pt-1"
          style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(19px, 1.6vw, 23px)" }}>
          {plan.title}
        </h3>
        <p className="text-zinc-500 text-[13px] italic leading-relaxed mb-6"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
          {plan.description}
        </p>

        {/* ── Online / Offline toggle ── */}
        <div className="flex bg-zinc-100 rounded-xl p-1 mb-6">
          {plan.options.map((o, i) => (
            <button key={o.label} onClick={() => setMode(i)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] text-[13px] font-bold cursor-pointer transition-all duration-200 border-none"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                background: mode === i ? "#fff" : "transparent",
                color: mode === i ? "#0A0A0A" : "#999",
                boxShadow: mode === i ? "0 2px 10px rgba(0,0,0,0.07)" : "none",
              }}>
              {i === 0
                ? <Wifi className="w-3 h-3" style={{ color: mode === i ? "#D72638" : "#BBB" }} />
                : <MapPin className="w-3 h-3" style={{ color: mode === i ? "#D72638" : "#BBB" }} />}
              {o.label}
            </button>
          ))}
        </div>

        {/* ── Animated price ── */}
        <motion.div
          key={`${plan.slug}-${mode}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="mb-2"
        >
          <div className="flex items-baseline gap-2.5 mb-1">
            <span className="font-black text-zinc-900 leading-none"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(32px, 3.5vw, 42px)" }}>
              ₹{opt.price}
            </span>
            <span className="text-zinc-400 text-[15px] line-through">₹{opt.originalPrice}</span>
          </div>
        </motion.div>

        <div className="flex items-center gap-1.5 mb-1">
          <CreditCard className="w-3 h-3 text-[#D72638] shrink-0" />
          <span className="text-zinc-500 text-[12px] font-semibold"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            EMI: ₹{opt.emi} + GST
          </span>
        </div>

        {/* Mode tag */}
        {opt.tag && (
          <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-[#D72638] uppercase tracking-[0.1em]
                           bg-[#D72638]/07 border border-[#D72638]/18 rounded-full px-2.5 py-1 mb-6 self-start"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "rgba(215,38,56,0.06)" }}>
            {mode === 0 ? <Wifi className="w-2.5 h-2.5" /> : <MapPin className="w-2.5 h-2.5" />}
            {opt.tag}
          </span>
        )}

        {/* Features */}
        <div className="flex flex-col gap-3 flex-1 mb-8">
          {plan.features.map((f, j) => (
            <div key={j} className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-[#D72638]" strokeWidth={3} />
              </div>
              <span className="text-zinc-600 text-[13px] sm:text-[14px]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href={getEnrollUrl(`${plan.slug} — ${opt.label}`)} target="_blank" className="no-underline">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-2xl font-bold text-[14px] cursor-pointer border-none
                       transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              background: plan.popular ? "#D72638" : "#F5F5F5",
              color: plan.popular ? "#fff" : "#0A0A0A",
              boxShadow: plan.popular ? "0 8px 24px rgba(215,38,56,0.28)" : "none",
            }}>
            Enroll — {opt.label}
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </motion.button>
        </Link>

        {/* Bottom bar */}
        <div className="mt-5 h-[3px] rounded-full"
          style={{
            background: "linear-gradient(90deg, #D72638, rgba(215,38,56,0.08))",
            transform: hovered ? "scaleX(1)" : "scaleX(0.15)",
            transformOrigin: "left",
            transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
            opacity: hovered ? 1 : 0.35,
          }} />
      </motion.div>
    </motion.div>
  );
};

const memberships = [
  {
    title: "Elite Trading Room",
    price: "₹1,999", period: "/month",
    description: "Daily live analysis, community trade ideas, and mentor-led calls.",
    features: ["Daily Live Analysis", "Real-time Trade Ideas", "Community Support", "Monthly Q&A"],
    highlight: false,
    slug: "Elite Trading Room",
  },
  {
    title: "Mastery Combo",
    price: "₹25,000", period: " Lifetime",
    description: "All-in-one access to Indian, Forex, and Crypto markets — the full institutional stack.",
    features: ["All 3 Mentorships", "Lifetime Community Access", "Priority Support", "Personal Coaching Call"],
    highlight: true,
    slug: "Complete Combo Bundle",
    emi: "₹6,500/mo × 6",
  },
];

/* ─── SECTION LABEL ─────────────────────────────────────── */
const SectionLabel = ({ text }: { text: string }) => (
  <div className="inline-flex items-center gap-3 mb-5">
    <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
    <span className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.22em]"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{text}</span>
    <div className="w-8 h-[2px] rounded-full bg-[#D72638]" />
  </div>
);

const PricingPage = () => {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const memberRef = useRef(null);
  const whyRef = useRef(null);
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-60px" });
  const isMemberInView = useInView(memberRef, { once: true, margin: "-60px" });
  const isWhyInView = useInView(whyRef, { once: true, margin: "-60px" });

  return (
    <div className="bg-white min-h-screen">

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="relative bg-[#0A0A0A] overflow-hidden pt-28 sm:pt-36 pb-24 sm:pb-32 text-center">
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
        {/* Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none -mr-52 -mt-52"
          style={{ background: "radial-gradient(circle, rgba(215,38,56,0.12) 0%, transparent 68%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none -ml-40 -mb-40"
          style={{ background: "radial-gradient(circle, rgba(215,38,56,0.07) 0%, transparent 68%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D72638]/30 to-transparent" />

        <div ref={heroRef} className="relative max-w-[860px] mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <Sparkles className="w-3 h-3 text-[#D72638]" />
            <span className="text-white/70 text-[10px] font-extrabold uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Investment & Pricing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-white leading-[1.0] tracking-[-0.04em] mb-6"
            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(40px, 7vw, 80px)" }}>
            Invest in Your{" "}
            <br className="hidden sm:block" />
            <span className="text-[#D72638] italic">Financial Mastery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="text-white/50 max-w-[560px] mx-auto leading-[1.8] font-light mb-12"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(15px, 1.2vw, 19px)" }}>
            Transparent pricing for professional trading mentorship. Whether you're a beginner or looking to scale, we have a plan for you.
          </motion.p>

          {/* Starter card floating over hero */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="relative max-w-[760px] mx-auto rounded-[28px] overflow-hidden"
            style={{
              background: "#fff",
              border: "1.5px solid rgba(255,255,255,0.12)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
            }}>
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-0">
              {/* Left */}
              <div className="flex-1 px-7 sm:px-10 py-8 sm:py-10 text-left">
                <span className="inline-block bg-[#D72638]/10 text-[#D72638] text-[10px] font-extrabold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full mb-4"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Start Here
                </span>
                <h2 className="font-black text-zinc-900 tracking-[-0.025em] mb-2"
                  style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(20px, 2.5vw, 28px)" }}>
                  5-Day Trading Starter Workshop
                </h2>
                <p className="text-zinc-500 text-[14px] leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Build your foundation in 5 days. Live Q&A and basic market structure principles.
                </p>
              </div>

              {/* Right */}
              <div className="px-7 sm:px-10 py-8 sm:py-10 text-center sm:text-right flex flex-col items-center sm:items-end justify-center sm:border-l border-zinc-100 w-full sm:w-auto">
                <p className="text-zinc-400 text-[12px] font-medium mb-1"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Total investment</p>
                <p className="font-black text-zinc-900 leading-none mb-5"
                  style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(36px, 4vw, 48px)" }}>
                  ₹999
                </p>
                <Link href={getEnrollUrl("5-Day Starter Workshop")} target="_blank" className="no-underline w-full sm:w-auto">
                  <motion.button
                    whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(215,38,56,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto px-7 py-3.5 bg-[#D72638] hover:bg-[#C0202F] text-white
                               font-bold rounded-2xl border-none cursor-pointer
                               shadow-[0_6px_20px_rgba(215,38,56,0.28)]
                               transition-colors duration-200 text-[14px]"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    Book My Spot
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ MENTORSHIP PLANS ════════════════════════════════ */}
      <section ref={cardsRef} className="relative bg-[#F7F7F7] py-14 sm:py-16 px-5 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(215,38,56,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-[1120px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="text-center mb-14">
            <SectionLabel text="90-Day Mentorships" />
            <h2 className="font-black text-zinc-950 leading-[1.02] tracking-[-0.04em] mb-4"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(32px, 4vw, 54px)" }}>
              Choose Your Market
            </h2>
            <p className="text-zinc-500 max-w-[480px] mx-auto leading-[1.8] font-light"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(15px, 1.1vw, 18px)" }}>
              Intensive, skill-based programs with lifetime community support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {mentorshipPlans.map((plan, i) => (
              <PlanCard key={plan.slug} plan={plan} index={i} isInView={isCardsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ MEMBERSHIPS & COMBO ══════════════════════════════ */}
      <section ref={memberRef} className="py-14 sm:py-16 px-5 sm:px-8">
        <div className="max-w-[1120px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={isMemberInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="text-center mb-14">
            <SectionLabel text="Membership & Combo" />
            <h2 className="font-black text-zinc-950 leading-[1.02] tracking-[-0.04em] mb-4"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(32px, 4vw, 54px)" }}>
              Scale Your Edge
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {memberships.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isMemberInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.26 }}
                  className="relative h-full flex flex-col rounded-[28px] p-8 sm:p-10 overflow-hidden"
                  style={{
                    background: item.highlight ? "linear-gradient(140deg, #0A0A0A 0%, #181818 100%)" : "#fff",
                    border: item.highlight ? "1.5px solid #1C1C1C" : "1.5px solid #EBEBEB",
                    boxShadow: item.highlight ? "0 32px 80px rgba(0,0,0,0.22)" : "0 8px 28px rgba(0,0,0,0.03)",
                  }}>
                  {item.highlight && (
                    <>
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D72638]/35 to-transparent" />
                      <span className="absolute top-6 right-6 inline-block bg-[#D72638] text-white text-[9px] font-extrabold uppercase tracking-[0.14em] px-3 py-1.5 rounded-lg"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        Best Value
                      </span>
                    </>
                  )}

                  <h3 className="font-black tracking-[-0.025em] mb-4"
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "clamp(24px, 2.5vw, 32px)",
                      color: item.highlight ? "#fff" : "#0A0A0A",
                    }}>
                    {item.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-black leading-none"
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(38px, 4vw, 52px)",
                        color: item.highlight ? "#fff" : "#0A0A0A",
                      }}>
                      {item.price}
                    </span>
                    <span className="text-[15px] font-medium"
                      style={{ color: item.highlight ? "rgba(255,255,255,0.35)" : "#AAA" }}>
                      {item.period}
                    </span>
                  </div>

                  {item.emi && (
                    <div className="flex items-center gap-1.5 mb-4">
                      <CreditCard className="w-3 h-3 text-[#D72638] shrink-0" />
                      <span className="text-[#D72638] text-[12px] font-bold"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        EMI: {item.emi} + GST
                      </span>
                    </div>
                  )}

                  <p className="italic leading-relaxed mb-8"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "clamp(14px, 1vw, 16px)",
                      color: item.highlight ? "rgba(255,255,255,0.45)" : "#666",
                    }}>
                    {item.description}
                  </p>

                  <div className="flex flex-col gap-3.5 flex-1 mb-9">
                    {item.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            background: item.highlight ? "rgba(215,38,56,0.18)" : "rgba(215,38,56,0.07)",
                            border: item.highlight ? "1px solid rgba(215,38,56,0.3)" : "1px solid rgba(215,38,56,0.12)",
                          }}>
                          <Check className="w-3 h-3 text-[#D72638]" strokeWidth={3} />
                        </div>
                        <span className="text-[14px] sm:text-[15px]"
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            color: item.highlight ? "rgba(255,255,255,0.7)" : "#555",
                          }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link href={getEnrollUrl(item.slug)} target="_blank" className="no-underline">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      whileHover={item.highlight ? { boxShadow: "0 12px 32px rgba(215,38,56,0.4)" } : {}}
                      className="w-full py-4 rounded-2xl font-bold text-[15px] cursor-pointer border-none
                                 transition-all duration-200 flex items-center justify-center gap-2"
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        background: item.highlight ? "#D72638" : "transparent",
                        color: item.highlight ? "#fff" : "#D72638",
                        border: item.highlight ? "none" : "1.5px solid rgba(215,38,56,0.35)",
                        boxShadow: item.highlight ? "0 8px 28px rgba(215,38,56,0.28)" : "none",
                      }}>
                      {item.highlight ? "Go Elite" : "Join Trading Room"}
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY MONARKFX ════════════════════════════════════ */}
      <section ref={whyRef} className="relative bg-[#F7F7F7] py-14 sm:py-16 px-5 sm:px-8 overflow-hidden"
        style={{ borderTop: "1.5px solid #F0F0F0" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(215,38,56,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={isWhyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="text-center mb-12">
            <SectionLabel text="Why Us" />
            <h2 className="font-black text-zinc-950 tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(28px, 3.5vw, 46px)" }}>
              Why Choose MonarkFX?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                Icon: Shield,
                title: "Validated Systems",
                desc: "Built on institutional concepts that work in any market condition.",
              },
              {
                Icon: TrendingUp,
                title: "Live Examples",
                desc: "We don't just teach theory — we show live market application.",
              },
              {
                Icon: Zap,
                title: "Direct Access",
                desc: "No middlemen. Direct mentorship from professional traders.",
              },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isWhyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.55 }}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.24 }}
                  className="bg-white rounded-[22px] p-7 text-center border border-zinc-200"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.025)" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(215,38,56,0.07)", border: "1px solid rgba(215,38,56,0.12)" }}>
                    <Icon className="w-5 h-5 text-[#D72638]" strokeWidth={2} />
                  </div>
                  <h4 className="font-bold text-zinc-900 text-[16px] mb-2"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{title}</h4>
                  <p className="text-zinc-500 text-[13px] leading-[1.7]"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PricingPage;