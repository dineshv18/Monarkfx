"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useCustomDebounce } from "@/hooks/useCustomDebounce";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Search,
  Star,
  Trash2,
  Edit2,
  MessageSquare,
  Calendar,
  User,
  Video,
  TrendingUp,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  isEdited: boolean;
  user: {
    name: string;
    email: string;
  };
  zoomClass: {
    title: string;
    slug: string;
  };
}

interface PaginationData {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export default function LiveReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useCustomDebounce(searchTerm, 500);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    pages: 1,
    page: 1,
    limit: 10,
  });
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [pagination.page, debouncedSearchTerm]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-review/admin/all`,
        {
          params: {
            page: pagination.page,
            limit: pagination.limit,
            search: debouncedSearchTerm,
          },
          withCredentials: true,
        }
      );
      console.log("Live Reviews API Response:", response.data);
      console.log("Setting live reviews:", response.data.data.reviews);
      setReviews(response.data.data.reviews);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-review/delete/${reviewToDelete}`,
        { withCredentials: true }
      );
      toast.success("Review deleted successfully");
      setReviewToDelete(null);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    }
  };

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-review/update/${editingReview.id}`,
        {
          rating: editRating,
          comment: editComment,
        },
        { withCredentials: true }
      );
      toast.success("Review updated successfully");
      setEditingReview(null);
      fetchReviews();
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Calculate stats
  const totalReviews = pagination.total;
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";
  const reviewsThisMonth = reviews.filter((review) => {
    const reviewDate = new Date(review.createdAt);
    const now = new Date();
    return (
      reviewDate.getMonth() === now.getMonth() &&
      reviewDate.getFullYear() === now.getFullYear()
    );
  }).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-white">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
          <MessageSquare className="h-4 w-4" />
          Live Class Reviews
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Manage Live Class Reviews
        </h1>
        <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
          View, edit, and manage student reviews for live classes and sessions.
          These are separate from course reviews and only appear after students
          attend live classes.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  Total Reviews
                </p>
                <p className="text-3xl font-bold text-white">{totalReviews}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  Average Rating
                </p>
                <p className="text-3xl font-bold text-white">{averageRating}</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  This Month
                </p>
                <p className="text-3xl font-bold text-white">
                  {reviewsThisMonth}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 bg-zinc-900/80 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
          />
        </div>
      </div>

      {/* Reviews Table */}
      <div>
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Video className="h-5 w-5" />
              Live Class Reviews ({reviews.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  No live class reviews yet
                </h3>
                <p className="text-zinc-400 mb-4">
                  Reviews will appear here once students start reviewing live
                  classes
                </p>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-zinc-300">
                    <strong>Note:</strong> Live class reviews are separate from
                    course reviews. Students can only review live classes they
                    have attended.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700">
                      <TableHead className="text-zinc-300">Student</TableHead>
                      <TableHead className="text-zinc-300">Class</TableHead>
                      <TableHead className="text-zinc-300">Rating</TableHead>
                      <TableHead className="text-zinc-300">Comment</TableHead>
                      <TableHead className="text-zinc-300">Date</TableHead>
                      <TableHead className="text-zinc-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map((review, index) => (
                      <TableRow
                        key={review.id}
                        className="border-zinc-700 hover:bg-zinc-800/50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {review.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-white">
                                {review.user.name}
                              </div>
                              <div className="text-sm text-zinc-400">
                                {review.user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">
                          {review.zoomClass.title}
                        </TableCell>
                        <TableCell>
                          <div className="flex">
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
                        </TableCell>
                        <TableCell className="max-w-md">
                          <p className="text-zinc-300 truncate">
                            {review.comment}
                          </p>
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                          {review.isEdited && (
                            <span className="text-xs text-zinc-500 block">
                              (edited)
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditClick(review)}
                              className="border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setReviewToDelete(review.id)}
                              className="border-zinc-600 text-zinc-300 hover:border-red-500 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {reviews.length > 0 && pagination.pages > 1 && (
              <div className="py-4 border-t border-zinc-700">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setPagination((prev) => ({
                            ...prev,
                            page: Math.max(1, prev.page - 1),
                          }))
                        }
                        aria-disabled={pagination.page === 1}
                        className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                      />
                    </PaginationItem>
                    {[...Array(pagination.pages)].map((_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          onClick={() =>
                            setPagination((prev) => ({ ...prev, page: i + 1 }))
                          }
                          isActive={pagination.page === i + 1}
                          className={`${
                            pagination.page === i + 1
                              ? "bg-green-600 text-white"
                              : "bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                          }`}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setPagination((prev) => ({
                            ...prev,
                            page: Math.min(pagination.pages, prev.page + 1),
                          }))
                        }
                        aria-disabled={pagination.page === pagination.pages}
                        className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingReview}
        onOpenChange={() => setEditingReview(null)}
      >
        <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setEditRating(num)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        num <= editRating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-zinc-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">
                Comment
              </label>
              <Textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                rows={4}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-green-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingReview(null)}
              className="border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateReview}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!reviewToDelete}
        onOpenChange={() => setReviewToDelete(null)}
      >
        <AlertDialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Review
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-300">
              Are you sure you want to delete this review? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setReviewToDelete(null)}
              className="border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReview}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
