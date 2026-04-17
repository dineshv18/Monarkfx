"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

const WHATSAPP_URL =
  "https://wa.me/918750475852?text=Hi,%20I%20want%20to%20enroll%20in%20your%20trading%20program";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ─── HEADER ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-zinc-100 shadow-[0_2px_32px_rgba(0,0,0,0.07)]"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[70px] sm:h-[76px] lg:h-20">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 no-underline group">
              <Image src="/logo-dark.png" alt="Logo" width={200} height={200} />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg text-[14px] font-medium tracking-wide
                                transition-all duration-200 no-underline
                                ${active
                        ? "text-[#D72638] bg-red-50"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                      }`}
                  >
                    {link.name}
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute bottom-[5px] left-1/2 -translate-x-1/2
                                   w-1 h-1 rounded-full bg-[#D72638]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── CTA + Hamburger ── */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <Link href={WHATSAPP_URL} target="_blank" className="hidden lg:block no-underline">
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 12px 28px rgba(215,38,56,0.36)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-[10px] rounded-xl
                             bg-[#D72638] hover:bg-[#C0202F] text-white text-[14px] font-semibold
                             border border-[#D72638] shadow-[0_4px_16px_rgba(215,38,56,0.28)]
                             transition-colors duration-200 cursor-pointer outline-none"
                >
                  Join Workshop
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                </motion.button>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px]
                           rounded-xl border border-zinc-200 bg-white shadow-sm
                           transition-all duration-200 hover:border-zinc-300 cursor-pointer"
              >
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-[18px] h-[1.5px] bg-zinc-800 rounded-full origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-[18px] h-[1.5px] bg-zinc-800 rounded-full"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-[18px] h-[1.5px] bg-zinc-800 rounded-full origin-center"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MOBILE MENU ────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="fixed top-0 left-0 right-0 z-50 lg:hidden
                         bg-white border-b border-zinc-100
                         shadow-[0_16px_48px_rgba(0,0,0,0.12)]
                         rounded-b-3xl overflow-hidden"
              style={{ paddingTop: "76px" }}
            >
              {/* Logo row inside panel (visible at top for context) */}
              <div className="px-6 pt-2 pb-3 flex items-center gap-2 border-b border-zinc-50">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center
                                bg-gradient-to-br from-[#D72638] to-[#9B1A28]">
                  <TrendingUp className="w-[13px] h-[13px] text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[13px] font-semibold text-zinc-400 tracking-widest uppercase">
                  Navigation
                </span>
              </div>

              {/* Nav links */}
              <nav className="px-4 py-3">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045, type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between px-4 py-4 mb-1
                                    rounded-2xl text-[16px] font-medium no-underline
                                    transition-all duration-150
                                    ${active
                            ? "bg-red-50 text-[#D72638]"
                            : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                          }`}
                      >
                        <span>{link.name}</span>
                        {active ? (
                          <span className="w-2 h-2 rounded-full bg-[#D72638]" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-zinc-300" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* CTA */}
              <div className="px-5 pt-2 pb-7">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                >
                  <Link href={WHATSAPP_URL} target="_blank" className="no-underline block">
                    <button
                      className="w-full py-4 rounded-2xl flex items-center justify-center gap-2
                                 bg-[#D72638] hover:bg-[#C0202F] active:scale-[0.98]
                                 text-white text-[16px] font-semibold
                                 shadow-[0_6px_20px_rgba(215,38,56,0.32)]
                                 transition-all duration-200 cursor-pointer border-none outline-none"
                    >
                      Join Trading Program
                      <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                  </Link>

                  <p className="text-center text-[12px] text-zinc-400 mt-3 tracking-wide">
                    Free consultation · No spam
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[70px] sm:h-[76px] lg:h-20" />
    </>
  );
};

export default Header;