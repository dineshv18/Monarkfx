"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Search,
  RefreshCw,
  Folder,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Category {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  recentCategories: number;
  averageCoursesPerCategory: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState<CategoryStats>({
    totalCategories: 0,
    activeCategories: 0,
    recentCategories: 0,
    averageCoursesPerCategory: 0,
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category`
      );
      const categoriesData = response.data.data;
      setCategories(categoriesData);
      calculateStats(categoriesData);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (categoriesData: Category[]) => {
    const total = categoriesData.length;
    const active = categoriesData.length; // All categories are considered active
    const recent = categoriesData.filter((cat) => {
      if (!cat.createdAt) return false;
      const createdAt = new Date(cat.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return createdAt > weekAgo;
    }).length;

    setStats({
      totalCategories: total,
      activeCategories: active,
      recentCategories: recent,
      averageCoursesPerCategory: total > 0 ? Math.round(total / total) : 0, // Placeholder calculation
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editCategory) {
        // Update existing category
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/category/${editCategory.id}`,
          { name: categoryName },
          { withCredentials: true }
        );
        toast.success("Category updated successfully");
      } else {
        // Create new category
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/category`,
          { name: categoryName },
          { withCredentials: true }
        );
        toast.success("Category created successfully");
      }

      fetchCategories();
      setIsOpen(false);
      setCategoryName("");
      setEditCategory(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryToDelete.id}`,
        { withCredentials: true }
      );
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    } finally {
      setCategoryToDelete(null);
    }
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setCategoryName(category.name);
    setIsOpen(true);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading && categories.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Category Management
            </h1>
            <p className="text-zinc-400 mt-2">
              Organize your courses with categories
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                setLoading(true);
                fetchCategories();
              }}
              className="bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Loading..." : "Refresh"}
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl">
                    {editCategory ? "Edit Category" : "Add New Category"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                      Category Name
                    </label>
                    <Input
                      placeholder="Enter category name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      required
                      minLength={2}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    {editCategory ? "Update Category" : "Create Category"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Total Categories</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalCategories}
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Folder className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Active Categories</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.activeCategories}
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Recent (7 days)</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.recentCategories}
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Plus className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Avg. Courses</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.averageCoursesPerCategory}
                  </p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Folder className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Table */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-zinc-400 mb-4">
                  {searchTerm
                    ? "No categories found matching your search"
                    : "No categories found"}
                </div>
                <div className="text-sm text-zinc-500">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Start by adding your first category"}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-300">Name</TableHead>
                      <TableHead className="text-zinc-300">Created</TableHead>
                      <TableHead className="text-zinc-300">Updated</TableHead>
                      <TableHead className="text-zinc-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow
                        key={category.id}
                        className="border-zinc-700 hover:bg-zinc-800/50"
                      >
                        <TableCell className="font-medium text-white">
                          {category.name}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {category.createdAt
                            ? formatDate(category.createdAt)
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {category.updatedAt
                            ? formatDate(category.updatedAt)
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(category)}
                              className="text-green-400 hover:text-green-300"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setCategoryToDelete(category)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-white">
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-zinc-300">
                                    This will permanently delete the category "
                                    {categoryToDelete?.name}". This action
                                    cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    onClick={() => setCategoryToDelete(null)}
                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteConfirm}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Categories;
