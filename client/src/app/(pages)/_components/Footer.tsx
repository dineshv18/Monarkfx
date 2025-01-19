'use client';

import React, { FormEvent, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 768,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
};
const Footer = () => {
  const container = useRef<HTMLDivElement>(null);
  const [openPopup, setOpenPopUp] = useState(false);
  const svgRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => {
      if (svgRef.current) {
        observer.unobserve(svgRef.current);
      }
    };
  }, []);

  const handleNewsLetterData = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    setOpenPopUp(true);
    target.reset();
    if (setOpenPopUp) {
      setTimeout(() => setOpenPopUp(false), 2000);
    }
  };

  // Updated path array with correct orientations
  const pathArr = [
    // M - Fixed orientation
    'M20 100V0H40V60L60 20L80 60V0H100V100H80L60 30L40 100H20Z',
    // O - Fixed circular path
    'M150 90C120 90 105 75 105 50C105 25 120 10 150 10C180 10 195 25 195 50C195 75 180 90 150 90Z',
    // N
    'M220 0V100H240V30L280 100H300V0H280V70L240 0H220Z',
    // A
    'M320 100L340 0H360L380 100H360L355 70H325L320 100ZM330 50H350L340 20L330 50Z',
    // R
    'M400 0H440C460 0 470 15 470 30C470 45 460 55 445 55L470 100H450L425 55H420V100H400V0Z',
    // K
    'M490 0H510V45L550 0H575L535 50L575 100H550L510 60V100H490V0Z',
    // F
    'M600 0H670V20H620V45H660V65H620V100H600V0Z',
    // X
    'M690 0H715L740 45L765 0H790L755 50L790 100H765L740 60L715 100H690L725 50L690 0Z'
  ];

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };

  

  return (
    <div className='relative h-full sm:pt-14 pt-8 bg-black text-white' ref={container}>
      <div className='sm:container px-4 mx-auto'>
        {/* Newsletter Section */}
        <div className='md:flex justify-between w-full'>
          <div>
            <h1 className='md:text-4xl text-2xl font-semibold'>
              Let&apos;s start trading together
            </h1>
            <div className='pt-2 pb-6 md:w-99'>
              <p className='md:text-2xl text-xl py-4'>
                Sign up for our newsletter*
              </p>
              <div className='hover-button relative bg-red-600 flex justify-between items-center border-2 overflow-hidden border-red-600 rounded-full text-white hover:text-black md:text-2xl'>
                <form onSubmit={handleNewsLetterData} className='relative z-2 grid grid-cols-6 w-full h-full'>
                  <input
                    type='email'
                    name='newsletter_email'
                    className='border-none bg-transparent py-3 px-6 col-span-5 placeholder-gray-300'
                    placeholder='Your Email * '
                    required
                  />
                  <button 
                    type='submit' 
                    className='cursor-pointer w-full hover:bg-white bg-black text-white hover:text-red-600 h-full cols-span-1 transition-colors duration-300'
                  >
                    <svg 
                      width='15' 
                      height='15' 
                      viewBox='0 0 15 15' 
                      fill='none' 
                      className='w-full h-[80%]'
                    >
                      <path 
                        d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z' 
                        fill='currentColor' 
                        fillRule='evenodd' 
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className='flex gap-10'>
            <ul>
              <li className='text-2xl pb-2 text-red-600 font-semibold'>SITEMAP</li>
              <li className='text-xl font-medium hover:text-red-600 transition-colors duration-300'>
                <Link href='/'>Home</Link>
              </li>
              <li className='text-xl font-medium hover:text-red-600 transition-colors duration-300'>
                <Link href='/about'>About us</Link>
              </li>
              <li className='text-xl font-medium hover:text-red-600 transition-colors duration-300'>
                <Link href='/courses'>Courses</Link>
              </li>
              <li className='text-xl font-medium hover:text-red-600 transition-colors duration-300'>
                <Link href='/mentorship'>Mentorship</Link>
              </li>
              <li className='text-xl font-medium hover:text-red-600 transition-colors duration-300'>
                <Link href='/contact'>Contact</Link>
              </li>
            </ul>
            <ul>
              <li className='text-2xl pb-2 text-red-600 font-semibold'>SOCIAL</li>
              <li className='text-xl font-medium hover:text-red-600 transition-colors duration-300'>
                <a href='#' target='_blank' rel="noopener noreferrer" className='hover:underline'>LinkedIn</a>
              </li>
              <li className='text-xl font-medium hover:text-red-600 transition-colors duration-300'>
                <a href='#' target='_blank' rel="noopener noreferrer" className='hover:underline'>Twitter</a>
              </li>
              <li className='text-xl font-medium hover:text-red-600 transition-colors duration-300'>
                <a href='#' target='_blank' rel="noopener noreferrer" className='hover:underline'>Instagram</a>
              </li>
              <li className='text-xl font-medium hover:text-red-600 transition-colors duration-300'>
                <a href='#' target='_blank' rel="noopener noreferrer" className='hover:underline'>Facebook</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Animated Logo Section */}
        <div className='border-y-2 md:py-4 border-gray-800' ref={svgRef}>
        <motion.svg
    width="100%"
    height="100%"
    viewBox="0 0 800 120"
    fill="none"
    className="w-full md:h-[120px] h-[60px] max-w-[800px] mx-auto"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
  >
    {pathArr.map((path, index) => (
      <motion.path
        key={index}
        d={path}
        stroke="#FF0000"
        strokeWidth={width < 768 ? "3" : "2"}
        fill="none"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={pathVariants}
      />
    ))}
  </motion.svg>
</div>

        {/* Copyright Section */}
        <div className='flex md:flex-row flex-col-reverse gap-3 justify-between py-2'>
          <span className='font-medium text-gray-400'>
            &copy; 2021 Monark FX. All Rights Reserved.
          </span>
          <a 
            href='#' 
            className='font-semibold hover:text-red-600 transition-colors duration-300'
          >
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Newsletter Submission Popup */}
      {openPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">
          Newsletter subscription successful!
        </div>
      )}
    </div>
  );
};

export default Footer;
