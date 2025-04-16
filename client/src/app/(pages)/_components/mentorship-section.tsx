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
    title: "Live Trading Sessions",
    description: "Real-time market analysis and trade execution with mentors",
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-lg relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />

      <div className="relative h-80 overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={500}
          height={600}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{name}</h3>
          <p className="text-white/80 text-sm mb-2">{role}</p>

          <div className="flex items-center text-sm">
            <div className="px-3 py-1 bg-red-500 rounded-full mr-2 text-xs font-medium">
              {specialization}
            </div>
            <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
              {experience}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="text-yellow-500 text-lg font-bold">{rating}</div>
            <div className="flex ml-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            {studentsCount.toLocaleString()} students
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Available for 1-on-1 sessions
          </div>
          <Link href="/mentors">
            <div className="flex items-center text-red-500 font-medium hover:text-red-600 transition-colors">
              <span>View Profile</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export function MentorshipSection() {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isBenefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20 overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-red-50 rounded-full opacity-60" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-red-50 rounded-full opacity-60" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-sm font-medium mb-4">
                  Professional Mentorship
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Master Trading with{" "}
                  <span className="text-red-500">Expert Guidance</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Transform your trading journey with personalized mentorship
                  from industry professionals with years of real market
                  experience.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative pl-8">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/card/c4.jpg"
                    alt="Trading Mentorship"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent mix-blend-multiply" />
                </motion.div>

                {/* Floating stats card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute -bottom-10 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-xs"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mr-4">
                      <Trophy className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">98%</h3>
                      <p className="text-sm text-gray-600">Success rate</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Nearly all our students achieve significant improvement in
                    their trading performance
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        ref={statsRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <stat.icon className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-gray-800 mb-2">
                {stat.label}
              </p>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mentors Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-sm font-medium mb-4">
              Our Trading Mentors
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Learn from the Best in the Industry
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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

        {/* <div className="mt-12 text-center">
          <Link href="/mentors">
            <div className="inline-flex items-center justify-center px-6 py-3 border border-red-200 text-base font-medium rounded-lg text-red-500 bg-red-50 hover:bg-red-100 transition-colors duration-300">
              View All Mentors
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </Link>
        </div> */}
      </div>

      {/* Benefits Section */}
      <div
        ref={benefitsRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-sm font-medium mb-4">
                Why Choose Our Mentorship
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Benefits of Professional Trading Guidance
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our mentorship program is designed to provide you with the
                skills, knowledge, and support you need to succeed in the
                competitive world of trading.
              </p>

              <Link href="/apply">
                <div className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-300 shadow-md hover:shadow-lg">
                  Apply for Mentorship
                </div>
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Trading Journey?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Join our mentorship program today and gain access to expert
                guidance, proven strategies, and a supportive community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/apply">
                  <div className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-red-600 bg-white hover:bg-gray-100 transition-colors duration-300 shadow-md">
                    Get Started Today
                  </div>
                </Link>
                <Link href="/contact">
                  <div className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors duration-300">
                    Contact Us
                  </div>
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <Image
                src="/card/c3.jpg"
                alt="Get Started"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-red-600/50" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
