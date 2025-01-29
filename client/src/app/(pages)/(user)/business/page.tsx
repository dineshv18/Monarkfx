"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
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
} from "lucide-react"
import Image from "next/image"
import Background from "../../_components/Background"

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
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
            <feature.icon className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
        </motion.div>
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
            className="bg-red-50 rounded-xl p-6 hover:bg-red-100 transition-all duration-300 transform hover:scale-105"
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
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
            <info.icon className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
            {info.details.map((detail, i) => (
                <p key={i} className="text-gray-600">
                    {detail}
                </p>
            ))}
        </motion.div>
    )
}

const BusinessPage = () => {
    const { scrollYProgress } = useScroll()
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), { stiffness: 100, damping: 30 })

    return (
        <div className="min-h-screen bg-gray-100">
            <Background title="Business" highlightedText="Solutions" subtitle="Empowering Traders Through Education" />

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }} className="absolute inset-0 z-0">
                    <Image
                        src="/bg.jpeg"
                        alt="Business background"
                        fill
                        sizes="100vw"
                        priority
                        quality={85}
                        className="opacity-30 object-cover"
                    />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 relative z-10"
                >
                    Why Choose <span className="text-red-600">Monark FX</span>?
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">

                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 relative z-10"
                >
                    Our Core <span className="text-red-600">Values</span>
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
                    {values.map((value, index) => (
                        <ValueCard key={index} value={value} index={index} />
                    ))}
                </div>
            </section>

            {/* Image Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold mb-8 text-gray-800"
                    >
                        Transform Your <span className="text-red-600">Trading Career</span>
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
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300"
                    >
                        Start Your Journey
                    </motion.button>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white relative overflow-hidden">
                <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }} className="absolute inset-0 z-0">
                    <Image
                        src="/bg.jpeg"
                        alt="Contact background"
                        fill
                        sizes="100vw"
                        loading="lazy"
                        quality={85}
                        className="opacity-10 object-cover"
                        onError={(e: any) => {
                            e.target.src = '/bg.jpeg'
                        }}
                    />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 relative z-10"
                >
                    Get In <span className="text-red-500">Touch</span>
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
                    {contactInfo.map((info, index) => (
                        <ContactCard key={index} info={info} index={index} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default BusinessPage

