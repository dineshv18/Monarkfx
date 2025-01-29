import { motion } from "framer-motion"
import { AnimatedCounter } from "./animated-counter"

export const StatsCard = ({
    Icon,
    value,
    symbol = "",
    label,
    delay,
    description,
    inView,
}: {
    Icon: any
    value: number
    symbol?: string
    label: string
    delay: number
    description: string
    inView: boolean
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay }}
            className="relative"
        >
            <div className="bg-white/5 p-4 rounded-lg border border-red-600/10 hover:border-red-600/20 transition-all">
                <div className="flex flex-col items-center">
                    <Icon className="w-6 h-6 text-red-600 mb-2" />
                    <h3 className="text-xl font-bold text-white">
                        <AnimatedCounter value={value} symbol={symbol} inView={inView} />
                    </h3>
                    <p className="text-sm text-gray-300 font-medium mb-1">
                        {label}
                    </p>
                    <p className="text-xs text-gray-400">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}