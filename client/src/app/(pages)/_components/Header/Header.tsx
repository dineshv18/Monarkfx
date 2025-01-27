"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  ShoppingCart,
  ChevronDown
} from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/helper/AuthContext"
import axios from "axios"
import Cookies from "js-cookie"
import Cart from "../Cart"

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Business", href: "/business" },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const { isAuthenticated, checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
        setIsMobileMenuOpen(false)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [checkAuth])

  // Close mobile menu on route change or scroll
  useEffect(() => {
    const handleRouteChange = () => setIsMobileMenuOpen(false)
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  const handleLogout = async () => {
    try {
      const accessToken = Cookies.get("accessToken")
      if (!accessToken) return

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      Cookies.remove("accessToken")
      window.location.href = "/auth"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const shouldShowFullNavbar = !isScrolled || isHovered

  const logoSize = shouldShowFullNavbar ? 45 : 35

  return (
    <motion.nav
      ref={navRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsProfileDropdownOpen(false)
      }}
      initial={false}
      animate={{
        width: shouldShowFullNavbar ? "90%" : "65px",
        maxWidth: shouldShowFullNavbar ? "1200px" : "65px",
        backgroundColor: shouldShowFullNavbar ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.7)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed z-50 top-4 left-0 right-0 mx-auto h-[65px] rounded-lg flex items-center justify-between px-4"
    >
      {/* Logo with dynamic size */}
      <Link href="/" className="flex items-center bg-red-600 rounded-md p-1">
        <Image
          src="/logo.png"
          alt="Monark FX"
          width={logoSize}
          height={logoSize}
          className="rounded-lg transition-all duration-300"
        />
      </Link>

      {/* Desktop Navigation */}
      {shouldShowFullNavbar && (
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white hover:text-red-500 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Auth & Cart Section - Only visible on desktop when navbar is expanded */}
      {shouldShowFullNavbar && (
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 text-white hover:text-red-500"
              >
                <User className="h-5 w-5" />
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2"
                  >
                    <Link
                      href="/user-profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-red-50"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsProfileDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/auth">
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
            </Link>
          )}

          {/* Cart only visible in desktop mode when expanded */}
          {shouldShowFullNavbar && <Cart />}
        </div>
      )}

      {/* Mobile Menu Toggle - Only visible when not expanded */}
      {shouldShowFullNavbar && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      )}

      {/* Mobile Menu with improved animation and behavior */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/95 rounded-lg p-4 backdrop-blur-lg"
          >
            <div className="space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-white hover:text-red-500 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    href="/user-profile"
                    className="block text-white hover:text-red-500 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full text-left text-white hover:text-red-500 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="block text-white hover:text-red-500 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Header