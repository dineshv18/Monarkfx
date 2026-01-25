"use client";

import Image from "next/image";
import AuthComponent from "./AuthComponent";
import { motion } from "framer-motion";

export default function AuthPage({
  searchParams,
}: {
  searchParams: { "course-slug": string };
}) {
  const courseSlug = searchParams["course-slug"];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0a0a]">
      {/* Left Section - Brand */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black/80 to-black z-10" />
        <Image
          src="/bg.jpeg"
          alt="Trading Background"
          fill
          className="object-cover object-center opacity-60 scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          quality={100}
        />
        <div className="absolute inset-0 backdrop-blur-[2px] z-20" />

        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center space-y-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src="/logo-light.png"
                alt="Monark FX"
                width={200}
                height={60}
                className="h-14 w-auto object-contain mx-auto"
              />
            </motion.div>

            {/* Tagline */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xl text-white/80 font-light">
                Financial Market Education
              </p>
            </motion.div>

            {/* Certification Badge */}
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="h-px w-8 bg-red-800" />
              <span className="text-[#525252] text-xs tracking-[0.15em] uppercase">
                ISO 21008:2018 Certified
              </span>
              <span className="h-px w-8 bg-red-800" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#0a0a0a]">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthComponent courseSlug={courseSlug} />
        </motion.div>
      </div>
    </div>
  );
}
