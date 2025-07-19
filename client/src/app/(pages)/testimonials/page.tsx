"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Star,
  Quote,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function TestimonialsPage() {
  // Animation refs
  const heroRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true });
  const isCtaInView = useInView(ctaRef, { once: true });

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Aisha Kumar",
      role: "Senior Trader",
      content:
        "The advanced trading strategies and institutional methods I learned here completely transformed my approach to the markets. The mentorship was invaluable.",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 5,
      course: "STP Course",
      earnings: "₹2.5L+",
    },
    {
      id: 2,
      name: "Vikram Singh",
      role: "Day Trader",
      content:
        "This platform offers unparalleled insights into market dynamics. Their risk management techniques and strategy development frameworks are game-changers.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 5,
      course: "FCH Course",
      earnings: "₹1.8L+",
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Algorithmic Trader",
      content:
        "Coming from a non-finance background, I was skeptical at first. But the structured curriculum and patient mentors helped me understand complex trading concepts easily.",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 5,
      course: "STP Course",
      earnings: "₹3.2L+",
    },
    {
      id: 4,
      name: "Rajesh Patel",
      role: "Options Specialist",
      content:
        "The options trading module was revolutionary. I now understand the true mechanics of market pricing and volatility in a way I never did before.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 5,
      course: "FCH Course",
      earnings: "₹4.1L+",
    },
    {
      id: 5,
      name: "Ananya Gupta",
      role: "Quantitative Analyst",
      content:
        "Their focus on quantitative methods and statistical edge finding has completely changed how I approach market analysis and trade execution.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 5,
      course: "STP Course",
      earnings: "₹2.8L+",
    },
    {
      id: 6,
      name: "Rahul Mehta",
      role: "Swing Trader",
      content:
        "The multi-timeframe analysis techniques and sector rotation strategies helped me improve my trade selection significantly. My consistency has improved tremendously.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 5,
      course: "FCH Course",
      earnings: "₹1.9L+",
    },
  ];

  const stats = [
    { value: "500+", label: "Success Stories", icon: Users },
    { value: "4.8/5", label: "Average Rating", icon: Star },

    { value: "98%", label: "Success Rate", icon: Award },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
    ));
  };

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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-zinc-900 via-black to-black overflow-hidden">
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
                <MessageSquare className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Success{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Stories
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Hear from our community of traders who have transformed their
              approach to the markets with our cutting-edge methodology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.a
                href="/courses"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <ArrowRight className="h-5 w-5" />
                Start Your Journey
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-all duration-300 px-8 py-4 border border-zinc-700 rounded-xl hover:border-green-500/50 hover:bg-zinc-900/50"
              >
                <span>Contact Us</span>
              </motion.a>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <stat.icon className="h-5 w-5 text-green-400" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-zinc-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            ref={testimonialsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              className="text-sm uppercase tracking-[0.2em] font-semibold text-green-500 inline-block mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              What Our Students Say
            </motion.span>
            <h2 className="text-5xl font-bold text-center text-white relative inline-block">
              Real <span className="text-green-500">Results</span>
              <motion.div
                className="absolute -bottom-3 left-0 w-full h-1 bg-green-500/20"
                initial={{ width: 0 }}
                animate={isTestimonialsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
            </h2>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300 mx-4">
                      <CardContent className="p-12">
                        <div className="text-center">
                          {/* Quote Icon */}
                          <div className="flex justify-center mb-8">
                            <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                              <Quote className="h-8 w-8 text-green-400" />
                            </div>
                          </div>

                          {/* Testimonial Content */}
                          <p className="text-xl text-zinc-300 mb-8 leading-relaxed max-w-3xl mx-auto italic">
                            "{testimonial.content}"
                          </p>

                          {/* Author Info */}
                          <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="relative">
                              <Image
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                width={80}
                                height={80}
                                className="rounded-full border-4 border-green-500/20"
                              />
                            </div>
                            <div className="text-left">
                              <h3 className="text-xl font-bold text-white">
                                {testimonial.name}
                              </h3>
                              <p className="text-green-400 font-medium">
                                {testimonial.role}
                              </p>
                              <p className="text-zinc-400 text-sm">
                                {testimonial.course}
                              </p>
                            </div>
                          </div>

                          {/* Rating and Earnings */}
                          <div className="flex items-center justify-center gap-8">
                            <div className="flex items-center gap-2">
                              {renderStars(testimonial.rating)}
                              <span className="text-zinc-400 ml-2">
                                {testimonial.rating}/5
                              </span>
                            </div>
                            <div className="text-green-400 font-bold text-lg">
                              Earnings: {testimonial.earnings}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-green-500 scale-125"
                        : "bg-zinc-600 hover:bg-zinc-500"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-32 bg-gradient-to-br from-zinc-900 to-black relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              More Success Stories
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Discover how our comprehensive trading education has transformed
              the lives of hundreds of traders.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative"
              >
                <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                        <Quote className="h-6 w-6 text-green-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-zinc-300 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-green-500/20"
                      />
                      <div>
                        <h3 className="font-bold text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-green-400 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Course and Rating */}
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 text-sm">
                        {testimonial.course}
                      </span>
                      <div className="flex items-center gap-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>

                    {/* Earnings */}
                    <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-center">
                        <div className="text-green-400 font-bold">
                          {testimonial.earnings}
                        </div>
                        <div className="text-zinc-400 text-sm">
                          Total Earnings
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
              <CardContent className="p-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                    <Star className="h-8 w-8 text-green-400" />
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Join Our{" "}
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Success Stories
                  </span>
                  ?
                </h2>

                <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
                  Start your trading journey today and become part of our
                  community of successful traders.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/courses"
                      className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <ArrowRight className="h-5 w-5" />
                      Explore Courses
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/contact"
                      className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-all duration-300 px-8 py-4 border border-zinc-700 rounded-xl hover:border-green-500/50 hover:bg-zinc-900/50"
                    >
                      <span>Contact Us</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
