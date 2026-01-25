"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

const expectations = [
  "Same structured curriculum as offline programs",
  "Live sessions with real-time doubt resolution",
  "Recorded sessions available for revision",
  "Personal mentorship support",
  "Flexible batch timings",
  "Certificate upon completion",
];

const courses = [
  { value: "", label: "Select a program" },
  { value: "IAT", label: "Institution Advance Trading (IAT)" },
  { value: "ACT", label: "Alpha Crypto Trader (ACT)" },
  { value: "AFT", label: "Alpha Forex Trader (AFT)" },
  { value: "MOX", label: "Monark Options X (MOX)" },
  { value: "Bundle", label: "Forex + Crypto Bundle" },
];

const LiveClassesPage = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
              Online Programs
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Online Learning,
              <br />
              <span className="text-red-600">Institutional Standards</span>
            </h1>

            <p className="text-[#737373] text-lg">
              Same curriculum. Same discipline. Anywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              className="text-[#525252] text-xs tracking-[0.2em] uppercase mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              What to Expect
            </h2>

            <div className="space-y-4">
              {expectations.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="text-red-700 text-sm">•</span>
                  <span className="text-[#a3a3a3]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section ref={formRef} className="py-20 border-t border-zinc-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Request Information
            </h2>
            <p className="text-[#525252] text-center mb-12">
              Our academic advisor will contact you
            </p>

            {isSuccess ? (
              <div className="text-center py-16">
                <p className="text-[#a3a3a3] text-lg mb-2">Thank you.</p>
                <p className="text-[#525252]">
                  Our academic advisor will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="text-[#525252] text-xs tracking-wide uppercase block mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-red-700 transition-colors"
                    placeholder="Enter your name"
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
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[#525252] text-xs tracking-wide uppercase block mb-3">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-red-700 transition-colors"
                      placeholder="Enter your phone"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[#525252] text-xs tracking-wide uppercase block mb-3">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-red-700 transition-colors"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <label className="text-[#525252] text-xs tracking-wide uppercase block mb-3">
                      Program Interest
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-800 text-white focus:outline-none focus:border-red-700 transition-colors"
                    >
                      {courses.map((c) => (
                        <option key={c.value} value={c.value} className="bg-[#0a0a0a]">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[#525252] text-xs tracking-wide uppercase block mb-3">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-red-700 transition-colors resize-none"
                    placeholder="Any questions or requirements?"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Bottom padding for mobile nav */}
      <div className="h-24 md:hidden" />
    </div>
  );
};

export default LiveClassesPage;
