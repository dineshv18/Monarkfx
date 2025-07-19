"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pencil,
  Trash2,
  Search,
  ChevronRight,
  ChevronLeft,
  Star,
  MessageSquare,
  Calendar,
  User,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCustomDebounce } from "@/hooks/useCustomDebounce";

interface Review {
  id: string;
  rating: number;
  comment: string;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  courseId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  course: {
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

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    pages: 0,
    page: 1,
    limit: 10,
  });
  const [search, setSearch] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const debouncedSearch = useCustomDebounce(search, 500);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const isInitialMount = { current: true };

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(
        `/review/admin/all?page=${pagination.page}&search=${debouncedSearch}`
      );

      if (data?.success) {
        setReviews(data.data.reviews);
        setPagination(data.data.pagination);
      } else {
        throw new Error("Failed to fetch reviews");
      }
    } catch (error: any) {
      setError(error?.response?.data?.message || "Failed to fetch reviews");
      toast.error(error?.response?.data?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchReviews();
      return;
    }

    const timer = setTimeout(() => {
      fetchReviews();
    }, 100);

    return () => clearTimeout(timer);
  }, [pagination.page, debouncedSearch]);

  const handleUpdateReview = async () => {
    if (!editReview) return;

    try {
      const { data } = await api.put(`/review/update/${editReview.id}`, {
        rating: editRating,
        comment: editComment,
      });

      setReviews((prev) =>
        prev.map((review) => (review.id === editReview.id ? data.data : review))
      );
      setIsEditModalOpen(false);
      toast.success("Review updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update review");
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/review/delete/${deleteId}`);
      setReviews((prev) => prev.filter((review) => review.id !== deleteId));
      toast.success("Review deleted successfully");
      setDeleteDialog(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete review");
    }
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

  const TruncatedText = ({
    text,
    maxLength = 50,
  }: {
    text: string;
    maxLength?: number;
  }) => {
    if (!text) return null;
    const truncated =
      text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return (
      <div className="group relative">
        <div className="max-w-[200px] truncate text-zinc-300">{truncated}</div>
        {text.length > maxLength && (
          <div className="absolute z-50 invisible group-hover:visible bg-zinc-900 border border-zinc-700 text-white p-2 rounded-md text-sm -top-8 left-0 w-max max-w-[300px] break-words">
            {text}
          </div>
        )}
      </div>
    );
  };

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400">{error}</p>
        <Button
          onClick={fetchReviews}
          className="mt-4 border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
          variant="outline"
        >
          Try Again
        </Button>
      </div>
    );
  }

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
          <Star className="h-4 w-4" />
          Course Reviews
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Manage Course Reviews
        </h1>
        <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
          View, edit, and manage student reviews for all courses. These are
          course reviews, separate from live class reviews.
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
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-zinc-900/80 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
          />
        </div>
      </div>

      {/* Reviews Table */}
      <div>
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Reviews ({reviews.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  No reviews found
                </h3>
                <p className="text-zinc-400">
                  No reviews match your search criteria
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700">
                      <TableHead className="text-zinc-300">Course</TableHead>
                      <TableHead className="text-zinc-300">User</TableHead>
                      <TableHead className="text-zinc-300">Email</TableHead>
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
                          <TruncatedText
                            text={review.course?.title || "N/A"}
                            maxLength={30}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {review.user?.name?.charAt(0).toUpperCase() ||
                                "U"}
                            </div>
                            <span className="text-white">
                              {review.user?.name || "N/A"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {review.user?.email || "N/A"}
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
                        <TableCell>
                          <TruncatedText
                            text={review.comment || "No comment"}
                            maxLength={50}
                          />
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditReview(review);
                                setEditRating(review.rating);
                                setEditComment(review.comment);
                                setIsEditModalOpen(true);
                              }}
                              className="border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => confirmDelete(review.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {reviews.length > 0 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                  }
                  disabled={pagination.page === 1}
                  className="border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm text-zinc-300">
                  Page {pagination.page} of {pagination.pages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                  disabled={pagination.page === pagination.pages}
                  className="border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-300">
                Rating
              </label>
              <div className="flex gap-2 mt-2">
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
              <label className="text-sm font-medium text-zinc-300">
                Comment
              </label>
              <Textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="mt-2 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-green-500"
              />
            </div>
            <Button
              onClick={handleUpdateReview}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white"
            >
              Update Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <p className="text-zinc-300">
              Are you sure you want to delete this review? This action cannot be
              undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog(false)}
              className="border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
