"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  Award,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Target,
  Users,
  Zap,
  ArrowRight,
  Lock,
  ChevronRight,
  Sparkles,
  LineChart,
  BrainCircuit,
  GraduationCap,
  BarChart2,
  Rocket,
  PieChart,
  CreditCard,
  Star,
} from "lucide-react";
import Image from "next/image";
import Background from "../../_components/Background";

// Placeholder image content to be used when images don't exist
const DEFAULT_HERO_IMAGE = "/placeholder.jpeg";
const DEFAULT_COURSE_IMAGE = "/placeholder.jpeg";
const DEFAULT_AVATAR_IMAGE = "/placeholder.jpeg";
const DEFAULT_MENTORSHIP_IMAGE = "/placeholder.jpeg";

// Business features
const features = [
  {
    icon: LineChart,
    title: "Market Analysis",
    description:
      "Learn advanced chart patterns and technical analysis methods to identify high-probability trading setups.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: BrainCircuit,
    title: "Trading Psychology",
    description:
      "Master emotional discipline and develop a trader's mindset to make rational decisions under pressure.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Target,
    title: "Risk Management",
    description:
      "Implement proven risk control strategies to protect your capital and maximize long-term profitability.",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: GraduationCap,
    title: "Institutional Methods",
    description:
      "Discover how professional traders and market makers operate, and align your strategy with smart money.",
    color: "from-yellow-500 to-lime-500",
  },
  {
    icon: BarChart2,
    title: "Multi-Timeframe Trading",
    description:
      "Analyze markets across different timeframes to confirm trends and find optimal entry and exit points.",
    color: "from-lime-500 to-green-500",
  },
  {
    icon: Rocket,
    title: "Performance Tracking",
    description:
      "Measure your progress with advanced metrics and analytics to continuously improve your trading results.",
    color: "from-green-500 to-teal-500",
  },
];

// Trading courses
const courses = [
  {
    title: "SMART TRADER PROFILE",
    shortName: "STP",
    price: "₹19,999",
    category: "STOCK MARKET MASTERY",
    duration: "2 Months",
    tagline: "Master the Indian stock market with professional strategies",
    color: "from-red-600 to-orange-600",
    features: [
      "Price Action Mastery",
      "F&O Trading Techniques",
      "Options Strategies",
      "Multi-timeframe Analysis",
      "Live Trading Sessions",
      "Risk Management",
    ],
    levels: [
      {
        name: "Level 1: Price Action Foundation",
        duration: "2 weeks",
        description:
          "Master the core principles of price action, chart patterns, and market structure",
      },
      {
        name: "Level 2: Advanced Trading Mechanics",
        duration: "2 weeks",
        description:
          "Learn institutional trading methods including orderblocks, liquidity, and market cycles",
      },
      {
        name: "Level 3: Derivatives Trading",
        duration: "2 weeks",
        description:
          "Develop expertise in F&O trading with options greeks, strategies, and hedging techniques",
      },
      {
        name: "Level 4: Professional Integration",
        duration: "2 weeks",
        description:
          "Apply all concepts in live trading sessions with mentorship and performance tracking",
      },
    ],
    icon: DEFAULT_COURSE_IMAGE,
  },
  {
    title: "FOREX CRYPTO HUSTLER",
    shortName: "FCH",
    price: "₹20,999",
    category: "GLOBAL MARKETS MASTERY",
    duration: "2 Months",
    tagline:
      "Trade the global forex and cryptocurrency markets with confidence",
    color: "from-blue-600 to-indigo-600",
    features: [
      "Crypto Fundamentals",
      "Blockchain Analysis",
      "Forex Trading",
      "Global Market Correlations",
      "Portfolio Management",
      "Risk Optimization",
    ],
    levels: [
      {
        name: "Level 1: Crypto Fundamentals",
        duration: "2 weeks",
        description:
          "Understand blockchain technology, cryptocurrency analysis, and fundamental value drivers",
      },
      {
        name: "Level 2: Technical Trading Systems",
        duration: "2 weeks",
        description:
          "Develop a complete technical trading system with psychology, risk management and positioning",
      },
      {
        name: "Level 3: Forex Mastery",
        duration: "2 weeks",
        description:
          "Master forex market fundamentals, currency pairs, and macroeconomic influences",
      },
      {
        name: "Level 4: Advanced Trading Applications",
        duration: "2 weeks",
        description:
          "Apply strategies in live trading with professional guidance and portfolio construction",
      },
    ],
    icon: DEFAULT_COURSE_IMAGE,
  },
];

