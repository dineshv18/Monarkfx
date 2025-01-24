"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, LogIn, LogOut } from "lucide-react"
import Image from "next/image"

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
  const [user, setUser] = useState({ isLoggedIn: false })
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const shouldShowFullNavbar = !isScrolled || isHovered

  return (
    <motion.nav
      ref={navRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        width: shouldShowFullNavbar ? "90%" : "65px",
        maxWidth: shouldShowFullNavbar ? "700px" : "65px",
        backgroundColor: shouldShowFullNavbar ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.2)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="fixed z-50 top-4 left-0 right-0 mx-auto h-[65px] rounded-lg flex items-center justify-between px-2 backdrop-blur-md"
    >
      {/* Logo */}
      <Link href="/" onMouseEnter={() => setIsHovered(true)}
        className="flex items-center bg-red-600 rounded-md">
        <Image src="/logo.png" alt="Logo" width={50} height={50} className="rounded-lg" />
      </Link>

      {/* Desktop Navigation */}
      {shouldShowFullNavbar && (
        <div onMouseEnter={() => setIsHovered(true)} className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} onMouseEnter={() => setIsHovered(true)} className="text-white hover:text-red-500">
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Login/Logout Button */}
      {shouldShowFullNavbar && (
        <div className="hidden md:block">
          {user.isLoggedIn ? (
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={() => setUser({ isLoggedIn: false })}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={() => setUser({ isLoggedIn: true })}
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      )}

      {/* Mobile Menu Toggle */}
      {shouldShowFullNavbar && (
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white transition-opacity duration-300"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-[65px] z-50 pt-4"
          >
            <div className="p-4 space-y-4 bg-black/95 rounded-lg">
              <AnimatePresence>
                {shouldShowFullNavbar && isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden fixed inset-0 top-[65px] z-50 pt-4"
                  >
                    <div className="p-4 space-y-4 bg-black/95 rounded-lg">
                      {shouldShowFullNavbar && menuItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: shouldShowFullNavbar ? 1 : 0, x: 0 }}


                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            className="block text-white text-lg hover:text-red-500 py-2"
                            onClick={toggleMobileMenu}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {user.isLoggedIn ? (
                <button
                  className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg"
                  onClick={() => {
                    setUser({ isLoggedIn: false })
                    toggleMobileMenu()
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg"
                  onClick={() => {
                    setUser({ isLoggedIn: true })
                    toggleMobileMenu()
                  }}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Header

