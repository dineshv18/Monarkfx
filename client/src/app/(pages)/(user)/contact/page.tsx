"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

const ContactPage = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-10 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#525252] text-xs tracking-[0.3em] uppercase block mb-6">
              Contact
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Get in Touch
            </h1>

            <p className="text-[#737373] text-lg">
              We're here to answer your questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2
                className="text-[#525252] text-xs tracking-[0.2em] uppercase mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Contact Information
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div>
                  <span className="text-[#525252] text-xs uppercase tracking-wide block mb-2">
                    Address
                  </span>
                  <p className="text-[#a3a3a3] leading-relaxed">
                    Metro Pillar No. 654, 2nd Floor B-28
                    <br />
                    Hari Nagar, Uttam Nagar
                    <br />
                    New Delhi, 110059
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <span className="text-[#525252] text-xs uppercase tracking-wide block mb-2">
                    Phone
                  </span>
                  <p className="text-[#a3a3a3]">
                    <a href="tel:+918750475852" className="hover:text-red-400 transition-colors">
                      +91 87504 75852
                    </a>
                    <br />
                    <a href="tel:+919220797499" className="hover:text-red-400 transition-colors">
                      +91 92207 97499
                    </a>
                  </p>
                </div>

                {/* Email */}
                <div>
                  <span className="text-[#525252] text-xs uppercase tracking-wide block mb-2">
                    Email
                  </span>
                  <p className="text-[#a3a3a3]">
                    <a href="mailto:service@monarkfx.com" className="hover:text-red-400 transition-colors">
                      service@monarkfx.com
                    </a>
                  </p>
                </div>

                {/* Hours */}
                <div>
                  <span className="text-[#525252] text-xs uppercase tracking-wide block mb-2">
                    Office Hours
                  </span>
                  <p className="text-[#a3a3a3]">
                    Monday – Saturday
                    <br />
                    10:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12">
                <div className="rounded-xl overflow-hidden" style={{ filter: "grayscale(100%) contrast(1.1)" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890123!2d77.0456789!3d28.6234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzI0LjQiTiA3N8KwMDInNDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2
                className="text-[#525252] text-xs tracking-[0.2em] uppercase mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Send a Message
              </h2>

              {isSuccess ? (
                <div className="py-16">
                  <p className="text-[#a3a3a3] text-lg mb-2">Thank you.</p>
                  <p className="text-[#525252]">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label className="text-[#525252] text-xs tracking-wide uppercase block mb-3">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-red-700 transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[#525252] text-xs tracking-wide uppercase block mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-red-700 transition-colors"
                        placeholder="Your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[#525252] text-xs tracking-wide uppercase block mb-3">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-red-700 transition-colors"
                        placeholder="Your phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#525252] text-xs tracking-wide uppercase block mb-3">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-red-700 transition-colors resize-none"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-4 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                      style={{
                        background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-[#525252] text-sm">
            <a href="https://www.instagram.com/monarkfx" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/monarkfx" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
              LinkedIn
            </a>
            <a href="https://twitter.com/monarkfx" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </section>

      {/* Bottom padding for mobile nav */}
      <div className="h-24 md:hidden" />
    </div>
  );
};

export default ContactPage;