// Business process steps
const businessProcess = [
  {
    number: "01",
    title: "Assessment",
    description:
      "We begin with a comprehensive assessment of your current trading knowledge and goals.",
  },
  {
    number: "02",
    title: "Customized Learning",
    description:
      "Based on your assessment, we create a tailored learning plan addressing your specific needs.",
  },
  {
    number: "03",
    title: "Practical Training",
    description:
      "You'll learn through a combination of theory and hands-on practice in real market conditions.",
  },
  {
    number: "04",
    title: "Live Trading",
    description:
      "Apply your skills in live trading sessions with direct mentorship from professional traders.",
  },
  {
    number: "05",
    title: "Performance Review",
    description:
      "Regular performance reviews help identify areas for improvement and refine your strategy.",
  },
  {
    number: "06",
    title: "Certification",
    description:
      "Upon successful completion, receive ISO certification recognizing your trading proficiency.",
  },
];

// Testimonials
const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Stock Trader",
    content:
      "The STP program completely transformed my approach to trading. The institutional concepts I learned at Monark FX helped me develop a consistent edge in the markets.",
    image: DEFAULT_AVATAR_IMAGE,
  },
  {
    name: "Priya Patel",
    role: "Crypto Investor",
    content:
      "As someone new to cryptocurrency trading, the FCH program provided the perfect foundation. The mentors are incredibly knowledgeable and patient with beginners.",
    image: DEFAULT_AVATAR_IMAGE,
  },
  {
    name: "Vikram Singh",
    role: "Options Trader",
    content:
      "The options strategies taught in the advanced modules gave me a completely new perspective on risk management and position sizing. Highly recommended!",
    image: DEFAULT_AVATAR_IMAGE,
  },
];

// Benefits of working with us
const benefits = [
  {
    icon: Users,
    title: "Expert Mentorship",
    description:
      "Learn directly from professional traders with years of market experience",
  },
  {
    icon: PieChart,
    title: "Data-Driven Methods",
    description:
      "Our strategies are based on statistical edge and proven market principles",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description:
      "Choose from various payment options including installment plans",
  },
  {
    icon: CheckCircle,
    title: "ISO Certification",
    description:
      "Receive internationally recognized certification upon course completion",
  },
];

