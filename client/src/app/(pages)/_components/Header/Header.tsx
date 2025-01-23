"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from "framer-motion"
import Link from "next/link"
import { ChevronDown, LogIn, LogOut, Menu, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import Image from "next/image"

const menuItems = [
  { name: "Home", href: "/" },
  {
    name: "Courses",
    href: "/",
    // subItems: [
    //   { name: "All Courses", href: "/courses/all" },
    //   { name: "Stocks", href: "/courses/stocks" },
    //   { name: "Forex", href: "/courses/forex" },
    //   { name: "Crypto", href: "/courses/crypto" },
    // ],
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const Header = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [user, setUser] = useState({ name: "John Doe", isLoggedIn: false })
  const [mounted, setMounted] = useState(false)
  const lastScrollY = useRef(0)
  const { scrollY } = useScroll()
  const headerRef = useRef<HTMLDivElement>(null)

  const headerWidth = useMotionValue("100%")
  const headerMaxWidth = useMotionValue("600px")
  const routesOpacity = useTransform(scrollY, [0, 300], [1, 0.5])
  const bgOpacity = useTransform(scrollY, [0, 100], [0.5, 0.95])

  useEffect(() => {
    setMounted(true)
    const updateHeaderWidth = () => {
      if (headerRef.current) {
        const viewportWidth = window.innerWidth
        const maxWidth = Math.min(600, viewportWidth - 32)
        headerMaxWidth.set(`${maxWidth}px`)
      }
    }
    updateHeaderWidth()
    window.addEventListener("resize", updateHeaderWidth)
    return () => window.removeEventListener("resize", updateHeaderWidth)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsCollapsed(true)
        setActiveDropdown(null) 
      } else {
        setIsCollapsed(false)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const headerVariants = {
    expanded: {
      width: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
    collapsed: {
      width: "65px",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
  }

  const handleMouseEnter = (itemName: string) => {
    if (!isCollapsed) {
      setActiveDropdown(itemName)
    }
  }

  const handleMouseLeave = () => {
    if (!isCollapsed) {
      setActiveDropdown(null)
    }
  }

  if (!mounted) return null

  return (
    <motion.header
      ref={headerRef}
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={headerVariants}
      whileHover="expanded"
      initial="expanded"
      className={cn(
        "fixed z-50 top-4 left-0 right-0 mx-auto h-[65px] rounded-lg flex items-center justify-between overflow-hidden",
        "backdrop-blur-md"
      )}
      style={{
        maxWidth: headerMaxWidth,
        backgroundColor: `rgba(0, 0, 0, ${bgOpacity.get()})`,
      }}
    >
      <motion.div 
        className="bg-red-600 rounded-lg w-[50px] h-[50px] flex items-center justify-center ml-2 shrink-0"
        animate={{ 
          scale: isCollapsed ? 0.8 : 1,
          rotate: isCollapsed ? 360 : 0 
        }}
        transition={{ duration: 0.2 }}
      >
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={40} 
            height={40}
            className="rounded-lg"
          />
        </Link>
      </motion.div>

      <nav className={cn(
        "hidden md:flex items-center space-x-6 mx-4 overflow-x-auto",
        isCollapsed && "opacity-0 pointer-events-none"
      )}>
        <AnimatePresence>
          {menuItems.map((item) => (
            <motion.div 
              key={item.name} 
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className="text-white text-base font-medium hover:text-red-500 transition-colors flex items-center whitespace-nowrap py-2"
              >
                {item.name}
                
              </Link>

             
            </motion.div>
          ))}
        </AnimatePresence>
      </nav>

      <motion.div 
        className={cn(
          "hidden md:block mr-2 shrink-0", 
          isCollapsed && "opacity-0 pointer-events-none"
        )}
        
      >
        {user.isLoggedIn ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm whitespace-nowrap"
            onClick={() => setUser({ ...user, isLoggedIn: false })}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm whitespace-nowrap"
            onClick={() => setUser({ ...user, isLoggedIn: true })}
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </motion.button>
        )}
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 mr-2 text-white"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg rounded-b-lg border border-gray-800 max-h-[70vh] overflow-y-auto"
            style={{ maxWidth: headerMaxWidth }}
          >
            <div className="px-4 py-2 space-y-2">
          
              <div className="pt-2">
                {user.isLoggedIn ? (
                  <button
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg"
                    onClick={() => {
                      setUser({ ...user, isLoggedIn: false })
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg"
                    onClick={() => {
                      setUser({ ...user, isLoggedIn: true })
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header