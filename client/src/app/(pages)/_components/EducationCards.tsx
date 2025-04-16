"use client";

import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Coins,
  ArrowUpRight,
  CheckCircle2,
  Star,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Course {
  title: string;
  icon: any;
  description: string;
  image: string;
  href: string;
  level: string;
  features: string[];
  marketType: "forex" | "stocks" | "crypto";
}

const educationData: Course[] = [
  {
    title: "Forex Trading Mastery",
    icon: BarChart3,
    description:
      "Master currency trading with advanced forex strategies and risk management.",
    image: "/card/c1.jpg",
    href: "/courses?market=forax",
    level: "All Levels",
    marketType: "forex",
    features: [
      "Currency Pair Analysis",
      "Forex Market Hours",
      "Risk Management",
      "Live Trading Sessions",
    ],
  },
  {
    title: "Stock Market Pro",
    icon: TrendingUp,
    description:
      "Comprehensive stock trading program covering technical and fundamental analysis.",
    image: "/card/c2.jpg",
    href: "/courses?market=equity",
    level: "All Levels",
    marketType: "stocks",
    features: [
      "Technical Analysis",
      "Fundamental Analysis",
      "Portfolio Management",
      "Options Trading",
    ],
  },
  {
    title: "Cryptocurrency Trading",
    icon: Coins,
    description:
      "Learn to trade cryptocurrencies with advanced blockchain understanding.",
    image: "/card/c3.jpg",
    href: "/courses?market=crypto",
    level: "All Levels",
    marketType: "crypto",
    features: [
      "Blockchain Basics",
      "Crypto Analysis",
      "DeFi Trading",
      "Risk Management",
    ],
  },
];

const EducationCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 right-0 w-64 h-64 bg-red-50 rounded-full opacity-70" />
        <div className="absolute top-40 -left-20 w-40 h-40 bg-red-50 rounded-full opacity-70" />
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-red-50 rounded-full opacity-70" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-20 relative z-10"
        >
          <span className="inline-block px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-sm font-medium mb-4">
            Expert Courses
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Trading Education
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto my-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Master trading across multiple markets with our expert courses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 relative z-10">
          {educationData.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link
                href={course.href}
                className="group block h-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500 relative md:h-[380px] group-hover:h-[450px] md:group-hover:h-[500px] group-hover:shadow-xl border border-gray-100 h-full">
                  {/* Red ribbon */}
                  <div className="absolute top-5 -right-12 z-10 rotate-45">
                    <div className="bg-red-500 text-white text-xs uppercase tracking-wider py-1 w-48 text-center font-semibold shadow-md">
                      {course.marketType}
                    </div>
                  </div>

                  <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-700 transform-gpu scale-105 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />

                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <div className="inline-flex items-center px-3 py-1.5 bg-white rounded-lg shadow-md">
                        <course.icon className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {course.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-6 relative">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        5.0 (120 reviews)
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Features section - only visible on hover */}
                    <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 group-hover:max-h-[200px]">
                      <div className="pt-3 border-t border-gray-100">
                        <ul className="space-y-2">
                          {course.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center text-gray-700 text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              animate={
                                hoveredIndex === index
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: -10 }
                              }
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2 text-red-500 shrink-0" />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 absolute bottom-5 md:bottom-6 left-5 md:left-6 right-5 md:right-6">
                      <div className="w-full bg-gray-50 hover:bg-red-50 text-gray-900 hover:text-red-600 py-3 px-4 rounded-xl transition-colors font-medium text-sm md:text-base flex justify-between items-center group-hover:shadow-sm">
                        <span>Explore Course</span>
                        <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                          <ArrowUpRight className="h-3 w-3 text-white" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Side accent */}
                  <div
                    className={`absolute left-0 top-0 w-1 bg-red-500 transition-all duration-500 ${
                      hoveredIndex === index ? "h-full" : "h-0"
                    }`}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationCards;
