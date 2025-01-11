"use client";

import { AnimatedDots } from "./AnimatedDots";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCountAnimation } from "./useCountAnimation";
import { HeroSectionProps } from "@/type";
import { useState } from "react";

export function HeroSection({
  smallText,
  title,
  description,
  image,
  backgroundColor = "var(--custom-green-1)",
  buttons,
  stats,
  className,
  variant = "page",
}: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant !== "home") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  const calculateTilt = () => {
    const tiltX = (mousePosition.y - 0.5) * 20;
    const tiltY = (mousePosition.x - 0.5) * -20;
    return `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full",
        variant === "home" ? "min-h-screen" : "h-[400px] md:h-[450px]",
        className
      )}
      style={{ backgroundColor }}
    >
      <AnimatedDots />
      <div className="container relative mx-auto px-4 h-full max-w-7xl">
        <div
          className={cn(
            "flex flex-col lg:flex-row h-full",
            variant === "home" ? "pt-20" : "py-8",
            variant === "page" ? "items-center" : "items-end"
          )}
        >
          <div
            className={cn(
              "w-full lg:w-1/2",
              variant === "home" ? "lg:max-w-3xl lg:pb-20" : "lg:max-w-2xl",
              variant === "home" ? "text-center lg:text-left" : "text-left"
            )}
          >
            {smallText && (
              <p className="text-lg md:text-xl text-[#C5E82C] font-medium mb-4">
                {smallText}
              </p>
            )}
            <h1
              className={cn(
                "font-bold text-white leading-tight",
                variant === "home"
                  ? "text-5xl md:text-6xl lg:text-7xl"
                  : "text-3xl md:text-5xl lg:text-6xl"
              )}
            >
              {title}
            </h1>
            {description && (
              <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0">
                {description}
              </p>
            )}
            {buttons && (
              <div
                className={cn(
                  "mt-8 flex flex-wrap gap-5",
                  variant === "home"
                    ? "justify-center lg:justify-start"
                    : "justify-start"
                )}
              >
                {buttons}
              </div>
            )}
            {stats && variant === "home" && (
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto lg:mx-0">
                {stats.map((stat) => (
                  <StatCounter key={stat.label} {...stat} />
                ))}
              </div>
            )}
          </div>
          {image && (
            <div
              className={cn(
                "w-full relative",
                variant === "home"
                  ? "lg:w-1/2 h-[500px] lg:h-[600px] -mb-24 ml-0 lg:ml-24"
                  : "lg:w-2/5 h-[300px] lg:h-[400px] -mb-24 ml-0 lg:ml-24",
                "flex items-end justify-center lg:justify-end"
              )}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={cn(
                  "relative w-full h-full",
                  variant === "home" && "hover:scale-110"
                )}
                style={{
                  transform: variant === "home" ? calculateTilt() : undefined,
                  transformStyle: "preserve-3d",
                  transition: "all 0.3s ease-out",
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={800}
                  className={cn(
                    "object-contain w-full h-full",
                    variant === "home" && "transition-all duration-300"
                  )}
                  priority
                />

                <Image
                  src="/bs.webp"
                  alt="Hero image"
                  width={800}
                  height={800}
                  className="absolute bottom-0 left-0 object-contain w-full h-full transition-all duration-300 smooth-move"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCounter({
  number,
  label,
  endValue,
}: {
  number: string;
  label: string;
  endValue: number;
}) {
  const count = useCountAnimation(endValue);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-white">{count}+</div>
      <div className="text-white/60 mt-2">{label}</div>
    </div>
  );
}
