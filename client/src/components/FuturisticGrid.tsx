"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, stagger } from "framer-motion";
import { cn } from "@/lib/utils";

interface FuturisticGridProps {
  children: React.ReactNode[];
  className?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

export default function FuturisticGrid({
  children,
  className,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "gap-6",
}: FuturisticGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: false, amount: 0.1 });

  // Grid column configuration
  const getGridCols = () => {
    let gridColsClass = "";

    if (columns.sm) gridColsClass += ` grid-cols-${columns.sm}`;
    if (columns.md) gridColsClass += ` md:grid-cols-${columns.md}`;
    if (columns.lg) gridColsClass += ` lg:grid-cols-${columns.lg}`;
    if (columns.xl) gridColsClass += ` xl:grid-cols-${columns.xl}`;

    return gridColsClass;
  };

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Item variants for individual card animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      ref={gridRef}
      className={cn("grid w-full", getGridCols(), gap, className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="group relative"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
