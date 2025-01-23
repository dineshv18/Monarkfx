"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CourseCardsProps } from "@/type";
import EnhancedCourseCard from "./EnhancedCourseCard";


export default function CourseCards({
  courses,
  currentPage,
  totalPages,
  setCurrentPage,
}: CourseCardsProps) {
  return (
    <div className="container  px-4 py-8 max-w-7xl mx-auto">
      {courses.length === 0 ? (
        <div className="text-center text-xl font-semibold animate-pulse font-plus-jakarta-sans">
          No courses available at the moment.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course) => (
              <EnhancedCourseCard course={course} key={course.id} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
