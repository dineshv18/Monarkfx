"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CursorType = "default" | "link" | "expanded";

export default function FuturisticCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-link");

      const isSpecial = target.classList.contains("cursor-expanded");

      if (isSpecial) {
        setCursorType("expanded");
      } else if (isLink) {
        setCursorType("link");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", (e) => {
      updatePosition(e);
      updateCursorType(e);
    });

    window.addEventListener("mouseenter", () => setVisible(true));
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseenter", () => setVisible(true));
      window.removeEventListener("mouseleave", () => setVisible(false));
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Hide the cursor when leaving the window or when on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleBlur = () => setVisible(false);
      const handleFocus = () => setVisible(true);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        setVisible(false);
      }

      window.addEventListener("blur", handleBlur);
      window.addEventListener("focus", handleFocus);

      return () => {
        window.removeEventListener("blur", handleBlur);
        window.removeEventListener("focus", handleFocus);
      };
    }
  }, []);

  const mainCursorVariants = {
    default: {
      height: 36,
      width: 36,
      x: position.x - 18,
      y: position.y - 18,
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "2px solid rgba(100, 150, 255, 0.6)",
      scale: clicked ? 0.8 : 1,
    },
    link: {
      height: 64,
      width: 64,
      x: position.x - 32,
      y: position.y - 32,
      backgroundColor: "rgba(100, 150, 255, 0.1)",
      border: "2px solid rgba(100, 150, 255, 0.7)",
      scale: clicked ? 0.9 : 1,
    },
    expanded: {
      height: 120,
      width: 120,
      x: position.x - 60,
      y: position.y - 60,
      backgroundColor: "rgba(100, 150, 255, 0.05)",
      border: "2px solid rgba(100, 150, 255, 0.5)",
      scale: clicked ? 0.9 : 1,
    },
  };

  const dotVariants = {
    default: {
      height: 6,
      width: 6,
      x: position.x - 3,
      y: position.y - 3,
      backgroundColor: "rgba(100, 150, 255, 0.9)",
      scale: clicked ? 1.5 : 1,
    },
    link: {
      height: 8,
      width: 8,
      x: position.x - 4,
      y: position.y - 4,
      backgroundColor: "rgba(100, 150, 255, 1)",
      scale: clicked ? 2 : 1,
    },
    expanded: {
      height: 10,
      width: 10,
      x: position.x - 5,
      y: position.y - 5,
      backgroundColor: "rgba(100, 150, 255, 0.8)",
      scale: clicked ? 1.8 : 1,
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        animate={cursorType}
        variants={mainCursorVariants}
        style={{
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        animate={cursorType}
        variants={dotVariants}
        style={{
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400,
          mass: 0.3,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-40 backdrop-blur-sm"
        animate={{
          height: 60,
          width: 60,
          x: position.x - 30,
          y: position.y - 30,
          opacity: cursorType === "link" ? 0.15 : 0,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5,
          opacity: { duration: 0.2 },
        }}
      />
    </>
  );
}
