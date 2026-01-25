"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    // Set isFirstMount to false after first render
    const timer = setTimeout(() => {
      setIsFirstMount(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.61, 1, 0.88, 1],
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.4,
        ease: [0.61, 1, 0.88, 1],
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={isFirstMount ? "enter" : "initial"}
        animate="enter"
        exit="exit"
        variants={variants}
        className="w-full h-full"
      >
        {children}
        {!isFirstMount && (
          <motion.div
            className="fixed inset-0 bg-[#0a0a0a]/80 z-[100] pointer-events-none"
            initial={{ scaleY: 1, originY: 0 }}
            animate={{
              scaleY: 0,
              originY: 0,
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
