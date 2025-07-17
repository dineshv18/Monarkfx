"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, LogIn, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/helper/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import Cart from "../Cart";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Business", href: "/business" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [navPosition, setNavPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const { isAuthenticated, checkAuth } = useAuth();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    checkAuth();
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        setIsMobileMenuOpen(false);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [checkAuth]);

  // Close mobile menu on route change or scroll
  useEffect(() => {
    const handleRouteChange = () => setIsMobileMenuOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  const handleLogout = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) return;

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      Cookies.remove("accessToken");
      window.location.href = "/auth";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed z-50 top-[10px] left-0 right-0 mx-auto w-[95%] md:w-[90%] max-w-7xl flex flex-col md:flex-row items-center justify-between transition-all duration-500 ${
        isScrolled
          ? "bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-[0_0_15px_rgba(220,38,38,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="flex w-full md:w-auto items-center justify-between p-3">
        {/* Logo with animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 to-red-400 opacity-30 group-hover:opacity-60 blur transition duration-500"></div>
          <Link href="/" className="relative flex items-center rounded-md">
            <Image
              src="/logo.png"
              alt="Monark FX"
              width={60}
              height={60}
              className="rounded-lg"
            />
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white bg-green-600/20 p-2 rounded-full border border-green-600/30"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </motion.button>
      </div>

      {/* Desktop Navigation with hover effect */}
      <div className="hidden md:block mx-auto">
        <ul
          className="relative flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 p-1"
          onMouseLeave={() => {
            setNavPosition((prev) => ({ ...prev, opacity: 0 }));
            setActiveIndex(null);
          }}
        >
          {menuItems.map((item, idx) => (
            <NavTab
              key={item.name}
              href={item.href}
              setPosition={setNavPosition}
              isActive={activeIndex === idx}
              onClick={() => setActiveIndex(idx)}
            >
              {item.name}
            </NavTab>
          ))}
          <NavCursor position={navPosition} />
        </ul>
      </div>

      {/* Auth & Cart Section */}
      <div className="hidden md:flex items-center space-x-3">
        {isAuthenticated ? (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-1 text-white bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-green-500/50 transition-all duration-300"
            >
              <User className="h-4 w-4 mr-1" />
              <span className="text-sm">Profile</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </motion.button>

            <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-black/70 backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.3)] py-1 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-transparent opacity-60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                  />
                  <Link
                    href="/user-profile"
                    className="relative block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="relative w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link href="/auth">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-300 border border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            >
              <LogIn className="h-4 w-4 mr-1" />
              <span className="text-sm">Login</span>
            </motion.button>
          </Link>
        )}

        {/* Cart component */}
        <Cart />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full md:hidden mt-1 border-t border-white/10 pt-2 px-3 pb-3 backdrop-blur-md bg-black/70 rounded-b-2xl"
          >
            <div className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block text-white text-sm hover:text-green-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.05 }}
                className="border-t border-white/10 pt-2 mt-2"
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/user-profile"
                      className="block text-white text-sm hover:text-green-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-white text-sm hover:text-green-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    className="flex items-center space-x-2 text-white text-sm bg-gradient-to-r from-red-600 to-red-500 py-2 px-4 rounded-lg my-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Added TypeScript interfaces for the component props
interface NavTabProps {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      left: number;
      width: number;
      opacity: number;
    }>
  >;
  onClick?: () => void;
}

interface NavCursorProps {
  position: {
    left: number;
    width: number;
    opacity: number;
  };
}

// NavTab component for the new hover effect
const NavTab: React.FC<NavTabProps> = ({
  children,
  href,
  isActive,
  setPosition,
  onClick,
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <motion.li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative z-10 block cursor-pointer px-4 py-1.5 text-sm uppercase text-white md:py-2 md:text-base transition-colors ${
        isActive ? "font-medium" : "font-normal"
      }`}
    >
      <Link href={href}>{children}</Link>
    </motion.li>
  );
};

// NavCursor component for the hover effect
const NavCursor: React.FC<NavCursorProps> = ({ position }) => {
  return (
    <motion.div
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute z-0 h-7 rounded-full bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_10px_rgba(220,38,38,0.3)] md:h-9"
    />
  );
};

export default Header;
