"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FuturisticButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function FuturisticButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled = false,
  icon,
  iconPosition = "right",
  fullWidth = false,
  type = "button",
}: FuturisticButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-black text-white hover:bg-red-600/90 border-red-600/40 shadow-red-600/20";
      case "secondary":
        return "bg-white/5 backdrop-blur-md text-white hover:bg-white/10 border-white/20 shadow-white/10";
      case "outline":
        return "bg-transparent text-white hover:bg-white/5 border-red-600/60 shadow-red-600/20";
      default:
        return "bg-black text-white hover:bg-red-600/90 border-red-600/40 shadow-red-600/20";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs py-2 px-3";
      case "md":
        return "text-sm py-2.5 px-4";
      case "lg":
        return "text-base py-3 px-6";
      default:
        return "text-sm py-2.5 px-4";
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 border shadow-lg",
        getVariantClasses(),
        getSizeClasses(),
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: disabled ? 1 : 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: disabled ? 1 : 0.98,
        transition: { duration: 0.1 },
      }}
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-white/10 opacity-0"
        whileHover={{ opacity: 1, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Button content */}
      <div className="relative flex items-center justify-center gap-2 z-10">
        {icon && iconPosition === "left" && (
          <motion.span
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {icon}
          </motion.span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <motion.span
            initial={{ x: 5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="group-hover:translate-x-1 transition-transform duration-300"
          >
            {icon}
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}
