"use client";

import Link from "next/link";
import { DynamicTable } from "./_components/DynamicTable";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/helper/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  ArrowRight,
  BarChart3,
  Star,
  Clock,
  DollarSign,
} from "lucide-react";

export default function CoursesPage() {
  const { isLoading, isAuthenticated } = useAuth();

  const columns = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "price", label: "Price" },
    { key: "language", label: "Language" },
  ];

  if (isLoading) {
    return (
      <div className="py-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="py-10">
        <div className="flex items-center justify-center h-64">
          <p className="text-zinc-400">
            Please log in to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      {/* Header Section */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Your{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Dashboard
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Course Management
          </h2>
          <p className="text-zinc-400">
            Create, edit, and manage your course content
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/dashboard/create-course">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Course
              </Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/dashboard/draft-courses">
              <Button
                variant="outline"
                className="bg-zinc-900/50 hover:bg-zinc-800/50 text-zinc-300 border-zinc-700 hover:border-green-500/50 hover:text-green-400 transition-all duration-300 flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Draft Courses
              </Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/dashboard/access-course">
              <Button
                variant="outline"
                className="bg-zinc-900/50 hover:bg-zinc-800/50 text-zinc-300 border-zinc-700 hover:border-green-500/50 hover:text-green-400 transition-all duration-300 flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Course Access
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Courses Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Your Courses</h3>
                <p className="text-zinc-400">
                  Manage and organize your course content
                </p>
              </div>
            </div>
            <DynamicTable
              columns={columns}
              apiUrl="/course/get-courses"
              editUrl="/courses/edit"
              editChapter="/courses/edit"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
