import React, { useState } from "react";
import { motion } from "framer-motion";

type Feature = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function FuturisticFeatures() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features: Feature[] = [
    {
      id: 1,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      title: "Institutional Strategies",
      description:
        "Learn the same advanced trading techniques used by professional hedge funds and proprietary trading firms.",
    },
    {
      id: 2,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Expert Mentorship",
      description:
        "Get personalized guidance from professional traders with years of market experience and proven track records.",
    },
    {
      id: 3,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      title: "Advanced Risk Management",
      description:
        "Master proven risk management techniques that protect your capital and optimize your risk-reward ratios.",
    },

    {
      id: 4,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      title: "Market Data Analysis",
      description:
        "Learn to interpret complex market data and identify high-probability trading opportunities using advanced analytics.",
    },
    {
      id: 6,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
      ),
      title: "Community Support",
      description:
        "Join an exclusive community of like-minded traders for support, idea sharing, and collaborative learning.",
    },
  ];

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e15_1px,transparent_1px),linear-gradient(to_bottom,#22c55e15_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-green-600/20 rounded-full filter blur-3xl animate-blob"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Features That <span className="text-gradient-green">Elevate</span>{" "}
            Your Trading
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover the cutting-edge tools and resources that will transform
            your trading approach and help you achieve consistent results.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="relative"
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <motion.div
                className="relative h-full bg-black/50 backdrop-blur-md rounded-lg border border-white/10 p-6 overflow-hidden transition-all duration-300"
                animate={{
                  scale: hoveredFeature === feature.id ? 1.02 : 1,
                  borderColor:
                    hoveredFeature === feature.id
                      ? "rgba(34, 197, 94, 0.5)"
                      : "rgba(255, 255, 255, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-900/5 rounded-lg opacity-0"
                  animate={{
                    opacity: hoveredFeature === feature.id ? 0.8 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-5 relative z-10"
                  animate={{
                    borderColor:
                      hoveredFeature === feature.id
                        ? "rgba(34, 197, 94, 0.8)"
                        : "rgba(255, 255, 255, 0.2)",
                    color:
                      hoveredFeature === feature.id ? "#22c55e" : "#ffffff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.h3
                    className="text-xl font-semibold text-white mb-3"
                    animate={{
                      color:
                        hoveredFeature === feature.id ? "#22c55e" : "#ffffff",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>

                {/* Accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-green-500 to-green-800 rounded-full"
                  initial={{ width: "30%" }}
                  animate={{
                    width: hoveredFeature === feature.id ? "100%" : "30%",
                    opacity: hoveredFeature === feature.id ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <motion.button
            className="relative group overflow-hidden bg-black border border-green-500 text-white py-3 px-8 rounded-md transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Explore All Features</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
