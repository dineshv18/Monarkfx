"use client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Styles
import "./styles.css";

// UI Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

// Icons
import {
  Calendar,
  Clock,
  ExternalLink,
  RefreshCw,
  User,
  VideoIcon,
  Loader2,
  CreditCard,
  Video,
  CheckCircle2,
  Play,
  Zap,
  Star,
  Users,
  BookOpen,
  AlertCircle,
} from "lucide-react";

// Types
interface ZoomSession {
  id: string;
  title: string;
  teacherName: string;
  startTime: string;
  endTime: string;
  formattedDate: string;
  formattedTime: string;
  thumbnailUrl: string | null;
  duration: number;
  zoomLink: string;
  hasModules: boolean;
  moduleName?: string;
  registrationFee: number;
  courseFee: number;
  currentRange?: string;
  currentOrientation?: string;
  courseFeeEnabled: boolean;
  isOnline?: boolean;
  registrationEnabled?: boolean;
}

interface Subscription {
  id: string;
  startDate: string;
  endDate: string;
  status:
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED"
    | "PENDING_APPROVAL"
    | "REGISTERED"
    | "REJECTED";
  isApproved: boolean;
  isRegistered: boolean;
  hasAccessToLinks: boolean;
  canJoinClass?: boolean;
  isOnClassroom?: boolean;
  lastPaymentDate: string;
  nextPaymentDate: string;
  zoomSession: ZoomSession;
  moduleId?: string;
  registrationPaymentId: string | null;
  apiFlags?: {
    canRegister?: boolean;
    showDemo?: boolean;
    showCourseFee?: boolean;
    showWaiting?: boolean;
    showClosed?: boolean;
    registrationEnabled?: boolean;
    isOnline?: boolean;
  };
}

