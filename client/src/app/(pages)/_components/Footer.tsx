"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import Image from "next/image";

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const socialIcons = [
    {
      Icon: Instagram,
      href: "https://www.instagram.com/monarkfx/",
      label: "Instagram",
    },
    {
      Icon: Facebook,
      href: "https://www.facebook.com/monarkfx/",
      label: "Facebook",
    },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/company/monarkfx/posts/?feedView=all",
      label: "LinkedIn",
    },
    { Icon: Twitter, href: "https://x.com/monarkfx", label: "Twitter" },
    {
      Icon: Youtube,
      href: "https://www.youtube.com/@MonarkFX",
      label: "YouTube",
    },
  ];

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Business", path: "/business" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.footer
      ref={footerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-white text-black pt-20 pb-10 relative overflow-hidden"
    >
      {/* Futuristic design elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>

      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="border-r border-red-500"
              style={{
                height: "100%",
                borderWidth: "0.5px",
              }}
            />
          ))}
        </div>
        <div className="grid grid-rows-12 w-full absolute top-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="border-b border-red-500"
              style={{
                width: "100%",
                borderWidth: "0.5px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {/* Company info & logo */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-1 space-y-6"
            >
              <div className="flex items-center space-x-2">
                <Image src="/logo.png" width={100} height={100} alt="logo" />
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-500">
                  Monark FX
                </h3>
              </div>
              <p className="text-gray-600">
                Empowering traders with cutting-edge technology and expert
                market insights since 2018.
              </p>
              <div className="flex space-x-4 mt-6">
                {socialIcons.map(({ Icon, href, label }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="text-gray-500 hover:text-red-600 transition-colors bg-gray-50 p-2 rounded-full hover:bg-red-50"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-1 space-y-6"
            >
              <h3 className="text-lg font-bold text-gray-900 border-b-2 border-red-500 pb-2 inline-block">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-red-600 flex items-center transition-colors group"
                    >
                      <ChevronRight
                        size={16}
                        className="mr-2 text-red-500 group-hover:translate-x-1 transition-transform"
                      />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact info */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-1 space-y-6"
            >
              <h3 className="text-lg font-bold text-gray-900 border-b-2 border-red-500 pb-2 inline-block">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin
                    size={18}
                    className="text-red-500 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-600">
                    Uttam Nagar, New Delhi, India
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin
                    size={18}
                    className="text-red-500 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-600">
                    Dashrath Puri, New Delhi, India
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="text-red-500 flex-shrink-0" />
                  <span className="text-gray-600">
                    +91 9220797499 / +91 9773927706
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="text-red-500 flex-shrink-0" />
                  <a
                    href="mailto:service@monarkfx.com"
                    className="text-gray-600 hover:text-red-600"
                  >
                    service@monarkfx.com
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock size={18} className="text-red-500 flex-shrink-0" />
                  <span className="text-gray-600">Mon - Sat: 9AM to 6PM</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom section */}
          <motion.div
            variants={containerVariants}
            className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row justify-between items-center"
          >
            <motion.p
              variants={itemVariants}
              className="text-gray-500 text-sm mb-4 sm:mb-0"
            >
              &copy; {new Date().getFullYear()} Monark FX. All Rights Reserved.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex space-x-4 text-sm"
            >
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/refund"
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                Refund Policy
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
