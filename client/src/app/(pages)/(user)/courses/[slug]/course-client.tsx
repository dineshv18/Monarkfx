"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  PlayCircle,
  Book,
  Award,
  ChevronRight,
  Languages,
  ShoppingCart,
  AlertTriangle,
  Pause,
  Lock,
  Folder,
  Check,
  TrendingUp,
  Flame,
  Star,
} from "lucide-react";
import parse from "html-react-parser";
import { Element } from "domhandler";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/helper/AuthContext";
import { toast } from "sonner";
import ReactPlayer from "react-player";
import { ErrorComponent, LoadingSkeleton } from "./course-loading-error";
import FreeChapterDialog from "./FreeChapterDialog";
import { formatPrice } from "@/helper/FormatPrice";
import ReviewSection from "./review-section";
import { motion } from "framer-motion";
import { getCourseImageUrl } from "@/lib/cloudinary";

interface Chapter {
  id: string;
  title: string;
  isFree: boolean;
  description: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
}

interface Section {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  user: {
    name: string;
    avatar: string;
  };
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  salePrice?: number;
  paid: boolean;
  language: string;
  subheading: string;
  videoUrl: string;
  isBestseller: boolean;
  isTrending: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  metaTitle: string;
  metaDesc: string;
  sections: Section[];
  category: Category;
  reviews: Review[];
  userId: string;
  validityDays?: number;
}

interface CourseClientProps {
  initialCourseData: CourseData;
  slug: string;
}

