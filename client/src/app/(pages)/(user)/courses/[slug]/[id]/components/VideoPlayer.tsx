"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Shield,
} from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string | null;
  isLoading: boolean;
  onProgress: (progress: any) => void;
  onDuration: (duration: number) => void;
  onEnded: () => void;
  className?: string;
  initialProgress?: number;
  isCompleted?: boolean;
  chapterId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  isLoading,
  onProgress,
  onDuration,
  onEnded,
  className,
  initialProgress = 0,
  isCompleted = false,
  chapterId,
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [lastProgressUpdate, setLastProgressUpdate] = useState(0);
  const [isDurationLoaded, setIsDurationLoaded] = useState(false);

  // Anti-screen recording measures
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPlaying(false);
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    };

    const preventScreenCapture = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("-webkit-user-select", "none");
        containerRef.current.style.setProperty("-webkit-touch-callout", "none");
        containerRef.current.style.setProperty("user-select", "none");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common screenshot shortcuts
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 2000);
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
      return false;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    preventScreenCapture();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    if (
      playerRef.current &&
      initialProgress > 0 &&
      !hasStarted &&
      isDurationLoaded
    ) {
      playerRef.current.seekTo(initialProgress, "seconds");
      setHasStarted(true);
    }
  }, [initialProgress, hasStarted, isDurationLoaded]);

  const handleProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    const currentProgress = (state.playedSeconds / duration) * 100;
    setProgress(currentProgress);

    // Only call onProgress if there's a significant change (5% or more)
    if (Math.abs(currentProgress - lastProgressUpdate) >= 5) {
      onProgress(state);
      setLastProgressUpdate(currentProgress);
    }
  };

  const handleDuration = (duration: number) => {
    console.log("Video duration loaded:", duration);
    setDuration(duration);
    setIsDurationLoaded(true);
    onDuration(duration); // Pass duration to parent component
  };

  const handleEnded = () => {
    if (progress >= 80 || isCompleted) {
      onEnded();
    } else {
      toast.error(
        "Please watch at least 80% of the video to complete this chapter"
      );
      if (playerRef.current) {
        playerRef.current.seekTo(0);
      }
    }
  };

  // Format duration to MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-video select-none bg-gradient-to-br from-zinc-900 to-black",
        className
      )}
      style={{
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        userSelect: "none",
      }}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <span className="text-zinc-300 font-medium">Loading video...</span>
          </div>
        </div>
      ) : (
        <>
          <ReactPlayer
            ref={playerRef}
            url={videoUrl || ""}
            width="100%"
            height="100%"
            controls
            playing={isPlaying && !showWarning}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onReady={() => {
              console.log("Video player ready");
            }}
            onError={(error) => {
              console.error("Video player error:", error);
              toast.error("Failed to load video. Please try again.");
            }}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                  iv_load_policy: 3,
                  fs: 0,
                  controlsList: "nodownload noplaybackrate",
                },
                embedOptions: {
                  controls: 1,
                  disablekb: 1,
                  fs: 0,
                },
              },
              file: {
                attributes: {
                  controlsList: "nodownload",
                  disablePictureInPicture: true,
                  onContextMenu: (e: Event) => e.preventDefault(),
                },
              },
            }}
          />

          {/* Security Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-full px-3 py-1 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-xs text-green-300 font-medium">
                Protected
              </span>
            </div>
          </div>

          {/* Progress Indicator */}
          {!isCompleted && progress > 0 && (
            <div className="absolute bottom-4 left-4 z-10">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-full px-3 py-1 backdrop-blur-sm">
                <span className="text-xs text-green-300 font-medium">
                  {Math.round(progress)}% watched
                </span>
              </div>
            </div>
          )}

          {/* Duration Display */}
          {duration > 0 && (
            <div className="absolute bottom-4 right-4 z-10">
              <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-full px-3 py-1 backdrop-blur-sm">
                <span className="text-xs text-zinc-300 font-medium">
                  {formatDuration(duration)}
                </span>
              </div>
            </div>
          )}

          {showWarning && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/95 to-red-800/95 backdrop-blur-sm text-white text-center p-8 rounded-2xl border border-red-500/50">
              <div className="max-w-md">
                <div className="mb-4">
                  <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-red-300">
                    ⚠️ Security Warning
                  </h3>
                </div>
                <p className="text-lg mb-4 text-red-200">
                  Screen recording and screenshots are not allowed for this
                  premium content.
                </p>
                <p className="text-sm text-red-300">
                  Please return to the video tab to continue watching and
                  learning.
                </p>
                <div className="mt-6 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg">
                  <p className="text-sm text-green-300">
                    Your progress is automatically saved. You can continue from
                    where you left off.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
