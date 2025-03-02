'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Trophy, ArrowRight, CheckCircle, LucideIcon, Target, Star, Award, Briefcase, Users, Book } from 'lucide-react';
import Image from 'next/image';
import Background from '../../_components/Background';


interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
}

interface ProgramProps {
  title: string;
  shortName: string;
  description: string;
  color: string;
  image: string;
}

interface ExpertiseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface CounterProps {
  value: number;
  label: string;
  duration?: number;
  delay?: number;
}

const About = () => {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Parallax effect refs
  const parallaxRef1 = useRef(null);
  const parallaxRef2 = useRef(null);


  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const programs: ProgramProps[] = [
    {
      title: "SMART TRADER PROFILE",
      shortName: "STP",
      description: "A national-focused course covering the Indian stock and derivative markets, teaching professional trading methods without relying on traditional indicators.",
      color: "#ff3a3a",
      image: "/program-stock.jpg"
    },
    {
      title: "FOREX CRYPTO HUSTLER",
      shortName: "FCH",
      description: "An internationally-oriented program teaching cryptocurrency fundamentals and forex trading strategies for global markets.",
      color: "#ff4d00",
      image: "/program-crypto.jpg"
    }
  ];

  const timelineItems: TimelineItemProps[] = [
    {
      year: "2021",
      title: "Foundation as Equity Tank",
      description: "Established as a premier financial market institute focused on trading education."
    },
    {
      year: "2022",
      title: "ISO Certification",
      description: "Received ISO 21008:2018 certification, setting industry standards for financial education."
    },
    {
      year: "2023",
      title: "Rebranded to Monark FX",
      description: "Evolved into Monark FX with expanded course offerings and global reach."
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Extended our reach internationally, building a worldwide community of traders."
    }
  ];

  const expertiseItems: ExpertiseCardProps[] = [
    {
      icon: Users,
      title: "Personalized Mentorship",
      description: "One-on-one guidance from industry experts tailored to your trading goals"
    },
    {
      icon: Briefcase,
      title: "Live Trading Sessions",
      description: "Real-time market analysis and trading demonstrations with professional traders"
    },
    {
      icon: Award,
      title: "ISO Certification",
      description: "Comprehensive examinations leading to internationally recognized certification"
    },
    {
      icon: Book,
      title: "Multi-timeframe Analysis",
      description: "Advanced techniques for analyzing markets across different timeframes"
    }
  ];

  const achievements = [
    { value: 4.7, label: "Rating from 200+ reviews" },
    { value: 1000, label: "Offline Sessions Completed" },
    { value: 250, label: "Students Trained in person" },
    { value: 7, label: "Expert Trading Professionals" }
  ];

  return (
    <ReactLenis root options={{ smoothWheel: true, }}>
      <main className="bg-white overflow-hidden" ref={container}>
        <Background
          title='About Us'
          highlightedText='Monark FX'
          subtitle='Learn about our journey, vision, and expertise in the world of trading and finance.'
        />
        {/* Legacy Section */}
        <section id="legacy" className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                ref={parallaxRef1}
                style={{ y: y1 }}
                className="w-full md:w-1/2 relative"
              >
                <div className="relative z-10">
                  <Image
                    src="/placeholder.jpeg"
                    width={600}
                    height={400}
                    alt="Monark FX Legacy"
                    className="rounded-lg shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-red-100 rounded-lg -z-0"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-200 rounded-lg -z-0"></div>
              </motion.div>

              <div className="w-full md:w-1/2">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                      Our Legacy in <span className="text-red-600">Financial Education</span>
                    </h2>

                    <p className="text-gray-600 text-lg mb-6">
                      Monark FX is an ISO 21008:2018 Certified Institute established in 2021
                      (formerly known as Equity Tank). We are a premier financial market institute
                      specializing in trading and finance education across Stocks, Forex, and Cryptocurrency markets.
                    </p>

                    <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                      <p className="italic text-red-700">
                        "At Monark FX, we don't just teach trading; we build traders who transform markets."
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-gradient-to-b from-white to-red-50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-red-600 mb-16"
            >
              Our Journey
            </motion.h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-200"></div>

              {/* Timeline items */}
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="md:flex-1 md:px-12">
                    <div
                      className={`p-8 rounded-lg shadow-xl border-t-4 ${index % 2 === 0
                        ? 'text-right md:mr-6 border-red-600 bg-gradient-to-br from-white to-red-50'
                        : 'md:ml-6 border-red-400 bg-gradient-to-br from-white to-red-50'
                        } hover:shadow-2xl transition-all duration-300 backdrop-blur-sm`}
                    >
                      <h3 className="text-2xl font-bold text-red-600 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full h-16 w-16 flex items-center justify-center font-bold text-xl shadow-lg z-10 border-2 border-white"
                    >
                      {item.year}
                    </motion.div>
                  </div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-24 relative bg-white">
          <motion.div
            ref={parallaxRef2}
            style={{ y: y2 }}
            className="absolute top-10 right-10 w-64 h-64 bg-red-50 rounded-full opacity-70 z-0"
          ></motion.div>
          <motion.div
            style={{ y: y3 }}
            className="absolute bottom-10 left-10 w-40 h-40 bg-red-100 rounded-full opacity-50 z-0"
          ></motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-white p-10 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-red-600"
              >
                <div className="bg-red-100 p-4 inline-block rounded-full mb-6">
                  <Star className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  At Monark FX, we envision building a lasting legacy in the world of trading and finance
                  by empowering individuals with the knowledge and skills to succeed in the financial markets.
                  Through expert guidance, innovative learning solutions, and a commitment to excellence,
                  we strive to create a global community of confident and successful traders.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-white p-10 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-red-600"
              >
                <div className="bg-red-100 p-4 inline-block rounded-full mb-6">
                  <Target className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our mission is to empower individuals with the knowledge and skills needed to excel
                  in trading across multiple financial markets. By providing expert-led offline and online courses,
                  we build a community of informed traders and investors, fostering growth and success
                  while paving the way for a lasting legacy.
                </p>
              </motion.div>
            </div>
          </div>
        </section>



        {/* Expertise Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-red-600 mb-4">Our Expertise</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Backed by a team of seven expert professionals, each specializing in different trading segments,
                Monark FX ensures that learners receive insightful and practical guidance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertiseItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-xl shadow-lg border border-red-100 hover:border-red-300 transition-all"
                  >
                    <div className="bg-red-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                      <IconComponent className="text-red-600 h-8 w-8" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Achievements Section with Counter Animation */}
        <section className="py-24 bg-gradient-to-r from-red-600 to-red-800 text-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16"
            >
              Our Achievements
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: index * 0.01 }}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center hover:bg-white/20 transition-colors"
                >
                  <Counter
                    value={item.value}
                    label={item.label}
                    delay={index * 0.2}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Ready to Start Your Trading Journey?
              </h2>
              <p className="text-gray-600 text-lg mb-10">
                Join our expert-led community and gain the skills to succeed in financial markets.
              </p>
              <a
                href="/contact"
                className="px-10 py-4 bg-red-600 text-white text-lg font-bold rounded-full hover:bg-red-700 transition-colors inline-flex items-center group"
              >
                Contact Us Today
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
};

// Counter animation component
const Counter: React.FC<CounterProps> = ({ value, label, duration = 2, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const inView = useRef(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !inView.current) {
      inView.current = true;

      let start = 0;
      const isDecimal = !Number.isInteger(value);
      const decimals = isDecimal ? 1 : 0;
      const end = value;
      const incrementTime = (duration * 1000) / end;

      setTimeout(() => {
        const timer = setInterval(() => {
          start += 0.1;
          setCount(parseFloat(Math.min(start, end).toFixed(decimals)));

          if (start >= end) {
            clearInterval(timer);
          }
        }, incrementTime);

        return () => clearInterval(timer);
      }, delay * 500);
    }
  }, [isInView, value, duration, delay]);

  return (
    <div ref={ref}>
      <div className="text-4xl font-bold mb-2">
        {count}
        {value === 4.7 && <span className="text-yellow-300">/5</span>}
        {value === 7 && <span>+</span>}
        {value >= 250 && <span>+</span>}
      </div>
      <div className="text-white/80">{label}</div>
    </div>
  );
};

export default About;