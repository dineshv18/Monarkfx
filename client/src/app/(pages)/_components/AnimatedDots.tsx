"use client";

import { Dot } from "@/type";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedDots() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const generateDots = () => {
      const newDots: Dot[] = [];
      const numDots = Math.floor(
        (window.innerWidth * window.innerHeight) / 30000
      );

      for (let i = 0; i < numDots; i++) {
        newDots.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
        });
      }
      setDots(newDots);
    };

    generateDots();
    window.addEventListener("resize", generateDots);
    return () => window.removeEventListener("resize", generateDots);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute w-2 h-2 bg-yellow-500/70 rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
          animate={{
            x: [5, -5],
            scale: [1, 1.2],
            opacity: [0.3, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(219, 202, 7,0.10) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />
    </div>
  );
}