"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import {
    Award,
    BookOpen,
    CheckCircle,
    Globe,
    Mail,
    MapPin,
    Phone,
    Target,
    Users,
    Zap,
    TrendingUp,
    BarChart,
    ArrowRight,
    Lock,
    BadgeDollarSign
} from "lucide-react"
import Image from "next/image"
import Background from "../../_components/Background"
import SpotlightCard from "./SpotlightCard"
import Link from "next/link"

const features = [
    {
        icon: BookOpen,
        title: "Comprehensive Learning",
        description: "Trading education across Stocks, Forex, and Cryptocurrency markets",
    },
    {
        icon: Target,
        title: "Professional Training",
        description: "Live trading sessions with expert mentors",
    },
    {
        icon: Globe,
        title: "Global Standards",
        description: "ISO 21008:2018 certified training methods",
    },
    {
        icon: Users,
        title: "Community Learning",
        description: "Interactive sessions and peer learning opportunities",
    },
    {
        icon: Zap,
        title: "Fast-Track Programs",
        description: "Accelerated learning paths for quick market entry",
    },
    {
        icon: TrendingUp,
        title: "Performance Tracking",
        description: "Real-time analytics to monitor your trading progress",
    },
]

const values = [
    {
        icon: Award,
        title: "Expert Mentorship",
        description: "Learn from experienced market professionals",
    },
    {
        icon: CheckCircle,
        title: "Practical Approach",
        description: "Real-world trading strategies and insights",
    },
    {
        icon: Target,
        title: "Personalized Growth",
        description: "Customized learning paths for all levels",
    },
    {
        icon: BarChart,
        title: "Data-Driven Decisions",
        description: "Leverage market data for informed trading",
    },
]

const contactInfo = [
    {
        icon: MapPin,
        title: "Visit Us",
        details: ["Uttam Nagar", "Dashrath Puri"],
    },
    {
        icon: Phone,
        title: "Call Us",
        details: ["+91 9220797499", "+91 9773927706"],
    },
    {
        icon: Mail,
        title: "Email Us",
        details: ["service@monarkfx.com"],
    },
]

const courses = [
    {
        title: "SMART TRADER PROFILE (STP)",
        price: "₹19,999",
        category: "National Course Category",
        duration: "2 Months Duration",
        color: "from-red-600 to-orange-600",
        levels: [
            {
                name: "Level 1 (Bachelor)",
                duration: "15 Days",
                topics: "Price Action Concepts, Institutional Trading Methods, Data Science in Trading"
            },
            {
                name: "Level 2 (Masters)",
                duration: "15-20 Days",
                topics: "FVG, Order Blocks, Liquidity Strategy, Trend Analysis, Money Management"
            },
            {
                name: "Level 3 (F&O Freak)",
                duration: "7-10 Days",
                topics: "Option Greeks, Advanced Option Chain Study, Intrinsic & Time Value, Option Strategies"
            },
            {
                name: "Level 4 (MX Trader)",
                duration: "15-20 Days",
                topics: "Multi-Time Frame Trading, Top-Down Metrics, Weightage & Sector Analysis, Intraday Trading"
            }
        ],
        image: "/stocks-trading.jpg"
    },
    {
        title: "FOREX CRYPTO HUSTLER (FCH)",
        price: "₹20,999",
        category: "International Course Category",
        duration: "2 Months Duration",
        color: "from-blue-600 to-purple-600",
        levels: [
            {
                name: "Level 1 (Coins FA)",
                duration: "15 Days",
                topics: "Crypto & Blockchain Fundamentals, Bitcoin & Altcoin Analysis, In-Depth Fundamental Analysis"
            },
            {
                name: "Level 2 (Next Gen)",
                duration: "15-20 Days",
                topics: "Psychology, Multi-Time Frame Trading, Risk Management, Portfolio Management"
            },
            {
                name: "Level 3 (Forex FA)",
                duration: "15 Days",
                topics: "Forex Fundamentals, Currency Pairs, Lot Size & Pip Value, Fundamental Analysis"
            },
            {
                name: "Level 4 (MXFX)",
                duration: "15-20 Days",
                topics: "Spot & Futures Trading, Trade Management, Live Trading, Group Trading"
            }
        ],
        image: "/crypto-trading.jpg"
    }
];

