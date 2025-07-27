"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Info,
  Share2,
  Loader2,
  CheckCircle2,
  Video,
  CreditCard,
  AlertCircle,
  Play,
  Users as UsersIcon,
  Star,
  MapPin,
  Award,
  TrendingUp,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/helper/AuthContext";
import PurchaseDialog from "../components/PurchaseDialog";
import RegistrationDialog from "../components/RegistrationDialog";
import CourseAccessDialog from "../components/CourseAccessDialog";
import ReviewSection from "../components/ReviewSection";

export default function ClassDetails() {
  const params = useParams();

  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [classData, setClassData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [showCourseAccessDialog, setShowCourseAccessDialog] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasAccessToLinks, setHasAccessToLinks] = useState(false);
  const [canJoinClass, setCanJoinClass] = useState(false);
  const [isOnClassroom, setIsOnClassroom] = useState(false);
  const [apiChecksCompleted, setApiChecksCompleted] = useState({
    fetchClassDetails: false,
    checkSubscription: false,
    checkPaymentStatus: false,
  });

  useEffect(() => {
    if (id) {
      setApiChecksCompleted({
        fetchClassDetails: false,
        checkSubscription: false,
        checkPaymentStatus: false,
      });

      fetchClassDetails();

      if (isAuthenticated) {
        checkSubscriptionStatus();
        checkPaymentStatus();
      }
    } else {
      toast({
        title: "Error",
        description: "No class ID found. Redirecting to classes list.",
        variant: "destructive",
      });
      setTimeout(() => router.push("/live-classes"), 3000);
    }
  }, [id, isAuthenticated]);

  const determineUserStatus = () => {
    // Use API flags as the primary source of truth
    const apiFlags = classData?.apiFlags || {};

    const userIsRegistered =
      apiFlags.isRegistered !== undefined
        ? apiFlags.isRegistered
        : isRegistered || (classData && classData.isRegistered);

    const userHasAccess =
      apiFlags.hasAccessToLinks !== undefined
        ? apiFlags.hasAccessToLinks
        : hasAccessToLinks || (classData && classData.hasAccessToLinks);

    const userIsApproved =
      apiFlags.isApproved !== undefined
        ? apiFlags.isApproved
        : classData && classData.isApproved;

    return { userIsRegistered, userHasAccess, userIsApproved };
  };

  // Function to determine button state based on registration status
  const getButtonState = () => {
    const { userIsRegistered, userHasAccess, userIsApproved } =
      determineUserStatus();

    // Use API response flags if available, otherwise fall back to classData
    const apiFlags = classData?.apiFlags || {};
    const showDemo = apiFlags.showDemo || false;
    const canRegister = apiFlags.canRegister !== false; // Default to true if not specified
    const showCourseFee = apiFlags.showCourseFee || false;
    const showWaiting = apiFlags.showWaiting || false;
    const showClosed = apiFlags.showClosed || false;
    const isOnline = apiFlags.isOnline || classData?.isOnClassroom || false;
    const registrationEnabled = classData?.registrationEnabled !== false;
    const courseFeeEnabled = classData?.courseFeeEnabled || false;

    // FIRST PRIORITY: If user has full access and class is live
    if (userHasAccess && isOnline) {
      return {
        type: "join",
        text: isJoining ? "Joining..." : "Join Live Class",
        color: "bg-green-600 hover:bg-green-700 text-white",
        disabled: isJoining,
        action: () => handleJoinClass(),
        message: "You have full access to the live class!",
      };
    }

    // SECOND PRIORITY: If user has full access but class is offline
    if (userHasAccess && !isOnline) {
      return {
        type: "waiting-admin",
        text: "Waiting for Admin to Start Class",
        color: "bg-amber-600 text-white cursor-not-allowed",
        disabled: true,
        action: null,
        message:
          "The admin hasn't started the class yet. You'll be able to join once it's live.",
      };
    }

    // THIRD PRIORITY: If admin approved registration but course fee needs to be paid
    if (showCourseFee && userIsApproved && courseFeeEnabled) {
      return {
        type: "pay",
        text: `Pay Course Fee - ₹${classData?.courseFee || 0}`,
        color:
          "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-600 text-white",
        disabled: false,
        action: () => setShowCourseAccessDialog(true),
        message:
          "Your registration is approved! Pay the course fee to get full access to the class.",
      };
    }

    // FOURTH PRIORITY: If user is registered and approved, and no course fee required
    if (userIsRegistered && userIsApproved && !courseFeeEnabled) {
      if (isOnline) {
        return {
          type: "demo",
          text: "Join Live Class (Demo Access)",
          color: "bg-blue-600 hover:bg-blue-700 text-white",
          disabled: false,
          action: () => handleDemoAccess(),
          message: "You have demo access to the live class!",
        };
      } else {
        return {
          type: "waiting-demo",
          text: "Demo Access Ready - Waiting for Class",
          color: "bg-blue-500 cursor-not-allowed text-white",
          disabled: true,
          action: null,
          message:
            "Your demo access is ready! Class will start when the admin goes live.",
        };
      }
    }

    // FIFTH PRIORITY: If user is registered but waiting for approval
    if (userIsRegistered && !userIsApproved) {
      return {
        type: "pending-approval",
        text: "Waiting for Admin Approval",
        color: "bg-yellow-600 cursor-not-allowed text-white",
        disabled: true,
        action: null,
        message:
          "Your registration is complete! Please wait for admin approval to access the class.",
      };
    }

    // SIXTH PRIORITY: If registration is enabled and user can register
    if (registrationEnabled && canRegister && !userIsRegistered) {
      return {
        type: "register",
        text: `Register for Class - ₹${classData?.registrationFee || 0}`,
        color:
          "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white",
        disabled: false,
        action: () => {
          // Check if user is authenticated before showing registration dialog
          if (!isAuthenticated) {
            // Redirect to auth page with live class ID and redirect URL
            const currentUrl = window.location.pathname;
            const authUrl = `/auth?live-class-id=${id}&redirect=${encodeURIComponent(
              currentUrl
            )}`;
            router.push(authUrl);
            return;
          }
          setShowRegistrationDialog(true);
        },
        message: "Register now to secure your spot in the live class!",
      };
    }

    // SEVENTH PRIORITY: If registration is disabled
    if (!registrationEnabled || showClosed) {
      return {
        type: "closed",
        text: "Registration Closed",
        color: "bg-gray-500 cursor-not-allowed text-white",
        disabled: true,
        action: null,
        message: "Registration for this class is currently closed.",
      };
    }

    // EIGHTH PRIORITY: If user shows demo but class is offline
    if (showDemo && !isOnline) {
      return {
        type: "waiting-demo",
        text: "Demo Access - Class Not Started",
        color: "bg-gray-500 cursor-not-allowed text-white",
        disabled: true,
        action: null,
        message: "Demo access is available, but the class hasn't started yet.",
      };
    }

    // NINTH PRIORITY: If showing waiting status
    if (showWaiting) {
      return {
        type: "waiting",
        text: "Class Not Available",
        color: "bg-gray-500 cursor-not-allowed text-white",
        disabled: true,
        action: null,
        message: "This class is not currently available.",
      };
    }

    // Default fallback
    return {
      type: "unavailable",
      text: "Not Available",
      color: "bg-gray-400 cursor-not-allowed text-gray-600",
      disabled: true,
      action: null,
      message: "This class is currently not available.",
    };
  };

  const fetchClassDetails = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/class/${id}`
      );

      const classData = response.data.data;

      setClassData(classData);

      setApiChecksCompleted((prev) => ({ ...prev, fetchClassDetails: true }));
    } catch (error: any) {
      console.error("Error fetching class details:", error);
      const errorMessage =
        error.response?.status === 404
          ? "The class you're looking for doesn't exist or has been removed."
          : "Failed to load class details. Please try again.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      if (error.response?.status === 404) {
        setTimeout(() => router.push("/live-classes"), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const checkSubscriptionStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/check-subscription/${id}`,
        { withCredentials: true }
      );

      if (response.data.data) {
        const {
          isSubscribed,
          isRegistered,
          isApproved,
          hasAccessToLinks,
          meetingDetails,
          courseFeeEnabled,
          isOnClassroom,
          canJoinClass,
          // New API response flags
          canRegister,
          showDemo,
          showCourseFee,
          showWaiting,
          showClosed,
          registrationEnabled,
          isOnline,
        } = response.data.data;

        setIsRegistered(!!isRegistered);
        setHasAccessToLinks(!!hasAccessToLinks);
        setIsOnClassroom(!!isOnClassroom);
        setCanJoinClass(!!canJoinClass);

        setClassData((prev: any) => {
          if (!prev) return prev;

          return {
            ...prev,
            isSubscribed: !!isSubscribed,
            isRegistered: !!isRegistered,
            isApproved: !!isApproved,
            hasAccessToLinks: !!hasAccessToLinks,
            courseFeeEnabled: courseFeeEnabled,
            isOnClassroom: !!isOnClassroom,
            canJoinClass: !!canJoinClass,
            registrationEnabled: registrationEnabled,
            apiFlags: {
              // Store all API flags for consistent access
              isRegistered: !!isRegistered,
              isApproved: !!isApproved,
              hasAccessToLinks: !!hasAccessToLinks,
              canRegister,
              showDemo,
              showCourseFee,
              showWaiting,
              showClosed,
              registrationEnabled,
              isOnline,
            },
            ...(canJoinClass && meetingDetails
              ? {
                  zoomLink: meetingDetails.link || prev.zoomLink,
                  zoomMeetingId: meetingDetails.meetingId || prev.zoomMeetingId,
                  zoomPassword: meetingDetails.password || prev.zoomPassword,
                }
              : {}),
          };
        });

        // Show appropriate toast messages based on status
        if (isRegistered && !hasAccessToLinks && courseFeeEnabled) {
          toast({
            title: "Course Fee Required",
            description: "Please pay the course fee to access class links.",
          });
        } else if (isRegistered && !courseFeeEnabled) {
          toast({
            title: "Registration Complete",
            description: "You can now access the class links.",
          });
        }
      }

      setApiChecksCompleted((prev) => ({ ...prev, checkSubscription: true }));
    } catch (error: any) {
      console.error("Error checking subscription status:", error);
      if (error.response?.status !== 404) {
        toast({
          title: "Note",
          description:
            "Could not check subscription status. This won't affect your ability to view the class.",
        });
      }
      setApiChecksCompleted((prev) => ({ ...prev, checkSubscription: true }));
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/check-subscription/${id}`,
        { withCredentials: true }
      );

      if (response.data.data) {
        const {
          isRegistered,
          hasAccessToLinks,
          isApproved,
          canRegister,
          showDemo,
          showCourseFee,
          showWaiting,
          showClosed,
          registrationEnabled,
          isOnline,
        } = response.data.data;

        setIsRegistered(!!isRegistered);
        setHasAccessToLinks(!!hasAccessToLinks);

        setClassData((prev: any) => {
          if (!prev) return prev;

          return {
            ...prev,
            isRegistered: !!isRegistered,
            hasAccessToLinks: !!hasAccessToLinks,
            isApproved: !!isApproved,
            apiFlags: {
              // Update API flags if not already set
              ...prev.apiFlags,
              isRegistered: !!isRegistered,
              isApproved: !!isApproved,
              hasAccessToLinks: !!hasAccessToLinks,
              canRegister,
              showDemo,
              showCourseFee,
              showWaiting,
              showClosed,
              registrationEnabled,
              isOnline,
            },
          };
        });

        // Removed the redirect to user-profile to avoid interrupting the flow
        if (hasAccessToLinks) {
          toast({
            title: "Access Available",
            description: "You already have full access to this class.",
          });
        }
      }

      setApiChecksCompleted((prev) => ({ ...prev, checkPaymentStatus: true }));
    } catch (error: any) {
      console.error("Error checking payment status:", error);

      // Don't show a toast here to avoid duplicate error messages
      setApiChecksCompleted((prev) => ({ ...prev, checkPaymentStatus: true }));
    }
  };

  const handleJoinClass = async (id?: string, isModule: boolean = false) => {
    if (!isAuthenticated) {
      router.push(
        `/auth?redirect=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    try {
      setIsJoining(true);

      let queryParams = "";

      if (isModule && id) {
        queryParams = `?moduleId=${id}`;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/check-subscription/${classData.id}${queryParams}`,
        { withCredentials: true }
      );

      if (
        response.data.data.hasAccessToLinks &&
        response.data.data.meetingDetails?.link
      ) {
        window.open(response.data.data.meetingDetails.link, "_blank");
      } else {
        toast({
          title: "Access Denied",
          description: "You need to complete registration to join this class.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error checking subscription:", error);
      toast({
        title: "Error",
        description: "Failed to join the class. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handlePurchaseComplete = () => {
    setShowPurchaseDialog(false);
    fetchClassDetails();
    checkSubscriptionStatus();
    toast({
      title: "Success",
      description: "Class purchased successfully!",
    });
  };

  const handleRegistrationComplete = () => {
    setShowRegistrationDialog(false);
    fetchClassDetails();
    checkSubscriptionStatus();
    toast({
      title: "Success",
      description: "Registration completed successfully!",
    });
  };

  const handleCourseAccessComplete = () => {
    setShowCourseAccessDialog(false);
    fetchClassDetails();
    checkSubscriptionStatus();
    toast({
      title: "Success",
      description: "Course access payment completed successfully!",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: classData?.title || "Live Trading Class",
        text: `Check out this live trading class: ${classData?.title}`,
        url: window.location.href,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const handleDemoAccess = async () => {
    if (!isAuthenticated) {
      router.push(
        `/auth?redirect=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/demo-access/${id}`,
        { withCredentials: true }
      );

      if (response.data.data) {
        const {
          demoLink,
          demoPassword,
          demoMeetingId,
          classTitle,
          approvalStatus,
        } = response.data.data;

        if (demoLink) {
          // Open demo link in new tab
          window.open(demoLink, "_blank");
          toast({
            title: "Live Class Access Granted",
            description: `Welcome to the live class: ${classTitle}`,
          });
        } else {
          toast({
            title: "Demo Not Available",
            description: "Demo access is not configured for this class yet.",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      console.error("Error accessing demo:", error);

      if (error.response?.status === 403) {
        toast({
          title: "Access Denied",
          description:
            error.response.data.message ||
            "You need to register first to access demo.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to access demo. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Format date and time properly
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Loader2 className="h-12 w-12 text-green-400" />
          </motion.div>
          <p className="mt-4 text-zinc-400">Loading class details...</p>
        </div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-red-500/20 rounded-2xl border border-red-500/30 mb-4">
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Class Not Found</h1>
          <p className="mb-8 text-zinc-400">
            The class you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.push("/live-classes")}
            className="bg-green-600 hover:bg-green-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Classes
          </Button>
        </div>
      </div>
    );
  }

  const buttonState = getButtonState();

  return (
    <div className="min-h-screen bg-black font-plus-jakarta-sans">
      {/* Hero Section with proper spacing */}
      <div className="relative bg-gradient-to-b from-zinc-900 via-black to-black overflow-hidden py-20 md:pt-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Classes
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Class Image */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl"
              >
                {classData.thumbnailUrl ? (
                  <Image
                    src={classData.thumbnailUrl}
                    alt={classData.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Video className="h-16 w-16 text-zinc-600" />
                  </div>
                )}

                {/* Live Badge */}
                {isOnClassroom && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-red-500/90 rounded-full shadow-lg"
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-bold">
                      LIVE NOW
                    </span>
                  </motion.div>
                )}

                {/* Status Badges */}
                {isAuthenticated && (
                  <>
                    {classData?.apiFlags?.hasAccessToLinks ||
                    classData.hasAccessToLinks ? (
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-600 text-white font-bold shadow-lg px-2 py-1 rounded-md flex items-center justify-center gap-2">
                          <Play className="h-3 w-3 mr-1" />
                          Access Granted
                        </span>
                      </div>
                    ) : classData?.apiFlags?.isRegistered ||
                      classData.isRegistered ? (
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-600 text-white font-bold shadow-lg px-2 py-1 rounded-md flex items-center justify-center gap-2">
                          <Star className="h-3 w-3 mr-1" />
                          Registered
                        </span>
                      </div>
                    ) : null}
                  </>
                )}
              </motion.div>
            </div>

            {/* Class Info */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {classData.title}
                </h1>
                <p className="text-xl text-zinc-300 leading-relaxed">
                  {classData.description || classData.sessionDescription}
                </p>
              </motion.div>

              {/* Class Details Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-zinc-900/80 to-black/80 rounded-xl border border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 font-medium">Date</p>
                    <p className="text-white font-semibold">
                      {formatDate(classData.startTime)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-zinc-900/80 to-black/80 rounded-xl border border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Clock className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 font-medium">Time</p>
                    <p className="text-white font-semibold">
                      {formatTime(classData.startTime)}
                    </p>
                  </div>
                </div>

                {classData.author && (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-zinc-900/80 to-black/80 rounded-xl border border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <User className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 font-medium">
                        Instructor
                      </p>
                      <p className="text-white font-semibold">
                        {classData.author}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-zinc-900/80 to-black/80 rounded-xl border border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <UsersIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 font-medium">
                      Registration Fee
                    </p>
                    <p className="text-white font-semibold">
                      ₹{classData.registrationFee}
                    </p>
                  </div>
                </div>

                {classData.focus && (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-zinc-900/80 to-black/80 rounded-xl border border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 font-medium">
                        Market Focus
                      </p>
                      <p className="text-white font-semibold">
                        {classData.focus}
                      </p>
                    </div>
                  </div>
                )}

                {classData.level && (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-zinc-900/80 to-black/80 rounded-xl border border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 font-medium">
                        Skill Level
                      </p>
                      <p className="text-white font-semibold">
                        {classData.level}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <Button
                  onClick={buttonState.action || undefined}
                  disabled={buttonState.disabled}
                  className={`w-full py-4 text-lg font-bold rounded-xl shadow-lg transition-all duration-300 ${buttonState.color}`}
                >
                  {buttonState.type === "join" && isJoining ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      {(buttonState.type === "join" ||
                        buttonState.type === "demo") && (
                        <Play className="h-5 w-5 mr-2" />
                      )}
                      {buttonState.type === "pay" && (
                        <CreditCard className="h-5 w-5 mr-2" />
                      )}
                      {buttonState.type === "register" && (
                        <UsersIcon className="h-5 w-5 mr-2" />
                      )}
                      {buttonState.text}
                    </>
                  )}
                </Button>

                {buttonState.message && (
                  <p className="text-sm text-zinc-400 text-center">
                    {buttonState.message}
                  </p>
                )}

                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-green-500/50"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Class
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-black py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Session Highlights */}
              {classData.sessionDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Info className="h-5 w-5 mr-2 text-blue-400" />
                        Session Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-300 leading-relaxed">
                        {classData.sessionDescription}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {classData && (
                <div className="container mx-auto px-4 pb-20">
                  <ReviewSection
                    zoomClassId={classData.id}
                    isRegistered={isRegistered}
                    hasAccess={hasAccessToLinks}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card - Only show if user hasn't paid or registered */}
              {(!isAuthenticated ||
                (!classData?.apiFlags?.hasAccessToLinks &&
                  !classData?.apiFlags?.isRegistered &&
                  !classData?.hasAccessToLinks &&
                  !classData?.isRegistered)) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-green-400" />
                        Pricing Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Registration Fee</span>
                        <span className="text-white font-semibold">
                          ₹{classData.registrationFee}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Course Fee</span>
                        <span className="text-white font-semibold">
                          ₹{classData.courseFee}
                        </span>
                      </div>
                      <div className="h-px bg-zinc-700"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400 font-medium">Total</span>
                        <span className="text-white font-bold text-lg">
                          ₹{classData.registrationFee + classData.courseFee}
                        </span>
                      </div>

                      {/* Action Button */}
                      <div className="pt-4">
                        <Button
                          onClick={buttonState?.action || (() => {})}
                          disabled={buttonState?.disabled}
                          className={`w-full ${
                            buttonState?.color || "bg-gray-500"
                          } transition-all duration-200`}
                        >
                          {buttonState?.text || "Loading..."}
                        </Button>

                        {/* Status Message */}
                        {buttonState?.message && (
                          <p className="text-sm text-zinc-400 mt-2 text-center">
                            {buttonState.message}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Status Card - Show when user has paid or registered */}
              {isAuthenticated &&
                (classData?.apiFlags?.hasAccessToLinks ||
                  classData?.apiFlags?.isRegistered ||
                  classData?.hasAccessToLinks ||
                  classData?.isRegistered) && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
                          Your Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {classData?.apiFlags?.hasAccessToLinks ||
                        classData?.hasAccessToLinks ? (
                          <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                            <div>
                              <p className="text-green-400 font-semibold">
                                Full Access Granted
                              </p>
                              <p className="text-zinc-400 text-sm">
                                You can join the live class
                              </p>
                            </div>
                          </div>
                        ) : classData?.apiFlags?.isRegistered ||
                          classData?.isRegistered ? (
                          <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <CheckCircle2 className="h-5 w-5 text-blue-400" />
                            <div>
                              <p className="text-blue-400 font-semibold">
                                Registration Complete
                              </p>
                              <p className="text-zinc-400 text-sm">
                                {classData?.apiFlags?.isApproved ||
                                classData?.isApproved
                                  ? "Approved - Ready to join"
                                  : "Waiting for approval"}
                              </p>
                            </div>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

              {/* Class Features */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Award className="h-5 w-5 mr-2 text-purple-400" />
                      What You'll Get
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <span className="text-zinc-300">
                        Live Interactive Session
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <span className="text-zinc-300">
                        Direct Q&A with Instructor
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <span className="text-zinc-300">
                        Recording Access (if available)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <span className="text-zinc-300">Course Materials</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Additional Info */}
              {(classData.currentRaga || classData.currentOrientation) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-yellow-400" />
                        Additional Info
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {classData.currentRaga && (
                        <div>
                          <p className="text-sm text-zinc-400">Market Focus</p>
                          <p className="text-white font-medium">
                            {classData.currentRaga}
                          </p>
                        </div>
                      )}
                      {classData.currentOrientation && (
                        <div>
                          <p className="text-sm text-zinc-400">Market Focus</p>
                          <p className="text-white font-medium">
                            {classData.currentOrientation}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section - Only show after course fee payment */}

      {/* Dialogs */}
      {showPurchaseDialog && (
        <PurchaseDialog
          classData={classData}
          onClose={() => setShowPurchaseDialog(false)}
          onSuccess={handlePurchaseComplete}
        />
      )}

      {showRegistrationDialog && (
        <RegistrationDialog
          classData={classData}
          onClose={() => setShowRegistrationDialog(false)}
          onSuccess={handleRegistrationComplete}
        />
      )}

      {showCourseAccessDialog && (
        <CourseAccessDialog
          classData={classData}
          onClose={() => setShowCourseAccessDialog(false)}
          onSuccess={handleCourseAccessComplete}
        />
      )}
    </div>
  );
}
