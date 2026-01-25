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
  TrendingUp,
  Flame,
  Star,
} from "lucide-react";
import parse from "html-react-parser";
import { Element } from "domhandler";
import { Button } from "@/components/ui/button";
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
    if (course.paid) {
      // For paid courses, add to cart (local or server)
      if (isAuthenticated) {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add/${slug}`);
          toast.success("Course added to cart");
          window.location.href = `/buy`;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            if (error.response.data.message?.includes("already")) {
              toast.info("Already in cart");
              window.location.href = `/cart`;
            } else {
              toast.error(error.response.data.message || "Error adding course to cart");
            }
          }
        }
      } else {
        // Guest: add to local cart
        const { addToLocalCart, isInLocalCart } = await import("@/helper/localCart");
        if (isInLocalCart(course.id)) {
          toast.info("Already in cart");
          window.location.href = `/cart`;
          return;
        }
        addToLocalCart({
          id: `local_${course.id}`,
          courseId: course.id,
          courseSlug: slug,
          title: course.title,
          price: course.price,
          salePrice: course.salePrice,
          thumbnail: course.thumbnail,
          category: course.category?.name,
        });
        toast.success("Added to cart");
        window.location.href = `/cart`;
      }
    } else {
      // Free course - needs login for enrollment
      if (!isAuthenticated) {
        window.location.href = `/auth?course-slug=${slug}`;
        return;
      }
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
          <Button className="w-full bg-zinc-800 text-zinc-400" size="lg" disabled>
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
          <button
            className="w-full py-3 text-white font-medium rounded-lg transition-colors"
            style={{
              background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
            }}
          >
            Continue Learning
            <ChevronRight className="w-4 h-4 ml-2 inline" />
          </button>
        </Link>
      );
    }
    return (
      <button
        onClick={handleEnrollment}
        disabled={!hasSections}
        className="w-full py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
        }}
      >
        {course.paid ? (
          <>
            Add to Cart
            <ShoppingCart className="w-4 h-4 ml-2 inline" />
          </>
        ) : (
          <>
            Enroll Now
            <ChevronRight className="w-4 h-4 ml-2 inline" />
          </>
        )}
      </button>
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
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden w-full">
      {/* Course Header */}
      <div className="bg-gradient-to-b from-zinc-900 to-black text-white relative overflow-hidden pt-10">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Course Info */}
            <div className="order-2 lg:order-1 space-y-6 lg:space-y-8">
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-2 lg:gap-3"
              >
                {course.isBestseller && (
                  <div className="flex items-center bg-yellow-500/20 text-yellow-100 border border-yellow-500/30 px-4 py-2 rounded-full text-sm font-medium">
                    <Award className="w-4 h-4 mr-2" /> Bestseller
                  </div>
                )}
                {course.isTrending && (
                  <div className="flex items-center bg-blue-500/20 text-blue-100 border border-blue-500/30 px-4 py-2 rounded-full text-sm font-medium">
                    <TrendingUp className="w-4 h-4 mr-2" /> Trending
                  </div>
                )}
                {course.isPopular && (
                  <div className="flex items-center bg-red-500/20 text-red-100 border border-red-500/30 px-4 py-2 rounded-full text-sm font-medium">
                    <Flame className="w-4 h-4 mr-2" /> Popular
                  </div>
                )}
                {course.isFeatured && (
                  <div className="flex items-center bg-purple-500/20 text-purple-100 border border-purple-500/30 px-4 py-2 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 mr-2" /> Featured
                  </div>
                )}
              </motion.div>

              {/* Title & Subheading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold capitalize leading-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {course.title}
                </h1>
                {course.subheading && (
                  <p className="text-base lg:text-lg text-[#a3a3a3] max-w-2xl">
                    {course.subheading}
                  </p>
                )}
              </motion.div>

              {/* Course Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3"
              >
                <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-4 border border-zinc-800 hover:border-red-900/50 transition-colors">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Languages className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-xs text-[#525252]">Language</p>
                      <span className="text-sm font-medium text-white capitalize">
                        {course.language}
                      </span>
                    </div>
                  </div>
                </div>

                {course.category && (
                  <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-4 border border-zinc-800 hover:border-red-900/50 transition-colors">
                    <div className="flex flex-col items-center text-center gap-2">
                      <Folder className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-xs text-[#525252]">Category</p>
                        <span className="text-sm font-medium text-white capitalize">
                          {course.category.name}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-4 border border-zinc-800 hover:border-red-900/50 transition-colors">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Book className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-xs text-[#525252]">Chapters</p>
                      <span className="text-sm font-medium text-white">
                        {sectionsWithChapters.reduce(
                          (total, section) => total + section.chapters.length,
                          0
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-4 border border-zinc-800 hover:border-red-900/50 transition-colors">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Award className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-xs text-[#525252]">Level</p>
                      <span className="text-sm font-medium text-white">
                        {course.paid ? "Premium" : "Free"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Video/Thumbnail */}
            <div className="order-1 lg:order-2 relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-zinc-800 group">
              <div
                className={`absolute inset-0 transition-all duration-500 ${isPlaying ? "opacity-0" : "opacity-100"
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                <Image
                  src={getCourseImageUrl(course.thumbnail)}
                  alt={course.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                  priority
                />
                {!isPlaying && course.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="p-4 rounded-full bg-red-600/20 backdrop-blur-sm border border-red-600/30">
                      <PlayCircle className="w-10 h-10 text-red-500" />
                    </div>
                  </div>
                )}
              </div>

              {isClient && course.videoUrl && (
                <div
                  className={`absolute inset-0 transition-all duration-500 ${isPlaying ? "opacity-100" : "opacity-0"
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
                    fallback={<div className="absolute inset-0 bg-zinc-900" />}
                  />
                </div>
              )}

              {!videoError && course.videoUrl && (
                <button
                  onClick={togglePlayPause}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isPlaying
                    ? "bg-transparent opacity-0 hover:opacity-100 hover:bg-[#0a0a0a]/30"
                    : "bg-[#0a0a0a]/30 hover:bg-[#0a0a0a]/20"
                    }`}
                >
                  {isPlaying ? (
                    <Pause className="w-12 h-12 text-white" />
                  ) : (
                    <PlayCircle className="w-12 h-12 text-white" />
                  )}
                </button>
              )}

              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/70 text-white p-4">
                  <p className="text-center text-sm">
                    Sorry, the video could not be played.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Course Description, Content, and Reviews */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#0f0f0f] border border-zinc-800 rounded-xl overflow-hidden"
            >
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b border-zinc-800 bg-zinc-900/50">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400 hover:bg-zinc-800/50 transition-all"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="content"
                    className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400 hover:bg-zinc-800/50 transition-all"
                  >
                    Course Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400 hover:bg-zinc-800/50 transition-all"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-900/20 rounded-lg">
                      <Book className="w-5 h-5 text-red-500" />
                    </div>
                    <h2
                      className="text-xl font-semibold text-white"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Course Description
                    </h2>
                  </div>

                  <div className="prose prose-invert text-[#a3a3a3] max-w-none">
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
                        <Book className="w-10 h-10 mx-auto mb-4 text-zinc-600" />
                        <h3 className="text-lg font-medium text-zinc-400 mb-2">
                          No Description Available
                        </h3>
                        <p className="text-zinc-500">
                          This course doesn't have a description yet.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="content" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-900/20 rounded-lg">
                      <Folder className="w-5 h-5 text-red-500" />
                    </div>
                    <h2
                      className="text-xl font-semibold text-white"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Course Content
                    </h2>
                  </div>

                  <Accordion
                    type="single"
                    defaultValue={defaultSection}
                    collapsible
                    className="space-y-3"
                  >
                    {sectionsWithChapters.length > 0 ? (
                      sectionsWithChapters.map((section, sectionIndex) => (
                        <AccordionItem
                          key={section.id}
                          value={section.id}
                          className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/30 hover:border-red-900/50 transition-colors"
                        >
                          <AccordionTrigger className="px-4 py-3 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-red-500 bg-red-900/20 px-2 py-1 rounded">
                                {String(sectionIndex + 1).padStart(2, "0")}
                              </span>
                              <span className="font-medium text-white text-left">
                                {section.title}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 p-4 bg-[#0a0a0a]/30">
                              {section.chapters.map((chapter) => (
                                <div
                                  key={chapter.id}
                                  onClick={() => handleChapterClick(chapter)}
                                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${(!course.paid && isEnrolled) ||
                                    chapter.isFree ||
                                    hasPurchased
                                    ? "hover:bg-zinc-800/50 cursor-pointer"
                                    : "opacity-60"
                                    }`}
                                >
                                  <div className="flex items-center gap-3">
                                    {chapter.isFree ||
                                      (course.paid && hasPurchased) ||
                                      (!course.paid && isEnrolled) ? (
                                      <PlayCircle className="w-4 h-4 text-red-500" />
                                    ) : (
                                      <Lock className="w-4 h-4 text-zinc-500" />
                                    )}
                                    <span
                                      className={
                                        chapter.isFree ||
                                          (course.paid && hasPurchased) ||
                                          (!course.paid && isEnrolled)
                                          ? "text-white"
                                          : "text-zinc-500"
                                      }
                                    >
                                      {chapter.title}
                                    </span>
                                  </div>
                                  <span
                                    className={`text-xs px-2 py-1 rounded ${chapter.isFree
                                      ? "bg-red-900/20 text-red-400"
                                      : "bg-zinc-800 text-zinc-500"
                                      }`}
                                  >
                                    {chapter.isFree
                                      ? "Free"
                                      : (course.paid && hasPurchased) ||
                                        (!course.paid && isEnrolled)
                                        ? "Enrolled"
                                        : "Premium"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <AlertTriangle className="w-10 h-10 mx-auto mb-4 text-yellow-500" />
                        <h3 className="text-lg font-medium text-zinc-300 mb-2">
                          No Content Available
                        </h3>
                        <p className="text-zinc-500">
                          Check back soon for course content.
                        </p>
                      </div>
                    )}
                  </Accordion>
                </TabsContent>

                <TabsContent value="reviews" className="p-6">
                  <ReviewSection
                    courseId={course.id}
                    isEnrolled={isEnrolled}
                    hasPurchased={hasPurchased}
                  />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Pricing Card */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0f0f0f] border border-zinc-800 rounded-xl p-6 sticky top-24"
            >
              {/* Price */}
              <div className="mb-6 pb-6 border-b border-zinc-800">
                {course.salePrice && course.salePrice < course.price ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {formatPrice(course.salePrice)}
                    </span>
                    <span className="text-lg text-[#525252] line-through">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                ) : course.price === 0 ? (
                  <span className="text-3xl font-bold text-green-500">Free</span>
                ) : (
                  <span className="text-3xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {formatPrice(course.price)}
                  </span>
                )}
                {course.validityDays && course.validityDays > 0 && (
                  <p className="text-xs text-[#525252] mt-2">
                    Access for {course.validityDays} days
                  </p>
                )}
              </div>

              {/* Enroll Button */}
              {renderEnrollmentButton()}

              {/* Course Includes */}
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <h4 className="text-sm font-medium text-[#737373] mb-4">
                  This course includes:
                </h4>
                <ul className="space-y-3 text-sm text-[#a3a3a3]">
                  <li className="flex items-center gap-3">
                    <Book className="w-4 h-4 text-red-500" />
                    {sectionsWithChapters.reduce(
                      (total, section) => total + section.chapters.length,
                      0
                    )}{" "}
                    chapters
                  </li>
                  <li className="flex items-center gap-3">
                    <Languages className="w-4 h-4 text-red-500" />
                    {course.language} language
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-red-500" />
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Free Chapter Dialog */}
      <FreeChapterDialog
        isOpen={!!selectedChapter}
        onClose={() => {
          setSelectedChapter(null);
          setFreeChapterVideo(null);
        }}
        chapterTitle={selectedChapter?.title || ""}
        videoUrl={freeChapterVideo}
        isLoading={isLoadingVideo}
        error={videoError}
      />

      <div className="h-24 md:hidden" />
    </div>
  );
};

export default CourseClient;