const MyLiveClasses = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [coursePaymentInProgress, setCoursePaymentInProgress] = useState<
    string | null
  >(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [demoAccessLoading, setDemoAccessLoading] = useState<string | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        toast.error("Payment system failed to load. Please refresh the page.");
      };
      document.body.appendChild(script);
    };

    loadRazorpay();

    // Cleanup function
    return () => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/my-subscriptions`,
        { withCredentials: true }
      );

      const subscriptionsData = response.data.data;

      // For each subscription, get real-time status flags from check-subscription API
      const enrichedSubscriptions = await Promise.all(
        subscriptionsData.map(async (subscription: Subscription) => {
          try {
            const checkResponse = await axios.get(
              `${
                process.env.NEXT_PUBLIC_API_URL
              }/zoom-live-class/check-subscription/${
                subscription.zoomSession.id
              }${
                subscription.moduleId
                  ? `?moduleId=${subscription.moduleId}`
                  : ""
              }`,
              { withCredentials: true }
            );

            const apiFlags = checkResponse.data.data || {};

            return {
              ...subscription,
              // Update with real-time status
              isOnClassroom: apiFlags.isOnClassroom || false,
              canJoinClass: apiFlags.canJoinClass || false,
              hasAccessToLinks:
                apiFlags.hasAccessToLinks || subscription.hasAccessToLinks,
              isApproved:
                apiFlags.isApproved !== undefined
                  ? apiFlags.isApproved
                  : subscription.isApproved, // Store API flags for consistent button logic
              apiFlags: {
                canRegister: apiFlags.canRegister,
                showDemo: apiFlags.showDemo,
                showCourseFee: apiFlags.showCourseFee,
                showWaiting: apiFlags.showWaiting,
                showClosed: apiFlags.showClosed,
                registrationEnabled: apiFlags.registrationEnabled,
                isOnline: apiFlags.isOnline, // ADD: Include isOnline status
              },
            };
          } catch (error) {
            console.error(
              `Error fetching real-time status for subscription ${subscription.id}:`,
              error
            );
            // Return original subscription if API call fails
            return {
              ...subscription,
              apiFlags: {},
            };
          }
        })
      );

      setSubscriptions(enrichedSubscriptions);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Failed to load your live classes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchSubscriptions();
    setRefreshing(false);
  };

  const handleCancelIntent = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!selectedSubscription) return;

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/cancel-subscription/${selectedSubscription?.id}`,
        {},
        { withCredentials: true }
      );

      fetchSubscriptions();
      toast.success("Your subscription has been cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("Failed to cancel subscription. Please try again.");
    } finally {
      setCancelDialogOpen(false);
    }
  };

  const handleJoinClass = async (id?: string, moduleId?: string) => {
    try {
      setIsJoining(true);
      let queryParams = moduleId ? `?moduleId=${moduleId}` : "";

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/check-subscription/${id}${queryParams}`,
        { withCredentials: true }
      );

      if (
        response.data.data.hasAccessToLinks &&
        response.data.data.meetingDetails?.link
      ) {
        window.open(response.data.data.meetingDetails.link, "_blank");
      } else {
        toast.error(
          "Unable to join class. Please check your registration status."
        );
      }
    } catch (error) {
      console.error("Error joining class:", error);
      toast.error("Failed to join the class. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  const handlePayCourseAccess = async (subscription: Subscription) => {
    try {
      setCoursePaymentInProgress(subscription.id);

      // Check if course fee payment is already done
      if (subscription.hasAccessToLinks) {
        toast.info("You have already paid the course fee");
        return;
      }

      // Ensure Razorpay is loaded
      if (!razorpayLoaded || typeof window.Razorpay === "undefined") {
        toast.error(
          "Payment gateway not loaded. Please refresh the page and try again."
        );
        return;
      }

      // Create course access payment
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/pay-course-access`,
        {
          zoomLiveClassId: subscription.zoomSession.id,
        },
        { withCredentials: true }
      );

      // If user already has access
      if (response.data.data.alreadyHasAccess) {
        toast.success("You already have access to this class");
        fetchSubscriptions();
        return;
      }

      // Get Razorpay Key from server
      const keyResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/getpublickey`
      );
      const key = keyResponse.data.key;

      const options = {
        key: key,
        amount: response.data.data.amount,
        currency: response.data.data.currency,
        name: "MonarkFX",
        description: `Course Access Payment - ${subscription.zoomSession.title}`,
        order_id: response.data.data.orderId,
        handler: async function (response: any) {
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/verify-course-access`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                zoomLiveClassId: subscription.zoomSession.id,
              },
              { withCredentials: true }
            );

            toast.success(
              "Payment successful! You now have access to the class."
            );
            fetchSubscriptions();
          } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Student",
          email: "student@example.com",
        },
        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Error initiating course access payment:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to initiate payment. Please try again."
      );
    } finally {
      setCoursePaymentInProgress(null);
    }
  };

  const handleReRegister = async (subscription: Subscription) => {
    try {
      router.push(
        `/live-classes/${subscription.zoomSession.id}?reregister=true`
      );
    } catch (error) {
      console.error("Error redirecting to re-registration:", error);
      toast.error("Failed to redirect to registration page.");
    }
  };

  const handleDemoAccess = async (subscription: Subscription) => {
    try {
      setDemoAccessLoading(subscription.id);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/demo-access/${subscription.zoomSession.id}`,
        { withCredentials: true }
      );

      if (response.data.data) {
        const demoData = response.data.data; // Check if demo is configured and available
        if (demoData.isDemoConfigured && demoData.demoLink) {
          // Show demo access details in toast and open demo link
          toast.success(
            `Live class access granted! Meeting ID: ${demoData.demoMeetingId}`
          );

          // Open demo link in new tab
          window.open(demoData.demoLink, "_blank");

          // Also redirect to class page with demo flag for additional demo content
          router.push(`/live-classes/${subscription.zoomSession.id}?demo=true`);
        } else {
          toast.info(
            "Live class content will be available soon for this class."
          );
        }
      }
    } catch (error: any) {
      console.error("Error accessing live class:", error);

      if (error.response?.status === 403) {
        toast.error(
          "You need to register for this class to access live class content."
        );
      } else {
        toast.error("Failed to access live class content. Please try again.");
      }
    } finally {
      setDemoAccessLoading(null);
    }
  };

  const isUpcoming = (startTime: string) => {
    return new Date(startTime) > new Date();
  };

  const getStatusBadge = (subscription: any) => {
    // Use the same logic as button state for consistency with API flags
    const apiFlags = subscription.apiFlags || {};
    const showDemo = apiFlags.showDemo || false;
    const showCourseFee = apiFlags.showCourseFee || false;
    const showWaiting = apiFlags.showWaiting || false;
    const showClosed = apiFlags.showClosed || false;

    if (subscription.status === "CANCELLED") {
      return {
        text: "Cancelled",
        className: "bg-zinc-600 text-white border-zinc-500",
      };
    }

    if (subscription.status === "REJECTED") {
      return {
        text: "Rejected",
        className: "bg-red-600 text-white border-red-500",
      };
    }

    // If can join class (highest priority)
    if (subscription.canJoinClass) {
      return {
        text: "🔴 LIVE - Ready to Join",
        className: "bg-green-600 text-white border-green-500 animate-pulse",
      };
    }

    // If has access but waiting for class to start
    if (subscription.hasAccessToLinks && !subscription.isOnClassroom) {
      return {
        text: "Full Access",
        className: "bg-green-600 text-white border-green-500",
      };
    }

    // If API says show course fee
    if (showCourseFee) {
      return {
        text: "Approved - Pay Course Fee",
        className: "bg-blue-600 text-white border-blue-500",
      };
    }

    // If API says show waiting
    if (showWaiting) {
      return {
        text: "Waiting for Class",
        className: "bg-zinc-600 text-white border-zinc-500",
      };
    }

    // If registered and demo available
    if (subscription.isRegistered && showDemo) {
      return {
        text: "Live Class Available",
        className: "bg-purple-600 text-white border-purple-500",
      };
    }

    // If registered but waiting for approval
    if (subscription.isRegistered && !subscription.isApproved) {
      return {
        text: "Processing",
        className: "bg-yellow-600 text-white border-yellow-500",
      };
    }

    // If registration is closed
    if (showClosed || subscription.zoomSession.registrationEnabled === false) {
      return {
        text: "Registration Closed",
        className: "bg-zinc-600 text-white border-zinc-500",
      };
    }

    // Fallback to old logic for edge cases
    if (subscription.hasAccessToLinks) {
      return {
        text: "Full Access",
        className: "bg-green-600 text-white border-green-500",
      };
    }

    if (
      subscription.isRegistered &&
      subscription.isApproved &&
      subscription.zoomSession.courseFeeEnabled
    ) {
      return {
        text: "Approved - Pay Course Fee",
        className: "bg-blue-600 text-white border-blue-500",
      };
    }

    if (
      subscription.isRegistered &&
      subscription.isApproved &&
      !subscription.zoomSession.courseFeeEnabled
    ) {
      return {
        text: "Ready to Join",
        className: "bg-green-600 text-white border-green-500",
      };
    }

    return {
      text: "Unknown Status",
      className: "bg-zinc-500 text-white border-zinc-400",
    };
  };

  const getButtonState = (subscription: Subscription) => {
    // Use API response flags if available, otherwise fall back to subscription data
    const apiFlags = subscription.apiFlags || {};
    const showDemo = apiFlags.showDemo || false;
    const canRegister = apiFlags.canRegister !== false; // Default to true if not specified
    const showCourseFee = apiFlags.showCourseFee || false;
    const showWaiting = apiFlags.showWaiting || false;
    const showClosed = apiFlags.showClosed || false;
    const isOnline =
      subscription.zoomSession.isOnline ||
      subscription.apiFlags?.isOnline ||
      subscription.isOnClassroom ||
      false;
    const registrationEnabled =
      subscription.zoomSession.registrationEnabled !== false;
    const courseFeeEnabled = subscription.zoomSession.courseFeeEnabled || false;

    // FIRST PRIORITY: If user has full access and class is live
    if (subscription.hasAccessToLinks && isOnline) {
      return {
        type: "join",
        text: isJoining ? "Joining..." : "Join Live Class",
        color:
          "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl",
        disabled: isJoining,
        action: () =>
          handleJoinClass(subscription.zoomSession.id, subscription.moduleId),
        showDemo: false, // Hide demo when can join
        message: "Full access to live class",
      };
    }

    // SECOND PRIORITY: If user has full access but class is offline
    if (subscription.hasAccessToLinks && !isOnline) {
      return {
        type: "waiting-admin",
        text: "Waiting for Admin to Start Class",
        color: "bg-amber-600 text-white cursor-not-allowed",
        disabled: true,
        action: null,
        showDemo: false,
        message: "You have full access - Class will start when admin goes live",
      };
    }

    // THIRD PRIORITY: If admin approved registration but course fee needs to be paid
    if (showCourseFee && subscription.isApproved && courseFeeEnabled) {
      return {
        type: "pay",
        text:
          coursePaymentInProgress === subscription.id
            ? "Processing..."
            : `Pay Course Fee - ₹${subscription.zoomSession.courseFee || 0}`,
        color:
          "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg hover:shadow-xl",
        disabled: coursePaymentInProgress === subscription.id,
        action: () => handlePayCourseAccess(subscription),
        showDemo: false, // Hide demo when course fee is pending
        message: "Registration approved! Pay to get full access",
      };
    }

    // FOURTH PRIORITY: If user is registered and approved, and no course fee required
    if (
      subscription.isRegistered &&
      subscription.isApproved &&
      !courseFeeEnabled
    ) {
      if (isOnline) {
        return {
          type: "demo",
          text: "Join Live Class (Demo Access)",
          color:
            "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
          disabled: false,
          action: () => handleDemoAccess(subscription),
          showDemo: true,
          message: "Demo access to live class",
        };
      } else {
        return {
          type: "waiting-demo",
          text: "Demo Access Ready - Waiting for Class",
          color: "bg-blue-500 cursor-not-allowed text-white",
          disabled: true,
          action: null,
          showDemo: false,
          message: "Demo access ready - Class will start when admin goes live",
        };
      }
    }

    // FIFTH PRIORITY: If user is registered but waiting for approval
    if (
      subscription.isRegistered &&
      !subscription.isApproved &&
      subscription.status === "PENDING_APPROVAL"
    ) {
      return {
        type: "pending-approval",
        text: "Waiting for Admin Approval",
        color: "bg-yellow-600 cursor-not-allowed text-white",
        disabled: true,
        action: null,
        showDemo: false,
        message: "Registration complete! Waiting for admin approval",
      };
    }

    // SIXTH PRIORITY: If subscription is cancelled
    if (subscription.status === "CANCELLED") {
      return {
        type: "cancelled",
        text: "Re-Register for Class",
        color:
          "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl",
        disabled: false,
        action: () => handleReRegister(subscription),
        showDemo: false,
        message: "Re-register to access this class",
      };
    }

    // SEVENTH PRIORITY: If subscription is rejected
    if (subscription.status === "REJECTED") {
      return {
        type: "rejected",
        text: "Registration Rejected - Re-Register",
        color:
          "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-600 text-white shadow-lg hover:shadow-xl",
        disabled: false,
        action: () => handleReRegister(subscription),
        showDemo: false,
        message: "Your registration was rejected. You can try again.",
      };
    }

    // EIGHTH PRIORITY: If registration is disabled
    if (!registrationEnabled || showClosed) {
      return {
        type: "closed",
        text: "Registration Closed",
        color: "bg-gray-500 cursor-not-allowed text-white",
        disabled: true,
        action: null,
        showDemo: false,
        message: "Registration for this class is closed",
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
        showDemo: false,
        message: "This class is not currently available",
      };
    }

    // Default fallback
    return {
      type: "unavailable",
      text: "Not Available",
      color: "bg-gray-400 cursor-not-allowed text-gray-600",
      disabled: true,
      action: null,
      showDemo: false,
      message: "This class is currently not available",
    };
  };

  const defaultThumbnail = "https://placehold.co/600x400?text=No+Image";

  // Filter upcoming classes
  const upcomingClasses = subscriptions.filter((sub) =>
    isUpcoming(sub.zoomSession.startTime)
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <VideoIcon className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">My Live Classes</h2>
              <p className="text-zinc-400 text-sm">
                Manage your live learning sessions
              </p>
            </div>
          </div>
          <Skeleton className="h-10 w-24 bg-zinc-800" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-80 w-full bg-zinc-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
            <VideoIcon className="h-8 w-8 text-green-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">
              My Live Classes
            </h2>
            <p className="text-zinc-400">
              Manage your live learning sessions and track progress
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 bg-zinc-900/50 border-zinc-700 text-white hover:bg-zinc-800 hover:border-green-500/50 transition-all duration-300"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-800 hover:border-green-500/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <BookOpen className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm font-medium">
                  Total Classes
                </p>
                <p className="text-2xl font-bold text-white">
                  {subscriptions.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-800 hover:border-green-500/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Play className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm font-medium">Upcoming</p>
                <p className="text-2xl font-bold text-white">
                  {upcomingClasses.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-800 hover:border-green-500/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm font-medium">
                  Active Sessions
                </p>
                <p className="text-2xl font-bold text-white">
                  {subscriptions.filter((sub) => sub.canJoinClass).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {subscriptions.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-2 border-zinc-700 bg-gradient-to-br from-zinc-900/50 to-black/50">
          <div className="max-w-md mx-auto">
            <div className="p-6 bg-zinc-800/50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <VideoIcon className="h-12 w-12 text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              No Live Classes Yet
            </h3>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              You haven't subscribed to any live classes. Join a class to start
              learning from our expert instructors and enhance your skills.
            </p>
            <Button
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
              onClick={() => router.push("/live-classes")}
            >
              <Zap className="h-5 w-5 mr-2" />
              Browse Live Classes
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((subscription) => (
            <Card
              key={subscription.id}
              className="group overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-800 hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500"
            >
              {/* Thumbnail Section */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={
                    subscription.zoomSession.thumbnailUrl?.includes(
                      "cloudinary.com"
                    )
                      ? subscription.zoomSession.thumbnailUrl
                      : subscription.zoomSession.thumbnailUrl
                      ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/monarkfx/zoom-thumbnails/${subscription.zoomSession.thumbnailUrl}`
                      : defaultThumbnail
                  }
                  alt={subscription.zoomSession.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Status Badges */}
                <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                  {subscription.isOnClassroom && (
                    <Badge className="bg-red-600 text-white px-3 py-1 text-xs font-bold animate-pulse shadow-lg border-0">
                      🔴 LIVE
                    </Badge>
                  )}
                  {(() => {
                    const status = getStatusBadge(subscription);
                    return (
                      <Badge
                        className={`px-3 py-1.5 text-sm font-bold shadow-lg border ${status.className}`}
                      >
                        {status.text}
                      </Badge>
                    );
                  })()}
                </div>

                {/* Class Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white line-clamp-2 mb-2">
                    {subscription.zoomSession.title}
                  </h3>
                  {subscription.zoomSession.moduleName && (
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>Module: {subscription.zoomSession.moduleName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-6 space-y-4">
                {/* Instructor Info */}
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <User className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-medium">
                      Instructor
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {subscription.zoomSession.teacherName}
                    </p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Calendar className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-medium">
                      Schedule
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {subscription.zoomSession.formattedDate}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {subscription.zoomSession.formattedTime}
                    </p>
                  </div>
                </div>

                {/* Status Messages */}
                {subscription.isRegistered &&
                  subscription.isApproved &&
                  subscription.zoomSession.courseFeeEnabled &&
                  !subscription.hasAccessToLinks && (
                    <div className="flex items-center gap-3 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <CreditCard className="h-4 w-4 text-blue-400" />
                      <div>
                        <p className="text-sm font-semibold text-blue-200">
                          Admin approved! Pay course fee to access class links
                        </p>
                      </div>
                    </div>
                  )}

                {subscription.isRegistered &&
                  subscription.isApproved &&
                  !subscription.zoomSession.courseFeeEnabled &&
                  subscription.hasAccessToLinks &&
                  !subscription.isOnClassroom && (
                    <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <div>
                        <p className="text-sm font-semibold text-green-200">
                          Approved! Waiting for admin to start the live class
                        </p>
                      </div>
                    </div>
                  )}

                {subscription.status === "REJECTED" && (
                  <div className="flex items-center gap-3 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <div>
                      <p className="text-sm font-semibold text-red-200">
                        Registration was rejected. You can re-register for this
                        class.
                      </p>
                    </div>
                  </div>
                )}

                {subscription.status === "CANCELLED" && (
                  <div className="flex items-center gap-3 p-3 bg-zinc-500/20 rounded-lg border border-zinc-500/30">
                    <AlertCircle className="h-4 w-4 text-zinc-400" />
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">
                        Subscription was cancelled. You can re-register if
                        needed.
                      </p>
                    </div>
                  </div>
                )}

                {subscription.zoomSession.currentRange && (
                  <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Zap className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 font-medium">Range</p>
                      <p className="text-sm font-semibold text-white">
                        {subscription.zoomSession.currentRange}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  {(() => {
                    const buttonState = getButtonState(subscription);
                    return (
                      <div className="space-y-3">
                        <div className="flex gap-2 w-full">
                          <Button
                            onClick={buttonState.action || undefined}
                            disabled={buttonState.disabled}
                            className={`flex-1 py-3 transition-all duration-300 ${buttonState.color}`}
                          >
                            {buttonState.type === "join" && isJoining ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : buttonState.type === "join" ||
                              buttonState.type === "demo" ? (
                              <Video className="h-4 w-4 mr-2" />
                            ) : buttonState.type === "pay" ? (
                              <CreditCard className="h-4 w-4 mr-2" />
                            ) : null}
                            {buttonState.text}
                          </Button>

                          {/* Cancel button */}
                          {subscription.status !== "CANCELLED" &&
                            subscription.status !== "REJECTED" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="px-4 py-3 text-sm bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/50 transition-all duration-300 flex-shrink-0"
                                onClick={() => handleCancelIntent(subscription)}
                              >
                                Cancel
                              </Button>
                            )}
                        </div>

                        {/* Offline Message for Demo Button */}
                        {buttonState.message && (
                          <div className="text-sm text-zinc-400 text-center px-3 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                            {buttonState.message}
                          </div>
                        )}

                        {/* View Details Button */}
                        <Button
                          variant="ghost"
                          onClick={() =>
                            router.push(
                              `/live-classes/${subscription.zoomSession.id}`
                            )
                          }
                          className="w-full py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-700/50 hover:border-green-500/30"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Class Details
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Cancel Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-700 rounded-xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-white">
              Cancel Subscription
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400 mt-2">
              Are you sure you want to cancel your subscription to this class?
              You will no longer have access to join it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 transition-colors">
              Keep Subscription
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default MyLiveClasses;
