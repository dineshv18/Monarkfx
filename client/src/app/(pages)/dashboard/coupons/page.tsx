"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Edit2,
  Trash2,
  Plus,
  Search,
  RefreshCw,
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  IndianRupee,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Course {
  id: string;
  title: string;
  price: number;
}

interface Coupon {
  id: string;
  code: string;
  discount: number;
  limit: number;
  isActive: boolean;
  oneTimePerUser: boolean;
  validFrom: string;
  validUntil: string | null;
  minimumPurchase: number;
  courses: Course[];
  usageCount?: number;
}

interface NewCoupon {
  code: string;
  discount: number;
  limit: number;
  isActive: boolean;
  oneTimePerUser: boolean;
  validFrom: string;
  validUntil: string | null;
  minimumPurchase: number;
  courses: Course[];
}

interface CouponStats {
  totalCoupons: number;
  activeCoupons: number;
  expiredCoupons: number;
  totalDiscount: number;
}

const AdminCouponsPage: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCoupon, setNewCoupon] = useState<NewCoupon>({
    code: "",
    discount: 0,
    limit: -1,
    isActive: true,
    oneTimePerUser: false,
    validFrom: new Date().toISOString(),
    validUntil: null,
    minimumPurchase: 0,
    courses: [],
  });
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState<CouponStats>({
    totalCoupons: 0,
    activeCoupons: 0,
    expiredCoupons: 0,
    totalDiscount: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      const [couponsRes, coursesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coupon`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coupon/courses`),
      ]);
      const couponsData = couponsRes.data.data;
      setCoupons(couponsData);
      setCourses(coursesRes.data.data);
      calculateStats(couponsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  }, []);

  const calculateStats = (couponsData: Coupon[]) => {
    const total = couponsData.length;
    const active = couponsData.filter((coupon) => coupon.isActive).length;
    const expired = couponsData.filter((coupon) => {
      if (!coupon.validUntil) return false;
      return new Date(coupon.validUntil) < new Date();
    }).length;
    const totalDiscount = couponsData.reduce(
      (sum, coupon) => sum + coupon.discount,
      0
    );

    setStats({
      totalCoupons: total,
      activeCoupons: active,
      expiredCoupons: expired,
      totalDiscount: totalDiscount,
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const validateCoupon = (coupon: NewCoupon | Coupon): boolean => {
    if (!coupon.code) {
      toast.error("Coupon code is required");
      return false;
    }
    if (coupon.discount <= 0 || coupon.discount > 99) {
      toast.error("Discount must be between 1% and 99%");
      return false;
    }
    if (coupon.limit !== -1 && coupon.limit <= 0) {
      toast.error("Limit must be greater than 0 or -1 for unlimited");
      return false;
    }
    if (coupon.minimumPurchase < 0) {
      toast.error("Minimum purchase cannot be negative");
      return false;
    }
    return true;
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCoupon(newCoupon)) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/coupon`,
        {
          ...newCoupon,
          courseIds: newCoupon.courses.map((course) => course.id),
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Coupon created successfully");
        fetchData();
        setNewCoupon({
          code: "",
          discount: 0,
          limit: -1,
          isActive: true,
          oneTimePerUser: false,
          validFrom: new Date().toISOString(),
          validUntil: null,
          minimumPurchase: 0,
          courses: [],
        });
        setIsCreateModalOpen(false);
      } else {
        toast.error(response.data.message || "Failed to create coupon");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error creating coupon");
      } else {
        toast.error("Error creating coupon");
      }
    }
  };

  const handleEdit = async (couponId: string) => {
    if (!editingCoupon) {
      toast.error("No coupon to update");
      return;
    }

    if (!validateCoupon(editingCoupon)) {
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/coupon/${couponId}`,
        {
          ...editingCoupon,
          courseIds: editingCoupon.courses.map((course) => course.id),
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Coupon updated successfully");
        setEditingCoupon(null);
        fetchData();
      } else {
        toast.error(response.data.message || "Failed to update coupon");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error updating coupon");
      } else {
        toast.error("Error updating coupon");
      }
    }
  };

  const handleDelete = async (couponId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/coupon/${couponId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("Coupon deleted successfully");
        fetchData();
      } else {
        toast.error(response.data.message || "Failed to delete coupon");
      }
    } catch (error) {
      toast.error("Error deleting coupon");
    }
  };

  const handleEditClick = (coupon: Coupon) => {
    setEditingCoupon(coupon);
  };

  const handleCancelEdit = () => {
    setEditingCoupon(null);
  };

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && coupon.isActive) ||
      (statusFilter === "inactive" && !coupon.isActive) ||
      (statusFilter === "expired" &&
        coupon.validUntil &&
        new Date(coupon.validUntil) < new Date());

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (coupon: Coupon) => {
    if (!coupon.isActive) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Inactive
        </span>
      );
    }

    if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          <Clock className="h-3 w-3 mr-1" />
          Expired
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        Active
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Coupon Management</h1>
            <p className="text-zinc-400 mt-2">
              Create and manage discount coupons for your courses
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={fetchData}
              className="bg-green-600 hover:bg-green-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Dialog
              open={isCreateModalOpen}
              onOpenChange={setIsCreateModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Coupon
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl">
                    Create New Coupon
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateCoupon} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-300">
                        Coupon Code
                      </Label>
                      <Input
                        value={newCoupon.code}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            code: e.target.value.toUpperCase(),
                          })
                        }
                        placeholder="SAVE20"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-300">
                        Discount (%)
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        max="99"
                        value={newCoupon.discount}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            discount: Number(e.target.value),
                          })
                        }
                        placeholder="20"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-300">
                        Usage Limit
                      </Label>
                      <Input
                        type="number"
                        value={newCoupon.limit === -1 ? "" : newCoupon.limit}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            limit: e.target.value ? Number(e.target.value) : -1,
                          })
                        }
                        placeholder="-1 for unlimited"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-300">
                        Minimum Purchase
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        value={newCoupon.minimumPurchase}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            minimumPurchase: Number(e.target.value),
                          })
                        }
                        placeholder="0"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-300">
                        Valid From
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-zinc-800 border-zinc-700 text-white"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newCoupon.validFrom
                              ? format(new Date(newCoupon.validFrom), "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-zinc-800 border-zinc-700">
                          <Calendar
                            mode="single"
                            selected={new Date(newCoupon.validFrom)}
                            onSelect={(date) =>
                              setNewCoupon({
                                ...newCoupon,
                                validFrom:
                                  date?.toISOString() ||
                                  new Date().toISOString(),
                              })
                            }
                            className="bg-zinc-800"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-300">
                        Valid Until (Optional)
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-zinc-800 border-zinc-700 text-white"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newCoupon.validUntil
                              ? format(new Date(newCoupon.validUntil), "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-zinc-800 border-zinc-700">
                          <Calendar
                            mode="single"
                            selected={
                              newCoupon.validUntil
                                ? new Date(newCoupon.validUntil)
                                : undefined
                            }
                            onSelect={(date) =>
                              setNewCoupon({
                                ...newCoupon,
                                validUntil: date?.toISOString() || null,
                              })
                            }
                            className="bg-zinc-800"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-zinc-300">
                      Applicable Courses
                    </Label>
                    <div className="max-h-40 overflow-y-auto space-y-2 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                      {courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={course.id}
                            checked={newCoupon.courses.some(
                              (c) => c.id === course.id
                            )}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewCoupon({
                                  ...newCoupon,
                                  courses: [...newCoupon.courses, course],
                                });
                              } else {
                                setNewCoupon({
                                  ...newCoupon,
                                  courses: newCoupon.courses.filter(
                                    (c) => c.id !== course.id
                                  ),
                                });
                              }
                            }}
                          />
                          <Label
                            htmlFor={course.id}
                            className="text-sm text-zinc-300"
                          >
                            {course.title} - ₹{course.price}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="oneTimePerUser"
                      checked={newCoupon.oneTimePerUser}
                      onCheckedChange={(checked) =>
                        setNewCoupon({
                          ...newCoupon,
                          oneTimePerUser: !!checked,
                        })
                      }
                    />
                    <Label
                      htmlFor="oneTimePerUser"
                      className="text-sm text-zinc-300"
                    >
                      One time per user
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isActive"
                      checked={newCoupon.isActive}
                      onCheckedChange={(checked) =>
                        setNewCoupon({ ...newCoupon, isActive: !!checked })
                      }
                    />
                    <Label htmlFor="isActive" className="text-sm text-zinc-300">
                      Active
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Create Coupon
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
                  <p className="text-zinc-400 text-sm">Total Coupons</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalCoupons}
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Tag className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Active Coupons</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.activeCoupons}
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
                  <p className="text-zinc-400 text-sm">Expired Coupons</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.expiredCoupons}
                  </p>
                </div>
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Total Discount</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalDiscount}%
                  </p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <IndianRupee className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                  <Input
                    placeholder="Search coupons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="all">All Coupons</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Coupons Table */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Existing Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredCoupons.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-zinc-400 mb-4">
                  {searchTerm || statusFilter !== "all"
                    ? "No coupons found matching your search"
                    : "No coupons found"}
                </div>
                <div className="text-sm text-zinc-500">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Start by creating your first coupon"}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-300">Code</TableHead>
                      <TableHead className="text-zinc-300">Discount</TableHead>
                      <TableHead className="text-zinc-300">
                        Valid Period
                      </TableHead>
                      <TableHead className="text-zinc-300">
                        Min Purchase
                      </TableHead>
                      <TableHead className="text-zinc-300">Limit</TableHead>
                      <TableHead className="text-zinc-300">Status</TableHead>
                      <TableHead className="text-zinc-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCoupons.map((coupon) => (
                      <TableRow
                        key={coupon.id}
                        className="border-zinc-700 hover:bg-zinc-800/50"
                      >
                        <TableCell className="font-medium text-white">
                          {editingCoupon?.id === coupon.id ? (
                            <Input
                              value={editingCoupon.code}
                              onChange={(e) =>
                                setEditingCoupon({
                                  ...editingCoupon,
                                  code: e.target.value.toUpperCase(),
                                })
                              }
                              className="bg-zinc-800 border-zinc-700 text-white"
                            />
                          ) : (
                            coupon.code
                          )}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {editingCoupon?.id === coupon.id ? (
                            <Input
                              type="number"
                              min="1"
                              max="99"
                              value={editingCoupon.discount}
                              onChange={(e) =>
                                setEditingCoupon({
                                  ...editingCoupon,
                                  discount: Number(e.target.value),
                                })
                              }
                              className="bg-zinc-800 border-zinc-700 text-white"
                            />
                          ) : (
                            `${coupon.discount}%`
                          )}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          <div className="space-y-1">
                            <div className="text-sm">
                              From: {formatDate(coupon.validFrom)}
                            </div>
                            {coupon.validUntil && (
                              <div className="text-sm">
                                To: {formatDate(coupon.validUntil)}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          ₹{coupon.minimumPurchase}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {coupon.limit === -1 ? "Unlimited" : coupon.limit}
                        </TableCell>
                        <TableCell>{getStatusBadge(coupon)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {editingCoupon?.id === coupon.id ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleEdit(coupon.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCancelEdit}
                                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditClick(coupon)}
                                  className="text-green-400 hover:text-green-300"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="ghost"
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
                                        This will permanently delete the coupon
                                        "{coupon.code}". This action cannot be
                                        undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDelete(coupon.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </>
                            )}
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

export default AdminCouponsPage;
