import type React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Play, Lock, ChevronRight } from "lucide-react"
import type { CourseDataNew, ChapterDataNew } from "@/type"
import { cn } from "@/lib/utils"

interface ChapterListProps {
  course: CourseDataNew
  selectedChapter: ChapterDataNew | null
  isPurchased: boolean
  onChapterClick: (chapter: ChapterDataNew) => void
  canAccessContent: boolean
}

const ChapterList: React.FC<ChapterListProps> = ({ course, selectedChapter, onChapterClick, canAccessContent }) => {
  return (
    <div className="h-full bg-white font-plus-jakarta-sans">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Course Content</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-6">
          {course.sections &&
            course.sections.filter((section) => section.chapters && section.chapters.length > 0).map(
              (section, index) => (
                <div key={section.id} className="mb-8">
                  <h3 className="font-semibold text-lg mb-4 text-gray-700 flex items-center">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">
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
                            ? "bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 text-purple-700"
                            : "bg-white hover:bg-gray-50",
                          "group",
                        )}
                        onClick={() => onChapterClick(chapter)}
                      >
                        <div className="flex items-center w-full">
                          <div className="flex-shrink-0 mr-3">
                            {canAccessContent || chapter.isFree ? (
                              <Play className="h-5 w-5 text-green-500" />
                            ) : (
                              <Lock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <span className="text-left font-medium block">{chapter.title}</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ),
            )}
        </div>
      </ScrollArea>
    </div>
  )
}

export default ChapterList

