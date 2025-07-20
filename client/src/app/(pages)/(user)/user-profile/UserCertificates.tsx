"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Award,
  GraduationCap,
  Calendar,
  ExternalLink,
  Share2,
  Trophy,
  CheckCircle,
  Sparkles,
  BookOpen,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface Certificate {
  id: string;
  certificateId: string;
  completedAt: string;
  grade: string | null;
  course: {
    title: string;
    description: string;
  };
}

export default function UserCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/certificates/user`,
        {
          withCredentials: true,
        }
      );
      setCertificates(response.data.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      toast.error("Failed to fetch certificates");
    } finally {
      setLoading(false);
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

  const getGradeColor = (grade: string | null) => {
    if (!grade) return "bg-zinc-500";
    switch (grade.toUpperCase()) {
      case "A+":
      case "A":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "B+":
      case "B":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "C+":
      case "C":
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      default:
        return "bg-gradient-to-r from-purple-500 to-pink-500";
    }
  };

  const getGradeText = (grade: string | null) => {
    if (!grade) return "Pass";
    return grade;
  };

  if (loading) {
    return <CertificatesSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
            <Trophy className="h-8 w-8 text-green-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">My Certificates</h2>
            <p className="text-zinc-400 mt-1">
              Your achievements and accomplishments
            </p>
          </div>
        </div>

        {certificates.length > 0 && (
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span>
              You've earned {certificates.length} certificate
              {certificates.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </motion.div>

      {/* Certificates Grid */}
      {certificates.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <div className="p-8 bg-gradient-to-br from-zinc-900/50 to-black/50 border border-zinc-700/50 rounded-2xl backdrop-blur-sm">
              <div className="p-6 bg-zinc-800/50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <GraduationCap className="h-12 w-12 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                No Certificates Yet
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Complete courses to earn beautiful certificates and showcase
                your achievements.
              </p>
              <Button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
                onClick={() => (window.location.href = "/courses")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Courses
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden bg-gradient-to-br from-zinc-900/95 via-black/90 to-zinc-950/95 backdrop-blur-xl border border-zinc-700/50 shadow-lg hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-2">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),rgba(0,0,0,0))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),rgba(0,0,0,0))]" />
                </div>

                {/* Certificate Header */}
                <div className="relative p-6 border-b border-zinc-700/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                        <Award className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-green-100 transition-colors line-clamp-2">
                          {cert.course.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1">
                          Certificate ID: {cert.certificateId}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`${getGradeColor(
                        cert.grade
                      )} text-white border-0 px-3 py-1 font-bold rounded-full`}
                    >
                      {getGradeText(cert.grade)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-400" />
                      <span>
                        {format(new Date(cert.completedAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Completed</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Actions */}
                <div className="relative p-6">
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => shareCertificate(cert.certificateId)}
                      variant="outline"
                      size="sm"
                      className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-green-500/50 hover:text-green-400 transition-all duration-300"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(`/verify/${cert.certificateId}`, "_blank")
                      }
                      variant="outline"
                      size="sm"
                      className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <Button
                      onClick={() => downloadCertificate(cert.certificateId)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function CertificatesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700/50"
          >
            <div className="p-6 border-b border-zinc-700/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
