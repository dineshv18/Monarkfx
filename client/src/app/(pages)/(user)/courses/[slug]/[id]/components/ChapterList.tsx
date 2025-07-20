"use client";

import type React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Play,
  Lock,
  ChevronRight,
  CheckCircle,
  Clock,
  Check,
  AlertTriangle,
  BookOpen,
  Target,
} from "lucide-react";
import type { CourseDataNew, ChapterDataNew } from "@/type";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/helper/FormatPrice";
import { format } from "date-fns";

interface ChapterListProps {
  course: CourseDataNew;
  selectedChapter: ChapterDataNew | null;
  isPurchased: boolean;
  onChapterClick: (chapter: ChapterDataNew) => void;
  canAccessContent: boolean;
  completedChapters: string[];
  courseProgress: number;
  expiryDate?: string | null;
  isExpired?: boolean;
  daysLeft?: number | null;
}

const ChapterList: React.FC<ChapterListProps> = ({
  course,
  selectedChapter,
  onChapterClick,
  canAccessContent,
  completedChapters = [],
  courseProgress = 0,
  expiryDate = null,
  isExpired = false,
  daysLeft = null,
}) => {
  const isChapterCompleted = (chapterId: string) => {
    return (
      Array.isArray(completedChapters) && completedChapters.includes(chapterId)
    );
  };

  const isChapterAccessible = (chapter: ChapterDataNew) => {
    return canAccessContent || chapter.isFree;
  };

  // Get chapter progress percentage
  const getChapterProgress = (chapterId: string) => {
    // This would need to be passed from parent component
    // For now, return 0 or 100 based on completion
    return isChapterCompleted(chapterId) ? 100 : 0;
  };

  // Format expiry date
  const formatExpiryDate = (dateString: string | null) => {
    try {
      if (!dateString) return "N/A";
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // Show validity information
  const showValidityInfo = () => {
    const courseHasValidity = course.validityDays && course.validityDays > 0;

    if (isExpired) {
      return (
        <div className="flex items-center mt-3 px-4 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/40 rounded-xl">
          <AlertTriangle className="h-4 w-4 text-red-400 mr-3" />
          <div className="text-xs">
            <p className="text-red-300 font-semibold">Access Expired</p>
            {expiryDate && (
              <p className="text-red-400">
                Expired on: {formatExpiryDate(expiryDate)}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (daysLeft !== null && daysLeft !== undefined) {
      return (
        <div
          className={`flex items-center mt-3 px-4 py-3 border rounded-xl ${
            daysLeft < 7
              ? "bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/40"
              : "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/40"
          }`}
        >
          <Clock className="h-4 w-4 mr-3" />
          <div className="text-xs">
            <p
              className={`font-semibold ${
                daysLeft < 7 ? "text-red-300" : "text-green-300"
              }`}
            >
              {daysLeft} days left
            </p>
            {expiryDate && (
              <p
                className={`${
                  daysLeft < 7 ? "text-red-400" : "text-green-400"
                }`}
              >
                Expires: {formatExpiryDate(expiryDate)}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (courseHasValidity) {
      return (
        <div className="flex items-center mt-3 px-4 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-xl">
          <Clock className="h-4 w-4 text-yellow-400 mr-3" />
          <div className="text-xs">
            <p className="text-yellow-300 font-semibold">
              {course.validityDays} days validity
            </p>
            <p className="text-yellow-400">From purchase date</p>
          </div>
        </div>
      );
    }

    // Only show lifetime access if validityDays is 0 or null/undefined
    if (!courseHasValidity) {
      return (
        <div className="flex items-center mt-3 px-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-xl">
          <Check className="h-4 w-4 text-green-400 mr-3" />
          <div className="text-xs">
            <p className="text-green-300 font-semibold">Lifetime Access</p>
            <p className="text-green-400">No expiration</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-full bg-gradient-to-b from-zinc-900/95 to-black/95 font-plus-jakarta-sans">
      <div className="p-6 border-b border-zinc-700/50 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Course Content</h2>
            <p className="text-sm text-zinc-300">Master your trading skills</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-zinc-300">Progress</span>
            <span className="text-sm font-bold text-green-400">
              {Math.round(courseProgress)}%
            </span>
          </div>
          <div className="relative">
            <Progress
              value={courseProgress}
              className="w-full h-3 bg-zinc-700/50"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${courseProgress}%` }}
            />
          </div>
        </div>

        {/* Course Pricing Information */}
        {course.paid && (
          <div className="mb-4 p-4 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-300">
                Course Price:
              </span>
              <div className="flex items-center gap-2">
                {course.salePrice && course.salePrice > 0 ? (
                  <>
                    <span className="text-lg font-bold text-green-400">
                      {formatPrice(course.salePrice)}
                    </span>
                    <span className="text-sm text-zinc-400 line-through">
                      {formatPrice(course.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-green-400">
                    {formatPrice(course.price)}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Validity Information */}
        {showValidityInfo()}
      </div>

      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-6">
          {course.sections &&
            course.sections
              .filter(
                (section) => section.chapters && section.chapters.length > 0
              )
              .map((section, index) => (
                <div key={section.id} className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold text-white shadow-lg">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-lg text-white flex items-center">
                      {section.title}
                      <Target className="h-4 w-4 ml-2 text-green-400" />
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {section.chapters.map((chapter) => {
                      const chapterProgress = getChapterProgress(chapter.id);
                      const isCompleted = isChapterCompleted(chapter.id);

                      return (
                        <Button
                          key={chapter.id}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start p-4 h-auto font-inter transition-all duration-300 group relative",
                            selectedChapter?.id === chapter.id
                              ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 text-white shadow-lg"
                              : isCompleted
                              ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 text-white"
                              : "bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 text-zinc-300 hover:from-zinc-700/50 hover:to-zinc-800/50 hover:border-green-500/30 hover:text-white",
                            !isChapterAccessible(chapter) && "opacity-60"
                          )}
                          onClick={() => onChapterClick(chapter)}
                          disabled={!isChapterAccessible(chapter)}
                        >
                          <div className="flex items-center w-full">
                            <div className="flex-shrink-0 mr-3">
                              {isChapterAccessible(chapter) ? (
                                isCompleted ? (
                                  <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  </div>
                                ) : (
                                  <div className="p-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-full">
                                    <Play className="h-4 w-4 text-green-400" />
                                  </div>
                                )
                              ) : (
                                <div className="p-1 bg-gradient-to-r from-zinc-600/20 to-zinc-700/20 border border-zinc-600/50 rounded-full">
                                  <Lock className="h-4 w-4 text-zinc-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-grow text-left">
                              <span className="font-medium block mb-1">
                                {chapter.title}
                              </span>

                              {isCompleted ? (
                                <span className="text-xs text-green-400 font-medium">
                                  ✓ Completed
                                </span>
                              ) : chapterProgress > 0 &&
                                chapterProgress < 100 ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-1 bg-zinc-700 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
                                      style={{ width: `${chapterProgress}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-zinc-400">
                                    {Math.round(chapterProgress)}%
                                  </span>
                                </div>
                              ) : (
                                <span className="text-xs text-zinc-500">
                                  Not started
                                </span>
                              )}
                            </div>
                            <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-green-400 transition-colors duration-300" />
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChapterList;
