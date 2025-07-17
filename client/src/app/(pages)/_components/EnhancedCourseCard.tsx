"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp, Flame, Star, BookOpen, Gift, Folder, Check } from "lucide-react"
import { formatPrice } from "@/helper/FormatPrice"
import { CourseCardProps } from "@/type"
import parse from "html-react-parser"
import { Progress } from "@/components/ui/progress"

const BadgeStyles = {
  bestseller: "bg-gradient-to-r from-yellow-400/20 to-amber-400/20 text-yellow-200 border-yellow-400/30 shadow-sm",
  trending: "bg-gradient-to-r from-blue-400/20 to-cyan-400/20 text-blue-200 border-blue-400/30 shadow-sm",
  popular: "bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-green-200 border-green-400/30 shadow-sm",
  featured: "bg-gradient-to-r from-purple-400/20 to-fuchsia-400/20 text-purple-200 border-purple-400/30 shadow-sm",
}

export default function EnhancedCourseCard({ course, hidePrice = false }: CourseCardProps & { hidePrice?: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const isFree = !course.paid
  const [courseProgress, setCourseProgress] = useState<{
    percentage: number;
    completedChapters: number;
    totalChapters: number;
  }>({
    percentage: 0,
    completedChapters: 0,
    totalChapters: 0
  });

  useEffect(() => {
    if (hidePrice) {
      const fetchCourseProgress = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user-progress/course/${course.id}`,
            {
              credentials: 'include',
            }
          );
          const data = await response.json();
          if (data.success) {
            setCourseProgress({
              percentage: data.data.percentage || 0,
              completedChapters: data.data.completedCount || 0,
              totalChapters: data.data.totalChapters || 0
            });
          }
        } catch (error) {
          console.error("Failed to fetch course progress:", error);
        }
      };

      fetchCourseProgress();
    }
  }, [course.id, hidePrice]);

  // Determine the correct URL based on hidePrice (enrolled/purchased status)
  const courseUrl = hidePrice
    ? `/courses/${course.slug}/${course.id}` // For enrolled/purchased courses - go to course player
    : `/courses/${course.slug}`              // For non-enrolled courses - go to course details

  return (
    <Link
      href={courseUrl}
      className="block perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative transform-gpu transition-all duration-500 h-[450px] w-full max-w-[380px] mx-auto group`}>
        {/* Main Card with Glass Effect */}
        <div className="relative h-full w-full bg-gradient-to-b from-zinc-900/90 to-black/90 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
          {/* Card Border Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-green-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.1),rgba(0,0,0,0))]" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0)_0%,rgba(34,197,94,0.1)_50%,rgba(0,0,0,0)_100%)] animate-pulse" />
          </div>

          {/* Badge Container - Above image */}
          <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap gap-2">
            {course.isBestseller && (
              <Badge variant="secondary" className={`transition-all scale-100 group-hover:scale-105 ${BadgeStyles.bestseller}`}>
                <Award className="w-3.5 h-3.5 mr-1" /> Bestseller
              </Badge>
            )}
            {course.isTrending && (
              <Badge variant="secondary" className={`transition-all scale-100 group-hover:scale-105 ${BadgeStyles.trending}`}>
                <TrendingUp className="w-3.5 h-3.5 mr-1" /> Trending
              </Badge>
            )}
            {course.isPopular && (
              <Badge variant="secondary" className={`transition-all scale-100 group-hover:scale-105 ${BadgeStyles.popular}`}>
                <Flame className="w-3.5 h-3.5 mr-1" /> Popular
              </Badge>
            )}
            {course.isFeatured && (
              <Badge variant="secondary" className={`transition-all scale-100 group-hover:scale-105 ${BadgeStyles.featured}`}>
                <Star className="w-3.5 h-3.5 mr-1" /> Featured
              </Badge>
            )}
          </div>

          {/* Thumbnail Container */}
          <div className="relative h-[200px] overflow-hidden">
            <Image
              src={course.thumbnail ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${course.thumbnail}` : "/placeholder.jpeg"}
              alt={course.title}
              fill
              className={`object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px] group-hover:brightness-75`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
          </div>

          {/* Content Section */}
          <div className="relative p-5 space-y-4">
            {/* Title */}
            <h3 className="text-lg font-bold text-white/90 line-clamp-2 capitalize group-hover:text-white transition-colors">
              {course.title}
            </h3>

            {/* Description */}
            <div className="text-sm text-zinc-400 line-clamp-2 transition-all duration-300 group-hover:text-zinc-300">
              {parse(course.description ?? "")}
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="outline" className="bg-black/30 text-green-400 border-green-500/30 shadow-sm uppercase px-2 py-0.5">
                <BookOpen className="w-3 h-3 mr-1" />
                {course.language}
              </Badge>
              <Badge variant="outline" className="bg-black/30 text-green-400 border-green-500/30 shadow-sm uppercase px-2 py-0.5">
                <Folder className="w-3 h-3 mr-1" />
                {course?.category?.name}
              </Badge>
            </div>

            {/* Price Section or Progress Badge */}
            <div className="pt-4 mt-2 border-t border-zinc-800/30">
              {hidePrice ? (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-sm px-2.5 py-1">
                      <Check className="w-3.5 h-3.5 mr-1" /> Enrolled
                    </Badge>
                    <span className="text-sm text-zinc-400">
                      {courseProgress.completedChapters}/{courseProgress.totalChapters} Chapters
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <Progress value={courseProgress.percentage} className="h-1.5 bg-black/30" />
                    <span className="text-xs text-zinc-500">{Math.round(courseProgress.percentage)}% Complete</span>
                  </div>
                </div>
              ) : isFree ? (
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-sm px-2.5 py-1">
                    <Gift className="w-3.5 h-3.5 mr-1" /> Free Access
                  </Badge>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">No Cost</span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(course.salePrice ?? 0) > 0 ? (
                      <>
                        <span className="text-xl font-bold text-green-400 group-hover:text-green-300">
                          {formatPrice(course.salePrice ?? 0)}
                        </span>
                        <span className="text-sm text-zinc-500 line-through decoration-green-500/50">
                          {formatPrice(course.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-green-400 group-hover:text-green-300">
                        {formatPrice(course.price)}
                      </span>
                    )}
                  </div>
                  {(course.salePrice ?? 0) > 0 && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs border-0 px-2 py-0.5">
                      Save {Math.round(((course.price - (course.salePrice ?? 0)) / course.price) * 100)}%
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Hover Effect */}
          <div className={`absolute inset-0 bg-gradient-to-t from-green-950/40 via-black/20 to-transparent 
            opacity-0 transition-opacity duration-300 rounded-xl ${isHovered ? "opacity-60" : ""}`} />
        </div>
      </div>
    </Link>
  )
}