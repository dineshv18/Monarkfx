'use client'

import { motion } from 'framer-motion'
import { Globe, BookOpen, Lightbulb, Award, Laptop, ThumbsUp, Clock, Book } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedText } from '../../_components/AnimatedText'
import CustomButton from '../../_components/CustomButton'

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* Top Text Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <AnimatedText
            text="We providing the best online courses"
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[var(--custom-green-11)] mb-8"
            delay={0.2}
          />
          <AnimatedText
            text="Online courses from the world's leading experts."
            className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6"
            delay={0.4}
          />
          <AnimatedText
            text="Lorem ipsum is simply dummy of the printing and typesetting industry lorem ipsum has the industry standard dummy."
            className="text-base md:text-lg text-gray-600 leading-relaxed"
            delay={0.6}
          />
        </div>

        {/* Main Grid Section */}
        <div className="grid gap-8 md:gap-16 lg:grid-cols-2 px-4 md:px-8 xl:px-20">
          {/* Left Column */}
          <motion.div 
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/l-1.png"
                alt="Decorative Image 1"
                width={100}
                height={100}
                className="absolute top-0 left-0 h-auto w-64 md:w-96 -z-10"
              />
            </motion.div>

            <motion.div 
              className="flex w-fit items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex p-4 items-center justify-center rounded-full bg-[#D5D52C]">
                <Award size={24} color="#107D6C" />
              </div>
              <AnimatedText
                text="Know about classes"
                className="text-lg font-medium text-[#107D6C]"
                delay={0.5}
              />
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: BookOpen, text: "Expert Teachers" },
                { icon: Clock, text: "Lifetime Access" },
                { icon: Laptop, text: "Remote Learning" },
                { icon: ThumbsUp, text: "Self Development" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <item.icon className="w-6 h-6 text-[#107D6C]" />
                  <span className="text-sm font-medium text-gray-700">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="relative space-y-8 md:space-y-12 pt-8 lg:pt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Image
              src="/l-2.png"
              alt="Decorative Image 2"
              width={150}
              height={150}
              className="absolute top-1/2 -right-20 md:-right-56 -translate-y-1/2 h-auto w-60 md:w-80 rotate-[-55deg] opacity-5"
            />
            <div className="flex flex-col space-y-6 md:space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "20k+", label: "Students" },
                  { value: "200+", label: "Courses" },
                  { value: "150+", label: "Countries" },
                  { value: "10+", label: "Years" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 bg-white rounded-lg shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-[#107D6C]">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div 
        className="bg-[#107D6C] py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <AnimatedText
            text="Ready to start learning?"
            className="text-3xl md:text-4xl font-bold text-white mb-8"
            delay={0.2}
          />
         
        </div>
      </motion.div>
    </div>
  )
}