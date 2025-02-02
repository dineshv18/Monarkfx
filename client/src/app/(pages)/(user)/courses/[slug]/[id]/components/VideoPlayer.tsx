import type React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  videoUrl: string | null
  isLoading: boolean
  className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, isLoading, className }) => {
  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  if (!videoUrl) {
    return (
      <div className={cn("flex items-center justify-center bg-gray-100", className)}>
        <p className="text-gray-500">No video available</p>
      </div>
    )
  }

  return (
    <video
      src={videoUrl}
      controls
      className={cn("w-full h-full object-contain", className)}
      controlsList="nodownload"
    />
  )
}

export default VideoPlayer