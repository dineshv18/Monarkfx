"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Shield,
  CheckCircle,
  XCircle,
  Award,
  Calendar,
  User,
  BookOpen,
  Star,
  Sparkles,
  Copy,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CertificateData {
  studentName: string;
  courseName: string;
  issueDate: string;
  grade?: string;
  certificateId: string;
}

export default function VerifyCertificate({
  params,
}: {
  params: { certificateId: string };
}) {
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/certificates/verify/${params.certificateId}`
        );
        setCertificateData(response.data.data.certificateData);
      } catch (err) {
        setError("Invalid or expired certificate");
      } finally {
        setIsLoading(false);
      }
    };

    verifyCertificate();
  }, [params.certificateId]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Certificate URL copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy URL");
    }
  };

  const downloadCertificate = async () => {
    const loadingToast = toast.loading("Preparing certificate for download...");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/certificates/download/${params.certificateId}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate-${params.certificateId}.pdf`);
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

  const getGradeColor = (grade?: string) => {
    if (!grade) return "bg-green-500/20 text-green-300 border-green-500/40";
    switch (grade.toUpperCase()) {
      case "A+":
      case "A":
        return "bg-green-500/20 text-green-300 border-green-500/40";
      case "B+":
      case "B":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "C+":
      case "C":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/40";
      default:
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Shield className="w-12 h-12 text-green-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Verifying Certificate...
          </h2>
          <p className="text-zinc-400">
            Please wait while we validate the certificate
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="p-6 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-3">
            Invalid Certificate
          </h2>
          <p className="text-zinc-400 mb-6">{error}</p>
          <Button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white"
          >
            Go Back
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Certificate Verified
              </h1>
              <p className="text-zinc-400 text-lg">
                This certificate is authentic and valid
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span>Certificate ID: {certificateData?.certificateId}</span>
          </div>
        </motion.div>

        {/* Certificate Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-zinc-900/95 via-black/90 to-zinc-950/95 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),rgba(0,0,0,0))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),rgba(0,0,0,0))]" />
          </div>

          {/* Certificate Header */}
          <div className="relative p-8 border-b border-zinc-700/50 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                  <Award className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Course Completion Certificate
                  </h2>
                  <p className="text-zinc-400">
                    MonarkFX - Global Trading Excellence
                  </p>
                </div>
              </div>
              <span className="bg-green-500/20 text-green-300 border-green-500/40 px-4 py-2 text-sm font-semibold rounded-full">
                VERIFIED
              </span>
            </div>
          </div>

          {/* Certificate Content */}
          <div className="relative p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <User className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm font-medium">
                      Student Name
                    </p>
                    <p className="text-white font-semibold text-lg">
                      {certificateData?.studentName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm font-medium">
                      Course Completed
                    </p>
                    <p className="text-white font-semibold text-lg">
                      {certificateData?.courseName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Calendar className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm font-medium">
                      Issue Date
                    </p>
                    <p className="text-white font-semibold text-lg">
                      {certificateData?.issueDate}
                    </p>
                  </div>
                </div>

                {certificateData?.grade && (
                  <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Star className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-sm font-medium">
                        Grade Achieved
                      </p>
                      <span
                        className={`${getGradeColor(
                          certificateData.grade
                        )} mt-1 px-3 py-1 text-sm font-semibold rounded-full`}
                      >
                        {certificateData.grade}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Certificate ID */}
            <div className="mt-8 p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/50">
              <p className="text-zinc-400 text-sm font-medium mb-2">
                Certificate ID
              </p>
              <div className="flex items-center gap-3">
                <code className="text-green-400 font-mono text-sm bg-black/50 px-3 py-2 rounded-lg flex-1">
                  {certificateData?.certificateId}
                </code>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-green-500/50 hover:text-green-400"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="relative p-8 border-t border-zinc-700/50 bg-gradient-to-r from-zinc-900/50 to-black/50">
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button
                onClick={downloadCertificate}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Award className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
              <Button
                onClick={() => window.open("/courses", "_blank")}
                variant="outline"
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-blue-500/50 hover:text-blue-400 px-8 py-3"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Browse Courses
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-zinc-500 text-sm">
            This certificate has been verified and is authentic. For any
            questions, please contact our support team.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
