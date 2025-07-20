"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CourseDataNew, ChapterDataNew } from "@/type";
import { toast } from "sonner";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorDisplay from "./ErrorDisplay";
import VideoPlayer from "./VideoPlayer";
import ChapterList from "./ChapterList";
import ChapterDetails from "./ChapterDetails";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useAuth } from "@/helper/AuthContext";
import PurchaseDialog from "../PurchaseDialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "./use-media";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CourseLayoutProps {
  initialCourseData: CourseDataNew;
  slug: string;
}

interface CourseProgress {
  percentage: number;
  completedChapters: string[];
  isCompleted: boolean;
}

const CourseLayout: React.FC<CourseLayoutProps> = ({
  initialCourseData,
  slug,
}) => {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const [course] = useState<CourseDataNew>(initialCourseData);
  const [selectedChapter, setSelectedChapter] = useState<ChapterDataNew | null>(
    null
  );
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchaseChecked, setIsPurchaseChecked] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPurchased, setIsPurchased] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [chapterProgress, setChapterProgress] = useState<{
    isCompleted: boolean;
    watchedTime: number;
    progressPercentage: number;
  } | null>(null);
  const [courseProgress, setCourseProgress] = useState<CourseProgress>({
    percentage: 0,
    completedChapters: [],
    isCompleted: false,
  });
  const [currentVideoDuration, setCurrentVideoDuration] = useState<number>(0);

  const makeAuthenticatedRequest = async (
    url: string,
    options: RequestInit = {}
  ) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth");
          throw new Error("Not authenticated");
        }
        throw new Error("Request failed");
      }

      const data = await response.json();
      console.log("API Response:", data); // Add this for debugging

      if (!data.success) {
        throw new Error(data.message || "Request failed");
      }
      return data;
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  };

  const canAccessCourse = () => {
    return !course.paid || isPurchased;
  };

  const checkPurchaseStatus = async () => {
    setIsLoading(true);
    try {
      if (course.paid) {
        const data = await makeAuthenticatedRequest(
          `${process.env.NEXT_PUBLIC_API_URL}/purchase/${course.id}`
        );
        console.log("Purchase status:", data);
        const hasPurchased = data.message?.purchased;
        setIsPurchased(hasPurchased);
        setIsPurchaseChecked(true);
        return hasPurchased;
      } else {
        setIsPurchased(true);
        setIsPurchaseChecked(true);
        return true;
      }
    } catch (err) {
      console.error("Purchase check error:", err);
      setError("Failed to check purchase status");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const isAuth = await checkAuth();
        if (!isAuth) {
          router.push("/auth");
          return;
        }

        const hasPurchased = await checkPurchaseStatus();

        if (course.paid && !hasPurchased) {
          router.push(`/courses/${slug}`);
          toast.error("Please purchase this course to access the content");
          return;
        }

        if (course?.sections?.length > 0) {
          const firstChapter = course.sections
            .flatMap((s) => s.chapters || [])
            .find((chapter) => chapter);
          if (firstChapter) {
            setSelectedChapter(firstChapter);
            await loadVideoUrl(firstChapter.slug);
          }
        }
      } catch (error) {
        console.error("Auth error:", error);
        setError("Authentication failed");
      }
    };
    initializeAuth();
  }, [checkAuth, slug]);

  const loadVideoUrl = async (chapterSlug: string) => {
    setIsVideoLoading(true);
    try {
      const data = await makeAuthenticatedRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/chapter/url/${chapterSlug}`,
        {
          method: "POST",
        }
      );
      setVideoUrl(data.message);
    } catch (err) {
      console.error("Failed to fetch video URL:", err);
      toast.error("Failed to load video. Please try again.");
    } finally {
      setIsVideoLoading(false);
    }
  };

  const fetchCourseProgress = async () => {
    try {
      const data = await makeAuthenticatedRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/user-progress/course/${course.id}`
      );
      console.log("Course Progress Data:", data);
      setCourseProgress({
        percentage: data.data.percentage || 0,
        completedChapters: Array.isArray(data.data.completedChapters)
          ? data.data.completedChapters
          : [],
        isCompleted: data.data.percentage === 100,
      });
    } catch (err) {
      console.error("Failed to fetch course progress:", err);
      setCourseProgress({
        percentage: 0,
        completedChapters: [],
        isCompleted: false,
      });
    }
  };

  useEffect(() => {
    const initProgress = async () => {
      if (isPurchaseChecked && course.id) {
        await fetchCourseProgress();
      }
    };
    initProgress();
  }, [isPurchaseChecked, course.id]);

  const handleVideoProgress = async (progress: {
    playedSeconds: number;
    played: number;
  }) => {
    if (selectedChapter && !chapterProgress?.isCompleted) {
      try {
        // Calculate progress percentage based on actual video duration
        const progressPercentage = progress.played * 100;

        // Only update if progress is significant (more than 5% change)
        const currentProgress = chapterProgress?.progressPercentage || 0;
        if (Math.abs(progressPercentage - currentProgress) >= 5) {
          await makeAuthenticatedRequest(
            `${process.env.NEXT_PUBLIC_API_URL}/user-progress/update`,
            {
              method: "POST",
              body: JSON.stringify({
                chapterId: selectedChapter.id,
                watchedTime: progress.playedSeconds, // Send actual seconds watched
                progressPercentage: progressPercentage, // Send percentage for display
                duration: currentVideoDuration, // Send actual video duration
              }),
            }
          );

          // Update local state
          setChapterProgress((prev) =>
            prev
              ? {
                  ...prev,
                  watchedTime: progress.playedSeconds,
                  progressPercentage: progressPercentage,
                }
              : {
                  isCompleted: false,
                  watchedTime: progress.playedSeconds,
                  progressPercentage: progressPercentage,
                }
          );
        }
      } catch (err) {
        console.error("Failed to update progress:", err);
      }
    }
  };

  const handleVideoDuration = (duration: number) => {
    console.log("Received video duration:", duration);
    setCurrentVideoDuration(duration);
  };

  const handleVideoEnded = async () => {
    if (selectedChapter && !chapterProgress?.isCompleted) {
      try {
        // Mark chapter as completed
        await makeAuthenticatedRequest(
          `${process.env.NEXT_PUBLIC_API_URL}/user-progress/complete`,
          {
            method: "POST",
            body: JSON.stringify({
              chapterId: selectedChapter.id,
              watchedTime:
                currentVideoDuration || selectedChapter.duration || 0,
              progressPercentage: 100,
              duration: currentVideoDuration || selectedChapter.duration || 0,
            }),
          }
        );

        // Update local state
        setChapterProgress({
          isCompleted: true,
          watchedTime: currentVideoDuration || selectedChapter.duration || 0,
          progressPercentage: 100,
        });

        // Fetch updated course progress
        await fetchCourseProgress();

        // Show completion message
        toast.success(`🎉 Chapter "${selectedChapter.title}" completed!`);

        // Check if course is completed
        const updatedProgress = await makeAuthenticatedRequest(
          `${process.env.NEXT_PUBLIC_API_URL}/user-progress/course/${course.id}`
        );

        if (updatedProgress.data.percentage >= 100) {
          toast.success(
            "🎉 Congratulations! You've completed the entire course!"
          );
        } else {
          // Auto-advance to next chapter
          const nextChapter = getNextChapter();
          if (nextChapter) {
            toast.success("Moving to next chapter...");
            setSelectedChapter(nextChapter);
            await loadVideoUrl(nextChapter.slug);

            // Load progress for next chapter
            try {
              const progressData = await makeAuthenticatedRequest(
                `${process.env.NEXT_PUBLIC_API_URL}/user-progress/chapter/${nextChapter.id}`
              );
              setChapterProgress(progressData.data);
            } catch (err) {
              console.error("Failed to fetch next chapter progress:", err);
              setChapterProgress(null);
            }
          } else {
            toast.success("Congratulations! You've completed all chapters!");
          }
        }
      } catch (err) {
        console.error("Failed to mark chapter as complete:", err);
        toast.error("Failed to mark chapter as complete. Please try again.");
      }
    }
  };

  const getNextChapter = () => {
    if (!selectedChapter || !course.sections) return null;

    const currentSectionIndex = course.sections.findIndex((section) =>
      section.chapters.some((chapter) => chapter.id === selectedChapter.id)
    );
    const currentSection = course.sections[currentSectionIndex];
    const currentChapterIndex = currentSection.chapters.findIndex(
      (chapter) => chapter.id === selectedChapter.id
    );

    if (currentChapterIndex < currentSection.chapters.length - 1) {
      return currentSection.chapters[currentChapterIndex + 1];
    }

    if (currentSectionIndex < course.sections.length - 1) {
      return course.sections[currentSectionIndex + 1].chapters[0];
    }

    return null;
  };

  const handleChapterClick = async (chapter: ChapterDataNew) => {
    if (!canAccessCourse() && !chapter.isFree) {
      toast.error("Please purchase this course to access this chapter");
      return;
    }

    if (!chapterProgress?.isCompleted) {
      const currentSection = course.sections.find((section) =>
        section.chapters.some((ch) => ch.id === selectedChapter?.id)
      );
      const targetSection = course.sections.find((section) =>
        section.chapters.some((ch) => ch.id === chapter.id)
      );

      if (
        currentSection &&
        targetSection &&
        currentSection.id !== targetSection.id
      ) {
        const allCurrentSectionCompleted = currentSection.chapters.every((ch) =>
          courseProgress.completedChapters.includes(ch.id)
        );

        if (!allCurrentSectionCompleted) {
          toast.error(
            "Please complete all chapters in the current section first"
          );
          return;
        }
      }
    }

    setSelectedChapter(chapter);
    if (!course.paid || chapter.isFree || isPurchased) {
      await loadVideoUrl(chapter.slug);
      try {
        const data = await makeAuthenticatedRequest(
          `${process.env.NEXT_PUBLIC_API_URL}/user-progress/chapter/${chapter.id}`
        );
        setChapterProgress(data.data);
      } catch (err) {
        console.error("Failed to fetch chapter progress:", err);
      }
    } else {
      setIsDialogOpen(true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error)
    return <ErrorDisplay error={error} onRetry={checkPurchaseStatus} />;

  const SidebarContent = (
    <ChapterList
      course={{
        ...course,
        sections: course?.sections || [],
      }}
      selectedChapter={selectedChapter}
      isPurchased={isPurchased}
      onChapterClick={handleChapterClick}
      canAccessContent={!course.paid || isPurchased}
      completedChapters={courseProgress.completedChapters || []}
      courseProgress={courseProgress.percentage}
      // For now, just show course validity without expiry dates
      // TODO: Implement proper expiry date calculation based on purchase date
    />
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-900 via-black to-black font-plus-jakarta-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {isDesktop ? (
          <div
            className={`${
              isSidebarOpen ? "w-[350px]" : "w-0"
            } transition-all duration-300 ease-in-out overflow-hidden border-r border-zinc-700/50 shadow-2xl bg-gradient-to-b from-zinc-900/95 to-black/95 backdrop-blur-sm`}
          >
            <ScrollArea className="h-full">{SidebarContent}</ScrollArea>
          </div>
        ) : (
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetContent
              side="left"
              className="w-[350px] sm:w-[400px] p-0 bg-gradient-to-b from-zinc-900/95 to-black/95 border-r border-zinc-700/50"
            >
              <ScrollArea className="h-full pt-12">{SidebarContent}</ScrollArea>
            </SheetContent>
          </Sheet>
        )}

        <div className="flex flex-col flex-1 overflow-hidden mt-20">
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden">
                <VideoPlayer
                  videoUrl={videoUrl}
                  isLoading={isVideoLoading}
                  onProgress={handleVideoProgress}
                  onDuration={handleVideoDuration}
                  onEnded={handleVideoEnded}
                  className={`w-full transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? "aspect-[21/9]" : "aspect-video"
                  }`}
                  initialProgress={chapterProgress?.watchedTime || 0}
                  isCompleted={chapterProgress?.isCompleted || false}
                  chapterId={selectedChapter?.id || ""}
                />
              </div>
              <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden">
                <ChapterDetails
                  chapter={selectedChapter}
                  progress={chapterProgress}
                  videoDuration={currentVideoDuration}
                />
              </div>
            </div>
          </ScrollArea>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleSidebar}
            className={`fixed z-50 h-12 px-3 bg-gradient-to-r from-zinc-900/95 to-black/95 backdrop-blur-sm hover:from-green-600/20 hover:to-emerald-600/20 border border-zinc-700/50 hover:border-green-500/50 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 ease-in-out group left-0 top-1/2 -translate-y-1/2 rounded-r-xl`}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-5 w-5 text-zinc-300 group-hover:text-green-400 group-hover:scale-110 transition-all duration-200" />
            ) : (
              <ChevronRight className="h-5 w-5 text-zinc-300 group-hover:text-green-400 group-hover:scale-110 transition-all duration-200" />
            )}
          </Button>
        </div>
      </div>

      <PurchaseDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        courseSlug={course.slug || ""}
        coursePrice={course.price}
        onPurchaseSuccess={() => {
          setIsPurchased(true);
          setIsDialogOpen(false);
          if (selectedChapter) {
            loadVideoUrl(selectedChapter.slug);
          }
        }}
      />
    </div>
  );
};

export default CourseLayout;
