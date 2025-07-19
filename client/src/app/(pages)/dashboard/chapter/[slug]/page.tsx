"use client";

import React from "react";
import CourseChapters from "../../_components/chapters/CourseChapters";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

const formatSlugToTitle = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function CourseManagement({
  params,
}: {
  params: { slug: string };
}) {
  const SectionSlug = formatSlugToTitle(params.slug);

  return (
    <div className="py-10">
      {/* Header Section */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg hover:from-zinc-700 hover:to-zinc-600 transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5 text-zinc-300" />
              </motion.div>
            </Link>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {SectionSlug}{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                  Chapters
                </span>
              </h1>
              <p className="text-xl text-zinc-300 max-w-3xl">
                Manage chapters and course content for this section
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <CourseChapters sectionSlug={params.slug} />
      </motion.div>
    </div>
  );
}
