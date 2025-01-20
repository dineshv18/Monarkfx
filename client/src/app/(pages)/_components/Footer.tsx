"use client"

import React, { type FormEvent, useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 768,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth })
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      handleResize()
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowSize
}

const Footer = () => {
  const container = useRef<HTMLDivElement>(null)
  const [openPopup, setOpenPopUp] = useState(false)
  const svgRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const { width } = useWindowSize()

  const pathArr = [
     // M
  "M40 100V0H60L80 40L100 0H120V100H100V30L80 70L60 30V100H40Z",
  // O outer circle 
  "M180 90C210 90 230 75 230 50C230 25 210 10 180 10C150 10 130 25 130 50C130 75 150 90 180 90Z",
  // O inner circle 
  "M180 70C195 70 210 62 210 50C210 38 195 30 180 30C165 30 150 38 150 50C150 62 165 70 180 70Z",
    // N 
   "M210 100V0H230L270 70V0H290V100H270L230 30V100H210Z",
    // A
    "M310 100L330 0H350L370 100H350L345 70H315L310 100ZM320 50H340L330 20L320 50Z",
    // R
    "M390 0H430C450 0 460 15 460 30C460 45 450 55 435 55L460 100H440L415 55H410V100H390V0Z",
    // K
    "M480 0H500V45L540 0H565L525 50L565 100H540L500 60V100H480V0Z",
    // F
    "M590 0H660V20H610V45H650V65H610V100H590V0Z",
    // X
    "M680 0H705L730 45L755 0H780L745 50L780 100H755L730 60L705 100H680L715 50L680 0Z",
  ]

  const innerOVariant = {
    hidden: {
      pathLength: 0,
      fill: "#ffffff",
    },
    visible: {
      pathLength: 1,
      fill: "#ffffff",
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        fill: { duration: 0.1 },
      },
    },
  }

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 1,
      fill: "rgba(255, 255, 255, 0)",
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      fill: "rgba(255, 0, 0, 0.9)",
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        fill: { duration: 1, delay: 1.8 },
      },
    },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    )
    if (svgRef.current) {
      observer.observe(svgRef.current)
    }
    return () => {
      if (svgRef.current) observer.unobserve(svgRef.current)
    }
  }, [])

  const handleNewsLetterData = (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    setOpenPopUp(true)
    target.reset()
    setTimeout(() => setOpenPopUp(false), 2000)
  }

  return (
    <div className="relative h-full sm:pt-14 pt-8 bg-white text-black" ref={container}>
      <div className="sm:container px-4 mx-auto">
        <div className="md:flex justify-between w-full">
          <div>
            <h1 className="md:text-4xl text-2xl font-semibold text-red-600">
              Let&apos;s start trading together
            </h1>
            <div className="pt-2 pb-6 md:w-99">
              <p className="md:text-2xl text-xl py-4">Sign up for our newsletter*</p>
              <div className="hover-button relative bg-red-600 flex justify-between items-center border-2 overflow-hidden border-red-600 rounded-full text-white">
                <form onSubmit={handleNewsLetterData} className="relative z-2 grid grid-cols-6 w-full h-full">
                  <input
                    type="email"
                    required
                    name="newsletter_email"
                    className="border-none bg-transparent py-3 px-6 col-span-5 placeholder-gray-300"
                    placeholder="Your Email *"
                  />
                  <button type="submit" 
                    className="cursor-pointer w-full hover:bg-white bg-black text-white hover:text-red-600 h-full cols-span-1 transition-colors duration-300">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="w-full h-[80%]">
                      <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="flex gap-10">
            <ul>
              <li className="text-2xl pb-2 text-red-600 font-semibold">SITEMAP</li>
              {["Home", "About us", "Courses", "Mentorship", "Contact"].map((item) => (
                <li key={item} className="text-xl font-medium hover:text-red-600 transition-colors duration-300">
                  <Link href={`/${item.toLowerCase().replace(" ", "")}`}>{item}</Link>
                </li>
              ))}
            </ul>
            <ul>
              <li className="text-2xl pb-2 text-red-600 font-semibold">SOCIAL</li>
              {["LinkedIn", "Twitter", "Instagram", "Facebook"].map((social) => (
                <li key={social} className="text-xl font-medium hover:text-red-600 transition-colors duration-300">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-y-2 md:py-4 border-red-200" ref={svgRef}>
                  <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 800 120"
            fill="none"
            className="w-full md:h-[120px] h-[60px] max-w-[800px] mx-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {pathArr.map((path, index) => (
              <motion.path
              key={index}
              d={path}
              stroke={index === 2 ? "#000000" : "#000000"}
              strokeWidth={width < 768 ? "2.5" : "2"}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={index === 2 ? innerOVariant : pathVariants}
              />
            ))}
          </motion.svg>
                  </div>

        <div className="flex md:flex-row flex-col-reverse gap-3 justify-between py-2">
          <span className="font-medium text-gray-600">
            &copy; 2024 Monark FX. All Rights Reserved.
          </span>
          <a href="#" className="font-semibold hover:text-red-600 transition-colors duration-300">
            Privacy Policy
          </a>
        </div>
      </div>

      {openPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">
          Newsletter subscription successful!
        </div>
      )}
    </div>
  )
}

export default Footer