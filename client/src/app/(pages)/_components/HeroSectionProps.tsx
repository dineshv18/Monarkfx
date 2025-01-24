'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, BarChart2 } from 'lucide-react';
import Earth from '@/components/globe';
import { AnimatedText } from '@/components/AnimatedText';
import ButtonHover from '@/components/ButtonHover';
import AnimatedText2 from '@/components/AnimatedText2';

const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative bg-black text-white overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-10 md:pt-2 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-left"
          >
            <AnimatedText
              text="Monark FX"
              className="text-5xl lg:text-6xl font-bold mb-4 text-red-500"
              delay={0.5}
            />
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
              Your Gateway to Financial Markets
            </motion.h2>
            <AnimatedText2
              text="Monark FX is a financial market institute specializing in trading education across stocks, forex, and cryptocurrency. We offer comprehensive courses, live trading sessions, personalized mentorship, and ISO-certified programs designed to empower traders with the knowledge and practical skills needed for success in the financial markets."
              className="text-lg md:text-xl mb-8"
              letterSpacing='0.02rem'
            />
            <ButtonHover
              FirstText="Get Started"
              SecondText="Learn More"
              variant="lg"
              className="font-semibold"
              useExternalLink={true}
              href="https://wa.me/919220797499?text=Hello%20Monark%20Fx%20Team%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20institute!"
            />

          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-red-500 opacity-20 blur-3xl rounded-full hidden lg:block"></div>
            <Earth className="w-full md:max-w-[600px] mx-auto relative z-10" />
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <BookOpen className="h-10 w-10 text-red-500" />,
              title: "Comprehensive Courses",
              description: "From beginner to advanced, our courses cover all aspects of trading.",
            },
            {
              icon: <Users className="h-10 w-10 text-red-500" />,
              title: "Personal Mentorship",
              description: "One-on-one guidance from experienced traders to accelerate your growth.",
            },
            {
              icon: <BarChart2 className="h-10 w-10 text-red-500" />,
              title: "Live Trading Sessions",
              description: "Apply your knowledge in real-time market conditions with expert supervision.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-red-500/20 transition duration-300 ease-in-out"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-400 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <svg className="absolute bottom-0 left-0 right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="rgba(185, 28, 28, 0.1)"
          fillOpacity="1"
          d="M0,32L48,53.3C96,75,192,117,288,144C384,171,480,181,576,165.3C672,149,768,107,864,90.7C960,75,1056,85,1152,106.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};

export default HeroSection;

