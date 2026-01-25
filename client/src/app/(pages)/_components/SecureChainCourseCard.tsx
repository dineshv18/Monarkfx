"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Star,
  TrendingUp,
  Award,
  Flame,
  Check,
  AlertTriangle,
  BookOpen,
  Folder,
  Gift,
  PlayCircle,
} from "lucide-react";
import { formatPrice } from "@/helper/FormatPrice";
import { CourseDataNew } from "@/type";
import parse from "html-react-parser";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCourseImageUrl } from "@/lib/cloudinary";

interface SecureChainCourseCardProps {
  course: CourseDataNew;
  hidePrice?: boolean;
  expiryDate?: string | null;
  isExpired?: boolean;
  daysLeft?: number | null;
}

const BadgeStyles = {
  bestseller:
    "bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border-green-400/60",
  trending:
    "bg-gradient-to-r from-green-400/30 to-green-600/30 text-green-100 border-green-400/60",
  popular:
    "bg-gradient-to-r from-emerald-500/30 to-green-500/30 text-emerald-200 border-emerald-400/60",
  featured:
    "bg-gradient-to-r from-green-600/30 to-emerald-600/30 text-green-100 border-green-500/60",
};

const SecureChainCourseCard: React.FC<SecureChainCourseCardProps> = ({
  course,
  hidePrice = false,
  expiryDate = null,
  isExpired = false,
  daysLeft = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [courseProgress, setCourseProgress] = useState<{
    percentage: number;
    completedChapters: number;
    totalChapters: number;
  }>({
    percentage: 0,
    completedChapters: 0,
    totalChapters: 0,
  });
  const isFree = !course.paid;
  const router = useRouter();

  const getImageUrl = (image: string | null | undefined) => {
    return getCourseImageUrl(image);
  };

  // Fetch course progress when hidePrice is true
  useEffect(() => {
    if (hidePrice) {
      const fetchCourseProgress = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user-progress/course/${course.id}`,
            {
              credentials: "include",
            }
          );
          const data = await response.json();
          if (data.success) {
            setCourseProgress({
              percentage: data.data.percentage || 0,
              completedChapters: data.data.completedCount || 0,
              totalChapters: data.data.totalChapters || 0,
            });
          }
        } catch (error) {
          console.error("Failed to fetch course progress:", error);
        }
      };

      fetchCourseProgress();
    }
  }, [course.id, hidePrice]);

  const courseUrl = hidePrice
    ? `/courses/${course.slug}/${course.id}`
    : `/courses/${course.slug}`;

  // Display formatted expiry date
  const formatExpiryDate = (dateString: string | null) => {
    try {
      if (!dateString) return "N/A";
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const showValidityInfo = () => {
    const courseHasValidity = course.validityDays && course.validityDays > 0;

    if (isExpired) {
      return (
        <span className="flex items-center text-xs bg-red-500/20 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
          <AlertTriangle className="h-3.5 w-3.5 mr-1.5" /> Expired Access
        </span>
      );
    }

    if (daysLeft !== null && daysLeft !== undefined) {
      return (
        <span
          className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-full backdrop-blur-sm border ${daysLeft < 5
              ? "bg-red-500/20 text-red-300 border-red-500/40"
              : "bg-green-500/20 text-green-300 border-green-500/40"
            }`}
        >
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          {daysLeft} days left
        </span>
      );
    }

    if (courseHasValidity) {
      return (
        <span className="flex items-center text-xs bg-green-500/20 text-green-300 border border-green-500/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          {course.validityDays} days access
        </span>
      );
    }

    if (!courseHasValidity) {
      return (
        <span className="flex items-center text-xs bg-green-500/20 text-green-300 border border-green-500/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
          <Check className="h-3.5 w-3.5 mr-1.5" />
          Lifetime Access
        </span>
      );
    }

    return null;
  };

  // Handle renew button click
  const handleRenew = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (course.slug) {
      router.push(`/courses/${course.slug}`);
    }
  };

  return (
    <motion.div
      className={`group relative w-full h-full ${isExpired ? "opacity-80" : ""
        }`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-zinc-900/95 via-black/90 to-zinc-950/95 backdrop-blur-xl rounded-xl border border-zinc-700/50 shadow-lg transition-all duration-500 hover:shadow-green-500/20 ${isExpired ? "border-2 border-red-500/30 bg-zinc-900/50" : ""
          }`}
      >
        {/* Network Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),rgba(0,0,0,0))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),rgba(0,0,0,0))]" />
        </div>

        {/* Course Image */}
        <div className="relative h-48 overflow-hidden">
          {isExpired && (
            <div className="absolute top-0 right-0 z-20">
              <div className="bg-red-600 text-white px-3 py-1 text-xs font-bold shadow-lg rounded-bl-lg">
                EXPIRED
              </div>
            </div>
          )}

          <Image
            src={getImageUrl(course.thumbnail)}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${isExpired ? "grayscale" : "group-hover:scale-110"
              }`}
          />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-[#0a0a0a]/70 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <PlayCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Badges */}

          {/* Validity Badge */}
          {hidePrice && expiryDate && (
            <div className="absolute bottom-3 right-3 z-10">
              {isExpired ? (
                <span className="flex items-center backdrop-blur-sm bg-red-500/20 text-red-300 border border-red-500/40 px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
                  <AlertTriangle className="w-4 h-4 mr-1.5" /> Expired
                </span>
              ) : (
                daysLeft !== null &&
                daysLeft !== undefined && (
                  <span
                    className={`flex items-center backdrop-blur-sm px-3 py-2 rounded-full text-sm font-semibold border shadow-lg ${daysLeft < 7
                        ? "bg-red-500/20 text-red-300 border-red-500/40"
                        : "bg-green-500/20 text-green-300 border-green-500/40"
                      }`}
                  >
                    <Clock className="w-4 h-4 mr-1.5" /> {daysLeft} days left
                  </span>
                )
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[calc(100%-24px)] z-10 w-full items-center justify-between">
            {course.isBestseller && (
              <span
                className={`${BadgeStyles.bestseller} backdrop-blur-sm border px-2 py-1 rounded-full text-[9px] font-semibold flex items-center shadow-lg`}
              >
                <Award className="w-3 h-3 mr-1" /> Best
              </span>
            )}
            {course.isTrending && (
              <span
                className={`${BadgeStyles.trending} backdrop-blur-sm border px-2 py-1 rounded-full text-[9px] font-semibold flex items-center shadow-lg`}
              >
                <TrendingUp className="w-3 h-3 mr-1" /> Hot
              </span>
            )}
            {course.isPopular && (
              <span
                className={`${BadgeStyles.popular} backdrop-blur-sm border px-2 py-1 rounded-full text-[9px] font-semibold flex items-center shadow-lg`}
              >
                <Flame className="w-3 h-3 mr-1" /> Pop
              </span>
            )}
            {course.isFeatured && (
              <span
                className={`${BadgeStyles.featured} backdrop-blur-sm border px-2 py-1 rounded-full text-[9px] font-semibold flex items-center shadow-lg`}
              >
                <Star className="w-3 h-3 mr-1" /> Feat
              </span>
            )}
          </div>
          {/* Course Title */}
          <h3
            className={`text-lg font-bold line-clamp-2 transition-colors ${isExpired
                ? "text-gray-400"
                : "text-white/95 group-hover:text-green-100"
              }`}
          >
            {course.title}
          </h3>

          {/* Description */}
          <div
            className={`text-sm line-clamp-2 ${isExpired
                ? "text-gray-500"
                : "text-zinc-400 group-hover:text-zinc-300"
              }`}
          >
            {parse(course.description ?? "")}
          </div>

          {/* Course Meta */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`flex items-center text-xs font-medium border ${isExpired
                  ? "bg-gray-800/50 text-gray-400 border-gray-700/50"
                  : "bg-[#0a0a0a]/40 text-green-400 border-green-500/30"
                } px-2 py-1 rounded-full backdrop-blur-sm`}
            >
              <BookOpen className="w-3 h-3 mr-1" />
              {course.language}
            </span>
            <span
              className={`flex items-center text-xs font-medium border ${isExpired
                  ? "bg-gray-800/50 text-gray-400 border-gray-700/50"
                  : "bg-[#0a0a0a]/40 text-green-400 border-green-500/30"
                } px-2 py-1 rounded-full backdrop-blur-sm`}
            >
              <Folder className="w-3 h-3 mr-1" />
              {course?.category?.name}
            </span>
          </div>

          {/* Price or Progress Section */}
          <div className="pt-3 border-t border-zinc-700/50">
            {hidePrice ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`flex items-center ${isExpired
                        ? "bg-red-500/20 text-red-300 border border-red-500/40"
                        : "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0"
                      } px-3 py-1.5 rounded-full font-semibold text-sm shadow-lg`}
                  >
                    {isExpired ? (
                      <>
                        <AlertTriangle className="w-3 h-3 mr-1" /> Expired
                      </>
                    ) : (
                      <>
                        <Check className="w-3 h-3 mr-1" /> Enrolled
                      </>
                    )}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">
                    {courseProgress.completedChapters}/
                    {courseProgress.totalChapters} Chapters
                  </span>
                </div>
                <Progress
                  value={courseProgress.percentage}
                  className="h-2 bg-[#0a0a0a]/50 rounded-full"
                />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-medium">
                    {Math.round(courseProgress.percentage)}% Complete
                  </span>
                  {expiryDate && (
                    <span
                      className={`${isExpired
                          ? "text-red-400 font-semibold"
                          : "text-zinc-500"
                        }`}
                    >
                      {isExpired ? "Expired on: " : "Valid until: "}
                      {formatExpiryDate(expiryDate)}
                    </span>
                  )}
                </div>

                {/* Add Renew Button for expired courses */}
                {isExpired && (
                  <Button
                    variant="destructive"
                    className="w-full mt-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 rounded-full shadow-lg text-sm"
                    onClick={handleRenew}
                  >
                    Buy Again
                  </Button>
                )}
              </div>
            ) : isFree ? (
              <div className="flex items-center justify-between">
                <span className="flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-3 py-1.5 rounded-full font-semibold text-sm shadow-lg">
                  <Gift className="w-3 h-3 mr-1" /> Free
                </span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
                  No Cost
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  {(course.salePrice ?? 0) > 0 ? (
                    <>
                      <span className="text-lg font-bold text-green-400 group-hover:text-green-300 transition-colors">
                        {formatPrice(course.salePrice ?? 0)}
                      </span>
                      <span className="text-sm text-zinc-500 line-through decoration-green-500/50">
                        {formatPrice(course.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-green-400 group-hover:text-green-300 transition-colors">
                      {formatPrice(course.price)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {(course.salePrice ?? 0) > 0 && (
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-2 py-1 rounded-full font-bold text-xs shadow-lg">
                      Save{" "}
                      {Math.round(
                        ((course.price - (course.salePrice ?? 0)) /
                          course.price) *
                        100
                      )}
                      %
                    </span>
                  )}
                  {showValidityInfo()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-green-950/30 via-black/10 to-transparent 
          opacity-0 transition-opacity duration-500 rounded-xl pointer-events-none ${isHovered ? "opacity-100" : ""
            }`}
        />

        {/* Clickable Link */}
        {!isExpired && (
          <Link
            href={courseUrl}
            className="absolute inset-0 z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="sr-only">View {course.title}</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default SecureChainCourseCard;
