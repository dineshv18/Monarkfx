"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, BarChart3, BookOpen, Award, Gift } from "lucide-react";
import Link from "next/link";
import EnhancedCourseCard from "./EnhancedCourseCard";
import { CourseDataNew } from "@/type";

interface SectionProps {
  title: string;
  subtitle: string;
  courses: CourseDataNew[] | null;
  icon: React.ElementType;
  headingClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
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
  icon: Icon,
  headingClassName = "",
  subtitleClassName = "",
  containerClassName = "",
}: SectionProps) => {
  if (!courses || courses.length === 0) return null;

  const showMoreButton = courses.length >= 4;

  return (
    <section className="py-16">
      <div
        className={`container mx-auto px-4 max-w-7xl overflow-x-hidden  ${containerClassName}`}
      >
        <div className="flex items-center gap-2 mb-8">
          <Icon className="h-7 w-7 text-red-500" />
          <div>
            <h2
              className={`text-3xl font-bold text-gray-900 ${headingClassName}`}
            >
              {title}
            </h2>
            <p className={`text-base text-gray-600 mt-2 ${subtitleClassName}`}>
              {subtitle}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-8">
          {courses.map((course) => (
            <EnhancedCourseCard key={course.id} course={course} />
          ))}
        </div>
        {showMoreButton && (
          <div className="flex justify-center mt-12">
            <Link
              href="/courses"
              className="px-8 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Explore More Courses
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

const SectionSkeleton = () => (
  <section className="py-8">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="mb-8">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-5 w-72 mt-2" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-[480px]">
            <Skeleton className="h-[220px] rounded-t-lg" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
              <div className="mt-4">
                <Skeleton className="h-8 w-24" />
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
    return <div className="text-center text-red-500">{error}</div>;
  }

  const sections = [
    {
      key: "featured",
      title: "Featured Courses",
      subtitle:
        "Explore our carefully curated selection of outstanding courses designed to help you excel",
      icon: Award,
      data: data?.featured,
    },
    {
      key: "popular",
      title: "Popular Courses",
      subtitle:
        "Discover the courses that our students love most and join the learning revolution",
      icon: BarChart3,
      data: data?.popular,
    },
    {
      key: "trending",
      title: "Trending Now",
      subtitle:
        "Stay ahead of the curve with our most in-demand and current courses",
      icon: TrendingUp,
      data: data?.trending,
    },
    {
      key: "bestseller",
      title: "Bestsellers",
      subtitle:
        "Experience our top-performing courses that have helped thousands succeed",
      icon: BookOpen,
      data: data?.bestseller,
    },
    {
      key: "free",
      title: "Free Courses",
      subtitle:
        "Start your learning journey with our collection of high-quality free courses",
      icon: Gift,
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
          icon={section.icon}
          headingClassName={headingClassName}
          subtitleClassName={subtitleClassName}
          containerClassName={containerClassName}
        />
      );
    }
    return null;
  }

  // Otherwise show all sections
  return (
    <div className="space-y-16">
      {sections.map(
        (section) =>
          section.data && (
            <CourseSection
              key={section.key}
              title={section.title}
              subtitle={section.subtitle}
              courses={section.data}
              icon={section.icon}
              headingClassName={headingClassName}
              subtitleClassName={subtitleClassName}
              containerClassName={containerClassName}
            />
          )
      )}
    </div>
  );
};

export default FeaturedCourses;
