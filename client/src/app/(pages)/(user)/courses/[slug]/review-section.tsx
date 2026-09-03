"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageCircle,
  Pencil,
  ThumbsUp,
  Clock,
  User,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Review, ReviewSectionProps } from "@/type";
import { useAuth } from "@/helper/AuthContext";
import axios from "axios";

export const ReviewSection = ({
  courseId,
  isEnrolled,
  hasPurchased,
  userId,
}: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const { checkAuth } = useAuth();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    return `${name.charAt(0)}${"*".repeat(name.length - 2)}${name.charAt(
      name.length - 1
    )}@${domain}`;
  };

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/review/course/${courseId}`);
      setReviews(data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const averageRating = reviews.length
    ? (
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    ).toFixed(1)
    : "0.0";

  const handleSubmitReview = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      toast.error("Please login to submit a review");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await api.post("/review/create", {
        courseId,
        rating,
        comment,
      });

      if (data.success) {
        setReviews((prev) => [...prev, data.data]);
        setUserReview(data.data);
        setComment("");
        setRating(0);
        setIsWriteReviewOpen(false);
        toast.success("Review submitted successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReview = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      toast.error("Please login to update your review");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await api.put(`/review/update/${userReview?.id}`, {
        rating,
        comment,
      });

      if (data.success) {
        setReviews((prev) =>
          prev.map((review) =>
            review.id === userReview?.id ? data.data : review
          )
        );
        setUserReview(data.data);
        setComment("");
        setRating(0);
        setIsWriteReviewOpen(false);
        setIsEditMode(false);
        toast.success("Review updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canReview = (isEnrolled || hasPurchased) && !userReview;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-red-400";
    if (rating >= 4.0) return "text-red-400";
    if (rating >= 3.5) return "text-yellow-400";
    if (rating >= 3.0) return "text-orange-400";
    return "text-red-400";
  };

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Very Good";
    if (rating >= 3.5) return "Good";
    if (rating >= 3.0) return "Average";
    return "Poor";
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6"
      >
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
            <div className="space-y-3 lg:space-y-4 w-full lg:w-auto">
              <h2
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Course Reviews
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center">
                      <Star className="w-6 h-6 fill-red-500 text-red-500" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {averageRating}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {averageRating}
                    </div>
                    <div
                      className={`text-xs font-medium ${getRatingColor(
                        parseFloat(averageRating)
                      )}`}
                    >
                      {getRatingText(parseFloat(averageRating))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#737373]">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="font-medium text-sm">
                    {reviews.length}
                  </span>
                  <span className="text-sm">reviews</span>
                </div>
              </div>
            </div>

            {canReview && (
              <button
                onClick={() => setIsWriteReviewOpen(true)}
                className="px-5 py-2.5 text-white text-sm font-medium rounded-lg transition-colors"
                style={{
                  background: "linear-gradient(135deg, #C79A1E 0%, #A07C16 100%)",
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2 inline" />
                Write Review
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Review Dialog */}
      <Dialog open={isWriteReviewOpen} onOpenChange={setIsWriteReviewOpen}>
        <DialogContent className="w-[95vw] max-w-lg mx-4 bg-[#0f0f0f] border border-zinc-800">
          <DialogHeader>
            <DialogTitle
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {isEditMode ? "Edit Your Review" : "Share Your Experience"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 sm:space-y-6 p-3 sm:p-4">
            <div className="text-center">
              <p className="text-[#737373] mb-4 text-sm">
                How would you rate this course?
              </p>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="relative group"
                  >
                    <Star
                      className={`w-8 h-8 transition-all duration-300 ${star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-600"
                        }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-2 text-sm font-medium text-red-400">
                  {getRatingText(rating)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#737373]">
                Your Review
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this course..."
                className="min-h-[100px] bg-zinc-900/50 border-zinc-800 focus:border-red-700 text-white placeholder-zinc-500 resize-none"
              />
            </div>

            <button
              onClick={isEditMode ? handleEditReview : handleSubmitReview}
              disabled={isSubmitting}
              className="w-full py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #C79A1E 0%, #A07C16 100%)",
              }}
            >
              {isSubmitting
                ? "Submitting..."
                : isEditMode
                  ? "Update Review"
                  : "Submit Review"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reviews List */}
      <ScrollArea className="h-[400px] pr-2">
        <div className="space-y-4">
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 hover:border-red-900/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h3 className="font-medium text-white truncate">
                          {review.user.name}
                        </h3>
                        <p className="text-xs text-[#525252] truncate">
                          {maskEmail(review.user.email)}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-zinc-700"
                                  }`}
                              />
                            ))}
                          </div>
                          <span
                            className={`text-xs font-medium ${getRatingColor(
                              review.rating
                            )}`}
                          >
                            {getRatingText(review.rating)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#525252]">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      {review.isEdited && (
                        <span className="text-red-400">(edited)</span>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-[#a3a3a3] text-sm leading-relaxed">
                    {review.comment}
                  </p>

                  {review.user.id === userId && (
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={() => {
                          setRating(review.rating);
                          setComment(review.comment || "");
                          setIsEditMode(true);
                          setIsWriteReviewOpen(true);
                          setUserReview(review);
                        }}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {reviews.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-lg font-medium text-zinc-400 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-zinc-500 text-sm">
                Be the first to share your experience with this course!
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ReviewSection;
