"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
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
import {
  Search,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
  Mail,
  Phone,
  Globe,
  Building,
  Home,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/helper/AuthContext";
import { AddressData } from "@/type";

interface AddressStats {
  totalAddresses: number;
  paidAddresses: number;
  unpaidAddresses: number;
  recentAddresses: number;
}

const Address = () => {
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "unpaid">(
    "all"
  );
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [stats, setStats] = useState<AddressStats>({
    totalAddresses: 0,
    paidAddresses: 0,
    unpaidAddresses: 0,
    recentAddresses: 0,
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses();
    }
  }, [isAuthenticated]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/billing/get-all-billing-details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        const addressData = response.data.data || [];
        if (Array.isArray(addressData)) {
          setAddresses(addressData);
          calculateStats(addressData);
        } else {
          setAddresses([]);
          console.error("Response data is not an array:", addressData);
        }
      }
    } catch {
      setError("Failed to fetch addresses");
      toast.error("Error loading addresses");
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (addressData: AddressData[]) => {
    const total = addressData.length;
    const paid = addressData.filter((addr) => addr.paymentStatus).length;
    const unpaid = total - paid;
    const recent = addressData.filter((addr) => {
      const createdAt = new Date(addr.createdAt || new Date());
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return createdAt > weekAgo;
    }).length;

    setStats({
      totalAddresses: total,
      paidAddresses: paid,
      unpaidAddresses: unpaid,
      recentAddresses: recent,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/billing/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAddresses(addresses.filter((address) => address.id !== id));
      toast.success("Address deleted successfully");
      fetchAddresses(); // Refresh to update stats
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const filteredAddresses = addresses.filter((address) => {
    const matchesSearch =
      address.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && address.paymentStatus) ||
      (statusFilter === "unpaid" && !address.paymentStatus);

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: boolean) => {
    return status ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        Paid
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle className="h-3 w-3 mr-1" />
        Unpaid
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

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Error Loading Addresses
              </h2>
              <p className="text-zinc-400">{error}</p>
              <Button
                onClick={fetchAddresses}
                className="mt-4 bg-green-600 hover:bg-green-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Address Management
            </h1>
            <p className="text-zinc-400 mt-2">
              Manage user billing addresses and payment status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                setLoading(true);
                fetchAddresses();
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
                  <p className="text-zinc-400 text-sm">Total Addresses</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalAddresses}
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
                  <p className="text-zinc-400 text-sm">Paid Addresses</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.paidAddresses}
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
                  <p className="text-zinc-400 text-sm">Unpaid Addresses</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.unpaidAddresses}
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
                  <p className="text-zinc-400 text-sm">Recent (7 days)</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.recentAddresses}
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, city, or state..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value: "all" | "paid" | "unpaid") =>
                  setStatusFilter(value)
                }
              >
                <SelectTrigger className="w-full md:w-48 bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="all">All Addresses</SelectItem>
                  <SelectItem value="paid">Paid Only</SelectItem>
                  <SelectItem value="unpaid">Unpaid Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Addresses Table */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">User Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            ) : filteredAddresses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-zinc-400 mb-4">No addresses found</div>
                <div className="text-sm text-zinc-500">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "No addresses have been added yet"}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-300">Name</TableHead>
                      <TableHead className="text-zinc-300">Email</TableHead>
                      <TableHead className="text-zinc-300">Location</TableHead>
                      <TableHead className="text-zinc-300">Status</TableHead>
                      <TableHead className="text-zinc-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAddresses.map((address) => (
                      <TableRow
                        key={address.id}
                        className="border-zinc-700 hover:bg-zinc-800/50"
                      >
                        <TableCell className="font-medium text-white">
                          {address.fullName}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {address.email}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Home className="h-3 w-3 mr-1 text-zinc-400" />
                              {address.address}
                            </div>
                            <div className="flex items-center text-sm">
                              <Building className="h-3 w-3 mr-1 text-zinc-400" />
                              {address.city}, {address.state}
                            </div>
                            <div className="flex items-center text-sm">
                              <Globe className="h-3 w-3 mr-1 text-zinc-400" />
                              {address.country} - {address.zipCode}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(address.paymentStatus || false)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedAddress(address);
                                setIsViewModalOpen(true);
                              }}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(address.id)}
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
          </CardContent>
        </Card>

        {/* View Address Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                Address Details
              </DialogTitle>
            </DialogHeader>
            {selectedAddress && (
              <div className="space-y-6 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                    <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-zinc-400 w-20">Name:</span>
                        <span className="text-white font-medium">
                          {selectedAddress.fullName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-zinc-400 mr-2" />
                        <span className="text-zinc-400 w-20">Email:</span>
                        <span className="text-white">
                          {selectedAddress.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                    <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Address Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Home className="h-4 w-4 text-zinc-400 mr-2 mt-0.5" />
                        <div>
                          <span className="text-zinc-400 block">Address:</span>
                          <span className="text-white">
                            {selectedAddress.address}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-zinc-400 mr-2" />
                        <span className="text-zinc-400 w-20">City:</span>
                        <span className="text-white">
                          {selectedAddress.city}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-zinc-400 w-20">State:</span>
                        <span className="text-white">
                          {selectedAddress.state}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-zinc-400 mr-2" />
                        <span className="text-zinc-400 w-20">Country:</span>
                        <span className="text-white">
                          {selectedAddress.country}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-zinc-400 w-20">ZIP:</span>
                        <span className="text-white">
                          {selectedAddress.zipCode}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Payment Status
                  </h3>
                  <div className="flex items-center">
                    {getStatusBadge(selectedAddress.paymentStatus || false)}
                    <span className="ml-3 text-zinc-300">
                      {selectedAddress.paymentStatus
                        ? "Payment has been completed successfully"
                        : "Payment is pending or incomplete"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Address;
