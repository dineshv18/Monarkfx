"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Users,
  IndianRupee,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

// Define types for the analytics data
interface User {
  id: string;
  name: string;
  email: string;
}

interface SessionPopularity {
  id: string;
  title: string;
  subscriberCount: number;
  isActive: boolean;
}

interface RecentPayment {
  id: string;
  amount: number;
  status: string;
  paymentType: string;
  receiptNumber: string;
  createdAt: string;
  user: User;
  subscription: {
    zoomSession: {
      title: string;
    };
  };
}

interface AnalyticsData {
  totalClasses: number;
  activeSubscriptions: number;
  totalRevenue: number;
  monthlyRevenue: Record<string, number>;
  sessionPopularity: SessionPopularity[];
  recentPayments: RecentPayment[];
}

interface ZoomAnalyticsProps {
  data: AnalyticsData;
}

export default function ZoomAnalytics({ data }: ZoomAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<string>("summary");

  if (!data) {
    return (
      <div className="text-white text-center py-8">
        No analytics data available
      </div>
    );
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentStatusBadge = (status: string) => {
    if (status === "COMPLETED") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white border border-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-600 text-white border border-yellow-500">
        Pending
      </span>
    );
  };

  const getPaymentTypeBadge = (type: string) => {
    if (type === "REGISTRATION") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white border border-blue-500">
          Registration
        </span>
      );
    }

    if (type === "COURSE_ACCESS") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-600 text-white border border-purple-500">
          Course Access
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-600 text-white border border-zinc-500">
        {type}
      </span>
    );
  };

  // Convert monthly revenue object to array for display
  const monthlyRevenueData = Object.entries(data.monthlyRevenue || {}).map(
    ([month, amount]) => ({ month, amount })
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Classes
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.totalClasses}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Active Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.activeSubscriptions}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Revenue
            </CardTitle>
            <IndianRupee className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(data.totalRevenue)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs
        defaultValue="summary"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="bg-zinc-900 border border-zinc-700">
          <TabsTrigger
            value="summary"
            className="data-[state=active]:bg-green-600"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            value="revenue"
            className="data-[state=active]:bg-green-600"
          >
            Revenue
          </TabsTrigger>
          <TabsTrigger
            value="popular"
            className="data-[state=active]:bg-green-600"
          >
            Popular Sessions
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="data-[state=active]:bg-green-600"
          >
            Recent Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">
                Zoom Classes Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-white">Classes</h3>
                    <p className="text-3xl font-bold text-blue-400">
                      {data.totalClasses}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Subscribers
                    </h3>
                    <p className="text-3xl font-bold text-green-400">
                      {data.activeSubscriptions}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Total Revenue
                  </h3>
                  <p className="text-3xl font-bold text-yellow-400">
                    {formatCurrency(data.totalRevenue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyRevenueData.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-700">
                        <TableHead className="text-zinc-300">Month</TableHead>
                        <TableHead className="text-zinc-300">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyRevenueData.map((item, index) => (
                        <TableRow
                          key={index}
                          className="border-zinc-700 hover:bg-zinc-800/50"
                        >
                          <TableCell className="font-medium text-white">
                            {item.month}
                          </TableCell>
                          <TableCell className="text-green-400 font-semibold">
                            {formatCurrency(item.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-zinc-400">
                  No revenue data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Popular Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {data.sessionPopularity && data.sessionPopularity.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-700">
                        <TableHead className="text-zinc-300">Session</TableHead>
                        <TableHead className="text-zinc-300">
                          Subscribers
                        </TableHead>
                        <TableHead className="text-zinc-300">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.sessionPopularity.map((session) => (
                        <TableRow
                          key={session.id}
                          className="border-zinc-700 hover:bg-zinc-800/50"
                        >
                          <TableCell className="font-medium text-white">
                            {session.title}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {session.subscriberCount}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                session.isActive
                                  ? "bg-green-600 text-white border border-green-500"
                                  : "bg-zinc-600 text-white border border-zinc-500"
                              }`}
                            >
                              {session.isActive ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Active
                                </>
                              ) : (
                                "Inactive"
                              )}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-zinc-400">
                  No session data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              {data.recentPayments && data.recentPayments.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-700">
                        <TableHead className="text-zinc-300">User</TableHead>
                        <TableHead className="text-zinc-300">Session</TableHead>
                        <TableHead className="text-zinc-300">Amount</TableHead>
                        <TableHead className="text-zinc-300">Type</TableHead>
                        <TableHead className="text-zinc-300">Status</TableHead>
                        <TableHead className="text-zinc-300">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.recentPayments.map((payment) => (
                        <TableRow
                          key={payment.id}
                          className="border-zinc-700 hover:bg-zinc-800/50"
                        >
                          <TableCell className="font-medium text-white">
                            {payment.user.name}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {payment.subscription.zoomSession.title}
                          </TableCell>
                          <TableCell className="text-green-400 font-semibold">
                            {formatCurrency(payment.amount)}
                          </TableCell>
                          <TableCell>
                            {getPaymentTypeBadge(payment.paymentType)}
                          </TableCell>
                          <TableCell>
                            {getPaymentStatusBadge(payment.status)}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {formatDate(payment.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-zinc-400">
                  No payment data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
