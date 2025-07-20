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
      toast.error("Failed to load reviews");
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
    if (rating >= 4.5) return "text-emerald-400";
    if (rating >= 4.0) return "text-green-400";
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
      {/* Header Section with Business Page Style */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-4">
              <motion.h2
                className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Course Reviews
              </motion.h2>

              <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Star className="w-8 h-8 fill-white text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {averageRating}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {averageRating}
                    </div>
                    <div
                      className={`text-sm font-medium ${getRatingColor(
                        parseFloat(averageRating)
                      )}`}
                    >
                      {getRatingText(parseFloat(averageRating))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-zinc-300">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-semibold">{reviews.length}</span>
                  <span>reviews</span>
                </div>
              </motion.div>
            </div>

            {canReview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={() => setIsWriteReviewOpen(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Write Review
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Review Dialog */}
      <Dialog open={isWriteReviewOpen} onOpenChange={setIsWriteReviewOpen}>
        <DialogContent className="sm:max-w-lg bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {isEditMode ? "Edit Your Review" : "Share Your Experience"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-4">
            <div className="text-center">
              <p className="text-zinc-300 mb-4">
                How would you rate this course?
              </p>
              <div className="flex gap-3 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    <Star
                      className={`w-12 h-12 relative z-10 transition-all duration-300 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                          : "text-zinc-400 hover:text-green-300"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <motion.p
                  className="mt-3 text-lg font-semibold text-green-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getRatingText(rating)}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Your Review
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this course... What did you like? What could be improved?"
                className="min-h-[140px] bg-zinc-800/50 border-zinc-600 focus:border-green-500 focus:ring-green-500/20 text-zinc-100 placeholder-zinc-400 resize-none"
              />
            </div>

            <Button
              onClick={isEditMode ? handleEditReview : handleSubmitReview}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isSubmitting
                ? "Submitting..."
                : isEditMode
                ? "Update Review"
                : "Submit Review"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reviews List */}
      <ScrollArea className="h-[700px] pr-4">
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <CardHeader className="relative">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-bold text-xl text-white group-hover:text-green-300 transition-colors">
                            {review.user.name}
                          </h3>
                          <p className="text-sm text-zinc-400">
                            {maskEmail(review.user.email)}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-zinc-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-zinc-400">•</span>
                            <span
                              className={`text-sm font-medium ${getRatingColor(
                                review.rating
                              )}`}
                            >
                              {getRatingText(review.rating)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Clock className="w-4 h-4" />
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
                          <span className="text-xs italic text-green-400">
                            (edited)
                          </span>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative">
                    <p className="text-zinc-200 leading-relaxed text-lg">
                      {review.comment}
                    </p>
                  </CardContent>

                  {review.user.id === userId && (
                    <CardFooter className="relative flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setRating(review.rating);
                          setComment(review.comment || "");
                          setIsEditMode(true);
                          setIsWriteReviewOpen(true);
                          setUserReview(review);
                        }}
                        className="border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all duration-300"
                      >
                        <Pencil className="w-4 h-4 mr-2" /> Edit Review
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {reviews.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <MessageCircle className="w-12 h-12 text-zinc-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-300 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-zinc-400">
                Be the first to share your experience with this course!
              </p>
            </motion.div>
          )}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

export default ReviewSection;
