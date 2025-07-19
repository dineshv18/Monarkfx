"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CourseDataNew } from "@/type";
import CourseCards from "../../_components/CourseCards";
import SkeletonCardGrid from "../../_components/SkeletonCardGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  SlidersHorizontal,
  BookOpen,
  TrendingUp,
  Users,
  Star,
} from "lucide-react";
import { useCustomDebounce } from "@/hooks/useCustomDebounce";
import { Card, CardContent } from "@/components/ui/card";

const Courses = () => {
  const searchParams = useSearchParams();
  const marketParam = searchParams.get("market");

  const [courses, setCourses] = useState<CourseDataNew[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  const debouncedSearch = useCustomDebounce(searchQuery, 500);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
        // If market param exists, find and set matching category
        if (marketParam) {
          const matchingCategory = data.data.find(
            (cat: { name: string }) =>
              cat.name.toLowerCase() === marketParam.toLowerCase()
          );
          if (matchingCategory) {
            setSelectedCategory(matchingCategory.id);
          }
        }
      }
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const fetchCourses = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(sortBy && { sort: sortBy }),
        ...(marketParam && { market: marketParam }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/course/get-courses?${queryParams}`
      );

      if (!response.ok) throw new Error("Failed to fetch courses");

      const data = await response.json();
      if (data.success) {
        setCourses(data.data.courses);
        setTotalPages(data.data.totalPages);
      }
    } catch (error) {
      toast.error("An error occurred while fetching courses");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch, selectedCategory, sortBy, marketParam]);

  useEffect(() => {
    fetchCategories();
  }, [marketParam]);

  useEffect(() => {
    setIsLoading(true);
    fetchCourses();
  }, [fetchCourses]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const getBackgroundTitle = () => {
    if (marketParam) {
      switch (marketParam.toLowerCase()) {
        case "forex":
          return {
            title: "Forex Trading",
            subtitle:
              "Master currency trading with our professional forex courses",
          };
        case "equity":
          return {
            title: "Stock Market",
            subtitle: "Excel in equity trading with our comprehensive courses",
          };
        case "crypto":
          return {
            title: "Cryptocurrency",
            subtitle: "Learn crypto trading with our expert courses",
          };
        default:
          return {
            title: "Our Trading",
            subtitle:
              "Master the markets with our professional trading courses",
          };
      }
    }
    return {
      title: "Our Trading",
      subtitle: "Master the markets with our professional trading courses",
    };
  };

  const { title, subtitle } = getBackgroundTitle();

  // Calculate stats
  const totalCourses = courses.length;
  const premiumCourses = courses.filter(
    (course: any) => course.price > 0
  ).length;
  const freeCourses = courses.filter(
    (course: any) => course.price === 0
  ).length;

  return (
    <div className="min-h-screen bg-black font-plus-jakarta-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-zinc-900 via-black to-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <BookOpen className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {title}{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Courses
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <BookOpen className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {totalCourses}
                  </div>
                  <div className="text-sm text-zinc-400">Total Courses</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {premiumCourses}
                  </div>
                  <div className="text-sm text-zinc-400">Premium Courses</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Users className="h-5 w-5 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {freeCourses}
                  </div>
                  <div className="text-sm text-zinc-400">Free Courses</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-black py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Filters Section */}
          <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-zinc-700 p-6 mb-12 shadow-xl">
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <div className="relative">
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 w-full bg-black/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-green-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col sm:flex-row gap-4 flex-grow">
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-[200px] bg-black/50 border-zinc-700 text-white">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="text-white"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={sortBy}
                    onValueChange={(value) => {
                      setSortBy(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-[200px] bg-black/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="newest" className="text-white">
                        Newest First
                      </SelectItem>
                      <SelectItem value="oldest" className="text-white">
                        Oldest First
                      </SelectItem>
                      <SelectItem value="price_high" className="text-white">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="price_low" className="text-white">
                        Price: Low to High
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full sm:w-auto border-green-500/30 text-green-400 hover:bg-green-500/10"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          {isLoading && <SkeletonCardGrid />}

          {!isLoading && courses.length > 0 && (
            <CourseCards
              courses={courses}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}

          {!isLoading && courses.length === 0 && (
            <div className="text-center py-12 bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-zinc-700">
              <h3 className="text-xl font-semibold text-white">
                No courses found
              </h3>
              <p className="text-zinc-400 mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
