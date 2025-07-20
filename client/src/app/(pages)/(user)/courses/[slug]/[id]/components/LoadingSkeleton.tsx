import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Target, Clock } from "lucide-react";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-900 via-black to-black">
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

      <div className="relative z-10 flex flex-1 overflow-hidden mt-20">
        {/* Sidebar Skeleton */}
        <div className="w-[350px] bg-gradient-to-b from-zinc-900/95 to-black/95 border-r border-zinc-700/50">
          <div className="p-6 border-b border-zinc-700/50 bg-gradient-to-r from-green-600/20 to-emerald-600/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <Skeleton className="h-8 w-32 bg-zinc-700" />
                <Skeleton className="h-4 w-24 mt-2 bg-zinc-700" />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-16 bg-zinc-700" />
                <Skeleton className="h-4 w-12 bg-zinc-700" />
              </div>
              <Skeleton className="h-3 w-full bg-zinc-700 rounded-full" />
            </div>
          </div>
          <div className="p-6">
            {[...Array(3)].map((_, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-8 w-8 rounded-full bg-green-500/50" />
                  <Skeleton className="h-6 w-32 ml-3 bg-zinc-700" />
                </div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, chapterIndex) => (
                    <div
                      key={chapterIndex}
                      className="p-4 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl"
                    >
                      <div className="flex items-center">
                        <Skeleton className="h-6 w-6 rounded-full bg-zinc-700" />
                        <Skeleton className="h-4 w-48 ml-3 bg-zinc-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 p-6 space-y-6">
          {/* Video Player Skeleton */}
          <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700/50 rounded-2xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <Skeleton className="h-4 w-32 mx-auto bg-zinc-700" />
              </div>
            </div>
          </div>

          {/* Chapter Details Skeleton */}
          <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700/50 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-b border-zinc-700/50 py-8 px-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-20 bg-green-500/50 rounded-full" />
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <Skeleton className="h-4 w-16 bg-zinc-700" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-8 w-3/4 bg-zinc-700 mb-3" />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <Skeleton className="h-4 w-24 bg-zinc-700" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 bg-green-400 rounded" />
                  <Skeleton className="h-4 w-20 bg-zinc-700" />
                </div>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-green-400" />
                  <Skeleton className="h-6 w-32 bg-zinc-700" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-zinc-700" />
                  <Skeleton className="h-4 w-5/6 bg-zinc-700" />
                  <Skeleton className="h-4 w-4/6 bg-zinc-700" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-4 w-4 bg-green-400 rounded" />
                    <Skeleton className="h-4 w-16 bg-green-400/50" />
                  </div>
                  <Skeleton className="h-4 w-24 bg-zinc-700" />
                </div>
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-4 w-4 bg-blue-400 rounded" />
                    <Skeleton className="h-4 w-16 bg-blue-400/50" />
                  </div>
                  <Skeleton className="h-4 w-20 bg-zinc-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
