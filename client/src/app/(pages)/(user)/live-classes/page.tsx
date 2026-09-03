"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import {
  Video, Clock, BookOpen, Users, Award, CheckCircle2,
  ArrowRight, Send, Wifi
} from "lucide-react";

const expectations = [
  { icon: BookOpen, text: "Same structured curriculum as offline programs" },
  { icon: Video, text: "Live sessions with real-time doubt resolution" },
  { icon: Clock, text: "Recorded sessions available for revision" },
  { icon: Users, text: "Personal mentorship support" },
  { icon: Wifi, text: "Flexible batch timings" },
  { icon: Award, text: "Certificate upon completion" },
];

const courses = [
  { value: "", label: "Select a program" },
  { value: "IAT", label: "Institution Advance Trading (IAT)" },
  { value: "ACT", label: "Alpha Crypto Trader (ACT)" },
  { value: "AFT", label: "Alpha Forex Trader (AFT)" },
  { value: "MOX", label: "Monark Options X (MOX)" },
  { value: "Bundle", label: "Forex + Crypto Bundle" },
];

/* shared input class */
const inputCls = `w-full px-4 py-3 bg-white border border-[#E8E8E8] rounded-[12px]
  text-[#1A1A1A] placeholder-[#BBB] text-sm
  focus:outline-none focus:border-[#E8B923] focus:ring-2 focus:ring-[rgba(232,185,35,0.1)]
  transition-colors`;

