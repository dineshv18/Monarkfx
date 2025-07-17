import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export const Testimonial = ({
  name,
  role,
  content,
  avatar,
}: {
  name: string;
  role: string;
  content: string;
  avatar: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative bg-black/80 backdrop-blur-md rounded-lg p-6 border border-white/10 overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-900/10 rounded-lg opacity-0"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content container with hover effect */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-6">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-green-500 rounded-full blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 0.5 : 0,
                scale: isHovered ? 1.1 : 0.8,
              }}
              transition={{ duration: 0.4 }}
            />
            <Image
              src={avatar || "/placeholder.svg"}
              alt={name}
              width={56}
              height={56}
              className="rounded-full relative z-10 border border-white/20 shadow-lg"
            />
          </div>
          <div className="ml-4">
            <motion.h3
              className="text-lg font-semibold text-white"
              animate={{
                color: isHovered ? "#ff2d55" : "#ffffff",
              }}
              transition={{ duration: 0.3 }}
            >
              {name}
            </motion.h3>
            <p className="text-sm text-gray-400">{role}</p>
          </div>
        </div>
        <motion.p
          className="text-gray-300 italic leading-relaxed"
          animate={{
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          &ldquo;{content}&rdquo;
        </motion.p>

        <motion.div
          className="h-[2px] bg-gradient-to-r from-green-500 to-green-800 mt-6 rounded-full"
          initial={{ width: "30%", opacity: 0.5 }}
          animate={{
            width: isHovered ? "100%" : "30%",
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};