const CourseClient: React.FC<CourseClientProps> = ({
  initialCourseData,
  slug,
}) => {
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [course] = useState<CourseData>(initialCourseData);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState<string | boolean>(false);
  const { isAuthenticated } = useAuth();
  const [defaultSection, setDefaultSection] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [freeChapterVideo, setFreeChapterVideo] = useState<string | null>(null);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const checkEnrollmentStatus = useCallback(async (courseId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/enrollment/check/${courseId}`
      );
      return response.data.message === "Enrolled in course";
    } catch (error) {
      console.error("Error checking enrollment status:", error);
      return false;
    }
  }, []);

  const checkPurchaseStatus = useCallback(async (courseId: string) => {
    try {
      const purchaseResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/purchase/${courseId}`
      );
      return purchaseResponse.data.data === "Course purchased";
    } catch (error) {
      console.error("Error checking purchase status:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    const checkEnrollmentAndPurchaseStatus = async () => {
      if (isAuthenticated) {
        if (!course.paid) {
          const enrollmentStatus = await checkEnrollmentStatus(course.id);
          setIsEnrolled(enrollmentStatus);
        } else {
          const purchaseStatus = await checkPurchaseStatus(course.id);
          setHasPurchased(purchaseStatus);
        }
      }
    };

    checkEnrollmentAndPurchaseStatus();
  }, [course, isAuthenticated, checkEnrollmentStatus, checkPurchaseStatus]);

  useEffect(() => {
    const sectionsWithChapters =
      course?.sections?.filter(
        (section) => section?.chapters && section.chapters.length > 0
      ) || [];

    const firstSectionWithChapters = sectionsWithChapters[0];
    if (firstSectionWithChapters) {
      setDefaultSection(firstSectionWithChapters.id);
    }
  }, [course]);

  const handleEnrollment = async () => {
    if (!isAuthenticated) {
      window.location.href = `/auth?course-slug=${slug}`;
      return;
    }

    if (course.paid) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          courseId: course.id,
        });
        toast.success("Course added to cart");
        window.location.href = `/buy?course-slug=${slug}`;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(
            error.response.data.message || "Error adding course to cart"
          );
        }
      }
    } else {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/enrollment/enroll`,
          { courseId: course.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Successfully enrolled in course");
        setIsEnrolled(true);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.data.message.includes("Already enrolled")) {
            setIsEnrolled(true);
          } else {
            toast.error(
              error.response.data.message || "Error enrolling in course"
            );
          }
        }
      }
    }
  };

  const getFirstAvailableChapter = (
    sections: Section[]
  ): { slug: string; id: string } | null => {
    for (const section of sections) {
      if (section.chapters && section.chapters.length > 0) {
        return {
          slug: section.chapters[0].slug,
          id: section.chapters[0].id,
        };
      }
    }
    return null;
  };

  const sectionsWithChapters =
    course?.sections?.filter(
      (section) => section?.chapters && section.chapters.length > 0
    ) || [];

  const hasSections = sectionsWithChapters.length > 0;

  const renderEnrollmentButton = () => {
    if (!course) return null;

    if ((course.paid && hasPurchased) || (!course.paid && isEnrolled)) {
      const firstChapter = getFirstAvailableChapter(course.sections);
      if (!firstChapter) {
        return (
          <Button className="w-full" size="lg" disabled>
            No Chapters Available
            <AlertTriangle className="w-4 h-4 ml-2" />
          </Button>
        );
      }
      return (
        <Link
          href={`/courses/${slug}/${firstChapter.id}`}
          className="block w-full"
        >
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            size="lg"
          >
            Continue Learning
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      );
    }
    return (
      <Button
        onClick={handleEnrollment}
        className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-300"
        size="lg"
        variant="default"
        disabled={!hasSections}
      >
        {course.paid ? (
          <>
            Add to Cart
            <ShoppingCart className="w-4 h-4 ml-2" />
          </>
        ) : (
          <>
            Enroll Now
            <ChevronRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    );
  };

  const cleanHtml = (html: string) => {
    return html
      .replace(/<(ul|ol)>\s*<\/\1>/g, "")
      .replace(/<li>\s*<\/li>/g, "")
      .replace(/<p>\s*<\/p>/g, "")
      .replace(/<[^>]*>\s*<\/[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setVideoError(false);
  };

  const handleChapterClick = (chapter: Chapter) => {
    if (!course.paid) {
      if (isEnrolled) {
        window.location.href = `/courses/${slug}/${chapter.id}`;
        return;
      } else {
        handleEnrollment();
        return;
      }
    }
    if (chapter.isFree) {
      setSelectedChapter({ id: chapter.id, title: chapter.title });
      setIsLoadingVideo(true);
      setVideoError(false);
      setFreeChapterVideo(null);

      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/course/free-chapter-video/${slug}/${chapter.id}`
        )
        .then((response) => {
          setFreeChapterVideo(response.data.data.videoUrl);
        })
        .catch((error) => {
          setVideoError("Failed to load video. Please try again later.");
          console.error("Error loading free chapter video:", error);
        })
        .finally(() => {
          setIsLoadingVideo(false);
        });
    } else if (hasPurchased) {
      window.location.href = `/courses/${slug}/${chapter.id}`;
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="min-h-screen bg-black font-plus-jakarta-sansye">
      {/* Course Header */}
      <div className="bg-gradient-to-b from-zinc-900 to-black text-white relative overflow-hidden pt-10 ">
        <div className="absolute inset-0 opacity-5 ">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl relative z-10 ">
          {" "}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Course Info */}
            <div className="order-2 md:order-1 space-y-8">
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                {course.isBestseller && (
                  <div className="flex items-center bg-gradient-to-r from-yellow-500/30 to-amber-500/30 text-yellow-100 border border-yellow-400/50 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm shadow-lg">
                    <Award className="w-5 h-5 mr-2" /> Bestseller
                  </div>
                )}
                {course.isTrending && (
                  <div className="flex items-center bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-100 border border-blue-400/50 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm shadow-lg">
                    <TrendingUp className="w-5 h-5 mr-2" /> Trending
                  </div>
                )}
                {course.isPopular && (
                  <div className="flex items-center bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-100 border border-green-400/50 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm shadow-lg">
                    <Flame className="w-5 h-5 mr-2" /> Popular
                  </div>
                )}
                {course.isFeatured && (
                  <div className="flex items-center bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 text-purple-100 border border-purple-400/50 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm shadow-lg">
                    <Star className="w-5 h-5 mr-2" /> Featured
                  </div>
                )}
              </motion.div>
              {/* Title & Subheading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 md:space-y-6"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold capitalize leading-tight tracking-tight">
                  <span className="inline-block">{course.title}</span>
                </h1>
                {course.subheading && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-white/80 font-medium max-w-3xl leading-relaxed"
                  >
                    {course.subheading}
                  </motion.p>
                )}
              </motion.div>

              {/* Course Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {/* Language Card */}
                <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-5 border border-green-500/30 hover:border-green-400/50 hover:bg-zinc-900/80 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                      <Languages className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-400 mb-1">
                        Language
                      </p>
                      <span className="text-base font-bold text-white capitalize">
                        {course.language}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category Card */}
                {course.category && (
                  <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-5 border border-green-500/30 hover:border-green-400/50 hover:bg-zinc-900/80 transition-all duration-300 group">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                        <Folder className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-400 mb-1">
                          Category
                        </p>
                        <span className="text-base font-bold text-white capitalize">
                          {course.category.name}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chapters Count */}
                <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-5 border border-green-500/30 hover:border-green-400/50 hover:bg-zinc-900/80 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                      <Book className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-400 mb-1">
                        Chapters
                      </p>
                      <span className="text-base font-bold text-white">
                        {sectionsWithChapters.reduce(
                          (total, section) => total + section.chapters.length,
                          0
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Level Badge */}
                <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-5 border border-green-500/30 hover:border-green-400/50 hover:bg-zinc-900/80 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                      <Award className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-400 mb-1">
                        Level
                      </p>
                      <span className="text-base font-bold text-white">
                        {course.paid ? "Premium" : "Free"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Video/Thumbnail */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-green-500/20 group">
              {/* Thumbnail Image - Always visible when not playing */}
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  isPlaying ? "opacity-0 scale-110" : "opacity-100 scale-100"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
                <Image
                  src={getCourseImageUrl(course.thumbnail)}
                  alt={course.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                  priority
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="p-4 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/30 transition-transform duration-300 group-hover:scale-110">
                      <PlayCircle className="w-12 h-12 text-green-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* Video Player - Only visible when playing and video URL exists */}
              {isClient && course.videoUrl && (
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  <ReactPlayer
                    url={course.videoUrl}
                    width="100%"
                    height="100%"
                    playing={isPlaying}
                    controls={false}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    onError={() => setVideoError(true)}
                    className="rounded-xl overflow-hidden"
                    fallback={<div className="absolute inset-0 bg-gray-200" />}
                  />
                </div>
              )}

              {/* Play/Pause Overlay - Only show if video URL exists */}
              {!videoError && course.videoUrl && (
                <button
                  onClick={togglePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all duration-300"
                >
                  {isPlaying ? (
                    <Pause className="w-20 h-20 text-white transition-transform hover:scale-110" />
                  ) : (
                    <PlayCircle className="w-20 h-20 text-white transition-transform hover:scale-110" />
                  )}
                </button>
              )}

              {/* Error Message */}
              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
                  <p>Sorry, the video could not be played.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Course Description, Content, and Reviews */}
          <div className="md:col-span-2 order-2 md:order-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 rounded-2xl overflow-hidden shadow-xl"
            >
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b border-zinc-700 bg-zinc-900/50 backdrop-blur-sm">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 hover:bg-zinc-800/50 transition-all duration-300"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="content"
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 hover:bg-zinc-800/50 transition-all duration-300"
                  >
                    Course Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 hover:bg-zinc-800/50 transition-all duration-300"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-green-500/20 rounded-xl">
                        <Book className="w-6 h-6 text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        Course Description
                      </h2>
                    </div>

                    <div className="prose prose-lg dark:prose-invert text-zinc-200 max-w-none">
                      {course.description ? (
                        parse(cleanHtml(course.description), {
                          replace: (domNode) => {
                            if (
                              domNode instanceof Element &&
                              (!domNode.children?.length ||
                                (domNode.children.length === 1 &&
                                  "data" in domNode.children[0] &&
                                  !domNode.children[0].data?.trim()))
                            ) {
                              return <></>;
                            }
                            return domNode;
                          },
                        })
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                            <Book className="w-8 h-8 text-zinc-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-zinc-300 mb-2">
                            No Description Available
                          </h3>
                          <p className="text-zinc-400">
                            This course doesn't have a description yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="content" className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-green-500/20 rounded-xl">
                        <Folder className="w-6 h-6 text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        Course Content
                      </h2>
                    </div>

                    <Accordion
                      type="single"
                      defaultValue={defaultSection}
                      collapsible
                      className="space-y-4"
                    >
                      {sectionsWithChapters.length > 0 ? (
                        sectionsWithChapters.map((section, sectionIndex) => (
                          <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: sectionIndex * 0.1,
                            }}
                          >
                            <AccordionItem
                              value={section.id}
                              className="border border-zinc-700 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-900/50 to-black/50 hover:border-green-500/30 transition-all duration-300"
                            >
                              <AccordionTrigger className="px-6 py-4 bg-gradient-to-r from-zinc-900/80 to-black/80 hover:from-zinc-800/80 hover:to-black/80 transition-all duration-300 group">
                                <div className="flex items-center gap-4">
                                  <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                                    <span className="text-sm font-bold text-green-400">
                                      {String(sectionIndex + 1).padStart(
                                        2,
                                        "0"
                                      )}
                                    </span>
                                  </div>
                                  <div className="text-left">
                                    <span className="text-green-400 font-semibold text-sm">
                                      Section {sectionIndex + 1}
                                    </span>
                                    <div className="font-medium text-white group-hover:text-green-300 transition-colors">
                                      {section.title}
                                    </div>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3 p-6 bg-zinc-900/30">
                                  {section.chapters.map(
                                    (chapter, chapterIndex) => (
                                      <motion.div
                                        key={chapter.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                          duration: 0.3,
                                          delay: chapterIndex * 0.05,
                                        }}
                                        className={`group flex flex-col gap-2 p-4 rounded-xl transition-all duration-300 ${
                                          (!course.paid && isEnrolled) ||
                                          chapter.isFree ||
                                          hasPurchased
                                            ? "hover:bg-zinc-800/50 cursor-pointer bg-zinc-900/30 border border-zinc-800/50 hover:border-green-500/30"
                                            : "bg-zinc-900/50 border border-zinc-800/50"
                                        }`}
                                        onClick={() =>
                                          handleChapterClick(chapter)
                                        }
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            {chapter.isFree ||
                                            (course.paid && hasPurchased) ||
                                            (!course.paid && isEnrolled) ? (
                                              <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors duration-300">
                                                <PlayCircle className="w-4 h-4 text-green-500" />
                                              </div>
                                            ) : (
                                              <div className="p-2 rounded-lg bg-zinc-800/50">
                                                <Lock className="w-4 h-4 text-zinc-500" />
                                              </div>
                                            )}
                                            <span
                                              className={`font-medium ${
                                                chapter.isFree ||
                                                (course.paid && hasPurchased) ||
                                                (!course.paid && isEnrolled)
                                                  ? "text-white group-hover:text-green-400 transition-colors duration-300"
                                                  : "text-zinc-400"
                                              }`}
                                            >
                                              {chapter.title}
                                            </span>
                                          </div>
                                          <span
                                            className={
                                              chapter.isFree
                                                ? "bg-green-500/20 text-green-300 border-green-500/30 "
                                                : (course.paid &&
                                                    hasPurchased) ||
                                                  (!course.paid && isEnrolled)
                                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 rounded-full px-3 py-1 text-sm"
                                                : "border-zinc-700 text-zinc-400 bg-zinc-800/50 rounded-full px-3 py-1 text-sm"
                                            }
                                          >
                                            {chapter.isFree
                                              ? "Free"
                                              : (course.paid && hasPurchased) ||
                                                (!course.paid && isEnrolled)
                                              ? "Enrolled"
                                              : "Premium"}
                                          </span>
                                        </div>
                                      </motion.div>
                                    )
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-12"
                        >
                          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-12 h-12 text-yellow-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-zinc-300 mb-3">
                            No Content Available
                          </h3>
                          <p className="text-zinc-400 max-w-md mx-auto">
                            This course doesn't have any sections or chapters
                            yet. Content will be added soon!
                          </p>
                        </motion.div>
                      )}
                    </Accordion>
                  </motion.div>
                </TabsContent>

                <TabsContent value="reviews" className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <ReviewSection
                      courseId={course.id}
                      isEnrolled={isEnrolled}
                      hasPurchased={hasPurchased}
                      userId={course.userId}
                    />
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Price Card */}
          <div className="md:col-span-1 order-1 md:order-none">
            <Card className="sticky top-4 overflow-hidden border-0 shadow-xl bg-gray-900 backdrop-blur-sm">
              {/* Price Header Section */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10" />
                <CardHeader className="space-y-4 relative">
                  <CardTitle className="space-y-4">
                    {(course.paid && hasPurchased) ||
                    (!course.paid && isEnrolled) ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-3 p-4"
                      >
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="bg-green-500/20 text-green-200 text-base px-6 py-2 rounded-full border border-green-500/30 font-semibold">
                          Enrolled Successfully
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 p-4">
                        {course.paid ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                          >
                            <div className="flex items-center justify-center gap-2 mb-2">
                              {course.salePrice ? (
                                <>
                                  {/* Sale Price */}
                                  <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                                    {formatPrice(course.salePrice)}
                                  </span>
                                  {/* Original Price */}
                                  <span className="text-lg text-gray-500 line-through ml-2">
                                    {formatPrice(course.price)}
                                  </span>
                                  {/* Discount Badge */}
                                  <div className="bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
                                    Save{" "}
                                    {Math.round(
                                      ((course.price - course.salePrice) /
                                        course.price) *
                                        100
                                    )}
                                    %
                                  </div>
                                </>
                              ) : (
                                <>
                                  {/* Regular Price */}
                                  <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                                    {formatPrice(course.price)}
                                  </span>
                                  <div className="bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-xs font-bold uppercase border border-green-500/30">
                                    Premium
                                  </div>
                                </>
                              )}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                          >
                            <span className="text-4xl font-bold text-green-600">
                              FREE
                            </span>
                            <div className="ml-2 bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
                              Limited Time
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
              </div>

              <CardContent className="space-y-6">
                {/* Enrollment Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {renderEnrollmentButton()}
                </motion.div>

                {/* Course Features */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  {(!course.paid && isEnrolled) ||
                  (course.paid && hasPurchased) ? (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-white text-lg">
                        Course Progress
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                          <div className="p-2 bg-green-500/30 rounded-lg">
                            <Book className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-green-200">
                              Course Enrolled
                            </p>
                            <p className="text-sm text-green-300">
                              {!course.validityDays || course.validityDays === 0
                                ? "Lifetime access granted"
                                : `${course.validityDays} days access granted`}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-center gap-3 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                          <div className="p-2 bg-blue-500/30 rounded-lg">
                            <Award className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-blue-200">
                              Certificate Available
                            </p>
                            <p className="text-sm text-blue-300">
                              Complete to earn
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-white text-lg">
                        Course Includes
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 p-4 rounded-lg bg-zinc-800/50 border border-green-500/20 hover:bg-zinc-800/80 hover:border-green-500/30 transition-all duration-300">
                          <div className="p-2 bg-green-500/20 rounded-lg">
                            <PlayCircle className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {sectionsWithChapters.reduce(
                                (total, section) =>
                                  total + section.chapters.length,
                                0
                              )}{" "}
                              Chapters
                            </p>
                            <p className="text-sm text-zinc-400">
                              Comprehensive content
                            </p>
                          </div>
                        </li>
                        <li className="flex items-center gap-3 p-4 rounded-lg bg-zinc-800/50 border border-green-500/20 hover:bg-zinc-800/80 hover:border-green-500/30 transition-all duration-300">
                          <div className="p-2 bg-green-500/20 rounded-lg">
                            <Book className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {!course.validityDays || course.validityDays === 0
                                ? "Lifetime Access"
                                : `${course.validityDays} Days Access`}
                            </p>
                            <p className="text-sm text-zinc-400">
                              {!course.validityDays || course.validityDays === 0
                                ? "Learn at your own pace"
                                : `Access expires after ${course.validityDays} days`}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-center gap-3 p-4 rounded-lg bg-zinc-800/50 border border-green-500/20 hover:bg-zinc-800/80 hover:border-green-500/30 transition-all duration-300">
                          <div className="p-2 bg-green-500/20 rounded-lg">
                            <Award className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              Completion Certificate
                            </p>
                            <p className="text-sm text-zinc-400">
                              Verify your achievement
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {course.paid && (
        <FreeChapterDialog
          isOpen={!!selectedChapter}
          onClose={() => {
            setSelectedChapter(null);
            setFreeChapterVideo(null);
            setVideoError(false);
          }}
          chapterTitle={selectedChapter?.title || ""}
          videoUrl={freeChapterVideo}
          isLoading={isLoadingVideo}
          error={videoError}
        />
      )}
    </div>
  );
};

export default CourseClient;