// Feature card with gradient background
const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-md opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div className="relative bg-white rounded-2xl p-8 h-full border border-white/50 shadow-xl">
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg`}
        >
          <feature.icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {feature.title}
        </h3>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    </motion.div>
  );
};

// Course card with gradient background
const CourseCard = ({ course, index }: { course: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group"
    >
      <div
        className={`bg-gradient-to-r ${course.color} rounded-2xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 overflow-hidden relative`}
      >
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mt-10 -mr-10 z-0" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/5 rounded-full -mb-10 -ml-10 z-0" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium inline-block mb-3">
                {course.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {course.title}
              </h3>
              <p className="text-white/80">{course.tagline}</p>
            </div>
            <div className="bg-white/20 h-16 w-16 rounded-full flex items-center justify-center p-1">
              <div className="bg-white/90 h-full w-full rounded-full flex items-center justify-center text-red-600 font-bold text-xl">
                {course.shortName}
              </div>
            </div>
          </div>

          <div className="flex items-baseline justify-between mb-6">
            <span className="text-3xl font-bold text-white">
              {course.price}
            </span>
            <span className="text-white/80">{course.duration}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {course.features.map((feature: string, i: number) => (
              <div key={i} className="flex items-center">
                <CheckCircle className="text-white/90 h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-white/90 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-white text-gray-900 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>View Course Details</span>
            <ChevronRight className="w-4 h-4 text-red-600" />
          </motion.button>
        </div>
      </div>

      {/* Course levels - shown on hover */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        whileHover={{ height: "auto", opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 backdrop-blur-sm rounded-b-2xl overflow-hidden shadow-xl border border-t-0 border-gray-100"
      >
        <div className="p-6 space-y-4">
          <h4 className="font-bold text-gray-900">Course Structure</h4>
          {course.levels.map((level: any, i: number) => (
            <div key={i} className="border-l-4 border-red-500 pl-4 py-2">
              <h5 className="font-semibold text-gray-900">{level.name}</h5>
              <p className="text-sm text-gray-600">{level.duration}</p>
              <p className="text-sm mt-1 text-gray-700">{level.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Process step card
const ProcessCard = ({ step, index }: { step: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative z-10"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center font-bold shadow-lg">
          {step.number}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      </div>

      {/* Connector line */}
      {index < businessProcess.length - 1 && (
        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-red-500 to-red-200"></div>
      )}
    </motion.div>
  );
};

const BusinessPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), {
    stiffness: 100,
    damping: 30,
  });

  // Handle mouse movement for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white">
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
              rgba(249, 59, 59, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(249, 59, 59, 0.1) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }
      `}</style>

      {/* Hero Section with Animated Elements */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <Background
          title="Business"
          highlightedText="Solutions"
          subtitle="Comprehensive trading education for financial markets"
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-red-500/5 to-orange-500/5 blur-3xl"
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
            className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-2xl"
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-red-600 font-medium tracking-wide uppercase text-sm">
                Financial Market Education
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-6">
                Transform Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                  Trading Skills
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our premium trading education programs offer expert mentorship,
                institutional trading methods, and practical market strategies
                to help you excel in today's dynamic financial markets.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg flex items-center justify-center group"
                >
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="/about"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white text-red-600 border border-red-200 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-md transition-shadow flex items-center justify-center"
                >
                  Learn More
                </motion.a>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-red-600" />
                  <span className="text-gray-600 font-medium">
                    ISO Certified
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-red-600" />
                  <span className="text-gray-600 font-medium">
                    250+ Students
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-red-600" />
                  <span className="text-gray-600 font-medium">
                    4.7/5 Rating
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="relative h-[500px] hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute inset-0"
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={DEFAULT_HERO_IMAGE}
                    alt="Trading Education"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-900/40 to-transparent"></div>

                  {/* Floating elements */}
                  <motion.div
                    className="absolute top-10 -right-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <LineChart className="h-8 w-8 text-red-600" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-16 -left-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <Zap className="h-8 w-8 text-red-600" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium tracking-wide mb-3">
                TRADING EXPERTISE
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What You'll Learn
              </h2>
              <p className="text-xl text-gray-600">
                Our comprehensive curriculum covers every aspect of successful
                trading, from technical analysis to psychological mastery.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Course Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-red-50 to-transparent rounded-full blur-3xl opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-50 to-transparent rounded-full blur-3xl opacity-70 transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium tracking-wide mb-3">
                PREMIUM COURSES
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Trading Education Services
              </h2>
              <p className="text-xl text-gray-600">
                Choose from our specialized training programs designed to
                develop your skills in specific market segments.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium tracking-wide mb-3">
                OUR METHODOLOGY
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                How We Transform Traders
              </h2>
              <p className="text-xl text-gray-600">
                Our proven process takes you from trading basics to professional
                implementation in six comprehensive steps.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {businessProcess.map((step, index) => (
              <ProcessCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute right-0 top-0 h-32 w-32 opacity-20 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
          <svg
            className="absolute left-0 bottom-0 h-32 w-32 opacity-20 text-white transform rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>

          {/* Animated mesh gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08),transparent_50%)]"></div>
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium tracking-wide mb-3">
                SUCCESS STORIES
              </span>
              <h2 className="text-4xl font-bold mb-6">What Our Students Say</h2>
              <p className="text-xl text-white/80">
                Hear from traders who have transformed their approach to markets
                through our education.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
              >
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="inline-block h-5 w-5 text-yellow-300 mr-1"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-white mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-white/20 overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-shadow"
            >
              Read More Success Stories
            </motion.a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium tracking-wide mb-3">
                WHY CHOOSE US
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Unmatched Trading Education
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                When you choose Monark FX, you gain access to benefits that set
                us apart from other trading education providers.
              </p>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="shrink-0 mr-4 w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                      <benefit.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[600px] hidden lg:block"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-100 to-red-50 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
              </div>

              <div className="absolute top-8 left-8 right-8 bottom-8 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={DEFAULT_MENTORSHIP_IMAGE}
                  alt="Trading Mentorship"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent"></div>
              </div>

              {/* Floating achievement card */}
              <motion.div
                className="absolute -bottom-8 -right-8 bg-white rounded-xl p-6 shadow-xl border border-red-100 max-w-xs"
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center mb-3">
                  <Award className="h-8 w-8 text-red-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">
                    ISO Certified
                  </h3>
                </div>
                <p className="text-gray-600">
                  Our ISO 21008:2018 certification ensures that our trading
                  education meets international quality standards.
                </p>
              </motion.div>

              {/* Floating review card */}
              <motion.div
                className="absolute -top-8 -left-8 bg-white rounded-xl p-6 shadow-xl border border-red-100 max-w-xs"
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                <div className="flex items-center mb-3">
                  <Sparkles className="h-6 w-6 text-yellow-500 mr-3" />
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 text-yellow-500"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The best trading education I've ever received. Worth every
                  penny!"
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -right-40 -bottom-40 w-96 h-96 rounded-full border border-red-200 opacity-50"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -left-20 -top-20 w-64 h-64 rounded-full border border-red-200 opacity-30"
            animate={{ rotate: -360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-red-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Start Your Trading Journey Today
                  </h2>
                  <p className="text-xl text-gray-600 mb-10">
                    Join our premium trading education programs and gain the
                    skills, knowledge, and confidence to succeed in the
                    financial markets.
                  </p>

                  <div className="space-y-4">
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="block sm:inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto text-center"
                    >
                      Book a Consultation
                    </motion.a>
                    <motion.a
                      href="/about"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="block sm:inline-block sm:ml-4 border border-red-200 text-red-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-50 transition-colors w-full sm:w-auto text-center"
                    >
                      Explore Programs
                    </motion.a>
                  </div>

                  <div className="mt-10 p-4 bg-red-50 rounded-lg text-sm text-red-700 border border-red-100">
                    <p className="flex items-start">
                      <Lock className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-bold">
                          Trading Disclaimer:
                        </strong>{" "}
                        Trading involves capital risk. All trades are for
                        educational purposes only. Trade wisely at your own
                        risk.
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="relative h-96 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800">
                  <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                </div>

                <div className="relative h-full flex flex-col justify-center p-12 lg:p-16 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <Phone className="mr-3 h-6 w-6" />
                      Contact Information
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <MapPin className="h-6 w-6 mr-3 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Visit Our Branches</p>
                          <p className="text-white/80">
                            Uttam Nagar, New Delhi
                          </p>
                          <p className="text-white/80">
                            Dashrath Puri, New Delhi
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-6 w-6 mr-3 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Call Us</p>
                          <p className="text-white/80">+91 9220797499</p>
                          <p className="text-white/80">+91 9773927706</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Mail className="h-6 w-6 mr-3 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Email Us</p>
                          <p className="text-white/80">service@monarkfx.com</p>
                        </div>
                      </div>
                    </div>

                    <div className="inline-block px-4 py-2 bg-white/10 rounded-lg text-sm backdrop-blur-sm border border-white/20">
                      Working Hours: Mon - Sat: 9AM to 6PM
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPage;
