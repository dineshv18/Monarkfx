'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, ArrowRight, CheckCircle, LucideIcon, Target } from 'lucide-react';
import Image from 'next/image';
import Background from '../../_components/Background';
import SpotlightCard from '../business/SpotlightCard';

interface ValueType {
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
  img: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  color: string;
  progress: any;
  range: [number, number];
  targetScale: number;
  icon: LucideIcon;
  img: string;
}

interface StatType {
  value: string;
  label: string;
}

const About = () => {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const values: ValueType[] = [
    {
      title: "Premier Financial Education",
      description: "Established in 2021, Monark FX (formerly Equity Tank) is an ISO 21008:2018 Certified Institute. We provide comprehensive education in Stocks, Forex, and Cryptocurrency markets, empowering traders with practical knowledge and strategic insights.",
      color: "#5196fd",
      icon: CheckCircle,
      img: "/card/c1.jpg"
    },
    {
      title: "Expert-Led Training Programs",
      description: "Our diverse range of offline and online courses are crafted by seasoned industry professionals. Whether you're a beginner or an experienced trader, our programs offer personalized learning paths with real-world trading strategies and hands-on experience.",
      color: "#8f89ff",
      icon: Trophy,
      img: "/card/c1.jpg"
    },
    {
      title: "Global Trading Excellence",
      description: "With a commitment to fostering growth and success, we ensure top-notch guidance in specialized trading segments. Our mission extends beyond borders as we continue to expand globally, building a community of confident and successful traders worldwide.",
      color: "#13006c",
      icon: ArrowRight,
      img: "/card/c1.jpg"
    },
    {
      title: "Practical Market Approach",
      description: "Navigate the complexities of financial markets with confidence through our practical insights and strategic approaches. Our focus on real-world application ensures you're well-equipped to handle dynamic market conditions.",
      color: "#ed649e",
      icon: Target,
      img: "/card/c1.jpg"
    }
  ];

  const stats: StatType[] = [
    { value: "ISO 21008:2018", label: "Certified Institute" },
    { value: "15,000+", label: "Students Trained" },
    { value: "Since 2021", label: "Excellence" },
    { value: "24/7", label: "Expert Support" }
  ];

  return (
    <ReactLenis root>
      <main className="bg-white" ref={container}>
        <Background
          title="About"
          highlightedText="Monark FX"
          subtitle="Leading Financial Market Institute"
        />

        {/* Stacking Cards Section */}
        <section className="relative z-10">
          {values.map((value, i) => {
            const targetScale = 1 - (values.length - i) * 0.05;
            return (
              <Card
                key={`v_${i}`}
                i={i}
                {...value}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-red-50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-red-600 text-center mb-12"
            >
              Why Choose Monark FX?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-white rounded-xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-all"
                >
                  <h3 className="text-2xl font-bold text-red-600 text-center mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-center">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-red-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-red-600">© 2024 Monark FX. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </ReactLenis>
  );
};

const Card: React.FC<CardProps> = ({ i, title, description, color, progress, range, targetScale, icon: Icon, img }) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale }}
        className="flex flex-col relative w-full md:w-[80%] px-4"
      >
        <motion.div
          style={{
            backgroundColor: color,
            top: `calc(-5vh + ${i * 25}px)`,
          }}
          className="relative h-[500px] rounded-xl border-2 border-red-100 origin-top"
        >

          <div className="flex flex-col md:flex-row h-full gap-6 p-8">
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <Icon className="h-12 w-12 text-red-600 mb-6 mx-auto md:mx-0" />
              <h2 className="text-2xl font-bold text-red-600 mb-4 text-center md:text-left">
                {title}
              </h2>
              <p className="text-gray-600 text-center md:text-left">
                {description}
              </p>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <motion.div
                className="w-full h-full bg-red-50 rounded-lg overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;