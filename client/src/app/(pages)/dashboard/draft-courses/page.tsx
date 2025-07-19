"use client";

import { DynamicTable } from "../_components/DynamicTable";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DraftCoursesPage() {
  const columns = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "price", label: "Price" },
    { key: "language", label: "Language" },
  ];

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
                Draft{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                  Courses
                </span>
              </h1>
              <p className="text-xl text-zinc-300 max-w-3xl">
                Manage your unpublished and draft course content. These courses
                are not yet live for students.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Quick Actions
                </h3>
                <p className="text-zinc-400">
                  Manage your draft courses efficiently
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard/create-course">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Create New Draft
                  </motion.button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Draft Courses Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Draft Courses</h3>
                <p className="text-zinc-400">
                  Manage your unpublished course content
                </p>
              </div>
            </div>
            <DynamicTable
              columns={columns}
              apiUrl="/course/draft-course"
              editUrl="/courses/edit"
              editChapter="/courses/edit"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
