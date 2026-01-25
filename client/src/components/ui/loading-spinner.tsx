"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LoadingSpinnerProps {
    showLogo?: boolean;
    size?: "sm" | "md" | "lg";
    text?: string;
}

export function LoadingSpinner({
    showLogo = true,
    size = "md",
    text = "Loading"
}: LoadingSpinnerProps) {
    // Size configurations
    const config = {
        sm: {
            logoSize: 40,
            containerClass: "p-3",
            dotSize: "h-1.5 w-1.5",
            fontSize: "text-xs",
        },
        md: {
            logoSize: 60,
            containerClass: "p-4",
            dotSize: "h-2 w-2",
            fontSize: "text-sm",
        },
        lg: {
            logoSize: 80,
            containerClass: "p-6",
            dotSize: "h-2.5 w-2.5",
            fontSize: "text-base",
        },
    };

    const { logoSize, containerClass, dotSize, fontSize } = config[size];

    // Animation variants
    const pulseAnimation = {
        initial: { opacity: 0.3, scale: 0.95 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse" as const
            }
        },
    };

    const dotContainerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const dotVariants = {
        initial: { y: 0 },
        animate: {
            y: [-4, 0, -4],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatType: "loop" as const
            }
        },
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            {showLogo && (
                <motion.div
                    className={`bg-red-600 rounded-md ${containerClass}`}
                    variants={pulseAnimation}
                    initial="initial"
                    animate="animate"
                >
                    <Image
                        src="/logo-light.png"
                        alt="MonarkFX"
                        width={logoSize}
                        height={logoSize}
                        className="rounded-sm"
                    />
                </motion.div>
            )}

            <div className="flex flex-col items-center gap-2">
                <motion.div
                    className="flex items-center gap-1.5"
                    variants={dotContainerVariants}
                    initial="initial"
                    animate="animate"
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className={`rounded-full bg-red-600 ${dotSize}`}
                            variants={dotVariants}
                        />
                    ))}
                </motion.div>

                <motion.p
                    className={`text-gray-600 font-medium ${fontSize}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {text}
                </motion.p>
            </div>
        </div>
    );
}
