"use client";

import ReactPlayer from "react-player";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface VideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoDialog({ isOpen, onClose }: VideoDialogProps) {
  // Demo trading video URL - you can replace this with your actual video URL
  const videoUrl = "https://www.youtube.com/watch?v=8jLOx1hD3_o"; // Trading demo video - replace with your actual video

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-6xl h-[90vh] max-h-[800px] bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700 rounded-xl shadow-2xl p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-4 md:p-6 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DialogTitle className="text-lg md:text-xl lg:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-green-500/20 rounded-lg">
                  <Play className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
                </div>
                <span className="hidden sm:inline">Trading Demo Session</span>
                <span className="sm:hidden">Demo</span>
              </DialogTitle>
            </motion.div>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col px-4 md:px-6 pb-4 md:pb-6 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative bg-black rounded-lg overflow-hidden shadow-xl flex-1 min-h-0"
          >
            <div className="w-full h-full">
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                controls={true}
                playing={isOpen}
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                    },
                  },
                }}
                style={{
                  borderRadius: "8px",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 md:mt-6 space-y-3 md:space-y-4 flex-shrink-0"
          >
            <div className="bg-zinc-800/50 rounded-lg p-3 md:p-4 border border-zinc-700">
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                What You'll Learn
              </h3>
              <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base text-zinc-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Technical analysis fundamentals</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Real-time market analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Risk management strategies</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Entry and exit techniques</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-3 md:p-4 border border-green-500/20">
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                <strong className="text-green-400">Pro Tip:</strong> This demo
                session showcases our expert trading methodology. Join our live
                classes to learn these techniques in real-time with market
                experts.
              </p>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
