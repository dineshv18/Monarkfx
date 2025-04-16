"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundSrc?: string;
  className?: string;
  bgClasses?: string;
  overlayColor?: string;
  direction?: "up" | "down";
  speed?: number;
}

export default function ParallaxSection({
  children,
  backgroundSrc,
  className,
  bgClasses,
  overlayColor = "bg-black/70",
  direction = "up",
  speed = 0.5,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different parallax effects based on direction
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? ["0%", `${-10 * speed}%`] : [`${-10 * speed}%`, "0%"]
  );

  return (
    <motion.section
      ref={ref}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Background with parallax effect */}
      {backgroundSrc ? (
        <motion.div
          className={cn(
            "absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10",
            bgClasses
          )}
          style={{
            y,
            backgroundImage: `url(${backgroundSrc})`,
          }}
        >
          {/* Overlay */}
          <div className={cn("absolute inset-0 w-full h-full", overlayColor)} />
        </motion.div>
      ) : (
        <motion.div
          className={cn(
            "absolute inset-0 w-full h-full bg-gradient-to-b from-black to-black/80 -z-10",
            bgClasses
          )}
          style={{ y }}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_14px]"></div>

          {/* Radial gradient */}
          <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          {/* Overlay */}
          <div className={cn("absolute inset-0 w-full h-full", overlayColor)} />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.section>
  );
}
