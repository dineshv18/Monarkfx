import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CourseCardProps } from "@/type";
import { TrendingUp, Crown, Flame, Clock, BookOpen, Tag, Gift } from "lucide-react";
import { formatDate, formatPrice } from "@/helper/FormatPrice";

export default function EnhancedCourseCard({ course }: CourseCardProps) {
  const isFree = !course.paid;

  return (
    <Link href={`/courses/${course.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        className="relative h-full rounded-xl overflow-hidden bg-white dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={course.thumbnail ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${course.thumbnail}` : "/placeholder.jpg"}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />

          {/* Badges Container */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[80%]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm capitalize">
                {course.category?.name}
              </Badge>
            </motion.div>
            {course.isBestseller && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-amber-500/90 text-white backdrop-blur-sm">
                  <Crown className="w-3.5 h-3.5 mr-1" /> Bestseller
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-4 right-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`${isFree ? 'bg-green-500' : 'bg-white px-4 py-2'} text-white   rounded-full font-bold shadow-lg`}
            >
              {isFree ? (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold shadow-lg"
                >
                  <Gift className="w-4 h-4" />
                  <span>Free Access</span>
                </motion.div>) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-primary font-bold">
                    {(course.salePrice ?? 0) > 0 ? formatPrice(course.salePrice ?? 0) : formatPrice(course.price)}
                  </span>
                  {(course.salePrice ?? 0) > 0 && (course.salePrice ?? 0) < course.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(course.price)}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="flex items-center gap-1.5 uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              {course.language}
            </Badge>
            {course.isTrending && (
              <Badge variant="secondary" className="flex items-center gap-1.5 bg-orange-500/10 text-orange-600">
                <TrendingUp className="w-3.5 h-3.5" />
                Trending
              </Badge>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
            {parse(course.description)}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDate(course.createdAt ?? '')}
            </div>
            {course.isPopular && (
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-600">
                <Flame className="w-3.5 h-3.5 mr-1" /> Popular
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}