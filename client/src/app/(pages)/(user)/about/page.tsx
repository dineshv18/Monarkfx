"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Trophy,
  ArrowRight,
  CheckCircle,
  Target,
  Star,
  Award,
  Briefcase,
  Users,
  Book,
  ChevronRight,
  Info,
  TrendingUp,
  Globe,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  // Animation refs
  const heroRef = useRef(null);
  const legacyRef = useRef(null);
  const timelineRef = useRef(null);
  const expertiseRef = useRef(null);
  const statsRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isLegacyInView = useInView(legacyRef, { once: true });
  const isTimelineInView = useInView(timelineRef, { once: true });
  const isExpertiseInView = useInView(expertiseRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true });

  const timelineItems = [
    {
      year: "2021",
      title: "Foundation as Equity Tank",
      description:
        "Established as a premier financial market institute focused on trading education.",
    },
    {
      year: "2022",
      title: "ISO Certification",
      description:
        "Received ISO 21008:2018 certification, setting industry standards for financial education.",
    },
    {
      year: "2023",
      title: "Rebranded to Monark FX",
      description:
        "Evolved into Monark FX with expanded course offerings and global reach.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description:
        "Extended our reach internationally, building a worldwide community of traders.",
    },
  ];

  const expertiseItems = [
    {
      icon: Users,
      title: "Personalized Mentorship",
      description:
        "One-on-one guidance from industry experts tailored to your trading goals",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Briefcase,
      title: "Professional Trading Training",
      description:
        "Comprehensive market analysis and trading strategies with professional traders",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      title: "ISO Certification",
      description:
        "Comprehensive examinations leading to internationally recognized certification",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Book,
      title: "Multi-timeframe Analysis",
      description:
        "Advanced techniques for analyzing markets across different timeframes",
      color: "from-orange-500 to-red-500",
    },
  ];

  const achievements = [
    { value: 4.7, label: "Rating from 200+ reviews", icon: Star },
    { value: 1000, label: "Offline Sessions Completed", icon: Users },
    { value: 250, label: "Students Trained in person", icon: Award },
    { value: 7, label: "Expert Trading Professionals", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-plus-jakarta-sans">
      {/* Add CSS for grid pattern */}
      <style jsx global>{`
        .bg-dot-pattern {
          background-image: radial-gradient(
            circle,
            #cccccc 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }

        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(34, 197, 94, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(34, 197, 94, 0.1) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }
      `}</style>

      {/* Hero Section with Animated Elements */}
      <div className="relative bg-gradient-to-b from-zinc-900 via-black to-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 md:pt-32 relative z-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <Trophy className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Monark FX
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Learn about our journey, vision, and expertise in the world of
              trading and finance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.a
                href="#legacy"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <ArrowRight className="h-5 w-5" />
                Learn More
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-all duration-300 px-6 py-4 border border-zinc-700 rounded-xl hover:border-green-500/50 hover:bg-zinc-900/50"
              >
                <span>Contact Us</span>
              </motion.a>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <achievement.icon className="h-5 w-5 text-green-400" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {achievement.value}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {achievement.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Legacy Section */}
      <section id="legacy" className="py-32 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            ref={legacyRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isLegacyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-16"
          >
            <div className="w-full md:w-1/2 relative">
              <div className="relative z-10 overflow-hidden group rounded-2xl">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src="/placeholder.jpeg"
                    width={700}
                    height={500}
                    alt="Monark FX Legacy"
                    className="w-full h-auto object-cover rounded-2xl shadow-[0_10px_50px_-12px_rgba(34,197,94,0.2)] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/30 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700 rounded-2xl"></div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-10 -right-10 w-80 h-80 border border-green-500/30 rounded-full -z-0 opacity-70"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              <motion.div
                className="absolute -top-8 -left-8 w-40 h-40 border border-green-500/30 rounded-full -z-0 opacity-70"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="mb-8">
                <motion.span
                  className="text-sm uppercase tracking-[0.2em] font-semibold text-green-500 inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isLegacyInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Who We Are
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mt-2">
                  Our Legacy in{" "}
                  <span className="text-green-500 relative">
                    Financial
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-green-500/20"></span>
                  </span>{" "}
                  Education
                </h2>
              </div>

              <motion.p
                className="text-zinc-300 text-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isLegacyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Monark FX is an ISO 21008:2018 Certified Institute established
                in 2021 (formerly known as Equity Tank). We are a premier
                financial market institute specializing in trading and finance
                education across Stocks, Forex, and Cryptocurrency markets.
              </motion.p>

              <motion.div
                className="p-6 bg-gradient-to-r from-green-500/20 to-transparent border-l-4 border-green-500 rounded-r-xl shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={isLegacyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ x: 5 }}
              >
                <p className="italic text-green-400 font-medium">
                  "At Monark FX, we don't just teach trading; we build traders
                  who transform markets."
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-gradient-to-br from-zinc-900 to-black relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            ref={timelineRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              className="text-sm uppercase tracking-[0.2em] font-semibold text-green-500 inline-block mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our Evolution
            </motion.span>
            <h2 className="text-5xl font-bold text-center text-white relative inline-block">
              Our <span className="text-green-500">Journey</span>
              <motion.div
                className="absolute -bottom-3 left-0 w-full h-1 bg-green-500/20"
                initial={{ width: 0 }}
                animate={isTimelineInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-bold text-xl mb-4">
                        {item.year}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            ref={expertiseRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isExpertiseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              className="text-sm uppercase tracking-[0.2em] font-semibold text-green-500 inline-block mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={isExpertiseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              What We Offer
            </motion.span>
            <h2 className="text-5xl font-bold text-center text-white relative inline-block">
              Our <span className="text-green-500">Expertise</span>
              <motion.div
                className="absolute -bottom-3 left-0 w-full h-1 bg-green-500/20"
                initial={{ width: 0 }}
                animate={isExpertiseInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isExpertiseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative"
              >
                <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gradient-to-br from-zinc-900 to-black relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              className="text-sm uppercase tracking-[0.2em] font-semibold text-green-500 inline-block mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our Impact
            </motion.span>
            <h2 className="text-5xl font-bold text-center text-white relative inline-block">
              Numbers That <span className="text-green-500">Matter</span>
              <motion.div
                className="absolute -bottom-3 left-0 w-full h-1 bg-green-500/20"
                initial={{ width: 0 }}
                animate={isStatsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <achievement.icon className="h-5 w-5 text-green-400" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {achievement.value}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {achievement.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
