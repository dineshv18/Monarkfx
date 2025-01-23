"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Users, Trophy, Clock, HeadphonesIcon, Star, BookOpen } from "lucide-react"
import Image from "next/image"

const AnimatedCounter = ({ value, symbol = "" }: { value: number; symbol?: string }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const inView = useInView(countRef, { 
    once: true, 
    amount: 0.5,  
    margin: "-50px 0px" 
  })
  
  useEffect(() => {
    if (inView) {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps
      let currentStep = 0
      
      const timer = setInterval(() => {
        currentStep += 1
        const progress = currentStep / steps
        const easedProgress = easeOutQuart(progress)
        setCount(Math.floor(easedProgress * value))
        
        if (currentStep >= steps) {
          clearInterval(timer)
          setCount(value)
        }
      }, stepDuration)
      
      return () => clearInterval(timer)
    }
  }, [inView, value])
  
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4)
  }
  
  return (
    <span ref={countRef} className="tabular-nums">
      {count.toLocaleString()}{symbol}
    </span>
  )
}

const StatsCard = ({ Icon, value, symbol = "", label, delay, description }: { 
  Icon: any
  value: number
  symbol?: string
  label: string
  delay: number
  description: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="bg-black/40 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-red-600/10 
                    hover:border-red-600/30 transition-all duration-300 h-full
                    hover:shadow-lg hover:shadow-red-600/10">
        <div className="flex flex-col items-center">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors duration-300">
            <AnimatedCounter value={value} symbol={symbol} />
          </h3>
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-200 mb-1">{label}</p>
          <p className="text-gray-400 text-center text-xs">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

const StatsSection = () => {
  const stats = [
    { 
      Icon: Users,
      value: 15000,
      label: "Active Traders",
      description: "Globally active traders learning and growing with us",
      delay: 0 
    },
    { 
      Icon: Trophy,
      value: 98,
      symbol: "%",
      label: "Success Rate",
      description: "Of our students achieve their trading goals",
      delay: 0.2 
    },
    { 
      Icon: Star,
      value: 15,
      label: "Years Experience",
      description: "Of combined market trading experience",
      delay: 0.4 
    },
    { 
      Icon: BookOpen,
      value: 200,
      symbol: "+",
      label: "Trading Strategies",
      description: "Proven strategies for different market conditions",
      delay: 0.6 
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  )
}

const imageData = [
  {
    src: '/card/c1.jpg',
    alt: 'Live Trading Sessions',
    title: 'Live Trading Sessions',
    desc: 'Real-time market analysis and trade execution with expert mentors',
    icon: '📊'
  },
  {
    src: '/card/c2.jpg',
    alt: 'Technical Analysis',
    title: 'Advanced Technical Analysis',
    desc: 'Master complex chart patterns and technical indicators',
    icon: '📈'
  },
  {
    src: '/card/c3.jpg',
    alt: 'Risk Management',
    title: 'Professional Risk Management',
    desc: 'Learn to protect your capital and maximize returns',
    icon: '🛡️'
  }
]

export function MentorshipSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  useEffect(() => {
    const preventImageDrag = (e: Event) => e.preventDefault()
    document.addEventListener("dragstart", preventImageDrag)
    return () => document.removeEventListener("dragstart", preventImageDrag)
  }, [])

  return (
    <section ref={targetRef} className="relative bg-gradient-to-b from-black via-black/95 to-black py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(220,38,38,0.12),_transparent_50%)]" />
      
      <div className="max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Sticky Left Column */}
          <div className="sticky top-20 sm:top-28 h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-8 sm:mb-12"
              >
                <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-[1.1]">
                  Master the Markets with
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 block mt-2">
                    Professional Mentorship
                  </span>
                </h1>
                <p className="text-base sm:text-lg xl:text-xl text-gray-400 leading-relaxed">
                  Join thousands of successful traders who have transformed their trading journey through our comprehensive mentorship program.
                </p>
              </motion.div>

              <StatsSection />
            </div>
          </div>

          {/* Scrollable Right Column */}
          <div className="relative">
            <div className="space-y-6 sm:space-y-8 lg:space-y-16 p-4 sm:p-6 lg:p-8">
              {imageData.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative group"
                >
                  <motion.div 
                    style={{ y }} 
                    className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl shadow-black/50"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={600}
                      className="w-full h-[300px] sm:h-[400px] object-cover brightness-75 
                               group-hover:brightness-90 transition-all duration-700 
                               transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                        <span className="text-xl sm:text-2xl lg:text-3xl">{image.icon}</span>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{image.title}</h3>
                      </div>
                      <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed">{image.desc}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}