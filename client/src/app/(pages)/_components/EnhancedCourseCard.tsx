"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp, Flame, Star, BookOpen, Gift, Folder } from "lucide-react"
import { formatPrice } from "@/helper/FormatPrice"
import { CourseCardProps } from "@/type"
import parse from "html-react-parser"

const BadgeStyles = {
  bestseller: "bg-yellow-500/90 text-black font-medium border-yellow-400 shadow-sm shadow-yellow-500/20 hover:bg-yellow-400 hover:shadow-yellow-500/30",
  trending: "bg-blue-500/90 text-white font-medium border-blue-400 shadow-sm shadow-blue-500/20 hover:bg-blue-400 hover:shadow-blue-500/30",
  popular: "bg-green-500/90 text-white font-medium border-green-400 shadow-sm shadow-green-500/20 hover:bg-green-400 hover:shadow-green-500/30",
  featured: "bg-purple-500/90 text-white font-medium border-purple-400 shadow-sm shadow-purple-500/20 hover:bg-purple-400 hover:shadow-purple-500/30",
}

export default function EnhancedCourseCard({ course }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isFree = !course.paid

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="block perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative transform-gpu transition-all duration-500 h-[480px] w-full max-w-[422px] mx-auto`}>
        {/* Main Card with Animated Border */}
        <div className="relative h-full w-full [background:linear-gradient(45deg,#ffffff,theme(colors.gray.50)_50%,#fafafa)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.gray.200/.75)_75%,_theme(colors.red.400)_80%,_theme(colors.red.300)_85%,_theme(colors.red.400)_90%,_theme(colors.gray.200/.75))_border-box] rounded-2xl border-[2px] border-transparent animate-border shadow-xl">

          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.1),rgba(255,255,255,0))]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(239,68,68,0.1)_50%,rgba(255,255,255,0)_100%)] animate-pulse" />
          </div>
          {/* Badge Container - Above image */}
          <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap gap-2">
            {course.isBestseller && (
              <Badge variant="secondary" className={`transition-all ${BadgeStyles.bestseller}`}>
                <Award className="w-4 h-4 mr-1" /> Bestseller
              </Badge>
            )}
            {course.isTrending && (
              <Badge variant="secondary" className={`transition-all ${BadgeStyles.trending}`}>
                <TrendingUp className="w-4 h-4 mr-1" /> Trending
              </Badge>
            )}
            {course.isPopular && (
              <Badge variant="secondary" className={`transition-all ${BadgeStyles.popular}`}>
                <Flame className="w-4 h-4 mr-1" /> Popular
              </Badge>
            )}
            {course.isFeatured && (
              <Badge variant="secondary" className={`transition-all ${BadgeStyles.featured}`}>
                <Star className="w-4 h-4 mr-1" /> Featured
              </Badge>
            )}
          </div>

          {/* Thumbnail Container */}
          <div className="relative h-[220px] overflow-hidden rounded-t-2xl">
            <Image
              src={course.thumbnail ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${course.thumbnail}` : "/placeholder.jpeg"}
              alt={course.title}
              fill
              className={`object-cover transition-all duration-700 ${isHovered ? "scale-110 blur-sm brightness-75" : "scale-100"
                }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-slate-900/50 to-transparent opacity-80" />
          </div>

          {/* Content Section */}
          <div className="relative p-4 space-y-4">
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 line-clamp-2 capitalize">
              {course.title}
            </h3>

            {/* Description */}
            <div className={`text-base text-gray-600 line-clamp-3 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-90"
              }`}>
              {parse(course.description ?? "")}
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-200 shadow-sm uppercase">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                {course.language}
              </Badge>
              <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-200 shadow-sm uppercase">
                <Folder className="w-3.5 h-3.5 mr-1.5" />
                {course?.category?.name}
              </Badge>
            </div>

            {/* Price Section */}
            <div className="pt-4 mt-2 border-t border-gray-100">
              {isFree ? (
                <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-sm">
                  <Gift className="w-4 h-4 mr-1.5" /> Free Access
                </Badge>
              ) : (
                <div className="flex items-center gap-3">
                  {(course.salePrice ?? 0) > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(course.salePrice ?? 0)}
                      </span>
                      <span className="text-base text-gray-400 line-through decoration-red-500/50">
                        {formatPrice(course.price)}
                      </span>
                      <Badge className="bg-red-500/90 text-white border-0">
                        Save {Math.round(((course.price - (course.salePrice ?? 0)) / course.price) * 100)}%
                      </Badge>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(course.price)}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Hover Effect */}
          <div className={`absolute inset-0 bg-gradient-to-t from-red-950/40 via-black/20 to-transparent 
            opacity-0 transition-opacity duration-300 rounded-2xl ${isHovered ? "opacity-60" : ""}`} />
        </div>
      </div>
    </Link>
  )
}