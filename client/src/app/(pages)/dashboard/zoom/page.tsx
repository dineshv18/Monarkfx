"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  Plus,
  RefreshCw,
  Link2,
  Video,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";
import ZoomSessionsTable from "./components/ZoomSessionsTable";
import { useToast } from "@/hooks/use-toast";
import ZoomAnalytics from "./components/ZoomAnalytics";
import ZoomSubscriptionsTable from "./components/ZoomSubscriptionsTable";
import ZoomPaymentsTable from "./components/ZoomPaymentsTable";
import SessionLinks from "./components/SessionLinks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabValue = "overview" | "classes" | "subscriptions" | "payments" | "links";

interface ZoomStats {
  totalClasses: number;
  activeClasses: number;
  upcomingClasses: number;
  totalParticipants: number;
}

export default function ZoomDashboard() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [isLoading, setIsLoading] = useState(true);
  const [zoomLiveClasses, setZoomLiveClasses] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [stats, setStats] = useState<ZoomStats>({
    totalClasses: 0,
    activeClasses: 0,
    upcomingClasses: 0,
    totalParticipants: 0,
  });
  const [activeTab, setActiveTab] = useState<TabValue>(() => {
    // Set default tab or use tab from URL param
    if (
      tabParam &&
      ["overview", "classes", "subscriptions", "payments", "links"].includes(
        tabParam
      )
    ) {
      return tabParam as TabValue;
    }
    return "overview";
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  // Update active tab when URL param changes
  useEffect(() => {
    if (
      tabParam &&
      ["overview", "classes", "subscriptions", "payments", "links"].includes(
        tabParam
      )
    ) {
      setActiveTab(tabParam as TabValue);
    }
  }, [tabParam]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch live classes
      const classesResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/classes`,
        { withCredentials: true }
      );

      // Fetch analytics
      const analyticsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/analytics`,
        { withCredentials: true }
      );

      const classesData = classesResponse.data.data;
      setZoomLiveClasses(classesData);
      setAnalyticsData(analyticsResponse.data.data);
      calculateStats(classesData);
    } catch (error) {
      console.error("Error fetching zoom data:", error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (classesData: any[]) => {
    const total = classesData.length;
    const active = classesData.filter((cls) => cls.isOnline).length;
    const upcoming = classesData.filter((cls) => {
      const classDate = new Date(cls.startTime);
      return classDate > new Date();
    }).length;
    const participants = classesData.reduce(
      (sum, cls) => sum + (cls.participantCount || 0),
      0
    );

    setStats({
      totalClasses: total,
      activeClasses: active,
      upcomingClasses: upcoming,
      totalParticipants: participants,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Live Classes Management
            </h1>
            <p className="text-zinc-400 mt-2">
              Manage your Zoom live classes and sessions
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/zoom/create">
              <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold">
                <Plus size={18} /> Create Live Class
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={fetchData}
              className="flex items-center gap-2 border-green-500/50 text-green-400 hover:bg-green-500/10 hover:text-green-300"
              disabled={isLoading}
            >
              <RefreshCw
                size={18}
                className={isLoading ? "animate-spin" : ""}
              />
              {isLoading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Total Classes</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalClasses}
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Video className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Active Classes</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.activeClasses}
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Upcoming</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.upcomingClasses}
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Total Participants</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalParticipants}
                  </p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={(value: string) => setActiveTab(value as TabValue)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 w-full max-w-4xl bg-zinc-900 border border-zinc-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-zinc-300 hover:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="classes"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-zinc-300 hover:text-white"
            >
              Live Classes
            </TabsTrigger>
            <TabsTrigger
              value="links"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-zinc-300 hover:text-white"
            >
              Class Links
            </TabsTrigger>
            <TabsTrigger
              value="subscriptions"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-zinc-300 hover:text-white"
            >
              Subscriptions
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-zinc-300 hover:text-white"
            >
              Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-green-400" />
              </div>
            ) : (
              <ZoomAnalytics analyticsData={analyticsData} />
            )}
          </TabsContent>

          <TabsContent value="classes" className="mt-6 space-y-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-green-400" />
              </div>
            ) : (
              <ZoomSessionsTable
                classes={zoomLiveClasses}
                refreshData={fetchData}
              />
            )}
          </TabsContent>

          <TabsContent value="links" className="mt-6 space-y-6">
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Link2 className="h-5 w-5" />
                  Class Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SessionLinks
                  sessions={zoomLiveClasses}
                  refreshData={fetchData}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="mt-6 space-y-6">
            <ZoomSubscriptionsTable />
          </TabsContent>

          <TabsContent value="payments" className="mt-6 space-y-6">
            <ZoomPaymentsTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