const LiveClassesPage = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isFormInView = useInView(formRef, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", city: "", course: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry`,
        { ...formData, source: "live-classes" }
      );
      if (response.data.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", city: "", course: "", message: "" });
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>

      {/* ══════════ HERO ══════════ */}
      <section
        ref={heroRef}
        style={{ position: "relative", background: "#0B1E3F", overflow: "hidden", padding: "96px 0 80px" }}
      >
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(232,185,35,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,185,35,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Red center glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "60%", height: "100%",
          background: "radial-gradient(ellipse, rgba(232,185,35,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Pill */}
            <div style={{ marginBottom: 24 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "rgba(232,185,35,0.12)", border: "1px solid rgba(232,185,35,0.3)",
                borderRadius: 999, padding: "6px 16px",
              }}>
                <motion.div
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#E8B923", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Online Programs — Live
                </span>
              </div>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(38px, 6vw, 68px)",
              fontWeight: 800, color: "#fff",
              lineHeight: 1.06, letterSpacing: "-0.03em",
              marginBottom: 18,
            }}>
              Online Learning,{" "}
              <span style={{
                backgroundImage: "linear-gradient(135deg, #E8B923, #F5D876)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Institutional
              </span>{" "}
              Standards
            </h1>

            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 18,
              color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
              maxWidth: 480, margin: "0 auto 32px",
            }}>
              Same curriculum. Same discipline. Anywhere in the world.
            </p>

            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#555", textDecoration: "none" }}>Home</Link>
              <span style={{ color: "#333", fontSize: 12 }}>›</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#E8B923" }}>Live Classes</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ WHAT TO EXPECT ══════════ */}
      <section style={{ background: "#F8F8F8", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(232,185,35,0.03) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — headline */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <div style={{ width: 24, height: 2, backgroundImage: "linear-gradient(90deg,#F5D876,#E8B923 50%,#C79A1E)", borderRadius: 2 }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#E8B923", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  What to Expect
                </span>
              </div>

              <h2 style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 800, color: "#0B1E3F",
                lineHeight: 1.1, letterSpacing: "-0.02em",
                marginBottom: 18,
              }}>
                Everything Online.{" "}
                <span style={{
                  backgroundImage: "linear-gradient(135deg, #E8B923, #A07C16)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Nothing Compromised.
                </span>
              </h2>

              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 16,
                color: "#5A5A5A", lineHeight: 1.8, maxWidth: 420, marginBottom: 28,
              }}>
                Our online programs deliver the exact same quality as our offline sessions — with added flexibility for your schedule.
              </p>

              {/* Scroll to form */}
              <a href="#inquiry-form" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 14px 40px rgba(232,185,35,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "#E8B923", color: "#0B1E3F",
                    fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14,
                    padding: "12px 26px", borderRadius: 11, border: "none", cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(232,185,35,0.26)", transition: "all 0.2s",
                  }}
                >
                  Register Interest <ArrowRight style={{ width: 15, height: 15 }} />
                </motion.button>
              </a>
            </motion.div>

            {/* Right — features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expectations.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(232,185,35,0.08)" }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: "#fff", border: "1.5px solid #EFEFEF",
                      borderRadius: 14, padding: "18px 16px",
                      display: "flex", alignItems: "flex-start", gap: 12,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                      background: "#FBF6E9", border: "1px solid rgba(232,185,35,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <item.icon style={{ width: 16, height: 16, color: "#E8B923" }} strokeWidth={1.6} />
                    </div>
                    <p style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: 13,
                      color: "#3A3A3A", lineHeight: 1.65, fontWeight: 500,
                    }}>
                      {item.text}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ INQUIRY FORM ══════════ */}
      <section id="inquiry-form" ref={formRef} style={{ background: "#fff", padding: "88px 0" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 24, height: 2, backgroundImage: "linear-gradient(90deg,#F5D876,#E8B923 50%,#C79A1E)", borderRadius: 2 }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#E8B923", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  Enquire Now
                </span>
                <div style={{ width: 24, height: 2, backgroundImage: "linear-gradient(90deg,#F5D876,#E8B923 50%,#C79A1E)", borderRadius: 2 }} />
              </div>

              <h2 style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 800, color: "#0B1E3F",
                lineHeight: 1.1, letterSpacing: "-0.02em",
                marginBottom: 12,
              }}>
                Request{" "}
                <span style={{
                  backgroundImage: "linear-gradient(135deg, #E8B923, #A07C16)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Information
                </span>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "#888" }}>
                Our academic advisor will contact you within 24 hours.
              </p>
            </div>

            {/* Success state */}
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: "center", padding: "60px 32px",
                  background: "#fff", border: "1.5px solid #EFEFEF",
                  borderRadius: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <CheckCircle2 style={{ width: 28, height: 28, color: "#22c55e" }} />
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 700, color: "#0B1E3F", marginBottom: 8 }}>
                  Thank You!
                </h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#666" }}>
                  Our academic advisor will contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              /* ── Form card ── */
              <div style={{
                background: "#fff", border: "1.5px solid #EFEFEF",
                borderRadius: 20, padding: "40px 36px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
              }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                  {/* Name */}
                  <div>
                    <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                      Full Name *
                    </label>
                    <input
                      type="text" name="name" value={formData.name}
                      onChange={handleChange} required
                      placeholder="Enter your name"
                      className={inputCls}
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                        Email *
                      </label>
                      <input
                        type="email" name="email" value={formData.email}
                        onChange={handleChange} required
                        placeholder="your@email.com"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                        Phone *
                      </label>
                      <input
                        type="tel" name="phone" value={formData.phone}
                        onChange={handleChange} required
                        placeholder="+91 XXXXX XXXXX"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* City + Course */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                        City
                      </label>
                      <input
                        type="text" name="city" value={formData.city}
                        onChange={handleChange}
                        placeholder="Your city"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                        Program Interest
                      </label>
                      <select
                        name="course" value={formData.course}
                        onChange={handleChange}
                        className={inputCls}
                        style={{ appearance: "none" }}
                      >
                        {courses.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                      Message <span style={{ color: "#CCC", fontWeight: 400 }}>(Optional)</span>
                    </label>
                    <textarea
                      name="message" value={formData.message}
                      onChange={handleChange} rows={3}
                      placeholder="Any questions or requirements?"
                      className={inputCls}
                      style={{ resize: "none" }}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { y: -2, boxShadow: "0 14px 40px rgba(232,185,35,0.32)" } : {}}
                    whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      width: "100%", padding: "15px 0",
                      background: isSubmitting ? "#999" : "#E8B923", color: isSubmitting ? "#fff" : "#0B1E3F",
                      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15,
                      borderRadius: 12, border: "none", cursor: isSubmitting ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 18px rgba(232,185,35,0.26)", transition: "all 0.2s",
                      marginTop: 4,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }}
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Inquiry <Send style={{ width: 15, height: 15 }} />
                      </>
                    )}
                  </motion.button>

                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#CCC", textAlign: "center" }}>
                    🔒 Your information is safe — we never share your data.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="h-24 md:hidden" />
    </div>
  );
};

export default LiveClassesPage;