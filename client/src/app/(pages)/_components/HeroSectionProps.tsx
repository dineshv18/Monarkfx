"use client";

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  BarChart2,
  ChevronRight,
  ArrowRight,
  Star,
  TrendingUp,
} from "lucide-react";
import clsx from "clsx";
import { AnimatedText } from "@/components/AnimatedText";
import RotatingText from "@/components/rotating-text";
import Link from "next/link";

const HeroSection: React.FC = () => {
  // Remove containerVariants and itemVariants

  return (
    <section className="relative bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-hidden flex flex-col justify-center min-h-screen">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full [background:radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0,transparent_70%)]"></div>
        <div className="absolute w-full h-full opacity-20 [background-image:repeating-linear-gradient(100deg,#22c55e_0%,#22c55e_1px,transparent_1px,transparent_4%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.1),transparent_70%)] blur-[80px]"></div>
      </div>

      {/* Remove animated background elements */}
      {/* (Removed motion.divs for animated colored circles) */}

      {/* Animated circle with image (rings now static) */}
      <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] max-w-full">
        {/* Base image with minimal animation */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[#0a0a0a]/50 z-10 rounded-full"></div>
          <Image
            src="/logo-gold-icon.png"
            alt="Monark FX"
            width={520}
            height={520}
            className="object-cover opacity-80"
          />
        </motion.div>

        {/* Static rings */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={clsx(
              "absolute inset-0 rounded-full",
              "border-2",
              i === 0
                ? "border-green-500/80"
                : i === 1
                  ? "border-green-400/60"
                  : "border-green-300/40",
              "z-20"
            )}
          // No animation
          />
        ))}

        {/* Static pulsing glow (no animation) */}
        <div className="absolute inset-0 rounded-full bg-green-500/10 z-10 blur-md" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mt-16">
          {/* Remove motion.div and variants for main content */}
          <div className="mb-16">
            <div className="inline-block mb-3 px-4 py-1.5 bg-green-500/10 backdrop-blur-sm rounded-full border border-green-500/20">
              <span className="text-green-400 font-medium text-sm">
                Premium Trading Education
              </span>
            </div>

            <div className="mb-6">
              <AnimatedText
                text="Monark FX"
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white"
                delay={0.2}
              />
            </div>

            <div className="mb-6 h-12">
              <RotatingText
                texts={[
                  "Your Gateway to Financial Markets",
                  "Master Stock Trading",
                  "Expert Forex Trading",
                  "Crypto Trading Excellence",
                  "Professional Market Analysis",
                ]}
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 text-xl sm:text-2xl md:text-3xl font-semibold text-green-400"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </div>

            <p className="text-base sm:text-lg text-zinc-300 mb-8 max-w-2xl mx-auto text-center leading-relaxed">
              Monark FX is a premier financial market institute specializing in
              trading education across stocks, forex, and cryptocurrency. Our
              ISO-certified programs are designed to empower traders at all
              levels with cutting-edge strategies and institutional methods.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Keep only button hover/tap animation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/courses"
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/live-classes"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 hover:border-green-500/50 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>Explore Live Classes</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Grid (static) */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <BookOpen className="h-8 w-8 text-green-400" />,
              title: "Comprehensive Courses",
              description:
                "From beginner to advanced, our courses cover all aspects of trading with practical examples and real-world applications.",
            },
            {
              icon: <Users className="h-8 w-8 text-green-400" />,
              title: "Personal Mentorship",
              description:
                "One-on-one guidance from experienced traders to accelerate your growth and success in the financial markets.",
            },
            {
              icon: <TrendingUp className="h-8 w-8 text-green-400" />,
              title: "Advanced Strategies",
              description:
                "Learn institutional-grade trading strategies and risk management techniques used by professional traders.",
            },
          ].map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-md border border-zinc-700/50 p-6 sm:p-8 rounded-2xl h-full flex flex-col hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-500/10">
                <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl w-fit mx-auto   mb-5 border border-green-500/30">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white text-center">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 flex-grow text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section (static) */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "10K+", label: "Students", icon: Users },
            { value: "95%", label: "Success Rate", icon: Star },
            { value: "24/7", label: "Support", icon: BarChart2 },
            { value: "ISO", label: "Certified", icon: TrendingUp },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 text-center">
                {stat.value}
              </div>
              <div className="text-zinc-400 text-sm text-center font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
