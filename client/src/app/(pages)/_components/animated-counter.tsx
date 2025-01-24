import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export const AnimatedCounter = ({
    value,
    symbol = "",
    inView,
}: { value: number; symbol?: string; inView: boolean }) => {
    const [count, setCount] = useState(0)
    const countRef = useRef(null)

    useEffect(() => {
        if (inView) {
            const duration = 2000
            const steps = 60
            const stepDuration = duration / steps
            let currentStep = 0

            const timer = setInterval(() => {
                currentStep += 1
                const progress = currentStep / steps
                const easedProgress = easeOutQuart(progress)
                setCount(Math.floor(easedProgress * value))

                if (currentStep >= steps) {
                    clearInterval(timer)
                    setCount(value)
                }
            }, stepDuration)

            return () => clearInterval(timer)
        }
    }, [inView, value])

    const easeOutQuart = (x: number): number => {
        return 1 - Math.pow(1 - x, 4)
    }

    return (
        <motion.span
            ref={countRef}
            className="tabular-nums"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {count.toLocaleString()}
            {symbol}
        </motion.span>
    )
}

