"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  BarChart3,
  BookOpen,
  Award,
  Gift,
  ArrowRight,
  Star,
  Users,
  Clock,
  Zap,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import SecureChainCourseCard from "./SecureChainCourseCard";
import { CourseDataNew } from "@/type";
import { motion, useInView } from "framer-motion";
import Headtext from "./head-text";

interface SectionProps {
  title: string;
  subtitle: string;
  courses: CourseDataNew[] | null;
  headingClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
  sectionKey: string;
}

interface FeaturedData {
  featured: CourseDataNew[] | null;
  popular: CourseDataNew[] | null;
  trending: CourseDataNew[] | null;
  bestseller: CourseDataNew[] | null;
  free: CourseDataNew[] | null;
}

const CourseSection = ({
  title,
  subtitle,
  courses,
  headingClassName = "",
  subtitleClassName = "",
  containerClassName = "",
  sectionKey,
}: SectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  if (!courses || courses.length === 0) return null;

  const showMoreButton = courses.length >= 4;

  const sectionColors = {
    featured: {
      gradient: "from-green-500 to-emerald-600",
      bg: "from-green-500/10 to-emerald-500/5",
      border: "border-green-500/20",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    popular: {
      gradient: "from-blue-500 to-cyan-600",
      bg: "from-blue-500/10 to-cyan-500/5",
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
    trending: {
      gradient: "from-purple-500 to-pink-600",
      bg: "from-purple-500/10 to-pink-500/5",
      border: "border-purple-500/20",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
    bestseller: {
      gradient: "from-orange-500 to-red-600",
      bg: "from-orange-500/10 to-red-500/5",
      border: "border-orange-500/20",
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-400",
    },
    free: {
      gradient: "from-teal-500 to-green-600",
      bg: "from-teal-500/10 to-green-500/5",
      border: "border-teal-500/20",
      iconBg: "bg-teal-500/20",
      iconColor: "text-teal-400",
    },
  };

  const colors =
    sectionColors[sectionKey as keyof typeof sectionColors] ||
    sectionColors.featured;

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gradient-to-br from-zinc-900/95 to-black/95 "
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r ${colors.bg} blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-zinc-500/10 to-zinc-600/10 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div
        className={`container mx-auto px-4 max-w-7xl relative z-10 ${containerClassName}`}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-4xl md:text-5xl font-bold text-green-400 mb-6 ${headingClassName}`}
          >
            <Headtext text={title} className={headingClassName} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed ${subtitleClassName}`}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.6 + index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -8 }}
            >
              <SecureChainCourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>

        {/* Show More Button */}
        {showMoreButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/courses"
                className={`px-8 py-4 bg-gradient-to-r ${colors.gradient} hover:shadow-xl text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg`}
              >
                <span>Explore More Courses</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const SectionSkeleton = () => (
  <section className="py-20 bg-black">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-16">
        <Skeleton className="h-16 w-16 mx-auto mb-6 rounded-2xl" />
        <Skeleton className="h-12 w-96 mx-auto mb-4" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 h-[480px]"
          >
            <Skeleton className="h-[220px] rounded-t-3xl" />
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="pt-4 border-t border-zinc-800/50">
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedCourses = ({
  sectionType,
  headingClassName,
  subtitleClassName,
  containerClassName,
}: {
  sectionType?: "featured" | "popular" | "trending" | "bestseller" | "free";
  headingClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
}) => {
  const [data, setData] = useState<FeaturedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedSections = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/course/featured-sections`
        );

        if (response.data.success) {
          setData(response.data.data);
        } else {
          console.error("API returned success: false");
          setError("Failed to load courses");
        }
      } catch (error) {
        console.error("Error fetching featured sections:", error);
        setError("Failed to load courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedSections();
  }, []);

  if (isLoading) {
    return <SectionSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900/95 to-black/95  text-white flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-red-500/20 rounded-2xl border border-red-500/30 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-400 mx-auto" />
          </div>
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const sections = [
    {
      key: "featured",
      title: "Featured Courses",
      subtitle:
        "Explore our carefully curated selection of outstanding courses designed to help you excel in trading",
      data: data?.featured,
    },
    {
      key: "popular",
      title: "Popular Courses",
      subtitle:
        "Discover the courses that our students love most and join the learning revolution",
      data: data?.popular,
    },
    {
      key: "trending",
      title: "Trending Now",
      subtitle:
        "Stay ahead of the curve with our most in-demand and current courses",
      data: data?.trending,
    },
    {
      key: "bestseller",
      title: "Best Sellers",
      subtitle:
        "Experience our top-performing courses that have helped thousands succeed",
      data: data?.bestseller,
    },
    {
      key: "free",
      title: "Free Courses",
      subtitle:
        "Start your learning journey with our collection of high-quality free courses",
      data: data?.free,
    },
  ];

  // If sectionType is provided, show only that section
  if (sectionType) {
    const section = sections.find((s) => s.key === sectionType);
    if (section && section.data) {
      return (
        <CourseSection
          title={section.title}
          subtitle={section.subtitle}
          courses={section.data}
          headingClassName={headingClassName}
          subtitleClassName={subtitleClassName}
          containerClassName={containerClassName}
          sectionKey={section.key}
        />
      );
    }
    return null;
  }

  // Otherwise show all sections
  return (
    <div className="space-y-0 bg-black">
      {sections.map(
        (section) =>
          section.data && (
            <CourseSection
              key={section.key}
              title={section.title}
              subtitle={section.subtitle}
              courses={section.data}
              headingClassName={headingClassName}
              subtitleClassName={subtitleClassName}
              containerClassName={containerClassName}
              sectionKey={section.key}
            />
          )
      )}
    </div>
  );
};

export default FeaturedCourses;
