import Image from "next/image"
import { motion } from "framer-motion"

export const Testimonial = ({
    name,
    role,
    content,
    avatar,
}: {
    name: string
    role: string
    content: string
    avatar: string
}) => {
    return (
        <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center mb-4">
                <Image src={avatar || "/placeholder.svg"} alt={name} width={48} height={48} className="rounded-full mr-4" />
                <div>
                    <h3 className="text-lg font-semibold text-white">{name}</h3>
                    <p className="text-sm text-gray-400">{role}</p>
                </div>
            </div>
            <p className="text-gray-300 italic">&ldquo;{content}&rdquo;</p>
        </motion.div>
    )
}

