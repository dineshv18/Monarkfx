"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { Phone, X, Menu, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const coursePrograms = [
  {
    name: "Indian Market Mastery",
    desc: "Nifty · Bank Nifty · F&O",
    href: "/courses/programs/indian-market-mastery",
  },
  {
    name: "Forex & Gold Specialist",
    desc: "EUR/USD · GBP/JPY · XAUUSD",
    href: "/courses/programs/forex-gold-specialist",
  },
  {
    name: "Crypto Institutional Edge",
    desc: "BTC · ETH · Altcoins · Futures",
    href: "/courses/programs/crypto-institutional-edge",
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses", dropdown: coursePrograms },
  { name: "Contact", href: "/contact" },
];

const WHATSAPP_URL =
  "https://wa.me/918750475852?text=Hi,%20I%20want%20to%20enroll%20in%20your%20trading%20program";

const PHONE_NUMBER = "+91 87504 75852";

const AnimatedNavLink = ({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className={`group relative inline-flex items-center h-6 text-[13px] font-medium whitespace-nowrap transition-colors duration-200
      ${active ? "text-white" : "text-gray-400 hover:text-white"}`}
  >
    {children}
    {active && (
      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#D72638] rounded-full" />
    )}
  </Link>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [shapeClass, setShapeClass] = useState("rounded-full");
  const shapeTimer = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (shapeTimer.current) clearTimeout(shapeTimer.current);
    if (isOpen) {
      setShapeClass("rounded-2xl");
    } else {
      shapeTimer.current = setTimeout(() => setShapeClass("rounded-full"), 300);
    }
    return () => {
      if (shapeTimer.current) clearTimeout(shapeTimer.current);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setMobileCoursesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50
                     flex flex-col items-center
                     px-5 py-1
                     border border-white/10 bg-[#1a1a1aaa] backdrop-blur-md
                     w-[calc(100%-2rem)] sm:w-auto
                     shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                     transition-[border-radius] duration-0
                     ${shapeClass}`}
      >
        {/* Main row */}
        <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="MonarkFX"
              width={110}
              height={80}
              className="h-16 w-auto object-contain "
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 h-6 text-[13px] font-medium whitespace-nowrap transition-colors duration-200
                      ${pathname.startsWith("/courses") ? "text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    {link.name}
                    <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                    {pathname.startsWith("/courses") && (
                      <span className="absolute -bottom-0.5 left-0 right-6 h-px bg-[#D72638] rounded-full" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72
                               opacity-0 invisible translate-y-1
                               group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                               transition-all duration-200"
                  >
                    <div className="rounded-2xl border border-white/10 bg-[#1a1a1af2] backdrop-blur-md p-2 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-white/5"
                        >
                          <p className="text-[13px] font-semibold text-white">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {item.desc}
                          </p>
                        </Link>
                      ))}
                      <Link
                        href="/courses"
                        className="flex items-center justify-center gap-1 mt-1 rounded-xl px-3 py-2 text-[12px] font-bold text-[#D72638] hover:bg-[#D72638]/10 transition-colors duration-150"
                      >
                        View All Courses
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <AnimatedNavLink
                  key={link.href}
                  href={link.href}
                  active={pathname === link.href}
                >
                  {link.name}
                </AnimatedNavLink>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href={`tel:+918750475852`}
              className="flex items-center gap-1.5 px-3 py-[7px] rounded-full
                         border border-white/15 bg-white/5 text-gray-300
                         hover:border-white/40 hover:text-white
                         text-xs font-medium transition-colors duration-200"
            >
              <Phone className="w-3 h-3 shrink-0" />
              {PHONE_NUMBER}
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-[7px] rounded-full text-xs font-bold
                         bg-gradient-to-br from-gray-100 to-gray-300 text-black
                         hover:from-gray-200 hover:to-gray-400
                         transition-all duration-200 shadow-[0_0_16px_rgba(255,255,255,0.15)]"
            >
              Join Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="lg:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`lg:hidden flex flex-col items-center w-full
                       transition-all duration-300 ease-in-out overflow-hidden
                       ${isOpen ? "max-h-[400px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
        >
          <nav className="flex flex-col items-center gap-4 w-full">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.href} className="w-full">
                  <div className="flex items-center justify-center gap-2 w-full">
                    <Link
                      href={link.href}
                      className={`text-base transition-colors duration-200
                        ${pathname.startsWith("/courses") ? "text-white font-semibold" : "text-gray-400 hover:text-white"}`}
                    >
                      {link.name}
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileCoursesOpen((v) => !v);
                      }}
                      aria-label="Toggle courses submenu"
                      className="text-gray-400 hover:text-white"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${mobileCoursesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${mobileCoursesOpen ? "max-h-64 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="flex flex-col gap-1 px-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-xl px-3 py-2 text-center hover:bg-white/5 transition-colors duration-150"
                        >
                          <span className="block text-[13px] font-semibold text-gray-200">
                            {item.name}
                          </span>
                          <span className="block text-[11px] text-gray-500">
                            {item.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`w-full text-center text-base transition-colors duration-200
                    ${pathname === link.href ? "text-white font-semibold" : "text-gray-400 hover:text-white"}`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          <div className="flex flex-col items-center gap-3 mt-5 w-full pb-1">
            <a
              href={`tel:+918750475852`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full
                         border border-white/15 bg-white/5 text-gray-300
                         hover:border-white/40 hover:text-white
                         text-sm font-medium transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              {PHONE_NUMBER}
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full text-center text-sm font-bold
                         bg-gradient-to-br from-gray-100 to-gray-300 text-black
                         hover:from-gray-200 hover:to-gray-400
                         transition-all duration-200"
            >
              Join Now via WhatsApp
            </a>
          </div>
        </div>
      </header>


    </>
  );
};

export default Header;
