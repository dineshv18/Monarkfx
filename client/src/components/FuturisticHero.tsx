"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import FuturisticButton from "./FuturisticButton";

interface FuturisticHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  onCtaClick?: () => void;
}

export default function FuturisticHero({
  title,
  subtitle,
  description,
  className,
  ctaText = "Get Started",
  ctaLink,
  backgroundImage = "/bg.jpeg",
  onCtaClick,
}: FuturisticHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax and fade effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const blurFilter = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(0px)", "blur(5px)"]
  );

  // Title animation
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Words animation (staggered)
  const subtitleWords = subtitle?.split(" ") || [];
  const descriptionWords = description?.split(" ") || [];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative min-h-screen w-full flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background effect */}
      <motion.div
        className="absolute inset-0 w-full h-full -z-10"
        style={{ y, scale, filter: blurFilter, opacity }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-gray-50/80 to-white z-10" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444415_1px,transparent_1px),linear-gradient(to_bottom,#ef444415_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-20"></div>

        {/* Background image */}
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-20 z-10 relative text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="max-w-4xl mx-auto"
        >
          {/* Red line accent */}
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          />

          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
            variants={titleVariants}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <div className="mb-6">
              {subtitleWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="text-xl sm:text-2xl font-semibold text-red-500 inline-block mr-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.5 + i * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10">
              {descriptionWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.8 + i * 0.03,
                      duration: 0.4,
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 1.2,
                duration: 0.6,
              },
            }}
            className="mt-8"
          >
            <FuturisticButton
              variant="primary"
              size="lg"
              onClick={onCtaClick}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              {ctaText}
            </FuturisticButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-red-500 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
