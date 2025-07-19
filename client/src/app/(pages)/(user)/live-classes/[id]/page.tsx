"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
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
  Copy,
  CreditCard,
  Book,
  AlertCircle,
  Play,
  Users as UsersIcon,
  Star,
  MapPin,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/helper/AuthContext";
import PurchaseDialog from "../components/PurchaseDialog";
import RegistrationDialog from "../components/RegistrationDialog";
import CourseAccessDialog from "../components/CourseAccessDialog";

import ReviewSection from "../components/ReviewSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    const apiFlags = classData?.apiFlags || {};

    const userIsRegistered =
      isRegistered ||
      (classData && classData.isRegistered) ||
      apiFlags.isRegistered;

    const userHasAccess =
      hasAccessToLinks ||
      (classData && classData.hasAccessToLinks) ||
      apiFlags.hasAccessToLinks;

    const userIsApproved =
      (classData && classData.isApproved) || apiFlags.isApproved;

    return { userIsRegistered, userHasAccess, userIsApproved };
  };

  const getButtonState = () => {
    const { userIsRegistered, userHasAccess, userIsApproved } =
      determineUserStatus();

    const apiFlags = classData?.apiFlags || {};
    const showDemo = apiFlags.showDemo || false;
    const canRegister = apiFlags.canRegister !== false;
    const showCourseFee = apiFlags.showCourseFee || false;
    const showWaiting = apiFlags.showWaiting || false;
    const showClosed = apiFlags.showClosed || false;

    // Check if user is registered and approved but needs to pay course fee
    if (userIsRegistered && userIsApproved && !userHasAccess && showCourseFee) {
      return {
        type: "pay",
        text: "Pay Course Fee",
        color:
          "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white",
        disabled: false,
        action: () => setShowCourseAccessDialog(true),
      };
    }

    if (showCourseFee) {
      return {
        type: "pay",
        text: "Pay Course Fee",
        color:
          "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white",
        disabled: false,
        action: () => setShowCourseAccessDialog(true),
      };
    }

    if (canJoinClass) {
      return {
        type: "join",
        text: isJoining ? "Joining..." : "Join Live Class",
        color: "bg-green-600 hover:bg-green-700 text-white",
        disabled: isJoining,
        action: () => handleJoinClass(),
      };
    }

    if (userIsRegistered && showDemo) {
      const isOnline =
        classData?.apiFlags?.isOnline || classData?.isOnClassroom || false;

      return {
        type: "demo",
        text: "Join Live Class",
        color: isOnline
          ? "bg-green-600 hover:bg-green-700 text-white"
          : "bg-gray-600 cursor-not-allowed text-gray-300",
        disabled: !isOnline,
        action: isOnline ? () => handleDemoAccess() : null,
        message: isOnline
          ? undefined
          : "This button will become active once your class session begins.",
      };
    }

    if (userHasAccess && !isOnClassroom) {
      return {
        type: "waiting-live",
        text: "Waiting for Class to Start",
        color: "bg-gray-600 cursor-not-allowed text-white",
        disabled: true,
        action: null,
      };
    }

    if (showWaiting) {
      return {
        type: "waiting-live",
        text: "Waiting for Class to Start",
        color: "bg-gray-600 cursor-not-allowed text-white",
        disabled: true,
        action: null,
      };
    }

    if (userIsRegistered && !userIsApproved) {
      return {
        type: "waiting",
        text: "Please wait",
        color: "bg-gray-600 cursor-not-allowed text-white",
        disabled: true,
        action: null,
      };
    }

    const registrationOpen = classData?.registrationEnabled !== false;

    if (canRegister && registrationOpen) {
      return {
        type: "register",
        text: "Register for Class",
        color:
          "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white",
        disabled: false,
        action: () => {
          if (!isAuthenticated) {
            const currentUrl = window.location.pathname;
            const authUrl = `/auth?live-class-id=${id}&redirect=${encodeURIComponent(
              currentUrl
            )}`;
            router.push(authUrl);
            return;
          }
          setShowRegistrationDialog(true);
        },
      };
    }

    if (!registrationOpen || showClosed) {
      return {
        type: "disabled",
        text: "Registration Closed",
        color: "bg-gray-600 cursor-not-allowed text-white",
        disabled: true,
        action: null,
      };
    }

    return {
      type: "disabled",
      text: "Not Available",
      color: "bg-gray-600 cursor-not-allowed text-gray-300",
      disabled: true,
      action: null,
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
      setTimeout(() => router.push("/live-classes"), 3000);
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

      const {
        isRegistered,
        isApproved,
        showCourseFee,
        hasAccessToLinks,
        canJoinClass,
        isOnClassroom,
      } = response.data.data;
      setIsRegistered(isRegistered);

      // Update classData with API flags
      setClassData((prev: any) =>
        prev
          ? {
              ...prev,
              apiFlags: {
                ...prev.apiFlags,
                isRegistered,
                isApproved,
                showCourseFee,
                hasAccessToLinks,
                canJoinClass,
                isOnClassroom,
              },
            }
          : prev
      );

      setApiChecksCompleted((prev) => ({ ...prev, checkSubscription: true }));
    } catch (error) {
      console.error("Error checking subscription status:", error);
      setApiChecksCompleted((prev) => ({ ...prev, checkSubscription: true }));
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/check-subscription/${id}`,
        { withCredentials: true }
      );

      const { hasAccessToLinks, canJoinClass, isOnClassroom, showCourseFee } =
        response.data.data;
      setHasAccessToLinks(hasAccessToLinks);
      setCanJoinClass(canJoinClass);
      setIsOnClassroom(isOnClassroom);

      // Update classData with payment status flags
      setClassData((prev: any) =>
        prev
          ? {
              ...prev,
              apiFlags: {
                ...prev.apiFlags,
                hasAccessToLinks,
                canJoinClass,
                isOnClassroom,
                showCourseFee,
              },
            }
          : prev
      );

      setApiChecksCompleted((prev) => ({ ...prev, checkPaymentStatus: true }));
    } catch (error) {
      console.error("Error checking payment status:", error);
      setApiChecksCompleted((prev) => ({ ...prev, checkPaymentStatus: true }));
    }
  };

  const handleJoinClass = async (id?: string, isModule: boolean = false) => {
    const classId = id || classData?.id;
    if (!classId) return;

    setIsJoining(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/check-subscription/${classId}`,
        { withCredentials: true }
      );

      const { meetingDetails } = response.data.data;
      if (meetingDetails?.link) {
        window.open(meetingDetails.link, "_blank");
        toast({
          title: "Success",
          description: "Opening live class in a new tab...",
        });
      } else {
        toast({
          title: "Error",
          description: "No join URL available",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error joining class:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to join class",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handlePurchaseComplete = () => {
    setShowPurchaseDialog(false);
    checkPaymentStatus();
    toast({
      title: "Success",
      description: "Purchase completed successfully!",
    });
  };

  const handleRegistrationComplete = () => {
    setShowRegistrationDialog(false);
    checkSubscriptionStatus();
    toast({
      title: "Success",
      description: "Registration completed successfully!",
    });
  };

  const handleCourseAccessComplete = () => {
    setShowCourseAccessDialog(false);
    checkPaymentStatus();
    toast({
      title: "Success",
      description: "Course fee payment completed!",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: classData?.title || "Live Class",
        text: classData?.description || "Check out this live class!",
        url: window.location.href,
      });
    } catch (error) {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Class link has been copied to clipboard",
      });
    }
  };

  const handleDemoAccess = async () => {
    if (!classData?.id) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/demo-access/${classData.id}`,
        { withCredentials: true }
      );

      const { joinUrl } = response.data.data;
      if (joinUrl) {
        window.open(joinUrl, "_blank");
        toast({
          title: "Success",
          description: "Opening demo class in a new tab...",
        });
      }
    } catch (error: any) {
      console.error("Error accessing demo:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to access demo",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Loading Class Details
            </h2>
            <p className="text-zinc-400">
              Please wait while we fetch the class information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Class Not Found
            </h2>
            <p className="text-zinc-400 mb-4">
              The class you're looking for doesn't exist or has been removed.
            </p>
            <Button
              onClick={() => router.push("/live-classes")}
              className="bg-green-600 hover:bg-green-700"
            >
              Back to Live Classes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const buttonState = getButtonState();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="p-0 h-auto text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Classes
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Class Image */}
            <div className="lg:col-span-1">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                {classData.thumbnailUrl ? (
                  <Image
                    src={classData.thumbnailUrl}
                    alt={classData.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Video className="h-16 w-16 text-zinc-600" />
                  </div>
                )}
                {isOnClassroom && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-500/90 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">
                      LIVE NOW
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Class Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {classData.title}
                </h1>
                <p className="text-zinc-400 text-lg">{classData.description}</p>
              </div>

              {/* Class Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-zinc-400">Date</p>
                    <p className="text-white font-medium">
                      {formatDate(classData.startTime)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                  <Clock className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-zinc-400">Time</p>
                    <p className="text-white font-medium">
                      {formatTime(classData.startTime)}
                    </p>
                  </div>
                </div>

                {classData.author && (
                  <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    <User className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-sm text-zinc-400">Instructor</p>
                      <p className="text-white font-medium">
                        {classData.author}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                  <UsersIcon className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-sm text-zinc-400">Registration Fee</p>
                    <p className="text-white font-medium">
                      ₹{classData.registrationFee}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-4">
                <Button
                  onClick={buttonState.action || undefined}
                  disabled={buttonState.disabled}
                  className={`w-full py-4 text-lg font-semibold ${buttonState.color}`}
                >
                  {buttonState.type === "join" && isJoining ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      {buttonState.type === "join" && (
                        <Play className="h-5 w-5 mr-2" />
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
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Session Description */}
            {classData.sessionDescription && (
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
            )}

            {/* Reviews */}
            <ReviewSection zoomClassId={id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-green-400" />
                  Pricing
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
                  <span className="text-zinc-400">Total</span>
                  <span className="text-white font-bold text-lg">
                    ₹{classData.registrationFee + classData.courseFee}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Class Features */}
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Book className="h-5 w-5 mr-2 text-purple-400" />
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

            {/* Additional Info */}
            {(classData.currentRaga || classData.currentOrientation) && (
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
                      <p className="text-sm text-zinc-400">Current Raga</p>
                      <p className="text-white font-medium">
                        {classData.currentRaga}
                      </p>
                    </div>
                  )}
                  {classData.currentOrientation && (
                    <div>
                      <p className="text-sm text-zinc-400">Orientation</p>
                      <p className="text-white font-medium">
                        {classData.currentOrientation}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

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
