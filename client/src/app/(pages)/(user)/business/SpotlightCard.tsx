import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  hoverScale?: boolean;
  glowOnHover?: boolean;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 59, 59, 0.15)",
  hoverScale = true,
  glowOnHover = true,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={hoverScale ? { y: -5 } : undefined}
      className={`relative rounded-2xl bg-white p-8 transition-all duration-300 ${
        glowOnHover && isHovered ? "shadow-lg shadow-red-500/10" : "shadow-md"
      } ${className}`}
    >
      {/* Spotlight gradient effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          opacity: isHovered ? 0.7 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Border glow */}
      {glowOnHover && (
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: "inset 0 0 0 1px rgba(255, 59, 59, 0.1)",
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default SpotlightCard;
