"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { CourseDataNew, ChapterDataNew } from "@/type"
import { toast } from "sonner"
import LoadingSkeleton from "./LoadingSkeleton"
import ErrorDisplay from "./ErrorDisplay"
import VideoPlayer from "./VideoPlayer"
import ChapterList from "./ChapterList"
import ChapterDetails from "./ChapterDetails"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { useAuth } from "@/helper/AuthContext"
import PurchaseDialog from "../PurchaseDialog"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useMediaQuery } from "./use-media"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CourseLayoutProps {
  initialCourseData: CourseDataNew
  slug: string
}

const CourseLayout: React.FC<CourseLayoutProps> = ({ initialCourseData, slug }) => {
  const router = useRouter()
  const { checkAuth } = useAuth()
  const [course] = useState<CourseDataNew>(initialCourseData)
  const [selectedChapter, setSelectedChapter] = useState<ChapterDataNew | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPurchaseChecked, setIsPurchaseChecked] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPurchased, setIsPurchased] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth")
          throw new Error("Not authenticated")
        }
        throw new Error("Request failed")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Request failed")
      }
      return data
    } catch (error) {
      console.error("Request error:", error)
      throw error
    }
  }

  useEffect(() => {
    const initializeAuth = async () => {
      const isAuth = await checkAuth()
      if (!isAuth) {
        router.push("/auth")
      } else {
        checkPurchaseStatus()
      }
    }
    initializeAuth()
  }, [checkAuth, slug])

  const checkPurchaseStatus = async () => {
    setIsLoading(true)
    try {
      if (course.paid) {
        const data = await makeAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/purchase/${course.id}`)
        setIsPurchased(data.message.purchased)
      }
      setIsPurchaseChecked(true)
    } catch (err) {
      console.error(err)
      setError("Failed to check purchase status")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isPurchaseChecked) return

    const firstChapter =
      course?.sections?.length > 0
        ? course.sections.flatMap((s) => s.chapters || []).find((chapter) => chapter)
        : null

    if (firstChapter) {
      setSelectedChapter(firstChapter)
      const canAccess = !course.paid || firstChapter.isFree || isPurchased
      if (canAccess) {
        loadVideoUrl(firstChapter.slug)
      }
    }
  }, [isPurchaseChecked, course, isPurchased])

  const loadVideoUrl = async (chapterSlug: string) => {
    setIsVideoLoading(true)
    try {
      const data = await makeAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/chapter/url/${chapterSlug}`, {
        method: "POST",
      })
      setVideoUrl(data.message)
    } catch (err) {
      console.error("Failed to fetch video URL:", err)
      toast.error("Failed to load video. Please try again.")
    } finally {
      setIsVideoLoading(false)
    }
  }

  const handleChapterClick = async (chapter: ChapterDataNew) => {
    setSelectedChapter(chapter)
    if (!course.paid || chapter.isFree || isPurchased) {
      await loadVideoUrl(chapter.slug)
    } else {
      setIsDialogOpen(true)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (isLoading) return <LoadingSkeleton />
  if (error) return <ErrorDisplay error={error} onRetry={checkPurchaseStatus} />

  const SidebarContent = (
    <ChapterList
      course={{
        ...course,
        sections: course?.sections || []
      }}
      selectedChapter={selectedChapter}
      isPurchased={isPurchased}
      onChapterClick={handleChapterClick}
      canAccessContent={!course.paid || isPurchased}
    />
  )

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-plus-jakarta-sans">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800 line-clamp-1">{course.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {isDesktop ? (
          // Sidebar for desktop
          <div
            className={`
            ${isSidebarOpen ? "w-[300px]" : "w-0"}
            transition-all duration-300 ease-in-out
            overflow-hidden
            border-r shadow-xl
            bg-white
          `}
          >
            <ScrollArea className="h-full">{SidebarContent}</ScrollArea>
          </div>
        ) : (
          // Sheet for mobile
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
              <ScrollArea className="h-full pt-12">{SidebarContent}</ScrollArea>
            </SheetContent>
          </Sheet>
        )}

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <VideoPlayer
                videoUrl={videoUrl}
                isLoading={isVideoLoading}
                className={`
                w-full bg-white rounded-lg shadow-md
                transition-all duration-300 ease-in-out
                ${isSidebarOpen ? "aspect-video" : "aspect-[21/9]"}
              `}
              />
              <div className="bg-white rounded-lg shadow-md p-6">
                <ChapterDetails chapter={selectedChapter} />
              </div>
            </div>
          </ScrollArea>

          {/* Sidebar/Sheet Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSidebar}
            className={`
              fixed z-50 h-10 px-2 bg-white/95 backdrop-blur-sm
              hover:bg-gradient-to-r hover:from-[#fce7ff] hover:to-[#fff1eb]
              border border-[#610981]/20 shadow-lg hover:shadow-xl
              transition-all duration-300 ease-in-out group
              left-0 top-1/2 -translate-y-1/2 rounded-r-lg
            `}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-5 w-5 text-[#610981] group-hover:scale-110 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-5 w-5 text-[#610981] group-hover:scale-110 transition-transform duration-200" />
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
          setIsPurchased(true)
          setIsDialogOpen(false)
          if (selectedChapter) {
            loadVideoUrl(selectedChapter.slug)
          }
        }}
      />
    </div>
  )
}

export default CourseLayout

