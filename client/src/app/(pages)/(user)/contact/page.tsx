"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, ArrowRight,
} from "lucide-react";
import { FaWhatsapp, FaInstagram, FaYoutube, FaTelegramPlane, FaLinkedin } from "react-icons/fa";
import PageHero from "../../_components/PageHero";
import dynamic from "next/dynamic";
const ContactMap = dynamic(() => import("../../_components/ContactMap"), { ssr: false });

const CONTACT_INFO = [
  { icon: Mail,   label: "Email",   value: "service@monarkfx.com",                    href: "mailto:service@monarkfx.com" },
  { icon: Phone,  label: "Phone",   value: "+91 87504 75852 / +91 93150 71969",       href: "tel:+918750475852" },
  { icon: MapPin, label: "Address", value: "Metro Pillar No. 654, Hari Nagar, New Delhi", href: "#" },
  { icon: Clock,  label: "Hours",   value: "Mon – Sat: 10:00 AM – 7:00 PM IST",      href: "#" },
];

const SOCIALS = [
  { Icon: FaInstagram,     label: "Instagram",                  href: "https://www.instagram.com/monarktraders/" },
  { Icon: FaYoutube,       label: "YouTube",                    href: "https://www.youtube.com/@MonarkFX" },
  { Icon: FaTelegramPlane, label: "Telegram",                   href: "https://t.me/+1002651091579" },
  { Icon: FaLinkedin,      label: "LinkedIn",                   href: "https://www.linkedin.com/company/monarkfx/" },
];

const inputCls =
  "w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-900 " +
  "placeholder-zinc-300 text-[14px] focus:outline-none focus:border-[#E8B923] " +
  "focus:ring-2 focus:ring-[rgba(232,185,35,0.08)] transition-colors duration-200";

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[11px] font-extrabold text-zinc-400 uppercase tracking-[0.14em] mb-1.5"
    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
    {children}
  </label>
);

