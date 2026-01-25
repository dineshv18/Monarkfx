"use client";

import { motion } from "framer-motion";
import {
  Users,
  Clock,
  BookOpen,
  Zap,
  Play,
  Calendar,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const stats = [
  {
    icon: Users,
    value: "25,000+",
    label: "Live Students",
    description: "Active students in live trading sessions",
  },
  {
    icon: Clock,
    value: "200+",
    label: "Live Hours",
    description: "Monthly live trading and learning sessions",
  },
  {
    icon: BookOpen,
    value: "50+",
    label: "Live Courses",
    description: "Different live courses running monthly",
  },
  {
    icon: Zap,
    value: "Real-time",
    label: "Market Analysis",
    description: "Live market analysis and trading signals",
  },
];

const benefits = [
  {
    icon: Video,
    title: "Live Interactive Sessions",
    description: "Join live trading sessions with expert instructors",
    features: ["Real-time Trading", "Q&A Sessions", "Live Market Analysis"],
  },
  {
    icon: Calendar,
    title: "Scheduled Classes",
    description: "Regular live classes at convenient times",
    features: ["Multiple Time Slots", "Weekend Classes", "Recorded Sessions"],
  },
  {
    icon: TrendingUp,
    title: "Live Market Insights",
    description: "Get real-time market insights during live sessions",
    features: ["Market Updates", "Trading Signals", "Risk Management"],
  },
  {
    icon: Award,
    title: "Live Certification",
    description: "Earn certificates through live course completion",
    features: ["Live Assessments", "Interactive Tests", "Completion Badges"],
  },
];

const LiveCoursesSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="w-full bg-gradient-to-br from-zinc-900/95 to-black/95 py-12 sm:py-16 md:py-20 overflow-hidden relative">
      {/* Video Dialog */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/70 p-4">
          <div className="relative bg-gray-900 rounded-2xl shadow-2xl p-0 w-full max-w-2xl">
            <button
              className="absolute top-2 right-2 text-white bg-[#0a0a0a]/40 rounded-full p-2 hover:bg-[#0a0a0a]/70 transition z-10"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="w-full aspect-video bg-[#0a0a0a] rounded-b-2xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-green-500/10 text-green-400 rounded-full text-xs sm:text-sm font-medium border border-green-500/20">
              <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Live Learning Experience
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Join{" "}
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                Live Trading
              </span>{" "}
              Courses
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
              Experience interactive live trading courses with real-time market
              analysis. Learn from experts while markets are active and get
              instant feedback.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link
                href="/live-classes"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-colors duration-300 shadow-lg text-sm sm:text-base"
              >
                Join Live Course
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              <button
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border border-green-500/50 text-green-400 font-semibold rounded-xl bg-green-500/5 hover:bg-green-500/10 transition-colors duration-300 text-sm sm:text-base"
                onClick={() => setIsVideoOpen(true)}
              >
                <Video className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Watch Preview
              </button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/card/c1.jpg"
                alt="Live trading course session"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Live indicator card */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-gray-900/90 backdrop-blur-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-800/50 max-w-[280px] sm:max-w-xs">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-green-500/20 flex items-center justify-center mr-3 sm:mr-4">
                  <Play className="h-4 w-4 sm:h-6 sm:w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white">
                    LIVE
                  </h3>
                  <p className="text-xs sm:text-sm text-green-400 font-medium">
                    Now Streaming
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">
                Join 1,200+ students in live session
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20 lg:mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="bg-gray-900/50 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-gray-800/50 hover:border-green-500/30 transition-colors duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-green-500/20 flex items-center justify-center mb-4 sm:mb-6">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-green-500" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-green-400 mb-2 sm:mb-3 uppercase">
                {stat.label}
              </p>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 sm:mt-24 lg:mt-32">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-green-500/10 text-green-400 rounded-full text-xs sm:text-sm font-medium border border-green-500/20 mb-4 sm:mb-6">
              <Video className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Live Course Features
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                Live Courses?
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Experience real-time learning with interactive live sessions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="bg-gray-900/40 p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-800/50 hover:border-green-500/30 transition-colors duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0 self-start">
                    <benefit.icon className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                      {benefit.description}
                    </p>

                    <div className="space-y-2">
                      {benefit.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-xs sm:text-sm text-gray-400"
                        >
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-green-800 to-green-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-green-500/20"
        >
          <div className="relative p-8 sm:p-12 md:p-16 text-center z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready for <span className="text-green-200">Live Learning?</span>
            </h2>

            <p className="text-white/90 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              Join our next live course session and experience interactive
              trading education
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base">
                Join Next Live Session
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/80 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-300 text-sm sm:text-base">
                View Schedule
              </button>
            </div> */}
          </div>

          <div className="absolute right-0 top-0 w-1/2 h-full">
            <Image
              src="/card/c2.jpg"
              alt="Live courses"
              fill
              sizes="50vw"
              className="object-cover opacity-30"
            />
          </div>
        </motion.div>

        {/* View All Courses Link */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/live-classes"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border border-green-500/50 text-green-400 font-semibold rounded-xl bg-green-500/5 hover:bg-green-500/10 transition-colors duration-300 text-sm sm:text-base"
          >
            Browse All Live Courses
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LiveCoursesSection;
