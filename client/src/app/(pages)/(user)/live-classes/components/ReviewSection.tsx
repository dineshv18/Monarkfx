import { useState, useEffect } from "react";
import axios from "axios";
import { Star, Edit2, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "@/helper/AuthContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  isEdited: boolean;
  user: {
    id: string;
    name: string;
  };
}

interface ReviewSectionProps {
  zoomClassId: string;
  isRegistered?: boolean;
  hasAccess?: boolean;
}

export default function ReviewSection({
  zoomClassId,
  isRegistered,
  hasAccess,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [zoomClassId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-review/class/${zoomClassId}`
      );
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    try {
      if (editingReview) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/zoom-review/update/${editingReview.id}`,
          { rating, comment },
          { withCredentials: true }
        );
        toast.success("Review updated successfully");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/zoom-review/create`,
          { zoomClassId, rating, comment },
          { withCredentials: true }
        );
        toast.success("Review submitted successfully");
      }
      setShowReviewDialog(false);
      setEditingReview(null);
      setRating(5);
      setComment("");
      fetchReviews();
    } catch (error: any) {
      console.error("Error submitting review:", error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-review/delete/${reviewId}`,
        { withCredentials: true }
      );
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setRating(review.rating);
    setComment(review.comment);
    setShowReviewDialog(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-green-400" />
      </div>
    );
  }

  return (
    <div className="py-8 px-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Student Reviews</h2>
        {isAuthenticated && hasAccess && (
          <Button
            onClick={() => setShowReviewDialog(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            Write a Review
          </Button>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-8 bg-zinc-800/50 rounded-lg border border-zinc-700">
          <p className="text-zinc-400">
            No reviews yet. Be the first to review!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gradient-to-br from-zinc-900/80 to-black/80 p-6 rounded-xl shadow-sm border border-zinc-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">
                      {review.user.name}
                    </h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-zinc-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">
                    {new Date(review.createdAt).toLocaleDateString()}
                    {review.isEdited && " (edited)"}
                  </p>
                </div>
                {isAuthenticated && user?.id === review.user.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-3 text-zinc-300">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingReview ? "Edit Review" : "Write a Review"}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Share your experience with other students
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      i < rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-zinc-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowReviewDialog(false);
                setEditingReview(null);
                setRating(5);
                setComment("");
              }}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              className="bg-green-600 hover:bg-green-700"
            >
              {editingReview ? "Update Review" : "Submit Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
