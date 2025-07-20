"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  Trash2,
  Award,
  Search,
  Calendar,
  FileText,
  RefreshCw,
  GraduationCap,
  Star,
  Trophy,
  Users,
  TrendingUp,
  CheckCircle,
  ExternalLink,
  Share2,
  Sparkles,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";

interface Certificate {
  id: string;
  certificateId: string;
  completedAt: string;
  grade: string | null;
  user: {
    name: string;
    email: string;
  };
  course: {
    title: string;
  };
}

interface Stats {
  totalCertificates: number;
  certificatesThisMonth: number;
  averageGrade: string;
  completedToday: number;
}

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState<Stats>({
    totalCertificates: 0,
    certificatesThisMonth: 0,
    averageGrade: "N/A",
    completedToday: 0,
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/certificates/all`,
        { withCredentials: true }
      );
      console.log("Certificates API Response:", response.data);
      console.log("Setting certificates:", response.data.data);
      setCertificates(response.data.data);
      calculateStats(response.data.data);
    } catch (error: any) {
      console.error("Error fetching certificates:", error);
      toast.error("Failed to fetch certificates");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (certificates: Certificate[]) => {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const certificatesThisMonth = certificates.filter(
      (cert) => new Date(cert.completedAt) >= thisMonth
    ).length;

    const completedToday = certificates.filter(
      (cert) => new Date(cert.completedAt) >= today
    ).length;

    // Calculate average grade
    const grades = certificates
      .map((cert) => cert.grade)
      .filter((grade) => grade !== null);

    let averageGrade = "N/A";
    if (grades.length > 0) {
      const gradeValues = grades.map((grade) => {
        switch (grade?.toUpperCase()) {
          case "A+":
            return 4.3;
          case "A":
            return 4.0;
          case "A-":
            return 3.7;
          case "B+":
            return 3.3;
          case "B":
            return 3.0;
          case "B-":
            return 2.7;
          case "C+":
            return 2.3;
          case "C":
            return 2.0;
          case "C-":
            return 1.7;
          case "D+":
            return 1.3;
          case "D":
            return 1.0;
          case "F":
            return 0.0;
          default:
            return 2.0; // Default for "Pass"
        }
      });

      const average =
        gradeValues.reduce((a: number, b: number) => a + b, 0) /
        gradeValues.length;
      averageGrade = average.toFixed(1);
    }

    setStats({
      totalCertificates: certificates.length,
      certificatesThisMonth,
      averageGrade,
      completedToday,
    });
  };

  const handleDelete = async (certificateId: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) {
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/certificates/delete/${certificateId}`,
        { withCredentials: true }
      );
      toast.success("Certificate deleted successfully");
      fetchCertificates();
    } catch (error) {
      console.error("Error deleting certificate:", error);
      toast.error("Failed to delete certificate");
    }
  };

  const downloadCertificate = async (certificateId: string) => {
    const loadingToast = toast.loading("Preparing certificate for download...");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/certificates/download/${certificateId}`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate-${certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.dismiss(loadingToast);
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast.dismiss(loadingToast);
      toast.error("Failed to download certificate");
    }
  };

  const shareCertificate = async (certificateId: string) => {
    try {
      const shareUrl = `${window.location.origin}/verify/${certificateId}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Certificate link copied to clipboard!");
    } catch (error) {
      console.error("Error sharing certificate:", error);
      toast.error("Failed to share certificate");
    }
  };

  const getGradeBadge = (grade: string | null) => {
    if (!grade) {
      return (
        <span className="bg-green-500/20 text-green-300 border-green-500/40 px-2 py-1 rounded-md">
          Pass
        </span>
      );
    }

    let colorClass = "";
    switch (grade.toUpperCase()) {
      case "A+":
      case "A":
        colorClass =
          "bg-green-500/20 text-green-300 border-green-500/40 px-2 py-1 rounded-md";
        break;
      case "B+":
      case "B":
        colorClass =
          "bg-blue-500/20 text-blue-300 border-blue-500/40 px-2 py-1 rounded-md";
        break;
      case "C+":
      case "C":
        colorClass =
          "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 px-2 py-1 rounded-md";
        break;
      default:
        colorClass =
          "bg-purple-500/20 text-purple-300 border-purple-500/40 px-2 py-1 rounded-md";
    }

    return <span className={colorClass}>{grade}</span>;
  };

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-zinc-800 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-zinc-800 rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-zinc-800 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                <Trophy className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Certificate Management
                </h1>
                <p className="text-zinc-400 mt-1">
                  Manage student certificates and track achievements
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={fetchCertificates}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Trophy className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm font-medium">
                    Total Certificates
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalCertificates}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-blue-500/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm font-medium">
                    This Month
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.certificatesThisMonth}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-yellow-500/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm font-medium">
                    Average Grade
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.averageGrade}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-purple-500/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm font-medium">
                    Completed Today
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.completedToday}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 mb-6">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                <Input
                  placeholder="Search certificates by student name, email, course, or certificate ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500/50 focus:ring-green-500/20"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Certificates Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Certificates ({filteredCertificates.length})
                {filteredCertificates.length > 0 && (
                  <div className="flex items-center gap-2 ml-4">
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-zinc-400">
                      {filteredCertificates.length} certificate
                      {filteredCertificates.length !== 1 ? "s" : ""} found
                    </span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredCertificates.length === 0 ? (
                <div className="text-center py-16">
                  <div className="p-6 bg-zinc-800/50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <GraduationCap className="h-12 w-12 text-zinc-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    No Certificates Found
                  </h3>
                  <p className="text-zinc-400">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "No certificates have been issued yet"}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                        <TableHead className="text-zinc-300">Student</TableHead>
                        <TableHead className="text-zinc-300">Email</TableHead>
                        <TableHead className="text-zinc-300">Course</TableHead>
                        <TableHead className="text-zinc-300">Grade</TableHead>
                        <TableHead className="text-zinc-300">
                          Certificate ID
                        </TableHead>
                        <TableHead className="text-zinc-300">
                          Completed On
                        </TableHead>
                        <TableHead className="text-zinc-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCertificates.map((cert) => (
                        <TableRow
                          key={cert.id}
                          className="border-zinc-700 hover:bg-zinc-800/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-white">
                            {cert.user.name}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {cert.user.email}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {cert.course.title}
                          </TableCell>
                          <TableCell>{getGradeBadge(cert.grade)}</TableCell>
                          <TableCell className="text-zinc-300 font-mono text-sm">
                            {cert.certificateId}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {formatDate(cert.completedAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  downloadCertificate(cert.certificateId)
                                }
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                                title="Download Certificate"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  window.open(
                                    `/verify/${cert.certificateId}`,
                                    "_blank"
                                  )
                                }
                                className="text-green-400 hover:text-green-300 hover:bg-green-500/20"
                                title="View Certificate"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  shareCertificate(cert.certificateId)
                                }
                                className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/20"
                                title="Share Certificate"
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(cert.certificateId)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                title="Delete Certificate"
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
        </motion.div>
      </div>
    </div>
  );
}
