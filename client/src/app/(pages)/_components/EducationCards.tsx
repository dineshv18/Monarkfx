"use client"

import React, { useState } from "react"
import { BarChart3, TrendingUp, Coins } from "lucide-react"
import Link from "next/link"
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"


const educationData = [
  {
    title: "Stocks",
    icon: BarChart3,
    description:
      "Master the art of stock trading with our comprehensive courses. Learn about market analysis, trading strategies, and risk management.",
    image: "/card/c1.jpg",
    href: "/courses/stocks",
  },
  {
    title: "Forex",
    icon: TrendingUp,
    description:
      "Learn to navigate the foreign exchange market like a pro. Understand currency pairs, leverage, and global economic factors.",
    image: "/card/c2.jpg",
    href: "/courses/forex",
  },
  {
    title: "Cryptocurrency",
    icon: Coins,
    description:
      "Dive into the world of digital assets and blockchain technology. Explore crypto trading, DeFi, and the future of finance.",
    image: "/card/c3.jpg",
    href: "/courses/crypto",
  },
]

const EducationCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="w-full bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">Our Trading Education</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empower your trading journey with our expert-led courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {educationData.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Canvas Reveal Effect - Only show on hover */}
              {hoveredIndex === index && (
                <div className="absolute inset-0 z-0">
                  <CanvasRevealEffect
                    animationSpeed={0.999}
                    opacities={[0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.4]}
                    colors={[[230, 55, 55]]} // iOS Red color
                    dotSize={10}
                    showGradient={false}
                  />
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute top-4 left-4 inline-flex items-center justify-center p-3 rounded-full bg-red-600 shadow-lg">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Content Container */}
              <div className="relative p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-lg text-gray-600 mb-6">{item.description}</p>

                <span className="inline-flex items-center text-lg font-semibold text-red-600 group-hover:text-red-700">
                  Explore Course
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EducationCards

