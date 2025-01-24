import { motion, useTransform } from "framer-motion"
import Image from "next/image"

export const ImageCard = ({
    src,
    alt,
    title,
    desc,
    icon,
    scrollYProgress,
    index,
}: {
    src: string
    alt: string
    title: string
    desc: string
    icon: string
    scrollYProgress: any
    index: number
}) => {
    const scale = useTransform(scrollYProgress, [index * 0.25, (index + 1) * 0.25], [0.8, 1])
    const opacity = useTransform(scrollYProgress, [index * 0.25, (index + 1) * 0.25], [0, 1])
    const rotate = useTransform(scrollYProgress, [index * 0.25, (index + 1) * 0.25], [5, 0])

    return (
        <motion.figure style={{ scale, opacity, rotate }} className="sticky top-0 h-screen grid place-content-center">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl shadow-black/50 w-96 h-96">
                <Image
                    src={src || "/placeholder.svg"}
                    alt={alt}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-xl sm:text-2xl">{icon}</span>
                        <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
                    </div>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{desc}</p>
                </div>
            </div>
        </motion.figure>
    )
}

