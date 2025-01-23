"use client"

import { motion } from "framer-motion"
import Background from "../../_components/Background"
import { Users, Trophy, Star, Target } from "lucide-react"
import Image from "next/image"

export default function About() {
  const stats = [
    { icon: Users, value: "15,000+", label: "Students Trained" },
    { icon: Trophy, value: "98%", label: "Success Rate" },
    { icon: Star, value: "15+", label: "Years Experience" },
    { icon: Target, value: "24/7", label: "Support" },
  ]

  return (
    <>
      <Background 
        title="About"
        highlightedText="MonarkFX"
        subtitle="Learn from the best in the trading industry"
      />

      {/* Main Content */}
      <div className="bg-white">
        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At MonarkFX, we're committed to empowering traders with professional 
                education and mentorship. Our goal is to help you develop the skills 
                and confidence needed to succeed in the financial markets.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                With over 15 years of trading experience, we understand what it takes 
                to become a successful trader. Our comprehensive courses and personalized 
                mentorship programs are designed to fast-track your trading journey.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent rounded-3xl transform rotate-3" />
              <img 
                src="/card/c1.jpg" 
                alt="Trading Mission" 
                className="relative rounded-3xl shadow-xl"
              />
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-b from-red-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <stat.icon className="h-8 w-8 text-red-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Excellence",
                  description: "We strive for excellence in everything we do, from our course content to our student support."
                },
                {
                  title: "Integrity",
                  description: "We maintain the highest standards of integrity and transparency in our teaching and mentorship."
                },
                {
                  title: "Innovation",
                  description: "We continuously innovate our teaching methods and stay updated with market trends."
                }
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl border border-red-100 hover:border-red-200 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Additional Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white to-red-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Expert Trading Mentors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn from professional traders with years of market experience
            </p>
          </motion.div>
        </section>
      </div>
    </>
  )
}