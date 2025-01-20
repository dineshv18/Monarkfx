"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, useTransform, useMotionValue } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, LogIn, LogOut, User, Menu, X } from "lucide-react"

type MenuItem = {
  name: string
  href: string
  subItems?: MenuItem[]
}

type User = {
  name: string
  isLoggedIn: boolean
}

const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Courses",
    href: "#",
    subItems: [
      { name: "All Courses", href: "/courses/all" },
      { name: "Stocks", href: "/courses/stocks" },
      { name: "Forex", href: "/courses/forex" },
      { name: "Cryptocurrency", href: "/courses/crypto" },
    ],
  },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User>({ name: "John Doe", isLoggedIn: false })
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const scrollY = useMotionValue(0)
  const backgroundColor = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 0.8)"])
  const backdropFilter = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(10px)"])
  const logoSize = useTransform(scrollY, [0, 50], [200, 150])

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY)
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <motion.header
      className="sticky top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor, backdropFilter }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="flex items-center">
              <motion.div style={{ width: logoSize, height: logoSize }}>
                <Image
                  src={isScrolled ? "/logo-light.png" : "/logo-dark.png"}
                  alt="logo"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </Link>
          </motion.div>

          <nav className="hidden md:flex space-x-1 lg:space-x-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 flex items-center ${
                    isScrolled ? "text-white" : "text-gray-800"
                  } ${pathname === item.href ? "border-b-2 border-red-500" : ""}`}
                >
                  {item.name}
                  {item.subItems && <ChevronDown className="ml-1 h-5 w-5" />}
                </Link>
                {item.subItems && (
                  <motion.div
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
                          role="menuitem"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="hidden md:flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {user.isLoggedIn ? (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
                    isScrolled ? "text-white" : "text-gray-800"
                  }`}
                >
                  <User className="h-6 w-6" />
                  <span>{user.name}</span>
                  <ChevronDown className="h-5 w-5" />
                </motion.button>
                <motion.div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Profile
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setUser({ ...user, isLoggedIn: false })}
                      className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Logout
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUser({ ...user, isLoggedIn: true })}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
              >
                <LogIn className="h-6 w-6" />
                <span>Login</span>
              </motion.button>
            )}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`md:hidden p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${
              isScrolled ? "text-white" : "text-gray-800"
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div className="pl-4 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <motion.div
                          key={subItem.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: (index + subIndex) * 0.1 }}
                        >
                          <Link
                            href={subItem.href}
                            className={`block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900`}
                            onClick={closeMobileMenu}
                          >
                            {subItem.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: menuItems.length * 0.1 }}
              >
                {user.isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={closeMobileMenu}
                    >
                      <div className="flex items-center space-x-2">
                        <User className="h-6 w-6" />
                        <span>{user.name}</span>
                      </div>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setUser({ ...user, isLoggedIn: false })
                        closeMobileMenu()
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut className="h-6 w-6" />
                        <span>Logout</span>
                      </div>
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setUser({ ...user, isLoggedIn: true })
                      closeMobileMenu()
                    }}
                    className="w-full px-3 py-2 rounded-md text-lg font-medium bg-red-600 text-white hover:bg-red-700"
                  >
                    <div className="flex items-center space-x-2 justify-center">
                      <LogIn className="h-6 w-6" />
                      <span>Login</span>
                    </div>
                  </motion.button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header

