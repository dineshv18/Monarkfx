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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="relative group"
        >
            <div
                className="bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-red-600/10 
                    hover:border-red-600/30 transition-all duration-300 h-full
                    hover:shadow-lg hover:shadow-red-600/10"
            >
                <div className="flex flex-col items-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors duration-300">
                        <AnimatedCounter value={value} symbol={symbol} inView={inView} />
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-200 mb-1 text-center">
                        {label}
                    </p>
                    <p className="text-gray-400 text-center text-[10px] sm:text-xs">{description}</p>
                </div>
            </div>
        </motion.div>
    )
}

