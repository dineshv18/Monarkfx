"use client";
import {
  Youtube,
  Loader2,
  Video,
  Users,
  Calendar,
  Star,
  Zap,
  TrendingUp,
  BarChart3,
  IndianRupee,
  Target,
  BookOpen,
  Search,
  Filter,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/helper/AuthContext";
import ClassCard from "./components/ClassCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LiveClasses() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/classes?includeAll=true`;

      const response = await axios.get(apiUrl);

      const classesData = response.data.data;

      // Validate that each class has either id or slug for navigation
      const validatedClasses = classesData.map((classItem: any) => {
        if (!classItem.id && !classItem.slug) {
          console.warn("Class missing both ID and slug:", classItem.title);
        }
        return classItem;
      });

      setClasses(validatedClasses);
    } catch (error: any) {
      console.error("Error fetching live classes:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to load live classes. Please try again.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalClasses = classes.length;
  const upcomingClasses = classes.filter((cls: any) => {
    const classDate = new Date(cls.startTime);
    return classDate > new Date();
  }).length;
  const activeClasses = classes.filter((cls: any) => cls.isOnline).length;

  // Filter classes based on search and status
  const filteredClasses = classes.filter((cls: any) => {
    const matchesSearch =
      cls.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "upcoming" && new Date(cls.startTime) > new Date()) ||
      (filterStatus === "live" && cls.isOnline) ||
      (filterStatus === "past" && new Date(cls.startTime) < new Date());

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-black font-plus-jakarta-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-zinc-900 via-black to-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Live Trading Sessions
            </h1>

            <p className="text-xl md:text-2xl text-zinc-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Master the art of trading with our expert-led live sessions. Learn
              technical analysis, market strategies, and real-time trading
              techniques from seasoned professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() =>
                  document
                    .getElementById("classes-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Zap className="h-5 w-5" />
                Start Trading
              </button>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-all duration-300 px-6 py-4 border border-zinc-700 rounded-xl hover:border-green-500/50 hover:bg-zinc-900/50"
              >
                <Youtube className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Video className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {totalClasses}
                  </div>
                  <div className="text-sm text-zinc-400">Trading Sessions</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {upcomingClasses}
                  </div>
                  <div className="text-sm text-zinc-400">Upcoming</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Users className="h-5 w-5 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {activeClasses}
                  </div>
                  <div className="text-sm text-zinc-400">Live Now</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <IndianRupee className="h-5 w-5 text-yellow-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    98-100%
                  </div>
                  <div className="text-sm text-zinc-400">Success Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Trading Features Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-gradient-to-br from-zinc-900/50 to-black/50 rounded-xl border border-zinc-700">
                <div className="p-3 bg-green-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Technical Analysis
                </h3>
                <p className="text-zinc-400 text-sm">
                  Master chart patterns, indicators, and market psychology
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-zinc-900/50 to-black/50 rounded-xl border border-zinc-700">
                <div className="p-3 bg-blue-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Risk Management
                </h3>
                <p className="text-zinc-400 text-sm">
                  Learn proper position sizing and stop-loss strategies
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-zinc-900/50 to-black/50 rounded-xl border border-zinc-700">
                <div className="p-3 bg-purple-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Market Education
                </h3>
                <p className="text-zinc-400 text-sm">
                  Understand market fundamentals and trading psychology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Dialog would go here */}

      {/* Classes Section */}
      <div className="bg-black py-20">
        <div id="classes-section" className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Star className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Available Trading Sessions
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Join our expert traders for live interactive sessions designed to
              enhance your trading skills and market knowledge. Book your spot
              today!
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12">
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                      <Input
                        placeholder="Search trading sessions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-48 bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="all">All Sessions</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="live">Live Now</SelectItem>
                      <SelectItem value="past">Past Sessions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Classes Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-green-400 mx-auto mb-4" />
                <p className="text-zinc-400">Loading trading sessions...</p>
              </div>
            </div>
          ) : filteredClasses.length === 0 ? (
            <div className="text-center py-20">
              <div className="p-4 bg-zinc-900/50 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Video className="h-10 w-10 text-zinc-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm || filterStatus !== "all"
                  ? "No sessions found"
                  : "No trading sessions available"}
              </h3>
              <p className="text-zinc-400">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filters"
                  : "Check back later for new sessions"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClasses.map((classItem: any) => (
                <ClassCard
                  key={classItem.id || classItem.slug}
                  classData={classItem}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
