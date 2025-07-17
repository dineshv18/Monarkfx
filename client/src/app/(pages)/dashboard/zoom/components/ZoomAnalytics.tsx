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
import { Calendar, Users, IndianRupee } from "lucide-react";

// Define types for the analytics data
interface User {
  id: string;
  name: string;
  email: string;
}

interface PopularSession {
  id: string;
  title: string;
  subscriptionCount: number;
}

interface RecentPayment {
  id: string;
  amount: number;
  createdAt: string;
  user: User;
  subscription: {
    zoomSession: {
      title: string;
    };
  };
}

interface AnalyticsData {
  totalSessions: number;
  activeSubscriptions: number;
  totalRevenue: number;
  monthlyRevenue: Record<string, number>;
  popularSessions: PopularSession[];
  recentPayments: RecentPayment[];
}

interface ZoomAnalyticsProps {
  analyticsData: AnalyticsData | null;
}

export default function ZoomAnalytics({ analyticsData }: ZoomAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<string>("summary");

  if (!analyticsData) {
    return (
      <div className="text-white text-center py-8">
        No analytics data available
      </div>
    );
  }

  // Convert monthly revenue object to array for display
  const monthlyRevenueData = Object.entries(
    analyticsData.monthlyRevenue || {}
  ).map(([month, amount]) => ({ month, amount }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-zinc-900 border border-green-500/30 hover:border-green-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Sessions
            </CardTitle>
            <Calendar className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {analyticsData.totalSessions}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border border-green-500/30 hover:border-green-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Active Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {analyticsData.activeSubscriptions}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border border-green-500/30 hover:border-green-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Revenue
            </CardTitle>
            <IndianRupee className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              ₹{analyticsData.totalRevenue.toFixed(2)}
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
        <TabsList className="bg-zinc-800 border border-green-500/30">
          <TabsTrigger
            value="summary"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-black text-zinc-300 hover:text-white"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            value="revenue"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-black text-zinc-300 hover:text-white"
          >
            Revenue
          </TabsTrigger>
          <TabsTrigger
            value="popular"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-black text-zinc-300 hover:text-white"
          >
            Popular Sessions
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-black text-zinc-300 hover:text-white"
          >
            Recent Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6">
          <Card className="bg-zinc-900 border border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white">
                Zoom Classes Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-white">Sessions</h3>
                    <p className="text-3xl font-bold text-green-400">
                      {analyticsData.totalSessions}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Subscribers
                    </h3>
                    <p className="text-3xl font-bold text-green-400">
                      {analyticsData.activeSubscriptions}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Total Revenue
                  </h3>
                  <p className="text-3xl font-bold text-green-400">
                    ₹{analyticsData.totalRevenue.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <Card className="bg-zinc-900 border border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyRevenueData.length > 0 ? (
                <div className="rounded-lg border border-green-500/30 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-green-500/30">
                        <TableHead className="text-green-400 font-semibold">
                          Month
                        </TableHead>
                        <TableHead className="text-green-400 font-semibold">
                          Revenue
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyRevenueData.map((data, index) => (
                        <TableRow
                          key={index}
                          className="border-green-500/30 hover:bg-green-500/10"
                        >
                          <TableCell className="text-white">
                            {data.month}
                          </TableCell>
                          <TableCell className="text-green-400 font-semibold">
                            ₹{Number(data.amount).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-zinc-400 text-center py-4">
                  No revenue data available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <Card className="bg-zinc-900 border border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white">Popular Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.popularSessions?.length > 0 ? (
                <div className="rounded-lg border border-green-500/30 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-green-500/30">
                        <TableHead className="text-green-400 font-semibold">
                          Session Title
                        </TableHead>
                        <TableHead className="text-green-400 font-semibold">
                          Subscriptions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analyticsData.popularSessions.map((session) => (
                        <TableRow
                          key={session.id}
                          className="border-green-500/30 hover:bg-green-500/10"
                        >
                          <TableCell className="text-white">
                            {session.title}
                          </TableCell>
                          <TableCell className="text-green-400 font-semibold">
                            {session.subscriptionCount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-zinc-400 text-center py-4">
                  No popular sessions data available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <Card className="bg-zinc-900 border border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white">Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.recentPayments?.length > 0 ? (
                <div className="rounded-lg border border-green-500/30 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-green-500/30">
                        <TableHead className="text-green-400 font-semibold">
                          User
                        </TableHead>
                        <TableHead className="text-green-400 font-semibold">
                          Session
                        </TableHead>
                        <TableHead className="text-green-400 font-semibold">
                          Amount
                        </TableHead>
                        <TableHead className="text-green-400 font-semibold">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analyticsData.recentPayments.map((payment) => (
                        <TableRow
                          key={payment.id}
                          className="border-green-500/30 hover:bg-green-500/10"
                        >
                          <TableCell className="text-white">
                            <div>
                              <p className="font-medium">{payment.user.name}</p>
                              <p className="text-xs text-zinc-400">
                                {payment.user.email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-white">
                            {payment.subscription.zoomSession.title}
                          </TableCell>
                          <TableCell className="text-green-400 font-semibold">
                            ₹{payment.amount.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-zinc-400 text-center py-4">
                  No recent payments data available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
