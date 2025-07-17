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
import { Loader2, Search, Star, Trash2, Edit2 } from "lucide-react";
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Live Class Reviews</h1>
          <div className="flex items-center gap-2 relative">
            <Search className="h-5 w-5 text-green-400 absolute left-3" />
            <Input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-64 pl-10 bg-zinc-800 border-green-500/30 text-white placeholder:text-zinc-400 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="bg-zinc-900 border border-green-500/30 rounded-lg shadow-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-green-500/30 hover:bg-green-500/5">
                <TableHead className="text-green-400 font-semibold">
                  Student
                </TableHead>
                <TableHead className="text-green-400 font-semibold">
                  Class
                </TableHead>
                <TableHead className="text-green-400 font-semibold">
                  Rating
                </TableHead>
                <TableHead className="text-green-400 font-semibold">
                  Comment
                </TableHead>
                <TableHead className="text-green-400 font-semibold">
                  Date
                </TableHead>
                <TableHead className="text-green-400 font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow
                  key={review.id}
                  className="border-green-500/30 hover:bg-green-500/10"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">
                        {review.user.name}
                      </div>
                      <div className="text-sm text-zinc-400">
                        {review.user.email}
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
                    <p className="text-zinc-300 truncate">{review.comment}</p>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {new Date(review.createdAt).toLocaleDateString()}
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
                        className="bg-blue-500/10 border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setReviewToDelete(review.id)}
                        className="bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {reviews.length === 0 && (
            <div className="text-center py-8 text-zinc-400">
              No reviews found
            </div>
          )}

          {reviews.length > 0 && pagination.pages > 1 && (
            <div className="py-4 px-6 border-t border-green-500/30">
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
                      className="text-zinc-300 hover:text-white hover:bg-green-500/20 border-green-500/30"
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
                            ? "bg-green-500 text-black"
                            : "text-zinc-300 hover:text-white hover:bg-green-500/20"
                        } border-green-500/30`}
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
                      className="text-zinc-300 hover:text-white hover:bg-green-500/20 border-green-500/30"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog
          open={!!editingReview}
          onOpenChange={() => setEditingReview(null)}
        >
          <DialogContent className="bg-zinc-900 border border-green-500/30 text-white">
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
                  className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingReview(null)}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateReview}
                className="bg-green-500 hover:bg-green-600 text-black font-bold"
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
          <AlertDialogContent className="bg-zinc-900 border border-green-500/30 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Delete Review
              </AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-300">
                Are you sure you want to delete this review? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setReviewToDelete(null)}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteReview}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
