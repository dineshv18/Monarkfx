'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactLenis } from 'lenis/react';
import  EducationCards  from './EducationCards';
import { AnimatedText } from '@/components/AnimatedText';
import { MentorshipSection } from './mentorship-section';



export default function Home(): JSX.Element {
  return (
    <ReactLenis root>
      <main className='bg-black'>
        <div className='wrapper'>
          {/* Hero Section */}
          <section className='text-black min-h-screen w-full bg-white grid place-content-center sticky top-0 px-4 sm:px-6 lg:px-8'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
                     
            <AnimatedText 
              html={
                <h1 className='text-4xl sm:text-5xl lg:text-7xl font-semibold text-center tracking-tight leading-[120%]'>
                  Welcome to <span className="text-red-600">MonarkFX</span><br />
                  Your Gateway to Trading Excellence 👇
                </h1>
              }
              className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-center tracking-tight leading-[120%]"
            />
          </section>

     

          {/* Live Trading Section */}
          <section className='text-white min-h-screen w-full bg-black grid place-content-center sticky top-0 border-t border-red-600/20 p-4 sm:p-6 lg:p-10 overflow-x-hidden'>
            <div className='container mx-auto '>
              <div className='grid lg:grid-cols-2 gap-8 items-center'>
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className='space-y-6'
                >
                  <h1 className='text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight'>
                    Live Trading Sessions & <br/>
                    <span className="text-red-600">Expert Mentorship</span>
                  </h1>
                  
                  <p className='text-gray-400 text-base sm:text-lg lg:text-xl max-w-xl'>
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
                  className='relative group'
                >
                  <div className='absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000'></div>
                  <div className='relative'>
                    <Image 
                      src='/yoga.jpg'
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
          <div className='container mx-auto px-4'>
            {/* Mobile-first grid */}
            <div className='grid lg:grid-cols-2 gap-8 md:gap-12'>
              {/* Course Info - Made static on mobile */}
              <div className='lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center space-y-6 md:space-y-8 mb-8 lg:mb-0'>
                <h2 className='text-3xl md:text-5xl lg:text-6xl font-bold leading-tight'>
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
              <div className='space-y-6 md:space-y-8'>
                {/* STP Course Card */}
                <div className='group bg-black/90 relative overflow-hidden rounded-xl md:rounded-2xl border border-red-600/20 hover:border-red-600/50 transition-all duration-500'>
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black z-10'></div>
                  
                  <Image
                    src='/card/c5.jpg'
                    alt='STP Course'
                    width={800}
                    height={600}
                    className='w-full h-[200px] md:h-[300px] object-cover group-hover:scale-110 transition-transform duration-700'
                  />
                  
                  <div className='absolute inset-0 z-20 p-4 md:p-8 flex flex-col justify-end'>
                    <div className='bg-black/50 p-4 md:p-6 rounded-xl backdrop-blur-sm'>
                      <span className='text-red-600 font-semibold text-sm md:text-base mb-1 md:mb-2 block'>STP COURSE</span>
                      <h3 className='text-xl md:text-3xl font-bold mb-2 md:mb-4'>Indian Stock & Derivative Market</h3>
                      <p className='text-gray-300 text-sm md:text-base max-w-md'>
                        Master technical analysis, price action, and risk management strategies for Indian markets.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FCH Course Card */}
                <div className='group bg-black/90 relative overflow-hidden rounded-xl md:rounded-2xl border border-red-600/20 hover:border-red-600/50 transition-all duration-500'>
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black z-10'></div>
                  
                  <Image
                    src='/card/c6.jpg'
                    alt='FCH Course'
                    width={800}
                    height={600}
                    className='w-full h-[200px] md:h-[300px] object-cover group-hover:scale-110 transition-transform duration-700'
                  />
                  
                  <div className='absolute inset-0 z-20 p-4 md:p-8 flex flex-col justify-end'>
                    <div className='bg-black/50 p-4 md:p-6 rounded-xl backdrop-blur-sm'>
                      <span className='text-red-600 font-semibold text-sm md:text-base mb-1 md:mb-2 block'>FCH COURSE</span>
                      <h3 className='text-xl md:text-3xl font-bold mb-2 md:mb-4'>World Market, Forex & Crypto</h3>
                      <p className='text-gray-300 text-sm md:text-base max-w-md'>
                        Comprehensive training for global markets, forex trading, and cryptocurrency investments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className='group bg-black border-t border-red-600/20'>
          <h1 className='text-[16vw] md:group-hover:translate-y-4 md:translate-y-20 leading-[100%] uppercase font-semibold text-center text-red-600 transition-all ease-linear'>
            MonarkFX
          </h1>
          <section className='bg-black h-40 relative z-10 hidden md:grid place-content-center text-2xl rounded-tr-full rounded-tl-full'>
            <span className="text-gray-400">Transform Your Trading Journey</span>
          </section>
        </footer>
      </main>
    </ReactLenis>
  );
}

