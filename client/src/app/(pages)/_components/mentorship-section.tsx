"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Trophy,
  ChartBar,
  Globe,
  Sparkles,
  Calendar,
  GraduationCap,
  Target,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MentorCardProps {
  name: string;
  role: string;
  image: string;
  specialization: string;
  experience: string;
  rating: number;
  studentsCount: number;
}

const mentors: MentorCardProps[] = [
  {
    name: "Dinesh Verma",
    role: "Senior Forex Trader",
    image: "/card/c1.jpg",
    specialization: "Currency Pairs",
    experience: "12+ years",
    rating: 4.9,
    studentsCount: 1520,
  },
  {
    name: "Sagar",
    role: "Stock Market Strategist",
    image: "/card/c2.jpg",
    specialization: "Equity Markets",
    experience: "9+ years",
    rating: 4.8,
    studentsCount: 980,
  },
  {
    name: "Manish",
    role: "Crypto Trading Expert",
    image: "/card/c3.jpg",
    specialization: "Cryptocurrency",
    experience: "7+ years",
    rating: 4.9,
    studentsCount: 1240,
  },
];

const stats = [
  {
    icon: Users,
    value: "15,000+",
    label: "Active Traders",
    description: "Globally active traders learning and growing with us",
  },
  {
    icon: Trophy,
    value: "98%",
    label: "Success Rate",
    description: "Of our students achieve their trading goals",
  },
  {
    icon: ChartBar,
    value: "15+ Years",
    label: "Experience",
    description: "Of combined market trading experience",
  },
  {
    icon: Globe,
    value: "24/7",
    label: "Support",
    description: "Round-the-clock mentorship and guidance",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Personalized Strategies",
    description:
      "Custom trading plans tailored to your goals and risk tolerance",
  },
  {
    icon: Calendar,
    title: "Scheduled Learning Sessions",
    description: "Regular one-on-one sessions and market analysis with mentors",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description: "Regular workshops and updates on market trends",
  },
  {
    icon: Target,
    title: "Goal-oriented Approach",
    description:
      "Clear milestones and trackable progress in your trading journey",
  },
];

const MentorCard = ({
  name,
  role,
  image,
  specialization,
  experience,
  rating,
  studentsCount,
}: MentorCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg relative group border border-gray-800"
    >
      {/* Hover effect border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />

      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-2xl font-bold mb-1">{name}</h3>
          <p className="text-white/80 text-sm mb-2">{role}</p>
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1 bg-green-500 rounded-full mr-2 text-xs font-medium">
              {specialization}
            </div>
            <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
              {experience}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="text-yellow-500 text-lg font-bold">{rating}</div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? "text-yellow-500" : "text-gray-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            <Users className="w-4 h-4 inline mr-1" />
            {studentsCount}
          </div>
        </div>

        <div className="text-sm text-gray-300">
          Join thousands of successful traders mentored by {name}
        </div>

        <div className="flex items-center text-green-500 font-medium hover:text-green-400 transition-colors">
          <span>View Profile</span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const MentorshipSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section className="w-full bg-black py-20 overflow-hidden relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e15_1px,transparent_1px),linear-gradient(to_bottom,#22c55e15_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Floating background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-green-500/10 rounded-full opacity-60" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-green-600/10 rounded-full opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full text-sm font-medium mb-4">
              Professional Mentorship
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transform Your Trading with{" "}
              <span className="text-green-500">Expert Guidance</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Learn directly from industry professionals who have successfully
              navigated the markets for years. Our mentorship program provides
              personalized guidance to accelerate your trading journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/mentorship"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-black bg-green-500 hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Start Mentorship
              </Link>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-green-500 text-base font-medium rounded-lg text-green-400 bg-transparent hover:bg-green-500/10 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/card/c1.jpg"
                alt="Professional trader mentoring session"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent mix-blend-multiply" />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -left-8 bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-800 max-w-xs"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                  <Trophy className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">98%</h3>
                  <p className="text-sm text-gray-400">Success rate</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                of our mentored students achieve profitable trading
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <stat.icon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-gray-300 mb-2">
                {stat.label}
              </p>
              <p className="text-sm text-gray-400">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mentors Section */}
        <div ref={sectionRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full text-sm font-medium mb-4">
              Our Trading Mentors
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Learn from the Best in the Industry
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our mentors have years of real-world trading experience and are
              committed to helping you succeed in your trading journey.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <MentorCard key={index} {...mentor} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/instructors"
            className="inline-flex items-center justify-center px-6 py-3 border border-green-500 text-base font-medium rounded-lg text-green-400 bg-transparent hover:bg-green-500/10 transition-colors duration-300"
          >
            View All Mentors
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Benefits Section */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full text-sm font-medium mb-4">
              Mentorship Benefits
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose Our Mentorship Program?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Personalized guidance that adapts to your learning style and goals
            </p>
            <div className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-black bg-green-500 hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg">
              Start Your Journey Today
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl overflow-hidden shadow-xl relative"
        >
          <div className="p-8 md:p-12 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Mentorship Journey?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of successful traders who transformed their careers
              with our expert mentorship program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-green-600 bg-white hover:bg-gray-100 transition-colors duration-300 shadow-md">
                Get Started Now
              </div>
              <div className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors duration-300">
                Schedule a Call
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 w-1/3 h-full">
            <Image
              src="/card/c2.jpg"
              alt="Mentorship program"
              fill
              sizes="33vw"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-green-600/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MentorshipSection;
