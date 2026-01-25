"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart, Loader2, ChevronLeft, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/helper/AuthContext";
import { addToLocalCart, isInLocalCart, LocalCartItem } from "@/helper/localCart";

interface Category {
  id: string;
  name: string;
  slug?: string;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  duration?: string;
  thumbnail?: string;
  category?: Category;
  isPublished: boolean;
  subheading?: string;
}

const COURSES_PER_PAGE = 20;

const CoursesPage = () => {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isGridInView = useInView(gridRef, { once: true, margin: "-50px" });

  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedCategory]);

  // Check local cart items on mount
  useEffect(() => {
    if (!isAuthenticated) {
      courses.forEach((course) => {
        if (isInLocalCart(course.id)) {
          setAddedToCart((prev) => new Set(prev).add(course.id));
        }
      });
    }
  }, [courses, isAuthenticated]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const categoryParam = selectedCategory !== "all" ? `&category=${selectedCategory}` : "";
      const [coursesRes, categoriesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/course/get-courses?page=${currentPage}&limit=${COURSES_PER_PAGE}${categoryParam}`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`),
      ]);

      // Handle courses response
      if (coursesRes.data?.data) {
        const data = coursesRes.data.data;
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
          setTotalPages(data.totalPages || 1);
        } else if (Array.isArray(data)) {
          setCourses(data);
          setTotalPages(1);
        } else {
          setCourses([]);
        }
      } else {
        setCourses([]);
      }

      // Handle categories response
      if (categoriesRes.data?.data) {
        setCategories(Array.isArray(categoriesRes.data.data) ? categoriesRes.data.data : []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (course: Course, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If already in cart, don't add again
    if (addedToCart.has(course.id)) {
      toast.info("Already in cart");
      return;
    }

    setAddingToCart(course.id);

    // If authenticated, use server cart
    if (isAuthenticated) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/add/${course.slug}`
        );
        if (response.data?.success) {
          toast.success("Added to cart");
          setAddedToCart((prev) => new Set(prev).add(course.id));
        }
      } catch (error: any) {
        if (error.response?.data?.message?.includes("already")) {
          toast.info("Already in cart");
          setAddedToCart((prev) => new Set(prev).add(course.id));
        } else {
          toast.error(error.response?.data?.message || "Failed to add to cart");
        }
      }
    } else {
      // Use local cart for guests
      const cartItem: LocalCartItem = {
        id: `local_${course.id}`,
        courseId: course.id,
        courseSlug: course.slug,
        title: course.title,
        price: course.price,
        salePrice: course.salePrice,
        thumbnail: course.thumbnail,
        category: course.category?.name,
      };

      addToLocalCart(cartItem);
      toast.success("Added to cart");
      setAddedToCart((prev) => new Set(prev).add(course.id));
    }

    setAddingToCart(null);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#525252] text-xs tracking-[0.3em] uppercase block mb-6">
              Programs
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Professional Market
              <br />
              <span className="text-red-600">Education Programs</span>
            </h1>

            <p className="text-[#737373] text-lg max-w-xl mx-auto">
              Structured learning across Stocks, Forex & Crypto
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-5 py-2.5 text-sm rounded-lg transition-colors ${selectedCategory === "all"
                  ? "bg-red-900/30 text-red-400 border border-red-900/50"
                  : "text-[#737373] hover:text-white border border-zinc-800 hover:border-zinc-700"
                  }`}
              >
                All Programs
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-5 py-2.5 text-sm rounded-lg transition-colors ${selectedCategory === cat.id
                    ? "bg-red-900/30 text-red-400 border border-red-900/50"
                    : "text-[#737373] hover:text-white border border-zinc-800 hover:border-zinc-700"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Courses Grid */}
      <section ref={gridRef} className="py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-20">
              <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto" />
              <p className="text-[#525252] mt-4">Loading programs...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#737373] text-lg">No programs available.</p>
              <p className="text-[#525252] text-sm mt-2">Check back soon for new courses.</p>
            </div>
          ) : (
            <>
              {/* 4 Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                  >
                    <Link href={`/courses/${course.slug}`} className="block group">
                      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-xl overflow-hidden hover:border-red-900/50 transition-all duration-300 h-full">
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-zinc-900">
                          {course.thumbnail ? (
                            <Image
                              src={course.thumbnail}
                              alt={course.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-950/30 to-black">
                              <span className="text-red-600 font-bold text-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                                {course.category?.name?.slice(0, 3).toUpperCase() || "MFX"}
                              </span>
                            </div>
                          )}
                          {/* Category Badge */}
                          {course.category && (
                            <div className="absolute top-3 left-3">
                              <span className="px-3 py-1 text-xs bg-[#0a0a0a]/70 backdrop-blur-sm text-white rounded-full border border-zinc-700">
                                {course.category.name}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3
                            className="text-base font-semibold text-white mb-2 group-hover:text-red-50 transition-colors line-clamp-2"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {course.title}
                          </h3>

                          {course.subheading && (
                            <p className="text-[#525252] text-xs mb-3 line-clamp-2">
                              {course.subheading}
                            </p>
                          )}

                          {/* Price & Cart */}
                          <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                            <div className="flex items-center gap-2">
                              {course.salePrice && course.salePrice < course.price ? (
                                <>
                                  <span className="text-[#525252] text-xs line-through">
                                    {formatPrice(course.price)}
                                  </span>
                                  <span className="text-red-500 font-bold">
                                    {formatPrice(course.salePrice)}
                                  </span>
                                </>
                              ) : course.price === 0 ? (
                                <span className="text-green-500 font-bold text-sm">Free</span>
                              ) : (
                                <span className="text-white font-bold">
                                  {formatPrice(course.price)}
                                </span>
                              )}
                            </div>

                            {/* Cart Button */}
                            <button
                              onClick={(e) => handleAddToCart(course, e)}
                              disabled={addingToCart === course.id}
                              className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${addedToCart.has(course.id)
                                ? "bg-red-900/30 text-red-400"
                                : "text-[#737373] hover:text-red-400 bg-zinc-900 hover:bg-zinc-800"
                                }`}
                            >
                              {addingToCart === course.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : addedToCart.has(course.id) ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <ShoppingCart className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#737373] hover:text-white border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 text-sm rounded-lg transition-colors ${currentPage === pageNum
                            ? "bg-red-900/30 text-red-400 border border-red-900/50"
                            : "text-[#737373] hover:text-white border border-zinc-800 hover:border-zinc-700"
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#737373] hover:text-white border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Bottom Note */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#525252] text-sm">
            All programs include certification upon completion.
            <br />
            <Link href="/contact" className="text-red-600 hover:text-red-500 transition-colors">
              Contact us
            </Link>{" "}
            for program details and enrollment.
          </p>
        </div>
      </section>

      <div className="h-24 md:hidden" />
    </div>
  );
};

export default CoursesPage;