const benefits = [
    "Financial Planning and Analysis",
    "Complete Edge + Psychology Development",
    "Emotional Development for Trading",
    "High-Risk Trade Calculations",
    "Performance Measurement"
];

interface Feature {
    icon: React.ElementType;
    title: string;
    description: string;
}

interface Value {
    icon: React.ElementType;
    title: string;
    description: string;
}

interface ContactInfo {
    icon: React.ElementType;
    title: string;
    details: string[];
}

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <SpotlightCard>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10"
            >
                <feature.icon className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
            </motion.div>
        </SpotlightCard>
    )
}

const ValueCard = ({ value, index }: { value: Value; index: number }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
            <value.icon className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-700">{value.description}</p>
        </motion.div>
    )
}

const ContactCard = ({ info, index }: { info: ContactInfo; index: number }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.1)">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10"
            >
                <info.icon className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{info.title}</h3>
                {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-800">
                        {detail}
                    </p>
                ))}
            </motion.div>
        </SpotlightCard>
    )
}

const CourseCard = ({ course, index }: { course: any; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="rounded-2xl overflow-hidden shadow-xl bg-white"
        >
            <div className={`bg-gradient-to-r ${course.color} text-white p-8`}>
                <h3 className="text-2xl font-bold mb-1">{course.title}</h3>
                <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-bold">{course.price}</span>
                    <span className="text-sm opacity-80">{course.category}</span>
                </div>
                <div className="mt-2 text-sm opacity-90">{course.duration}</div>
            </div>

            <div className="p-6">
                <h4 className="font-bold text-lg mb-4 text-gray-800">Program Structure:</h4>
                <div className="space-y-4">
                    {course.levels.map((level: any, i: number) => (
                        <div key={i} className="border-l-4 border-red-500 pl-4 py-2">
                            <h5 className="font-semibold text-gray-900">{level.name}</h5>
                            <p className="text-sm text-gray-600">{level.duration}</p>
                            <p className="text-sm mt-1 text-gray-700">{level.topics}</p>
                        </div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-6 w-full px-6 py-3 bg-gradient-to-r ${course.color} text-white rounded-lg flex items-center justify-center space-x-2 shadow-lg`}
                >
                    <span>View Course Details</span>
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            </div>
        </motion.div>
    );
};

const BusinessPage = () => {
    const { scrollYProgress } = useScroll()
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), { stiffness: 100, damping: 30 })

    return (
        <div className="min-h-screen bg-gray-100">
            <Background title="Business" highlightedText="Solutions" subtitle="Empowering Traders Through Education" />

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent z-10"></div>
                    <Image
                        src="/bg.jpeg"
                        alt="Business background"
                        fill
                        sizes="100vw"
                        priority
                        quality={85}
                        className="opacity-20 object-cover"
                    />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-800 relative z-10"
                >
                    Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">Monark FX</span>?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center text-lg text-gray-600 mb-16 max-w-3xl mx-auto relative z-10"
                >
                    Our premium trading education programs offer unmatched expertise and personalized mentorship to help you excel in financial markets.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </section>

            {/* Course Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-100 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-800 relative z-10"
                >
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">Trading Education</span> Services
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center text-lg text-gray-600 mb-16 max-w-3xl mx-auto"
                >
                    Comprehensive programs designed to transform beginners into professional traders through structured learning paths
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {courses.map((course, index) => (
                        <CourseCard key={index} course={course} index={index} />
                    ))}
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-800 relative z-10"
                >
                    Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">Values</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center text-lg text-gray-600 mb-16 max-w-3xl mx-auto"
                >
                    The principles that guide our training methodology and ensure your success in the markets
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
                    {values.map((value, index) => (
                        <ValueCard key={index} value={value} index={index} />
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-red-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-20"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Special Features & Benefits</h2>
                        <p className="text-lg text-white/80 max-w-3xl mx-auto">
                            When you join Monark FX, you gain access to exclusive benefits that set our training apart
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <SpotlightCard className="border-white/10" spotlightColor="rgba(255, 255, 255, 0.1)">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="z-10 relative"
                            >
                                <h3 className="text-2xl font-bold mb-6 flex items-center">
                                    <Users className="mr-3 h-6 w-6" />
                                    Live Trading Sessions
                                </h3>
                                <p className="mb-6">
                                    When students reach the final level, they participate in live trading sessions for practical market exposure,
                                    including special Expiry Day Trade setups with direct mentorship from professionals.
                                </p>

                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 mr-2 text-green-400 shrink-0 mt-0.5" />
                                        <span>Real-time market analysis and execution</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 mr-2 text-green-400 shrink-0 mt-0.5" />
                                        <span>Direct guidance from mentors during volatile market conditions</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 mr-2 text-green-400 shrink-0 mt-0.5" />
                                        <span>Development of practical trading psychology</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </SpotlightCard>

                        <SpotlightCard className="border-white/10" spotlightColor="rgba(255, 255, 255, 0.1)">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="z-10 relative"
                            >
                                <h3 className="text-2xl font-bold mb-6 flex items-center">
                                    <Award className="mr-3 h-6 w-6" />
                                    Mentorship Benefits
                                </h3>

                                <ul className="space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                                            className="flex items-center"
                                        >
                                            <div className="bg-white/20 p-2 rounded-full mr-4">
                                                <CheckCircle className="h-5 w-5 text-white" />
                                            </div>
                                            <span>{benefit}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
                                    <h4 className="font-semibold flex items-center mb-3">
                                        <BadgeDollarSign className="mr-2 h-5 w-5" />
                                        Certification
                                    </h4>
                                    <p className="text-sm">
                                        Upon course completion and successful examination, students receive an ISO certification
                                        validating their expertise in trading. Top-performing students may receive offers to join the MX team.
                                    </p>
                                </div>
                            </motion.div>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold mb-8 text-gray-800"
                    >
                        Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">Trading Career</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-600 mb-12"
                    >
                        Join Monark FX and unlock your potential in the world of trading. Our expert-led programs and cutting-edge
                        resources are designed to help you succeed in today's dynamic markets.
                    </motion.p>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg shadow-red-500/20 flex items-center justify-center group"
                        >
                            Start Your Journey
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </motion.a>

                        <motion.a
                            href="/about"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="border border-red-600 text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center"
                        >
                            Learn More About Us
                        </motion.a>
                    </div>

                    <div className="mt-16 p-4 bg-red-50 rounded-lg text-sm text-red-700 border border-red-100">
                        <p className="flex items-start">
                            <Lock className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                            <span>
                                <strong className="font-bold">Trading Disclaimer:</strong> Trading involves capital risk.
                                All trades are for educational purposes only. Trade wisely at your own risk.
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white relative overflow-hidden">
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/bg.jpeg"
                        alt="Contact background"
                        fill
                        sizes="100vw"
                        loading="lazy"
                        quality={85}
                        className="opacity-10 object-cover"
                        onError={(e: any) => {
                            e.target.src = '/placeholder.jpeg'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900"></div>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-6 relative z-10"
                >
                    Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Touch</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center text-lg text-white/80 mb-16 max-w-2xl mx-auto relative z-10"
                >
                    Have questions about our courses or want to book a consultation? Contact our team today.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
                    {contactInfo.map((info, index) => (
                        <ContactCard key={index} info={info} index={index} />
                    ))}
                </div>

                <div className="mt-16 text-center relative z-10">
                    <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-xl shadow-red-500/20"
                    >
                        Contact Us
                    </motion.a>
                </div>
            </section>
        </div>
    )
}

export default BusinessPage