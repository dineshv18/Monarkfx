"use client";

import Link from "next/link";
import { DynamicTable } from "./_components/DynamicTable";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  const columns = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "price", label: "Price" },
    { key: "language", label: "Language" },
  ];

  return (
    <div className="py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Courses</h1>
          <p className="text-gray-400">
            Manage and organize your course content
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/create-course">
            <Button
              variant="outline"
              className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
            >
              Add Course
            </Button>
          </Link>
          <Link href="/dashboard/draft-courses">
            <Button
              variant="outline"
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700 hover:border-gray-600"
            >
              Draft Course
            </Button>
          </Link>
          <Link href="/dashboard/access-course">
            <Button
              variant="outline"
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700 hover:border-gray-600"
            >
              Course Access
            </Button>
          </Link>
        </div>
      </div>
      <DynamicTable
        columns={columns}
        apiUrl="/course/get-courses"
        editUrl="/courses/edit"
        editChapter="/courses/edit"
      />
    </div>
  );
}
