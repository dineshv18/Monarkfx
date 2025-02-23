"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Users, Trophy, Star, BookOpen } from "lucide-react"
import { StatsCard } from "./stats-card"
import { ImageCard } from "./image-card"
import ButtonHover from "@/components/ButtonHover"

const stats = [
  {
    Icon: Users,
    value: 15000,
    label: "Active Traders",
    description: "Globally active traders learning and growing with us",
    delay: 0,
  },
  {
    Icon: Trophy,
    value: 98,
    symbol: "%",
    label: "Success Rate",
    description: "Of our students achieve their trading goals",
    delay: 0.2,
  },
  {
    Icon: Star,
    value: 15,
    label: "Years Experience",
    description: "Of combined market trading experience",
    delay: 0.4,
  },
  {
    Icon: BookOpen,
    value: 200,
    symbol: "+",
    label: "Trading Strategies",
    description: "Proven strategies for different market conditions",
    delay: 0.6,
  },
]

const imageData = [
  {
    src: "/card/c1.jpg",
    alt: "Live Trading Sessions",
    title: "Live Trading Sessions",
    desc: "Real-time market analysis and trade execution with expert mentors",
    icon: "📊",
  },
  {
    src: "/card/c2.jpg",
    alt: "Technical Analysis",
    title: "Advanced Technical Analysis",
    desc: "Master complex chart patterns and technical indicators",
    icon: "📈",
  },
  {
    src: "/card/c3.jpg",
    alt: "Risk Management",
    title: "Professional Risk Management",
    desc: "Learn to protect your capital and maximize returns",
    icon: "🛡️",
  },
  {
    src: "/card/c4.jpg",
    alt: "Personalized Coaching",
    title: "Personalized Coaching",
    desc: "One-on-one sessions tailored to your trading goals and challenges",
    icon: "🎯",
  },
]

export function MentorshipSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const contentY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-20%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const statsInView = useInView(statsRef, { once: true, amount: 0.5 })

  return (
    <section
      ref={targetRef}
      className="relative bg-gradient-to-b from-black via-black/95 to-black min-h-[400vh] text-white "
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(220,38,38,0.12),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="max-w-[2000px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Content */}
          <motion.div
            ref={contentRef}
            style={{ y: contentY, opacity: contentOpacity }}
            className="sticky top-32 h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 xl:px-12 z-10"
          >
            <div className="max-w-xl mx-auto w-full py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-8 sm:mb-12"
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-[1.1]">
                  Master the Markets with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                    Professional Mentorship
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg xl:text-xl text-gray-400 leading-relaxed">
                  Join thousands of successful traders who have transformed their trading journey through our
                  comprehensive mentorship program.
                </p>
              </motion.div>

              <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full mb-8">
                {stats.map((stat, index) => (
                  <StatsCard key={index} {...stat} inView={statsInView} />
                ))}
              </div>

              <ButtonHover
                FirstText="Explore More"
                SecondText="Learn More"
                variant="lg"
                className="font-semibold"
                useExternalLink={true}
                href="https://wa.me/919220797499?text=Hello%20Monark%20Fx%20Team%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20institute!"
              />
            </div>
          </motion.div>

          {/* Right Column - Images */}
          <div className="relative lg:pl-8">
            <div className="space-y-[50vh] lg:space-y-[100vh]">
              {imageData.map((image, index) => (
                <ImageCard key={index} {...image} scrollYProgress={scrollYProgress} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

