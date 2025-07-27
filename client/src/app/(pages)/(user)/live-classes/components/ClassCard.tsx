"use client";

import React from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ArrowRight,
  IndianRupee,
  Star,
  Play,
  TrendingUp,
  BarChart3,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ClassCardProps {
  classData: any;
  isAuthenticated: boolean;
}

export default function ClassCard({
  classData,
  isAuthenticated,
}: ClassCardProps) {
  const router = useRouter();

  if (!classData || !classData.id) {
    return null;
  }

  const handleCardClick = () => {
    // Guard against missing data
    if (!classData) {
      console.error("ClassCard: Missing classData");
      return;
    }

    try {
      // Always navigate to detail page using slug if available (preferred) or ID as fallback
      const identifier = classData.slug || classData.id;

      if (!identifier) {
        console.error(
          "ClassCard: Missing both slug and id in classData",
          classData
        );
        return;
      }

      router.push(`/live-classes/${identifier}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  // Format date and time properly
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <Card className="w-full overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 shadow-xl hover:shadow-2xl transition-all duration-500 border-zinc-700 hover:border-green-500/30 rounded-xl group h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={classData.thumbnailUrl || "/placeholder.jpeg"}
            alt={classData.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ objectPosition: "center 30%" }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Status indicators - using spans instead of badges */}
          {isAuthenticated && (
            <>
              {classData.hasAccessToLinks ? (
                <div className="absolute top-3 right-3 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <span className="inline-flex items-center px-2 py-1 bg-green-600 text-white text-xs font-bold rounded-md shadow-lg">
                      <Play className="h-3 w-3 mr-1" />
                      Access
                    </span>
                  </motion.div>
                </div>
              ) : classData.isRegistered ? (
                <div className="absolute top-3 right-3 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <span className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-md shadow-lg">
                      <Star className="h-3 w-3 mr-1" />
                      Registered
                    </span>
                  </motion.div>
                </div>
              ) : null}
            </>
          )}

          {/* Price indicator - using span */}
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-3 py-1.5 bg-green-500/20 text-green-300 border border-green-500/30 text-sm font-bold rounded-md shadow-lg backdrop-blur-sm">
              ₹{classData.registrationFee}
            </span>
          </div>

          {/* View Details indicator - using span */}
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center px-2 py-1 bg-zinc-900/80 text-zinc-300 border border-zinc-600 text-xs font-medium rounded-md shadow-lg backdrop-blur-sm group-hover:bg-green-600 group-hover:text-white group-hover:border-green-500 transition-all duration-300">
              <span className="flex items-center">
                View
                <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </span>
          </div>
        </div>

        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg font-bold text-white line-clamp-2 group-hover:text-green-400 transition-colors duration-300">
            {classData.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 pb-4">
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {classData.description ||
              classData.sessionDescription ||
              "Master advanced trading strategies and market analysis techniques in this comprehensive session."}
          </p>

          <div className="space-y-2 pt-3 border-t border-zinc-700">
            <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <div className="p-1.5 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-3 w-3 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Expert</p>
                <p className="text-xs font-semibold text-white">
                  {classData.teacherName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <div className="p-1.5 bg-blue-500/20 rounded-lg">
                <Calendar className="h-3 w-3 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Date</p>
                <p className="text-xs font-semibold text-white">
                  {formatDate(classData.startTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <div className="p-1.5 bg-purple-500/20 rounded-lg">
                <Clock className="h-3 w-3 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Time</p>
                <p className="text-xs font-semibold text-white">
                  {formatTime(classData.startTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <div className="p-1.5 bg-yellow-500/20 rounded-lg">
                <IndianRupee className="h-3 w-3 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">
                  Registration Fee
                </p>
                <p className="text-xs font-semibold text-white">
                  ₹{classData.registrationFee}
                </p>
              </div>
            </div>

            {classData.focus && (
              <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <div className="p-1.5 bg-red-500/20 rounded-lg">
                  <BarChart3 className="h-3 w-3 text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">
                    Market Focus
                  </p>
                  <p className="text-xs font-semibold text-white">
                    {classData.focus}
                  </p>
                </div>
              </div>
            )}

            {classData.level && (
              <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <div className="p-1.5 bg-indigo-500/20 rounded-lg">
                  <Target className="h-3 w-3 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">
                    Skill Level
                  </p>
                  <p className="text-xs font-semibold text-white">
                    {classData.level}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        {/* Payment and access status indicator */}
        {isAuthenticated &&
          (classData.isRegistered || classData.hasAccessToLinks) && (
            <div className="border-t border-zinc-700 px-4 py-3 bg-zinc-800/30">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-zinc-300">
                  Status:
                </span>
                <div className="flex space-x-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs rounded-md ${
                      classData.isRegistered
                        ? "border border-green-500 text-green-300 bg-green-500/20"
                        : "bg-zinc-700 text-zinc-400 border border-zinc-600"
                    }`}
                  >
                    {classData.isRegistered ? "Registered" : "Not Registered"}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs rounded-md ${
                      classData.hasAccessToLinks
                        ? "border border-green-500 text-green-300 bg-green-500/20"
                        : "bg-zinc-700 text-zinc-400 border border-zinc-600"
                    }`}
                  >
                    {classData.hasAccessToLinks ? "Access" : "No Access"}
                  </span>
                </div>
              </div>
            </div>
          )}
      </Card>
    </motion.div>
  );
}
