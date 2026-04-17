"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2,
  Instagram, Twitter, Linkedin, ArrowRight, Sparkles,
} from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "service@monarkfx.com", href: "mailto:service@monarkfx.com" },
  { icon: Phone, label: "Phone", value: "+91 87504 75852 / +91 9220797499", href: "tel:+918750475852" },
  { icon: MapPin, label: "Address", value: "Metro Pillar No. 654, Hari Nagar, New Delhi", href: "#" },
  { icon: Clock, label: "Hours", value: "Mon – Sat: 10:00 AM – 7:00 PM IST", href: "#" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/monarkfx" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/monarkfx" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/monarkfx" },
];

/* ─── shared input style ─── */
const inputBase =
  "w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-2xl " +
  "text-zinc-900 placeholder-zinc-300 text-[14px] sm:text-[15px] " +
  "focus:outline-none focus:border-[#D72638] focus:ring-2 focus:ring-[rgba(215,38,56,0.1)] " +
  "transition-colors duration-200 font-normal";

/* ─── label style ─── */
const LabelText = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[11px] font-extrabold text-zinc-400 uppercase tracking-[0.14em] mb-2"
    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
    {children}
  </label>
);

/* ═══ MAIN PAGE ════════════════════════════════════════════ */
const ContactPage = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, margin: "-60px" });

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry`,
        { ...formData, source: "contact" }
      );
      if (response.data.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative bg-[#0A0A0A] overflow-hidden pt-28 sm:pt-36 pb-20 sm:pb-28 text-center">
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(215,38,56,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(215,38,56,0.055) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(215,38,56,0.11) 0%, transparent 68%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D72638]/30 to-transparent" />

        <div className="relative z-10 max-w-[720px] mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
              style={{ background: "rgba(215,38,56,0.12)", border: "1px solid rgba(215,38,56,0.28)" }}>
              <Sparkles className="w-3 h-3 text-[#D72638]" />
              <span className="text-[#D72638] text-[11px] font-extrabold uppercase tracking-[0.18em]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Contact Us</span>
            </div>

            <h1 className="font-black text-white leading-[1.0] tracking-[-0.03em] mb-5"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(44px, 7.5vw, 84px)" }}>
              Let&apos;s{" "}
              <span style={{
                backgroundImage: "linear-gradient(120deg, #D72638, #FF7A7A)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Talk
              </span>
            </h1>

            <p className="text-white/50 leading-[1.8] font-light mb-8 max-w-[420px] mx-auto"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(15px, 1.2vw, 19px)" }}>
              We&apos;re here to answer your questions about courses, mentorship, and careers.
            </p>

            <div className="flex items-center justify-center gap-2">
              <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors text-[13px] no-underline"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Home</Link>
              <span className="text-zinc-600 text-[12px]">›</span>
              <span className="text-[#D72638] text-[13px]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Contact</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ MAIN CONTENT ════════════════════════════════════ */}
      <section ref={contentRef} className="bg-white py-14 sm:py-16 px-5 sm:px-8">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">

            {/* ── LEFT: Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white rounded-[28px] p-7 sm:p-10"
                style={{ border: "1.5px solid #EBEBEB", boxShadow: "0 10px 52px rgba(0,0,0,0.06)" }}>

                {/* Form header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-7 h-[2px] rounded-full bg-[#D72638]" />
                    <span className="text-[11px] font-extrabold text-[#D72638] uppercase tracking-[0.2em]"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Send a Message</span>
                  </div>
                  <h2 className="font-black text-zinc-950 leading-[1.04] tracking-[-0.03em] mb-2"
                    style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(26px, 3vw, 40px)" }}>
                    Get In{" "}
                    <span style={{
                      backgroundImage: "linear-gradient(120deg, #D72638, #A01020)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>Touch</span>
                  </h2>
                  <p className="text-zinc-400 text-[14px]"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    Our team will reply within 24 hours.
                  </p>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-14">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.28)" }}>
                      <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    </div>
                    <h3 className="font-black text-zinc-900 text-[22px] mb-2"
                      style={{ fontFamily: "var(--font-playfair), serif" }}>Message Sent!</h3>
                    <p className="text-zinc-500 text-[14px]"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                      <LabelText>Full Name *</LabelText>
                      <input type="text" name="name" value={formData.name} onChange={handleChange}
                        required placeholder="Your full name" className={inputBase}
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }} />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <LabelText>Email *</LabelText>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                          required placeholder="your@email.com" className={inputBase}
                          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }} />
                      </div>
                      <div>
                        <LabelText>Phone</LabelText>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX" className={inputBase}
                          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }} />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <LabelText>Message *</LabelText>
                      <textarea name="message" value={formData.message} onChange={handleChange}
                        required rows={5} placeholder="How can we help you?"
                        className={inputBase} style={{ resize: "none", fontFamily: "var(--font-dm-sans), sans-serif" }} />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { y: -2, boxShadow: "0 14px 40px rgba(215,38,56,0.35)" } : {}}
                      whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl
                                 text-white text-[15px] font-bold border-none
                                 shadow-[0_6px_20px_rgba(215,38,56,0.28)]
                                 transition-all duration-200"
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        background: isSubmitting ? "#999" : "#D72638",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                      }}>
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </>
                      ) : (
                        <>Send Message <Send className="w-4 h-4" /></>
                      )}
                    </motion.button>

                    <p className="text-center text-zinc-300 text-[11px]"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      🔒 Your information is safe — we never share your data.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ── RIGHT: Info panel ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              {/* Red info card */}
              <div className="relative rounded-[26px] p-7 sm:p-8 overflow-hidden"
                style={{ background: "linear-gradient(140deg, #C81F33 0%, #8B0F1E 100%)" }}>
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: "rgba(255,255,255,0.05)" }} />
                <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full pointer-events-none"
                  style={{ background: "rgba(255,255,255,0.04)" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <h3 className="font-black text-white text-[18px] sm:text-[20px] mb-6 relative"
                  style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Contact Information
                </h3>

                <div className="relative flex flex-col">
                  {contactInfo.map((item, i) => (
                    <a key={i} href={item.href}
                      className="flex items-start gap-4 py-4 no-underline group"
                      style={{ borderBottom: i < contactInfo.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                      <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200"
                        style={{ background: "rgba(255,255,255,0.14)" }}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white/45 text-[10px] uppercase tracking-[0.12em] mb-1"
                          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{item.label}</p>
                        <p className="text-white text-[13px] sm:text-[14px] leading-[1.55]"
                          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Socials */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.14em] mb-3"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Follow Us</p>
                  <div className="flex gap-2.5">
                    {socials.map((s, i) => (
                      <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-9 h-9 rounded-xl flex items-center justify-center
                                   hover:bg-white/25 transition-colors duration-200"
                        style={{ background: "rgba(255,255,255,0.12)" }}>
                        <s.icon className="w-4 h-4 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden relative"
                style={{ border: "1.5px solid #EBEBEB", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                {/* Red left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 z-10"
                  style={{ background: "linear-gradient(to bottom, #D72638, rgba(215,38,56,0.18))" }} />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890123!2d77.0456789!3d28.6234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzI0LjQiTiA3N8KwMDInNDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123"
                  width="100%" height="200"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>

              {/* Quick response */}
              <div className="flex items-start gap-4 bg-zinc-50 rounded-2xl p-5 sm:p-6"
                style={{ border: "1.5px solid #EBEBEB" }}>
                <div className="w-10 h-10 rounded-[12px] shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(215,38,56,0.07)", border: "1px solid rgba(215,38,56,0.14)" }}>
                  <Clock className="w-4.5 h-4.5 text-[#D72638]" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900 text-[14px] sm:text-[15px] mb-1"
                    style={{ fontFamily: "var(--font-playfair), serif" }}>
                    Quick Response Guaranteed
                  </p>
                  <p className="text-zinc-500 text-[12px] sm:text-[13px] leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    We reply to all inquiries within 24 business hours.
                  </p>
                </div>
              </div>

              {/* WhatsApp shortcut */}
              <a href="https://wa.me/918750475852" target="_blank" rel="noopener noreferrer" className="no-underline">
                <motion.div
                  whileHover={{ y: -3, boxShadow: "0 14px 40px rgba(34,197,94,0.22)" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between gap-4 rounded-2xl px-5 sm:px-6 py-4 cursor-pointer"
                  style={{
                    background: "linear-gradient(120deg, #16a34a, #15803d)",
                    border: "1.5px solid rgba(34,197,94,0.3)",
                    boxShadow: "0 6px 24px rgba(34,197,94,0.18)",
                    transition: "box-shadow 0.22s",
                  }}>
                  <div>
                    <p className="text-white font-bold text-[14px] sm:text-[15px] mb-0.5"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      Chat on WhatsApp
                    </p>
                    <p className="text-emerald-200 text-[12px]"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      Fastest response — usually within minutes
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white shrink-0" strokeWidth={2.5} />
                </motion.div>
              </a>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;