"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { Phone, X, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
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
            {navLinks.map((link) => (
              <AnimatedNavLink
                key={link.href}
                href={link.href}
                active={pathname === link.href}
              >
                {link.name}
              </AnimatedNavLink>
            ))}
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`w-full text-center text-base transition-colors duration-200
                  ${pathname === link.href ? "text-white font-semibold" : "text-gray-400 hover:text-white"}`}
              >
                {link.name}
              </Link>
            ))}
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
