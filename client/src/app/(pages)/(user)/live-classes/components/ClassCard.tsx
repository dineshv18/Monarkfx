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
import { Badge } from "@/components/ui/badge";
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

  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <Card className="w-full overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 shadow-xl hover:shadow-2xl transition-all duration-500 border-zinc-700 hover:border-green-500/30 rounded-xl group h-full">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={classData.thumbnailUrl}
            alt={classData.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ objectPosition: "center 30%" }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Status badges */}
          {isAuthenticated && (
            <>
              {classData.hasAccessToLinks ? (
                <div className="absolute top-4 right-4 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Badge
                      variant="secondary"
                      className="px-3 py-1.5 bg-green-600 text-white font-bold shadow-lg border-0"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Access Granted
                    </Badge>
                  </motion.div>
                </div>
              ) : classData.isRegistered ? (
                <div className="absolute top-4 right-4 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Badge
                      variant="secondary"
                      className="px-3 py-1.5 bg-blue-600 text-white font-bold shadow-lg border-0"
                    >
                      <Star className="h-3 w-3 mr-1" />
                      Registered
                    </Badge>
                  </motion.div>
                </div>
              ) : null}
            </>
          )}

          {/* Price Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge
              variant="outline"
              className="bg-green-500/20 text-green-300 border-green-500/30 text-base px-4 py-2 font-bold shadow-lg backdrop-blur-sm"
            >
              ₹{classData.registrationFee}
            </Badge>
          </div>

          {/* View Details Badge */}
          <div className="absolute bottom-4 right-4">
            <Badge
              variant="outline"
              className="bg-zinc-900/80 text-zinc-300 border-zinc-600 text-sm px-3 py-2 font-medium shadow-lg backdrop-blur-sm group-hover:bg-green-600 group-hover:text-white group-hover:border-green-500 transition-all duration-300"
            >
              <span className="flex items-center">
                View Session
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3 pt-6">
          <CardTitle className="text-xl font-bold text-white line-clamp-2 group-hover:text-green-400 transition-colors duration-300">
            {classData.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 pb-6">
          <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
            {classData.description ||
              classData.sessionDescription ||
              "Master advanced trading strategies and market analysis techniques in this comprehensive session."}
          </p>

          <div className="space-y-3 pt-4 border-t border-zinc-700">
            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">
                  Expert Trader
                </p>
                <p className="text-sm font-semibold text-white">
                  {classData.teacherName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">
                  Session Date
                </p>
                <p className="text-sm font-semibold text-white">
                  {classData.formattedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Clock className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Duration</p>
                <p className="text-sm font-semibold text-white">
                  {classData.formattedTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <IndianRupee className="h-4 w-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Investment</p>
                <p className="text-sm font-semibold text-white">
                  Registration: ₹{classData.registrationFee} | Course: ₹
                  {classData.courseFee}
                </p>
              </div>
            </div>

            {classData.currentRaga && (
              <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">
                    Market Focus
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {classData.currentRaga}
                  </p>
                </div>
              </div>
            )}

            {classData.currentOrientation && (
              <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Target className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">
                    Strategy Type
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {classData.currentOrientation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        {/* Payment and access status indicator */}
        {isAuthenticated &&
          (classData.isRegistered || classData.hasAccessToLinks) && (
            <div className="border-t border-zinc-700 px-6 py-4 bg-zinc-800/30">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-300">
                  Status:
                </span>
                <div className="flex space-x-2">
                  <Badge
                    variant={classData.isRegistered ? "outline" : "secondary"}
                    className={`text-xs ${
                      classData.isRegistered
                        ? "border-green-500 text-green-300 bg-green-500/20"
                        : "bg-zinc-700 text-zinc-400 border-zinc-600"
                    }`}
                  >
                    {classData.isRegistered ? "Registered" : "Not Registered"}
                  </Badge>
                  <Badge
                    variant={
                      classData.hasAccessToLinks ? "outline" : "secondary"
                    }
                    className={`text-xs ${
                      classData.hasAccessToLinks
                        ? "border-green-500 text-green-300 bg-green-500/20"
                        : "bg-zinc-700 text-zinc-400 border-zinc-600"
                    }`}
                  >
                    {classData.hasAccessToLinks
                      ? "Access Granted"
                      : "No Access"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
      </Card>
    </motion.div>
  );
}
