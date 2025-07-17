"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FuturisticCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc?: string;
  className?: string;
  onClick?: () => void;
  badge?: string;
  borderGlow?: boolean;
  aspectRatio?: "1:1" | "4:3" | "16:9";
  children?: React.ReactNode;
}

export default function FuturisticCard({
  title,
  subtitle,
  description,
  imageSrc,
  className,
  onClick,
  badge,
  borderGlow = true,
  aspectRatio = "4:3",
  children,
}: FuturisticCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle mouse move to create the spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate normalized position (0 to 1) within the card
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  // Map aspect ratio to tailwind classes
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "1:1":
        return "aspect-square";
      case "16:9":
        return "aspect-video";
      case "4:3":
      default:
        return "aspect-[4/3]";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative rounded-xl overflow-hidden cursor-pointer bg-black/90 border border-gray-800/60",
        getAspectRatioClass(),
        borderGlow ? "group-hover:border-green-500/50" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight gradient effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 opacity-70 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%, rgba(220, 38, 38, 0.15), transparent 40%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Border glow effect */}
      {borderGlow && (
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-green-900 rounded-xl blur-sm opacity-0 group-hover:opacity-50 transition duration-500"
          animate={{
            opacity: isHovered ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Card content container */}
      <div className="relative h-full w-full z-20 flex flex-col">
        {/* Image section */}
        {imageSrc && (
          <div className="relative w-full h-1/2">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3 z-30">
            <span className="inline-flex items-center rounded-md bg-green-600/90 px-2 py-1 text-xs font-medium text-white">
              {badge}
            </span>
          </div>
        )}

        {/* Content section */}
        <div
          className={cn(
            "flex flex-col p-5 relative z-20",
            imageSrc ? "h-1/2 justify-end" : "h-full justify-between"
          )}
        >
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            {subtitle && (
              <p className="text-sm font-medium text-green-500 mb-2">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-sm text-gray-400 line-clamp-3">
                {description}
              </p>
            )}
          </div>

          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </motion.div>
  );
}
