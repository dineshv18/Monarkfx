"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LogOut, BookOpen } from "lucide-react";
import { useAuth } from "@/helper/AuthContext";
import Cart from "../Cart";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Live Classes", href: "/live-classes" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md"
          : "bg-[#0a0a0a]/75 backdrop-blur-sm"
          }`}
        style={{
          borderBottom: "1px solid rgba(139, 0, 0, 0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative"
                animate={{
                  scale: isScrolled ? 0.95 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logo-light.png"
                  alt="Monark FX"
                  width={160}
                  height={48}
                  className="h-20 lg:h-24 w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="relative group">
                  <span
                    className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${pathname === link.href
                      ? "text-red-400"
                      : "text-zinc-300 group-hover:text-red-400"
                      }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.name}
                  </span>
                  {/* Underline animation */}
                  <span
                    className={`absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-red-700 to-red-500 transition-all duration-300 ${pathname === link.href
                      ? "w-3/4 -translate-x-1/2"
                      : "w-0 -translate-x-1/2 group-hover:w-3/4"
                      }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Cart */}
              <div className="hidden lg:block">
                <Cart />
              </div>

              {/* Profile / Auth - Desktop */}
              {isAuthenticated ? (
                <div className="hidden lg:block relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-white/5"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-52 bg-zinc-950 border border-zinc-800/50 rounded-xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-zinc-800/50">
                          <p className="text-white font-medium truncate text-sm">
                            {user?.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate mt-0.5">
                            {user?.email}
                          </p>
                        </div>
                        <div className="p-2">
                          <Link
                            href="/user-profile"
                            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span className="text-sm">My Profile</span>
                          </Link>
                          <Link
                            href="/user-profile/my-courses"
                            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm">My Courses</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors w-full"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/auth" className="hidden lg:block">
                  <button
                    className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Login
                  </button>
                </Link>
              )}


              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-zinc-950 border-l border-zinc-800/50 lg:hidden h-[92vh]"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between px-6 py-2 border-b border-zinc-800/50">
                  <Image
                    src="/logo-light.png"
                    alt="Monark FX"
                    width={120}
                    height={100}
                    className="h-20 w-auto object-contain"
                  />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6 px-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-4 px-4 text-lg font-medium border-b border-zinc-800/30 transition-colors ${pathname === link.href
                          ? "text-red-400"
                          : "text-zinc-300 hover:text-red-400"
                          }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* User section in mobile */}
                  {isAuthenticated && (
                    <div className="mt-6 pt-6 border-t border-zinc-800/50">
                      <div className="px-4 mb-4">
                        <p className="text-white font-medium">{user?.name}</p>
                        <p className="text-sm text-zinc-500">{user?.email}</p>
                      </div>
                      <Link
                        href="/user-profile"
                        className="block py-3 px-4 text-zinc-400 hover:text-white transition-colors"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/user-profile/my-courses"
                        className="block py-3 px-4 text-zinc-400 hover:text-white transition-colors"
                      >
                        My Courses
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left py-3 px-4 text-red-400 hover:text-red-300 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </nav>

                {/* Mobile CTA */}
                <div className="p-6 border-t border-zinc-800/50">
                  {!isAuthenticated && (
                    <Link href="/auth" className="block mb-3">
                      <button className="w-full py-3 text-zinc-300 font-medium border border-zinc-700 rounded-lg hover:bg-white/5 transition-colors">
                        Login
                      </button>
                    </Link>
                  )}
                  <Link href="/courses" className="block">
                    <button
                      className="w-full py-3 text-white font-semibold rounded-lg"
                      style={{
                        background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                      }}
                    >
                      Enroll Now
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20 lg:h-24" />
    </>
  );
};

export default Header;
