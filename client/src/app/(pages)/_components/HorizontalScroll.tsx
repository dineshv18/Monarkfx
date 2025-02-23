'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ReactLenis } from 'lenis/react';
import EducationCards from './EducationCards';
import { AnimatedText } from '@/components/AnimatedText';
import { MentorshipSection } from './mentorship-section';
import { useRef } from 'react';


interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  category: string
}

interface CourseCardProps extends Course {
  scrollYProgress: any
  index: number
}

export default function Home(): JSX.Element {
  const cardsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)


  const courses: Course[] = [
    {
      id: "stp",
      title: "Indian Stock & Derivative Market",
      subtitle: "Master the Indian Markets",
      description: "Master technical analysis, price action, and risk management strategies for Indian markets.",
      image: "/card/c5.jpg",
      category: "STP Course"
    },
    {
      id: "fch",
      title: "World Market, Forex & Crypto",
      subtitle: "Global Trading Mastery",
      description: "Comprehensive training for global markets, forex trading, and cryptocurrency investments.",
      image: "/card/c6.jpg",
      category: "FCH Course"
    }
  ]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  return (
    <ReactLenis root>
      <main className='bg-black'>
        <div className='wrapper'>
          {/* Hero Section */}
          <section className='text-black min-h-screen w-full bg-white grid place-content-center sticky top-0 px-4 sm:px-6 lg:px-8'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <AnimatedText
              html={
                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-center tracking-tight leading-[1.2] px-4'>
                  Welcome to <span className="text-red-600">MonarkFX</span><br />
                  Your Gateway to Trading Excellence 👇
                </h1>
              }
              className="max-w-6xl mx-auto"
            />
          </section>

          {/* Live Trading Section */}
          <section className='text-white min-h-screen w-full bg-black sticky top-0 border-t border-red-600/20 p-4 sm:p-6 lg:p-10 overflow-hidden'>
            <div className='container mx-auto max-w-7xl'>
              <div className='grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center'>
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className='space-y-4 md:space-y-6'
                >
                  <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight'>
                    Live Trading Sessions & <br />
                    <span className="text-red-600">Expert Mentorship</span>
                  </h1>

                  <p className='text-gray-400 text-sm sm:text-base lg:text-lg xl:text-xl max-w-xl'>
                    Experience real-time market analysis, trade execution, and strategy implementation. Learn directly from professional traders who guide you through every step of your trading journey.
                  </p>

                  <ul className='space-y-4 text-base sm:text-lg'>
                    <li className='flex items-center gap-3'>
                      <span className='text-red-600 text-2xl'>✓</span>
                      Live Market Analysis
                    </li>
                    <li className='flex items-center gap-3'>
                      <span className='text-red-600 text-2xl'>✓</span>
                      Real-time Trade Execution
                    </li>
                    <li className='flex items-center gap-3'>
                      <span className='text-red-600 text-2xl'>✓</span>
                      One-on-One Mentorship
                    </li>
                  </ul>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className='relative group mt-6 lg:mt-0'
                >
                  <div className='absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000'></div>
                  <div className='relative'>
                    <Image
                      src='/bg.jpeg'
                      alt='Live Trading Setup'
                      width={800}
                      height={600}
                      className='w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-xl shadow-2xl transform group-hover:scale-[1.02] transition duration-500'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-xl opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500'>
                      <div className='absolute bottom-6 left-6 right-6'>
                        <h4 className='text-xl sm:text-2xl font-bold mb-2'>Professional Trading Environment</h4>
                        <p className='text-gray-200 text-sm sm:text-base'>State-of-the-art setup for optimal trading performance</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
        <main className="bg-white">
          <EducationCards />
        </main>

        <main className="bg-black">
          <MentorshipSection />
        </main>

        <section className='text-white w-full bg-black py-10 md:py-20'>
          <div className='container mx-auto px-4 max-w-7xl'>
            {/* Mobile-first grid */}
            <div className='grid lg:grid-cols-2 gap-8 md:gap-12'>
              {/* Course Info - Made static on mobile */}
              <div className='lg:sticky lg:top-0 lg:h-[calc(100vh-2rem)] flex flex-col justify-center space-y-4 md:space-y-6 lg:space-y-8'>
                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight'>
                  Transform Your <span className='text-red-600'>Trading Journey</span> With Our Expert Courses
                </h2>

                <p className='text-gray-400 text-base md:text-xl max-w-xl'>
                  Expert-led courses covering technical analysis, market psychology, and risk management across stocks, forex, and cryptocurrency markets.
                </p>

                <button className='group flex items-center gap-2 text-red-600 hover:text-white border-2 border-red-600 hover:bg-red-600 px-6 md:px-8 py-3 md:py-4 rounded-full w-fit text-base md:text-lg font-semibold transition-all duration-300'>
                  View All Courses
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Course Cards - Improved mobile layout */}
              <div ref={cardsRef} className="space-y-[10vh] sm:space-y-[15vh] md:space-y-[20vh] py-[10vh] sm:py-[15vh] md:py-[20vh]">
                {courses.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    {...course}
                    scrollYProgress={scrollYProgress}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className='group bg-black border-t border-red-600/20'>
          <h1 className='text-[12vw] sm:text-[14vw] md:text-[16vw] md:group-hover:translate-y-4 md:translate-y-20 leading-[1] uppercase font-semibold text-center text-red-600 transition-all ease-linear py-4'>
            MonarkFX
          </h1>
          <section className='bg-black h-20 sm:h-30 md:h-40 relative z-10 hidden md:grid place-content-center text-lg sm:text-xl md:text-2xl rounded-tr-full rounded-tl-full'>
            <span className="text-gray-400">Transform Your Trading Journey</span>
          </section>
        </footer>
      </main>
    </ReactLenis>
  );
}


const CourseCard: React.FC<CourseCardProps> = ({
  title,
  subtitle,
  description,
  image,
  category,
  scrollYProgress,
  index
}) => {
  const scale = useTransform(scrollYProgress, [0, 0.3 + index * 0.2], [0.95, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3 + index * 0.2], [0.7, 1])
  const y = useTransform(scrollYProgress, [0, 0.3 + index * 0.2], [100, 0])

  return (
    <motion.div
      style={{ scale, opacity, y }}
      className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full max-w-2xl mx-auto group overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl"
    >
      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Card Content */}
      <div className="relative h-full bg-black/90 border border-red-600/30 hover:border-red-600/70 transition-all duration-500">
        <Image
          src={image}
          alt={title}
          width={800}
          height={600}
          className="w-full h-[50%] sm:h-[55%] md:h-[60%] object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

        {/* Content */}
        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end z-10">
          <motion.div
            className="bg-black/60 backdrop-blur-md p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-white/10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span className="text-red-500 font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wider">
              {category}
            </motion.span>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 mb-2 sm:mb-3">{title}</h3>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4">{subtitle}</p>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md hidden sm:block">{description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}