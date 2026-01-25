"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Twitter, Star, MapPin, Phone, Mail, Clock } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Live Classes", href: "/live-classes" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/monarkfx" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/monarkfx" },
  { name: "X", icon: Twitter, href: "https://twitter.com/monarkfx" },
];

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a]">
      {/* Top gradient border */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(139,69,69,0.5) 50%, transparent 100%)",
        }}
      />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-block mb-2">
              <Image
                src="/logo-light.png"
                alt="Monark FX"
                width={140}
                height={100}
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-[#a3a3a3] text-sm leading-relaxed">
              ISO Certified Financial Market Education Institute
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              className="text-white font-semibold text-sm tracking-wide uppercase mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-[#e5e5e5] text-sm hover:text-red-400 transition-all duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span className="transform group-hover:translate-x-0.5 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4
              className="text-white font-semibold text-sm tracking-wide uppercase mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Contact
            </h4>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#737373] mt-1 flex-shrink-0" strokeWidth={1.5} />
                <div className="text-[#e5e5e5] text-sm leading-relaxed">
                  <p>Metro Pillar No. 654, 2nd Floor B-28</p>
                  <p>Hari Nagar, Uttam Nagar</p>
                  <p>New Delhi, 110059</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#737373] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div className="text-sm">
                  <a
                    href="tel:+918750475852"
                    className="text-[#e5e5e5] hover:text-red-400 transition-colors block"
                  >
                    +91 87504 75852
                  </a>
                  <a
                    href="tel:+919220797499"
                    className="text-[#e5e5e5] hover:text-red-400 transition-colors block"
                  >
                    +91 9220797499
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#737373] flex-shrink-0" strokeWidth={1.5} />
                <a
                  href="mailto:service@monarkfx.com"
                  className="text-[#e5e5e5] hover:text-red-400 transition-colors text-sm"
                >
                  service@monarkfx.com
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#737373] flex-shrink-0" strokeWidth={1.5} />
                <span className="text-[#e5e5e5] text-sm">Mon – Sat: 10 AM – 7 PM</span>
              </div>
            </div>
          </div>

          {/* Column 4: Social & Trust */}
          <div>
            <h4
              className="text-white font-semibold text-sm tracking-wide uppercase mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Connect
            </h4>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-[#2a2a2a] rounded-lg text-[#a3a3a3] hover:text-red-400 hover:border-red-900/50 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>

            {/* Google Rating */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < 4 ? "text-amber-500 fill-amber-500" : "text-amber-500 fill-amber-500/60"}`}
                    />
                  ))}
                </div>
                <span className="text-white text-sm font-medium">4.7</span>
              </div>
              <p className="text-[#737373] text-xs">200+ Google Reviews</p>
            </div>

            {/* ISO Certification */}
            <div className="flex items-center gap-2 text-[#737373] text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-red-700" />
              <span>ISO 21008:2018 Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(50,50,50,0.5)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-[#737373] text-xs text-center lg:text-left">
              © {new Date().getFullYear()} Monark FX™. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="text-[#737373] hover:text-[#a3a3a3] text-xs transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[#737373] hover:text-[#a3a3a3] text-xs transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/disclaimer"
                className="text-[#737373] hover:text-[#a3a3a3] text-xs transition-colors"
              >
                Disclaimer
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[#525252] text-[11px] text-center mt-4 md:mt-6 leading-relaxed max-w-3xl mx-auto pb-20 md:pb-4">
            <span className="text-red-800">Disclaimer:</span> Trading involves capital risk.
            We provide education only, not investment advice. Past performance is not
            indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
