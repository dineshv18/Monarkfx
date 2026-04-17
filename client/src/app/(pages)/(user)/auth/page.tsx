"use client";

import AuthComponent from "./AuthComponent";
import { motion } from "framer-motion";

export default function AuthPage({
  searchParams,
}: {
  searchParams: { "course-slug": string };
}) {
  const courseSlug = searchParams["course-slug"];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-bg-primary)]">
      <div className="flex-1 flex items-center justify-center p-6 bg-[var(--color-bg-primary)]">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthComponent courseSlug={courseSlug} />
        </motion.div>
      </div>

      <div className="hidden md:block md:w-1/2 relative overflow-hidden bg-[var(--color-primary-red)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:38px_38px] opacity-40" />
        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center space-y-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className="text-5xl font-heading font-bold text-white">
                Monark<span className="text-black">FX</span>
              </h2>
            </motion.div>

            {/* Tagline */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xl text-white/90 font-medium">
                Learn. Trade. Grow with confidence.
              </p>
            </motion.div>

            {/* Certification Badge */}
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="h-px w-8 bg-white/80" />
              <span className="text-white text-xs tracking-[0.15em] uppercase">Practical Trading Education</span>
              <span className="h-px w-8 bg-white/80" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
