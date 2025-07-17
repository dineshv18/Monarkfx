"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CursorType = "default" | "link" | "expanded" | "success" | "danger";

export default function FuturisticCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [clicked, setClicked] = useState(false);
  const [hasTrail, setHasTrail] = useState(false);

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
      const isSuccess = target.classList.contains("cursor-success");
      const isDanger = target.classList.contains("cursor-danger");
      const hasTrail = target.classList.contains("cursor-trail");

      setHasTrail(hasTrail);

      if (isSuccess) {
        setCursorType("success");
      } else if (isDanger) {
        setCursorType("danger");
      } else if (isSpecial) {
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
      height: 40,
      width: 40,
      x: position.x - 20,
      y: position.y - 20,
      backgroundColor: "rgba(0, 255, 0, 0)",
      border: "2px solid rgba(0, 255, 0, 0.3)",
      scale: clicked ? 0.8 : 1,
      rotate: clicked ? 45 : 0,
    },
    link: {
      height: 70,
      width: 70,
      x: position.x - 35,
      y: position.y - 35,
      backgroundColor: "rgba(0, 255, 0, 0.05)",
      border: "2px solid rgba(0, 255, 0, 0.5)",
      scale: clicked ? 0.9 : 1,
      rotate: clicked ? 180 : 0,
      boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)",
    },
    expanded: {
      height: 140,
      width: 140,
      x: position.x - 70,
      y: position.y - 70,
      backgroundColor: "rgba(0, 255, 0, 0.03)",
      border: "2px solid rgba(0, 255, 0, 0.3)",
      scale: clicked ? 0.9 : 1,
      rotate: 0,
      boxShadow: "0 0 30px rgba(0, 255, 0, 0.1)",
    },
    success: {
      height: 60,
      width: 60,
      x: position.x - 30,
      y: position.y - 30,
      backgroundColor: "rgba(0, 255, 0, 0.1)",
      border: "2px solid rgba(0, 255, 0, 0.6)",
      scale: clicked ? 1.2 : 1,
      rotate: clicked ? 180 : 0,
      boxShadow: "0 0 15px rgba(0, 255, 0, 0.3)",
    },
    danger: {
      height: 60,
      width: 60,
      x: position.x - 30,
      y: position.y - 30,
      backgroundColor: "rgba(255, 0, 0, 0.1)",
      border: "2px solid rgba(255, 0, 0, 0.6)",
      scale: clicked ? 1.2 : 1,
      rotate: clicked ? -180 : 0,
      boxShadow: "0 0 15px rgba(255, 0, 0, 0.3)",
    },
  };

  const dotVariants = {
    default: {
      height: 4,
      width: 4,
      x: position.x - 2,
      y: position.y - 2,
      backgroundColor: "rgba(0, 255, 0, 0.9)",
      scale: clicked ? 2 : 1,
      boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)",
    },
    link: {
      height: 8,
      width: 8,
      x: position.x - 4,
      y: position.y - 4,
      backgroundColor: "rgba(0, 255, 0, 1)",
      scale: clicked ? 2.5 : 1.5,
      boxShadow: "0 0 15px rgba(0, 255, 0, 0.7)",
    },
    expanded: {
      height: 12,
      width: 12,
      x: position.x - 6,
      y: position.y - 6,
      backgroundColor: "rgba(0, 255, 0, 0.8)",
      scale: clicked ? 2 : 1.2,
      boxShadow: "0 0 20px rgba(0, 255, 0, 0.6)",
    },
    success: {
      height: 10,
      width: 10,
      x: position.x - 5,
      y: position.y - 5,
      backgroundColor: "#00ff00",
      scale: clicked ? 2 : 1.5,
      boxShadow: "0 0 20px rgba(0, 255, 0, 0.8)",
    },
    danger: {
      height: 10,
      width: 10,
      x: position.x - 5,
      y: position.y - 5,
      backgroundColor: "#ff0000",
      scale: clicked ? 2 : 1.5,
      boxShadow: "0 0 20px rgba(255, 0, 0, 0.8)",
    },
  };

  // Trading-inspired trail effect
  const trailVariants = {
    initial: {
      opacity: 0.3,
      scale: 1,
    },
    animate: {
      opacity: 0,
      scale: 0.5,
    },
  };

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={cursorType}
        variants={mainCursorVariants}
        style={{
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400,
          mass: 0.8,
        }}
      />

      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={cursorType}
        variants={dotVariants}
        style={{
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 450,
          mass: 0.4,
        }}
      />

      {/* Outer glow effect */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-40 backdrop-blur-sm"
        animate={{
          height: 100,
          width: 100,
          x: position.x - 50,
          y: position.y - 50,
          opacity: cursorType === "link" ? 0.1 : 0,
          backgroundColor: cursorType === "danger" ? "rgba(255, 0, 0, 0.05)" : "rgba(0, 255, 0, 0.05)",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5,
          opacity: { duration: 0.2 },
        }}
      />

      {/* Trading-inspired trail effect */}
      {hasTrail && visible && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 rounded-full pointer-events-none z-40"
              initial="initial"
              animate="animate"
              variants={trailVariants}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                repeat: Infinity,
              }}
              style={{
                width: 20,
                height: 20,
                x: position.x - 10,
                y: position.y - 10,
                backgroundColor: cursorType === "danger" ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 255, 0, 0.2)",
                border: `1px solid ${cursorType === "danger" ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 0, 0.3)"}`,
              }}
            />
          ))}
        </>
      )}
    </>
  );
}