"use client";

import { DynamicTable } from "../_components/DynamicTable";

export default function DraftCoursesPage() {
  const columns = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "price", label: "Price" },
    { key: "language", label: "Language" },
  ];

  return (
    <div className="py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Draft Courses</h1>
        <p className="text-gray-400">
          Manage your unpublished and draft course content
        </p>
      </div>
      <DynamicTable
        columns={columns}
        apiUrl="/course/draft-course"
        editUrl="/courses/edit"
        editChapter="/courses/edit"
      />
    </div>
  );
}
