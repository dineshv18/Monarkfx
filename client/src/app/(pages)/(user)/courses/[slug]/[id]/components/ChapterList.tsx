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
        <div className="flex items-center mt-2 px-3 py-2 bg-red-500/20 border border-red-500/40 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
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
          className={`flex items-center mt-2 px-3 py-2 border rounded-lg ${
            daysLeft < 7
              ? "bg-red-500/20 border-red-500/40"
              : "bg-green-500/20 border-green-500/40"
          }`}
        >
          <Clock className="h-4 w-4 mr-2" />
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
        <div className="flex items-center mt-2 px-3 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-lg">
          <Clock className="h-4 w-4 text-yellow-400 mr-2" />
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
        <div className="flex items-center mt-2 px-3 py-2 bg-green-500/20 border border-green-500/40 rounded-lg">
          <Check className="h-4 w-4 text-green-400 mr-2" />
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
    <div className="h-full bg-gray-900 font-plus-jakarta-sans">
      <div className="p-6 border-b bg-green-600 text-white">
        <h2 className="text-2xl font-bold">Course Content</h2>
        <div className="mt-2">
          <Progress value={courseProgress} className="w-full" />
          <p className="text-sm mt-1">{Math.round(courseProgress)}% Complete</p>
        </div>

        {/* Course Pricing Information */}
        {course.paid && (
          <div className="mt-3 px-3 py-2 bg-white/10 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Course Price:</span>
              <div className="flex items-center gap-2">
                {course.salePrice && course.salePrice > 0 ? (
                  <>
                    <span className="text-lg font-bold text-green-200">
                      {formatPrice(course.salePrice)}
                    </span>
                    <span className="text-sm text-gray-300 line-through">
                      {formatPrice(course.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-green-200">
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
                  <h3 className="font-semibold text-lg mb-4 text-gray-700 flex items-center">
                    <span className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">
                      {index + 1}
                    </span>
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.chapters.map((chapter) => (
                      <Button
                        key={chapter.id}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start p-3 h-auto font-inter transition-all duration-300",
                          selectedChapter?.id === chapter.id
                            ? "bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 text-green-700"
                            : isChapterCompleted(chapter.id)
                            ? "bg-green-50"
                            : "bg-gray-800 hover:bg-gray-700",
                          !isChapterAccessible(chapter) && "opacity-60",
                          "group"
                        )}
                        onClick={() => onChapterClick(chapter)}
                        disabled={!isChapterAccessible(chapter)}
                      >
                        <div className="flex items-center w-full">
                          <div className="flex-shrink-0 mr-3">
                            {isChapterAccessible(chapter) ? (
                              isChapterCompleted(chapter.id) ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <Play className="h-5 w-5 text-green-500" />
                              )
                            ) : (
                              <Lock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <span className="text-left font-medium block">
                              {chapter.title}
                            </span>

                            {isChapterCompleted(chapter.id) && (
                              <span className="text-xs text-green-600">
                                Completed
                              </span>
                            )}
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChapterList;
