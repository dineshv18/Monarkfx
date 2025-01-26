"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, BookOpen, CheckCircle, Globe, Mail, MapPin, Phone, Target, Users } from 'lucide-react';
import { useRef } from 'react';
import SpotlightCard from './SpotlightCard';

interface BackgroundProps {
    title: string;
    highlightedText: string;
    subtitle: string;
}

const features = [
    {
        icon: BookOpen,
        title: "Comprehensive Learning",
        description: "Trading education across Stocks, Forex, and Cryptocurrency markets"
    },
    {
        icon: Target,
        title: "Professional Training",
        description: "Live trading sessions with expert mentors"
    },
    {
        icon: Globe,
        title: "Global Standards",
        description: "ISO 21008:2018 certified training methods"
    },
    {
        icon: Users,
        title: "Community Learning",
        description: "Interactive sessions and peer learning opportunities"
    }
]

const values = [
    {
        icon: Award,
        title: "Expert Mentorship",
        description: "Learn from experienced market professionals"
    },
    {
        icon: CheckCircle,
        title: "Practical Approach",
        description: "Real-world trading strategies and insights"
    },
    {
        icon: Target,
        title: "Personalized Growth",
        description: "Customized learning paths for all levels"
    }
]

const contactInfo = [
    {
        icon: MapPin,
        title: "Visit Us",
        details: ["Uttam Nagar", "Dashrath Puri"]
    },
    {
        icon: Phone,
        title: "Call Us",
        details: ["+91 9220797499", "+91 9773927706"]
    },
    {
        icon: Mail,
        title: "Email Us",
        details: ["service@monarkfx.com"]
    }
]

const Background: React.FC<BackgroundProps> = ({ title, highlightedText, subtitle }: any) => (
    <section className="relative h-[400px] bg-red-50 flex items-center justify-center overflow-hidden">
        <div className="text-center z-10">
            <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl md:text-6xl font-bold text-red-600 mb-4"
            >
                {title} <span className="text-white bg-red-600 px-4 rounded-lg">{highlightedText}</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl text-gray-600"
            >
                {subtitle}
            </motion.p>
        </div>
    </section>
);

const ScrollingFeatures = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <div ref={containerRef} className="relative overflow-hidden py-20">
            <motion.div
                style={{ x }}
                className="flex gap-8 w-[200%]"
            >
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-8 min-w-max">
                        {features.map((feature, index) => (
                            <SpotlightCard key={`${i}-${index}`} className="w-[300px]">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex flex-col items-center"
                                >
                                    <feature.icon className="h-16 w-16 text-red-600 mb-6 animate-float" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 text-center">{feature.description}</p>
                                </motion.div>
                            </SpotlightCard>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const BusinessPage = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    const rotateX = useTransform(scrollYProgress, [0, 1], [0, -5]);

    return (
        <motion.div
            ref={containerRef}
            style={{ rotateX }}
            className="min-h-screen overflow-hidden bg-white"
        >
            <Background
                title="Business"
                highlightedText="Solutions"
                subtitle="Empowering Traders Through Education"
            />

            {/* Features Section */}
            <section className="py-20">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-red-600 text-center mb-16"
                >
                    Why Choose Monark FX?
                </motion.h2>
                <ScrollingFeatures />
            </section>

            {/* Values Section */}
            <section className="py-20 bg-red-50">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-5xl font-bold text-red-600 text-center mb-16"
                    >
                        Our Core Values
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <SpotlightCard key={index} className="h-full">
                                <motion.div
                                    initial={{ rotate: 5 }}
                                    whileInView={{ rotate: 0 }}
                                    className="p-8 flex flex-col items-center h-full"
                                >
                                    <value.icon className="h-16 w-16 text-red-600 mb-6 animate-pulse" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                    <p className="text-gray-600 text-center flex-grow">{value.description}</p>
                                </motion.div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-red-600 text-center mb-16"
                    >
                        Get In Touch
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {contactInfo.map((info, index) => (
                            <SpotlightCard key={index} className="h-full">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="p-8 flex flex-col items-center h-full"
                                >
                                    <info.icon className="h-16 w-16 text-red-600 mb-6 animate-float" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{info.title}</h3>
                                    {info.details.map((detail, i) => (
                                        <p key={i} className="text-gray-600 text-center hover:text-red-700 transition-colors">
                                            {detail}
                                        </p>
                                    ))}
                                </motion.div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default BusinessPage;