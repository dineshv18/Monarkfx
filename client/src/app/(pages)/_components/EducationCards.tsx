"use client"

import React, { useState } from "react"
import { BarChart3, TrendingUp, Coins, Clock, IndianRupee, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"

interface Course {
  title: string;
  icon: any;
  description: string;
  image: string;
  href: string;
  level: string;
  features: string[];
  marketType: 'forex' | 'stocks' | 'crypto';
}

const educationData: Course[] = [
  {
    title: "Forex Trading Mastery",
    icon: BarChart3,
    description: "Master currency trading with advanced forex strategies and risk management.",
    image: "/card/c1.jpg",
    href: "/courses?market=forax",
    level: "All Levels",
    marketType: 'forex',
    features: [
      "Currency Pair Analysis",
      "Forex Market Hours",
      "Risk Management",
      "Live Trading Sessions"
    ]
  },
  {
    title: "Stock Market Pro",
    icon: TrendingUp,
    description: "Comprehensive stock trading program covering technical and fundamental analysis.",
    image: "/card/c2.jpg",
    href: "/courses?market=equity",
    level: "All Levels",
    marketType: 'stocks',
    features: [
      "Technical Analysis",
      "Fundamental Analysis",
      "Portfolio Management",
      "Options Trading"
    ]
  },
  {
    title: "Cryptocurrency Trading",
    icon: Coins,
    description: "Learn to trade cryptocurrencies with advanced blockchain understanding.",
    image: "/card/c3.jpg",
    href: "/courses?market=crypto",
    level: "All Levels",
    marketType: 'crypto',
    features: [
      "Blockchain Basics",
      "Crypto Analysis",
      "DeFi Trading",
      "Risk Management"
    ]
  }
];

const EducationCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">Trading Education</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master trading across multiple markets with our expert courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {educationData.map((course, index) => (
            <Link
              href={course.href}
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <div className="absolute inset-0 z-0">
                  <CanvasRevealEffect
                    animationSpeed={0.999}
                    opacities={[0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.4]}
                    colors={[[230, 55, 55]]}
                    dotSize={10}
                    showGradient={false}
                  />
                </div>
              )}

              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                <div className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <course.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full">
                  {course.marketType.toUpperCase()}
                </div>
              </div>

              <div className="relative p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>



                <ul className="space-y-2 mb-6">
                  {course.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center text-red-600 font-semibold group-hover:text-red-500">
                  View Details
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationCards;