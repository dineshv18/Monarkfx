"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  IndianRupee,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Info,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  referralCode: string;
  totalEarnings: number;
  totalSales: number;
  commissionRate: number;
  createdAt: string;
  isActive: boolean;
  notes?: string;
  adminNotes?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  accountHolderName?: string;
  upiId?: string;
}

interface AffiliateSale {
  id: string;
  affiliateId: string;
  courseName: string;
  saleAmount: number;
  commissionAmount: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  createdAt: string;
  notes?: string;
  affiliate: {
    name: string;
    email: string;
    referralCode: string;
  };
}

interface Stats {
  totalAffiliates: number;
  activeAffiliates: number;
  pendingAffiliates: number;
  approvedAffiliates: number;
  totalSales: number;
  completedSales: number;
  totalEarnings: number;
}

const AffiliatesPage = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [sales, setSales] = useState<AffiliateSale[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalAffiliates: 0,
    activeAffiliates: 0,
    pendingAffiliates: 0,
    approvedAffiliates: 0,
    totalSales: 0,
    completedSales: 0,
    totalEarnings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAffiliates();
    fetchStats();
    fetchSales();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchAffiliates = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== "ALL" && { status: statusFilter }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/affiliate?${params}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAffiliates(data.data.affiliates);
        setTotalPages(data.data.pagination.pages);
      } else {
        console.error("Failed to fetch affiliates:", response.status);
      }
    } catch (error) {
      console.error("Error fetching affiliates:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/affiliate/stats`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      } else {
        console.error("Failed to fetch stats:", response.status);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchSales = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/affiliate/sales/all`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSales(data.data.sales);
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const updateAffiliateStatus = async (
    id: string,
    status: string,
    adminNotes?: string
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/affiliate/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({ status, adminNotes }),
        }
      );

      if (response.ok) {
        fetchAffiliates();
        fetchStats();
      }
    } catch (error) {
      console.error("Error updating affiliate:", error);
    }
  };

  const deleteAffiliate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this affiliate?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/affiliate/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        fetchAffiliates();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting affiliate:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: {
        color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        icon: Clock,
      },
      APPROVED: {
        color: "bg-green-500/20 text-green-400 border-green-500/30",
        icon: CheckCircle,
      },
      REJECTED: {
        color: "bg-red-500/20 text-red-400 border-red-500/30",
        icon: XCircle,
      },
      SUSPENDED: {
        color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        icon: AlertCircle,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <span
        className={`${config.color} border px-2 py-1 rounded-md text-xs flex items-center w-fit`}
      >
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </span>
    );
  };

  const getSaleStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: {
        color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        icon: Clock,
      },
      COMPLETED: {
        color: "bg-green-500/20 text-green-400 border-green-500/30",
        icon: CheckCircle,
      },
      CANCELLED: {
        color: "bg-red-500/20 text-red-400 border-red-500/30",
        icon: XCircle,
      },
      REFUNDED: {
        color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        icon: RefreshCw,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <span
        className={`${config.color} border px-2 py-1 rounded-md text-xs flex items-center w-fit`}
      >
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Affiliate Management
            </h1>
            <p className="text-zinc-400 mt-2">
              Manage affiliates and track their performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-500/10"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  How It Works
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl">
                    How Affiliate System Works
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="space-y-2 text-white  max-h-[500px] ">
                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 my-4 ">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">
                      📋 Affiliate Registration Process
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                      <li>
                        User fills affiliate registration form on business page
                      </li>
                      <li>Admin reviews and approves the application</li>
                      <li>
                        System generates unique referral code (e.g., XVFXYO)
                      </li>
                      <li>Affiliate gets access to marketing materials</li>
                    </ol>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 my-4">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">
                      💰 How Commissions Work
                    </h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li>
                        • Affiliate shares their referral code with potential
                        customers
                      </li>
                      <li>
                        • Customer uses referral code during course purchase
                      </li>
                      <li>• Affiliate earns 15% commission on the sale</li>
                      <li>• Commission is tracked and paid monthly</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 my-4">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">
                      🎯 What Affiliates Can Promote
                    </h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li>• Online trading courses</li>
                      <li>• Live trading classes</li>
                      <li>• Mentorship programs</li>
                      <li>• Any course available on the platform</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 my-4">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">
                      📊 Admin Management
                    </h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li>• View all affiliate applications and status</li>
                      <li>• Track sales and commission earnings</li>
                      <li>• Approve/reject affiliate applications</li>
                      <li>• Manage commission rates and payments</li>
                    </ul>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => {
                setLoading(true);
                fetchAffiliates();
                fetchStats();
                fetchSales();
              }}
              className="bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Total Affiliates</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalAffiliates}
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Active Affiliates</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.activeAffiliates}
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
                  <p className="text-zinc-400 text-sm">Total Sales</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalSales}
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(stats.totalEarnings)}
                  </p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <IndianRupee className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="affiliates" className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-700">
            <TabsTrigger
              value="affiliates"
              className="data-[state=active]:bg-green-600"
            >
              Affiliates
            </TabsTrigger>
            <TabsTrigger
              value="sales"
              className="data-[state=active]:bg-green-600"
            >
              Sales
            </TabsTrigger>
          </TabsList>

          <TabsContent value="affiliates" className="space-y-6">
            {/* Filters */}
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                      <Input
                        placeholder="Search affiliates..."
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
                      <SelectItem value="ALL">All Status</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                      <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Affiliates Table */}
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Affiliates</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  </div>
                ) : affiliates.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-zinc-400 mb-4">
                      No affiliates found
                    </div>
                    <div className="text-sm text-zinc-500">
                      {searchTerm || statusFilter !== "ALL"
                        ? "Try adjusting your search or filters"
                        : "Start by adding your first affiliate"}
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                          <TableHead className="text-zinc-300">Name</TableHead>
                          <TableHead className="text-zinc-300">Email</TableHead>
                          <TableHead className="text-zinc-300">
                            Status
                          </TableHead>
                          <TableHead className="text-zinc-300">
                            Referral Code
                          </TableHead>
                          <TableHead className="text-zinc-300">
                            Earnings
                          </TableHead>
                          <TableHead className="text-zinc-300">Sales</TableHead>
                          <TableHead className="text-zinc-300">
                            Joined
                          </TableHead>
                          <TableHead className="text-zinc-300">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {affiliates.map((affiliate) => (
                          <TableRow
                            key={affiliate.id}
                            className="border-zinc-700 hover:bg-zinc-800/50"
                          >
                            <TableCell className="font-medium text-white">
                              {affiliate.name}
                            </TableCell>
                            <TableCell className="text-zinc-300">
                              {affiliate.email}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(affiliate.status)}
                            </TableCell>
                            <TableCell className="text-zinc-300 font-mono">
                              {affiliate.referralCode}
                            </TableCell>
                            <TableCell className="text-green-400 font-semibold">
                              {formatCurrency(affiliate.totalEarnings)}
                            </TableCell>
                            <TableCell className="text-zinc-300">
                              {affiliate.totalSales}
                            </TableCell>
                            <TableCell className="text-zinc-300">
                              {formatDate(affiliate.createdAt)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setSelectedAffiliate(affiliate);
                                    setIsViewModalOpen(true);
                                  }}
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setSelectedAffiliate(affiliate);
                                    setIsEditModalOpen(true);
                                  }}
                                  className="text-green-400 hover:text-green-300"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteAffiliate(affiliate.id)}
                                  className="text-red-400 hover:text-red-300"
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    >
                      Previous
                    </Button>
                    <span className="text-zinc-300">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Affiliate Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={fetchSales}
                  className="mb-4 bg-green-600 hover:bg-green-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Load Sales
                </Button>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                        <TableHead className="text-zinc-300">
                          Affiliate
                        </TableHead>
                        <TableHead className="text-zinc-300">Course</TableHead>
                        <TableHead className="text-zinc-300">
                          Sale Amount
                        </TableHead>
                        <TableHead className="text-zinc-300">
                          Commission
                        </TableHead>
                        <TableHead className="text-zinc-300">Status</TableHead>
                        <TableHead className="text-zinc-300">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sales.map((sale) => (
                        <TableRow
                          key={sale.id}
                          className="border-zinc-700 hover:bg-zinc-800/50"
                        >
                          <TableCell className="font-medium text-white">
                            {sale.affiliate.name}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {sale.courseName}
                          </TableCell>
                          <TableCell className="text-green-400 font-semibold">
                            {formatCurrency(sale.saleAmount)}
                          </TableCell>
                          <TableCell className="text-blue-400 font-semibold">
                            {formatCurrency(sale.commissionAmount)}
                          </TableCell>
                          <TableCell>
                            {getSaleStatusBadge(sale.status)}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {formatDate(sale.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Affiliate Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                Affiliate Details
              </DialogTitle>
            </DialogHeader>
            {selectedAffiliate && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 text-sm">Name</label>
                    <p className="text-white font-semibold">
                      {selectedAffiliate.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-zinc-400 text-sm">Email</label>
                    <p className="text-white">{selectedAffiliate.email}</p>
                  </div>
                  <div>
                    <label className="text-zinc-400 text-sm">Phone</label>
                    <p className="text-white">
                      {selectedAffiliate.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-zinc-400 text-sm">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedAffiliate.status)}
                    </div>
                  </div>
                  <div>
                    <label className="text-zinc-400 text-sm">
                      Referral Code
                    </label>
                    <p className="text-white font-mono">
                      {selectedAffiliate.referralCode}
                    </p>
                  </div>
                  <div>
                    <label className="text-zinc-400 text-sm">
                      Commission Rate
                    </label>
                    <p className="text-white">
                      {selectedAffiliate.commissionRate}%
                    </p>
                  </div>
                  <div>
                    <label className="text-zinc-400 text-sm">
                      Total Earnings
                    </label>
                    <p className="text-green-400 font-semibold">
                      {formatCurrency(selectedAffiliate.totalEarnings)}
                    </p>
                  </div>
                  <div>
                    <label className="text-zinc-400 text-sm">Total Sales</label>
                    <p className="text-white">{selectedAffiliate.totalSales}</p>
                  </div>
                </div>

                {selectedAffiliate.address && (
                  <div>
                    <label className="text-zinc-400 text-sm">Address</label>
                    <p className="text-white">{selectedAffiliate.address}</p>
                  </div>
                )}

                {selectedAffiliate.bankName && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-400 text-sm">Bank Name</label>
                      <p className="text-white">{selectedAffiliate.bankName}</p>
                    </div>
                    <div>
                      <label className="text-zinc-400 text-sm">
                        Account Number
                      </label>
                      <p className="text-white font-mono">
                        {selectedAffiliate.accountNumber}
                      </p>
                    </div>
                  </div>
                )}

                {selectedAffiliate.notes && (
                  <div>
                    <label className="text-zinc-400 text-sm">Notes</label>
                    <p className="text-white">{selectedAffiliate.notes}</p>
                  </div>
                )}

                {selectedAffiliate.adminNotes && (
                  <div>
                    <label className="text-zinc-400 text-sm">Admin Notes</label>
                    <p className="text-white">{selectedAffiliate.adminNotes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Affiliate Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Affiliate</DialogTitle>
            </DialogHeader>
            {selectedAffiliate && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 text-sm">Status</label>
                    <Select
                      defaultValue={selectedAffiliate.status}
                      onValueChange={(value) => {
                        updateAffiliateStatus(selectedAffiliate.id, value);
                        setIsEditModalOpen(false);
                      }}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="APPROVED">Approved</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                        <SelectItem value="SUSPENDED">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-zinc-400 text-sm">
                      Commission Rate (%)
                    </label>
                    <Input
                      type="number"
                      defaultValue={selectedAffiliate.commissionRate}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      onChange={(e) => {
                        updateAffiliateStatus(
                          selectedAffiliate.id,
                          selectedAffiliate.status,
                          `Commission rate updated to ${e.target.value}%`
                        );
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-zinc-400 text-sm">Admin Notes</label>
                  <textarea
                    defaultValue={selectedAffiliate.adminNotes}
                    className="w-full h-24 bg-zinc-800 border border-zinc-700 rounded-md p-3 text-white resize-none"
                    placeholder="Add admin notes..."
                    onChange={(e) => {
                      updateAffiliateStatus(
                        selectedAffiliate.id,
                        selectedAffiliate.status,
                        e.target.value
                      );
                    }}
                  />
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AffiliatesPage;