export default function ContactPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill required fields"); return; }
    setBusy(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inquiry`, { ...form, source: "contact" });
      if (res.data.success) { setDone(true); setForm({ name: "", email: "", phone: "", message: "" }); }
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen bg-white">

      <PageHero
        badge="Contact Us"
        title="Let's"
        titleAccent="Talk."
        description="We're here to answer your questions about courses, mentorship, and careers. Our team responds within 24 hours."
        primaryBtn={{ text: "WhatsApp Us Now", href: "https://wa.me/918750475852?text=Hi%20MonarkFX,%20I%20have%20a%20question", wa: true }}
        secondaryBtn={{ text: "View Courses", href: "/courses" }}
      />

      <section ref={ref} className="bg-white py-16 sm:py-20 px-6 sm:px-8">
        <div className="max-w-[1060px] mx-auto">

          {/* Prompt-style card — plus corners */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-zinc-200 bg-white grid md:grid-cols-2 lg:grid-cols-3"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
          >
            {/* Corner + icons */}
            {["-top-3 -left-3", "-top-3 -right-3", "-bottom-3 -left-3", "-bottom-3 -right-3"].map((pos, i) => (
              <span key={i} className={`absolute ${pos} text-[#E8B923] text-[22px] font-black leading-none select-none`}>+</span>
            ))}

            {/* ── LEFT+MIDDLE: info + map (2 cols on lg) ── */}
            <div className="lg:col-span-2 flex flex-col border-b md:border-b-0 md:border-r border-zinc-100">

              {/* Info header */}
              <div className="px-8 sm:px-10 pt-10 pb-6">
                <span className="text-[11px] font-extrabold text-[#E8B923] uppercase tracking-[0.2em] mb-3 block"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Get In Touch
                </span>
                <h2 className="font-black text-zinc-950 leading-[1.04] tracking-[-0.03em] mb-3"
                  style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px, 3vw, 38px)" }}>
                  Contact <span className="text-[#E8B923]">MonarkFX</span>
                </h2>
                <p className="text-zinc-400 text-[14px] leading-[1.6] max-w-md"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Fill the form or reach us directly. We reply to all inquiries within 24 business hours.
                </p>
              </div>

              {/* Contact info grid */}
              <div className="px-8 sm:px-10 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                {CONTACT_INFO.map((item, i) => (
                  <a key={i} href={item.href} className="flex items-center gap-3 py-3 no-underline group"
                    style={{ borderBottom: "1px solid #F5F5F5" }}>
                    <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center transition-colors duration-200 group-hover:bg-[#E8B923]/10"
                      style={{ background: "rgba(232,185,35,0.06)", border: "1px solid rgba(232,185,35,0.12)" }}>
                      <item.icon className="w-4 h-4 text-[#E8B923]" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.1em]"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{item.label}</p>
                      <p className="text-zinc-800 text-[13px] font-medium leading-snug"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Socials */}
              <div className="px-8 sm:px-10 pb-6">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.12em] mb-3"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Follow Us</p>
                <div className="flex gap-2">
                  {SOCIALS.map(({ Icon, label, href }, i) => (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 hover:bg-[#E8B923]/10"
                      style={{ background: "rgba(232,185,35,0.06)", border: "1px solid rgba(232,185,35,0.12)" }}>
                      <Icon className="text-[#E8B923]" size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="relative mt-auto" style={{ height: 220, borderTop: "1px solid #F0F0F0" }}>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] z-10"
                  style={{ background: "linear-gradient(to bottom, #E8B923, rgba(232,185,35,0.1))" }} />
                <ContactMap />
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="flex flex-col px-7 sm:px-8 py-10 bg-zinc-50/50">
              <h3 className="font-black text-zinc-900 text-[18px] mb-1"
                style={{ fontFamily: "var(--font-playfair), serif" }}>Send a Message</h3>
              <p className="text-zinc-400 text-[12px] mb-6"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>All fields marked * are required.</p>

              {done ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center py-10">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.28)" }}>
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h4 className="font-black text-zinc-900 text-[18px] mb-1"
                    style={{ fontFamily: "var(--font-playfair), serif" }}>Message Sent!</h4>
                  <p className="text-zinc-400 text-[13px]"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>We'll reply within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-4 flex-1">
                  <div>
                    <Label>Full Name *</Label>
                    <input name="name" value={form.name} onChange={onChange} required
                      placeholder="Your name" className={inputCls}
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }} />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <input name="email" type="email" value={form.email} onChange={onChange} required
                      placeholder="your@email.com" className={inputCls}
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }} />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <input name="phone" type="tel" value={form.phone} onChange={onChange}
                      placeholder="+91 XXXXX XXXXX" className={inputCls}
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }} />
                  </div>
                  <div className="flex-1">
                    <Label>Message *</Label>
                    <textarea name="message" value={form.message} onChange={onChange} required
                      rows={4} placeholder="How can we help?"
                      className={inputCls} style={{ resize: "none", fontFamily: "var(--font-dm-sans), sans-serif" }} />
                  </div>

                  <motion.button type="submit" disabled={busy}
                    whileHover={!busy ? { y: -2, boxShadow: "0 12px 32px rgba(232,185,35,0.35)" } : {}}
                    whileTap={!busy ? { scale: 0.97 } : {}}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-[14px] font-bold border-none cursor-pointer transition-all duration-200"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: busy ? "#999" : "#E8B923", boxShadow: "0 4px 16px rgba(232,185,35,0.25)" }}>
                    {busy ? (
                      <><motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" />Sending...</>
                    ) : (
                      <>Send Message <Send className="w-3.5 h-3.5" /></>
                    )}
                  </motion.button>

                  {/* WhatsApp shortcut */}
                  <a href="https://wa.me/918750475852" target="_blank" rel="noopener noreferrer" className="no-underline">
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-[13px] font-bold cursor-pointer transition-all duration-200"
                      style={{ background: "#25D366", boxShadow: "0 4px 14px rgba(37,211,102,0.25)" }}>
                      <FaWhatsapp size={16} /> Chat on WhatsApp
                    </motion.div>
                  </a>

                  <p className="text-center text-zinc-300 text-[11px]"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    🔒 Your info is safe — never shared.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
