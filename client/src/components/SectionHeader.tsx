"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  accent?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  accent = true,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Alignment utility
  const getAlignmentClasses = () => {
    switch (align) {
      case "left":
        return "text-left items-start";
      case "right":
        return "text-right items-end";
      case "center":
      default:
        return "text-center items-center";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "flex flex-col",
        getAlignmentClasses(),
        "gap-4 mb-12",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className={cn(
            "text-green-500 font-medium uppercase tracking-wider text-sm",
            subtitleClassName
          )}
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Title with accent line */}
      <div className="relative">
        <motion.h2
          className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold text-white",
            titleClassName
          )}
          variants={itemVariants}
        >
          {title}
        </motion.h2>

        {accent && (
          <motion.div
            className={cn(
              "h-1 bg-gradient-to-r from-green-500 to-green-600 mt-4",
              align === "center" ? "w-16 mx-auto" : "w-16"
            )}
            initial={{ width: 0, opacity: 0 }}
            animate={
              isInView ? { width: 64, opacity: 1 } : { width: 0, opacity: 0 }
            }
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        )}
      </div>

      {/* Description */}
      {description && (
        <motion.p
          className={cn(
            "text-gray-400 max-w-2xl mt-2",
            align === "center" ? "mx-auto" : "",
            descriptionClassName
          )}
          variants={itemVariants}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
