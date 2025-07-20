import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChapterDataNew } from "@/type";
import {
  BookOpen,
  Calendar,
  Clock,
  Target,
  Award,
  CheckCircle,
} from "lucide-react";

interface ChapterDetailsProps {
  chapter: ChapterDataNew | null;
  progress?: {
    isCompleted: boolean;
    watchedTime: number;
    progressPercentage?: number;
  } | null;
  videoDuration?: number;
}

const ChapterDetails: React.FC<ChapterDetailsProps> = ({
  chapter,
  progress,
  videoDuration,
}) => {
  if (!chapter) return null;

  const progressPercentage = progress?.progressPercentage || 0;
  const isCompleted = progress?.isCompleted || false;
  const actualDuration = videoDuration || chapter.duration || 0;

  // Format duration to MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700/50 overflow-hidden transition-all duration-300 group relative">
      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-b border-zinc-700/50 py-8 px-8 font-plus-jakarta-sans">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-green-400 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 px-4 py-2 rounded-full">
              Chapter {chapter.position || "1"}
            </span>
            <div className="flex items-center gap-2 text-zinc-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {videoDuration
                  ? formatDuration(videoDuration)
                  : `${actualDuration} min`}
              </span>
            </div>
          </div>
        </div>
        <CardTitle className="text-2xl md:text-3xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 leading-tight">
          {chapter.title}
        </CardTitle>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2 text-zinc-300">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-sm">Learning Objective</span>
          </div>
        </div>
      </div>

      <CardContent className="p-8 space-y-6">
        <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-400" />
            Chapter Overview
          </h3>
          <p className="text-zinc-300 leading-relaxed text-base font-inter">
            {chapter.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">
                Created
              </span>
            </div>
            <p className="text-zinc-300 text-sm">
              {new Date(chapter.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">
                Duration
              </span>
            </div>
            <p className="text-zinc-300 text-sm">
              {videoDuration
                ? formatDuration(videoDuration)
                : `${actualDuration} minutes`}
            </p>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ChapterDetails;
