"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main className="relative bg-gradient-to-t from-zinc-900/95 to-black/95  text-white overflow-hidden min-h-screen">
      {/* Custom Cursor */}
      {cursorText && (
        <motion.div
          className="fixed pointer-events-none z-50 bg-green-500 text-black px-3 py-1 rounded-full text-sm font-medium"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 30,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          {cursorText}
        </motion.div>
      )}

      <section
        ref={sectionRef}
        className="relative text-white w-full py-20 md:pt-32 overflow-hidden"
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          {/* Animated Grid */}
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e08_1px,transparent_1px),linear-gradient(to_bottom,#22c55e08_1px,transparent_1px)] bg-[size:60px_60px]"
            style={{
              maskImage:
                "radial-gradient(ellipse 90% 70% at 50% 50%, #000 60%, transparent 100%)",
              y: y,
            }}
          />

          {/* Multiple Glow Effects */}
          <motion.div
            className="absolute -top-[30%] right-[5%] w-[50%] h-[50%] bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/5 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.3, 1.1, 1],
              opacity: [0.4, 0.2, 0.3, 0.4],
              x: [0, 30, -20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-[30%] left-[5%] w-[45%] h-[45%] bg-gradient-to-tr from-green-600/12 via-lime-500/8 to-emerald-600/6 rounded-full blur-[140px]"
            animate={{
              scale: [1, 1.4, 1.2, 1],
              opacity: [0.3, 0.15, 0.25, 0.3],
              x: [0, -25, 15, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-[20%] left-[70%] w-[35%] h-[35%] bg-gradient-to-bl from-cyan-500/10 via-green-400/8 to-emerald-500/5 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.2, 1.1, 1],
              opacity: [0.2, 0.1, 0.15, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: 4,
            }}
          />
        </div>

        <div
          ref={containerRef}
          className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10"
        >
          <div>
            {/* Enhanced Section Header */}
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center bg-gradient-to-r from-green-950/80 to-emerald-950/80 backdrop-blur-md border border-green-700/50 px-6 py-2 rounded-full mb-6 hover:border-green-500/70 transition-all duration-500 group">
                <div className="w-5 h-5 mr-3 text-green-400 group-hover:text-green-300">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-green-300 group-hover:text-green-200 transition-colors">
                  Premium Trading Courses
                </span>
                <motion.div
                  className="ml-2 w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
              >
                Master the{" "}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 inline-block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Markets
                </motion.span>
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="flex justify-center mb-8"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 120 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
              >
                Expert-led trading courses designed to transform beginners into{" "}
                <motion.span
                  className="text-green-400 font-semibold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  consistently profitable
                </motion.span>{" "}
                traders
              </motion.p>
            </div>

            {/* Enhanced Main Content Card */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="relative bg-gradient-to-br from-gray-900/90 via-green-950/30 to-emerald-950/20 backdrop-blur-xl border border-green-700/30 rounded-2xl p-8 md:p-12 hover:border-green-500/50 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-green-500/10">
                <div className="grid md:grid-cols-3 gap-12">
                  <div className="md:col-span-2 space-y-8">
                    <motion.h3
                      className="text-3xl md:text-4xl font-bold text-white leading-tight"
                      variants={floatingVariants}
                      animate="animate"
                    >
                      Transform Your
                      <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 ml-3 inline-block"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ backgroundSize: "200% 200%" }}
                      >
                        Trading Journey
                      </motion.span>
                    </motion.h3>

                    <motion.p
                      className="text-gray-300 text-lg leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      Our comprehensive courses cover technical analysis, market
                      psychology, and risk management across stocks, forex, and
                      cryptocurrency markets with real-world applications.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        "Learn from professional traders with years of experience",
                        "Practice with real-world market scenarios and case studies",
                        "Access to exclusive trading community and ongoing support",
                        "Lifetime access to course updates and new materials",
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-4 group/item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            className="flex-shrink-0 text-green-400 bg-green-500/10 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 border border-green-500/30 group-hover/item:border-green-400/60 group-hover/item:bg-green-500/20 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.div>
                          <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => router.push("/courses")}
                      className="group relative flex items-center gap-3 text-white overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-500 mt-8 shadow-xl shadow-green-500/20 hover:shadow-green-400/30 hover:shadow-2xl"
                      onMouseEnter={() => setCursorText("Explore")}
                      onMouseLeave={() => setCursorText("")}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">View All Courses</span>
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 relative z-10"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12"
                        animate={{ x: ["-150%", "150%"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "linear",
                        }}
                      />
                    </motion.button>
                  </div>

                  {/* Enhanced 3D Visual */}
                  <div className="flex items-center justify-center">
                    <motion.div
                      className="relative w-48 h-48 md:w-56 md:h-56"
                      variants={floatingVariants}
                      animate="animate"
                    >
                      {/* Outer glow */}
                      <motion.div
                        className="absolute -inset-8 rounded-full bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-teal-500/5 blur-2xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Concentric circles with enhanced animation */}
                      {[0, 1, 2, 3, 4].map((index) => (
                        <motion.div
                          key={index}
                          className={`absolute border-2 rounded-full`}
                          style={{
                            inset: `${index * 12 + 8}px`,
                            borderColor: `rgba(34, 197, 94, ${
                              0.3 - index * 0.05
                            })`,
                          }}
                          animate={{
                            rotate: index % 2 === 0 ? 360 : -360,
                            borderColor: [
                              `rgba(34, 197, 94, ${0.3 - index * 0.05})`,
                              `rgba(16, 185, 129, ${0.4 - index * 0.05})`,
                              `rgba(34, 197, 94, ${0.3 - index * 0.05})`,
                            ],
                          }}
                          transition={{
                            rotate: {
                              duration: 15 + index * 5,
                              repeat: Infinity,
                              ease: "linear",
                            },
                            borderColor: {
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                        />
                      ))}

                      {/* Animated center dot */}
                      <motion.div
                        className="absolute w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-2xl shadow-green-500/50"
                        style={{
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            "0 0 20px rgba(34, 197, 94, 0.5)",
                            "0 0 40px rgba(34, 197, 94, 0.8)",
                            "0 0 20px rgba(34, 197, 94, 0.5)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Orbiting elements */}
                      {[0, 1, 2].map((index) => (
                        <motion.div
                          key={`orbit-${index}`}
                          className="absolute w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"
                          style={{
                            top: "50%",
                            left: "50%",
                            marginTop: "-6px",
                            marginLeft: "-6px",
                          }}
                          animate={{
                            rotate: 360 + index * 120,
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            rotate: {
                              duration: 8 + index * 2,
                              repeat: Infinity,
                              ease: "linear",
                            },
                            scale: {
                              duration: 2 + index * 0.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.3,
                            },
                          }}
                          initial={{
                            transformOrigin: `0px ${-60 - index * 15}px`,
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
