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
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Info,
  HelpCircle,
} from "lucide-react";
import ZoomSessionsTable from "./components/ZoomSessionsTable";
import { useToast } from "@/hooks/use-toast";
import ZoomAnalytics from "./components/ZoomAnalytics";
import ZoomSubscriptionsTable from "./components/ZoomSubscriptionsTable";
import ZoomPaymentsTable from "./components/ZoomPaymentsTable";
import SessionLinks from "./components/SessionLinks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Info className="h-4 w-4 mr-2" />
                  Help
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700 max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Live Classes Management Guide
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">
                      🎯 Live Class Features
                    </h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li>• Create and manage live Zoom sessions</li>
                      <li>• Set registration and course fees</li>
                      <li>• Manage participant registrations</li>
                      <li>• Track attendance and analytics</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">
                      📊 Admin Management
                    </h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li>• View all live classes and their status</li>
                      <li>• Approve/reject participant registrations</li>
                      <li>• Start/stop live sessions</li>
                      <li>• Monitor payments and subscriptions</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

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
                  <p className="text-zinc-400 text-sm">Upcoming Classes</p>
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
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabValue)}
          className="space-y-6"
        >
          <TabsList className="bg-zinc-900 border border-zinc-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-green-600"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="classes"
              className="data-[state=active]:bg-green-600"
            >
              Live Classes
            </TabsTrigger>
            <TabsTrigger
              value="subscriptions"
              className="data-[state=active]:bg-green-600"
            >
              Subscriptions
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-green-600"
            >
              Payments
            </TabsTrigger>
            <TabsTrigger
              value="links"
              className="data-[state=active]:bg-green-600"
            >
              Session Links
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Analytics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {analyticsData ? (
                  <ZoomAnalytics data={analyticsData} />
                ) : (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Live Classes</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  </div>
                ) : (
                  <ZoomSessionsTable
                    classes={zoomLiveClasses}
                    refreshData={fetchData}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <ZoomSubscriptionsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <ZoomPaymentsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links" className="space-y-6">
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Session Links</CardTitle>
              </CardHeader>
              <CardContent>
                <SessionLinks />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
