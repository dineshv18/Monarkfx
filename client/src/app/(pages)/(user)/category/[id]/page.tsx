"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SecureChainCourseCard from "../../../_components/SecureChainCourseCard";
import { CourseDataNew } from "@/type";
import { Loader2, SlidersHorizontal } from "lucide-react";

const PAGE_SIZE = 8;

const CategoryDetailPage = () => {
  const params = useParams();
  const categoryId = params?.id as string;

  const [courses, setCourses] = useState<CourseDataNew[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: PAGE_SIZE.toString(),
        ...(sortBy && { sort: sortBy }),
        ...(priceFilter !== "all" && { price: priceFilter }),
      });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryId}/courses?${query}`
      );
      const data = await res.json();
      setCourses(data.data || []);
      setCategoryName(data.data?.[0]?.category?.name || "");
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setCourses([]);
      setCategoryName("");
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [categoryId, currentPage, sortBy, priceFilter]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter change
  }, [sortBy, priceFilter, categoryId]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleReset = () => {
    // Search removed
    setSortBy("newest");
    setPriceFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-green-950 py-16 px-4 relative">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #22c55e15 1px, transparent 1px), linear-gradient(to bottom, #22c55e15 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10 py-20 md:pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white text-center tracking-tight">
          Courses in{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            {categoryName}
          </span>
        </h1>
        {/* Filters */}
        <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-zinc-700 p-6 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search removed as per request */}
            <div className="flex flex-col sm:flex-row gap-4 flex-grow justify-start">
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-full sm:w-[160px] bg-black/50 border-zinc-700 text-white">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[160px] bg-black/50 border-zinc-700 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full sm:w-auto border-green-500/30 text-green-400 hover:bg-green-500/10"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-green-400 animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-zinc-400 text-center py-20">
            No courses found in this category.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {courses.map((course) => (
                <SecureChainCourseCard key={course.id} course={course} />
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10 disabled:opacity-50 mr-2"
                >
                  Previous
                </Button>
                <span className="px-4 py-2 bg-zinc-900/50 backdrop-blur-sm rounded-md border border-zinc-800/50 text-zinc-400">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10 disabled:opacity-50 ml-2"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailPage;
