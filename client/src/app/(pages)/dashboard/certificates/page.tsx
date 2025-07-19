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
} from "lucide-react";

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

  const calculateStats = (certs: Certificate[]) => {
    const totalCertificates = certs.length;

    const certificatesThisMonth = certs.filter((cert) => {
      const certDate = new Date(cert.completedAt);
      const now = new Date();
      return (
        certDate.getMonth() === now.getMonth() &&
        certDate.getFullYear() === now.getFullYear()
      );
    }).length;

    const completedToday = certs.filter((cert) => {
      const certDate = new Date(cert.completedAt);
      const today = new Date();
      return (
        certDate.getDate() === today.getDate() &&
        certDate.getMonth() === today.getMonth() &&
        certDate.getFullYear() === today.getFullYear()
      );
    }).length;

    // Calculate average grade - handle both numeric and text grades
    const gradeCounts = certs.filter((cert) => cert.grade).length;
    let averageGrade = "N/A";
    if (gradeCounts > 0) {
      const passCount = certs.filter(
        (cert) => cert.grade && cert.grade.toLowerCase() === "pass"
      ).length;
      const passPercentage = ((passCount / gradeCounts) * 100).toFixed(1);
      averageGrade = `${passPercentage}% Pass Rate`;
    }

    setStats({
      totalCertificates,
      certificatesThisMonth,
      averageGrade,
      completedToday,
    });
  };

  const handleDelete = async (certificateId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this certificate? This action cannot be undone."
      )
    ) {
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
      toast.success("Certificate downloaded successfully");
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast.error("Failed to download certificate");
    }
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

  const getGradeBadge = (grade: string | null) => {
    if (!grade) return <span className="text-zinc-400">N/A</span>;

    // Handle text-based grades like "Pass", "Fail", etc.
    if (grade.toLowerCase() === "pass") {
      return (
        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
          Pass
        </span>
      );
    } else if (grade.toLowerCase() === "fail") {
      return (
        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
          Fail
        </span>
      );
    } else if (grade.toLowerCase() === "distinction") {
      return (
        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
          Distinction
        </span>
      );
    } else if (grade.toLowerCase() === "merit") {
      return (
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
          Merit
        </span>
      );
    }

    // Handle numeric grades if they exist
    const gradeNum = parseFloat(grade);
    if (!isNaN(gradeNum)) {
      if (gradeNum >= 90) {
        return (
          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
            A+ ({grade})
          </span>
        );
      } else if (gradeNum >= 80) {
        return (
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
            A ({grade})
          </span>
        );
      } else if (gradeNum >= 70) {
        return (
          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
            B ({grade})
          </span>
        );
      } else if (gradeNum >= 60) {
        return (
          <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs">
            C ({grade})
          </span>
        );
      } else {
        return (
          <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
            F ({grade})
          </span>
        );
      }
    }

    // Default case for any other text grades
    return (
      <span className="px-2 py-1 bg-zinc-500/20 text-zinc-400 rounded-full text-xs">
        {grade}
      </span>
    );
  };

  if (loading && certificates.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
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
              Certificate Management
            </h1>
            <p className="text-zinc-400 mt-2">
              Manage student certificates and track achievements
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={fetchCertificates}
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
                  <p className="text-zinc-400 text-sm">Total Certificates</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalCertificates}
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Award className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">This Month</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.certificatesThisMonth}
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Completed Today</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.completedToday}
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Pass Rate</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.averageGrade}
                  </p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-400" />
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
                placeholder="Search certificates by student name, email, course, or certificate ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Certificates Table */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Certificates ({filteredCertificates.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            ) : filteredCertificates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Award className="h-12 w-12 text-zinc-400 mb-4" />
                <div className="text-zinc-400 mb-2">
                  {searchTerm
                    ? "No certificates found matching your search"
                    : "No certificates found"}
                </div>
                <div className="text-sm text-zinc-500">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Certificates will appear here once students complete courses"}
                </div>
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
                        className="border-zinc-700 hover:bg-zinc-800/50"
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
                        <TableCell className="text-zinc-300 font-mono">
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
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(cert.certificateId)}
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
      </div>
    </div>
  );
}
