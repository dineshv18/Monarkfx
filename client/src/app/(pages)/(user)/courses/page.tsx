"use client";
import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { CourseDataNew, CourseResponse } from "@/type";
import CourseCards from "../../_components/CourseCards";
import SkeletonCardGrid from "../../_components/SkeletonCardGrid";
import Background from "../../_components/Background";

const Courses = () => {
  const [courses, setCourses] = useState<CourseDataNew[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/course/get-courses?page=${currentPage}`,
        {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data && data.success) {
        const message = data.message as CourseResponse;
        setCourses(message.courses);
        setTotalPages(message.totalPages);
      }
    } catch (error) {
      toast.error("An error occurred while fetching courses");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
       <Background 
        title="Our Trading"
        highlightedText="Courses"
        subtitle="Master the markets with our professional trading courses"
      />
      <div className="p-3 md:p-5">
        <section className="px-4 pt-3 container mx-auto max-w-7xl"></section>
        {isLoading ? (
          <SkeletonCardGrid />
        ) : (
          <CourseCards
            courses={courses}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default Courses;
