"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Instagram, Facebook, Linkedin, Twitter, Youtube } from "lucide-react"

const Footer: React.FC = () => {
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setIsEmailValid(e.target.validity.valid)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEmailValid) {
      setShowThankYou(true)
      setEmail("")
      setTimeout(() => setShowThankYou(false), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

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
  }


  const socialIcons = [
    { Icon: Instagram, href: "https://www.instagram.com/monarkfx/" },
    { Icon: Facebook, href: "https://www.facebook.com/monarkfx/" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/monarkfx/posts/?feedView=all" },
    { Icon: Twitter, href: "https://x.com/monarkfx" },
    { Icon: Youtube, href: "https://www.youtube.com/@MonarkFX" },
  ]

  return (
    <motion.footer
      ref={footerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-gradient-to-b from-red-100 to-white text-black py-12 relative overflow-hidden"
    >
      {/* Animated Indian coin background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 
                       backdrop-blur-sm opacity-30 hover:opacity-50 transition-opacity"
            style={{
              width: Math.random() * 40 + 20,
              height: Math.random() * 40 + 20,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transformOrigin: 'center',
              zIndex: 10,
              translateZ: 0
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear"
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-red-600 font-bold text-2xl">₹</div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-3xl font-bold text-red-600 mb-2">Join Our Trading Community</h2>
          <p className="text-lg text-gray-700">Get exclusive insights and stay updated with Monark FX</p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8" variants={itemVariants}>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full px-6 py-3 rounded-full border-2 border-red-400 focus:border-red-600 focus:outline-none text-lg"
              required
            />
            <motion.button
              type="submit"
              className={`absolute right-2 top-2 bg-red-600 text-white rounded-full p-2 ${isEmailValid ? "opacity-100" : "opacity-50 cursor-not-allowed"
                }`}
              whileHover={isEmailValid ? { scale: 1.1 } : {}}
              whileTap={isEmailValid ? { scale: 0.95 } : {}}
              disabled={!isEmailValid}
            >
              <ArrowRight size={24} />
            </motion.button>
          </div>
          {showThankYou && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-green-600 mt-2"
            >
              Thank you for subscribing!
            </motion.p>
          )}
        </motion.form>

        <motion.div variants={containerVariants} className="flex flex-wrap justify-center gap-6 mb-8">
          {socialIcons.map(({ Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-red-600 hover:text-red-700"
            >
              <Icon size={28} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={containerVariants} className="flex flex-wrap justify-center gap-6 mb-8">
          {["Home", "About Us", "Courses", "Business", "Contact"].map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href={`/${item.toLowerCase().replace(" ", "")}`}
                className="text-base text-gray-700 hover:text-red-600 transition-colors"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center text-gray-600 text-sm">
          <p>&copy; 2024 Monark FX. All Rights Reserved.</p>
          <Link href="/privacy" className="text-red-600 hover:underline ml-2">
            Privacy Policy
          </Link>
        </motion.div>


      </div>
    </motion.footer>
  )
}

export default Footer

