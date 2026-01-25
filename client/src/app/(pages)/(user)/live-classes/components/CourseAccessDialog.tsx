"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Clock, Video, Lock, Check } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";

// Add TypeScript declarations after imports
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CourseAccessDialogProps {
  classData: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CourseAccessDialog({
  classData,
  onClose,
  onSuccess,
}: CourseAccessDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      toast.error("Payment system failed to load. Please refresh the page.");
    };
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  const initiateCourseAccess = async () => {
    try {
      setIsLoading(true);

      // Ensure Razorpay is loaded
      if (typeof window.Razorpay === "undefined") {
        toast.error(
          "Payment gateway not loaded. Please refresh the page and try again."
        );
        return;
      }

      // Create course access payment
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/pay-course-access`,
        {
          zoomLiveClassId: classData.id,
        },
        { withCredentials: true }
      );

      // If user already has access
      if (response.data.data.alreadyHasAccess) {
        toast.info("You already have access to this class");
        onSuccess();
        return;
      }

      const order = response.data.data.order;

      // Get Razorpay Key from server
      const keyResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/getpublickey`
      );
      const key = keyResponse.data.key;

      // Initialize Razorpay
      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "Monark FX",
        description: `Course Access for: ${classData.title}`,
        order_id: order.id,
        image: "/logo-light.png",
        handler: async function (response: any) {
          try {
            setIsProcessing(true);

            // Verify payment
            const verifyResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/verify-course-access`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                zoomLiveClassId: classData.id,
              },
              { withCredentials: true }
            );

            toast.success(
              "Payment successful! You now have access to the class links."
            );
            onSuccess();
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error(
              "We couldn't verify your payment. Please try again or contact support."
            );
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#d60606",
        },
      };

      // Create and open Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description}`);
      });
      razorpay.open();
    } catch (error: any) {
      console.error("Course access payment initiation failed:", error);
      toast.error(
        error.response?.data?.message ||
        "Unable to initiate payment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const defaultThumbnail = "/images/default-class-thumbnail.jpg";

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-[95vw] bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle className="text-2xl font-bold text-white">
              Access Class Links
            </DialogTitle>
            <DialogDescription className="text-zinc-400 mt-1">
              Complete your payment to unlock access to the class
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <motion.div
          className="py-3 space-y-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div
            variants={item}
            className="relative h-40 w-full overflow-hidden rounded-lg"
          >
            <Image
              src={classData.thumbnailUrl || defaultThumbnail}
              alt={classData.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Check size={12} />
              Registered
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-zinc-800/50 to-zinc-700/50 p-4 rounded-lg border border-zinc-600"
            variants={item}
          >
            <h3 className="font-bold text-xl text-white">{classData.title}</h3>
            <p className="text-zinc-300 mt-1">{classData.description}</p>
          </motion.div>

          <motion.div className="space-y-3" variants={item}>
            <div className="flex items-center text-zinc-300">
              <Calendar className="mr-3 h-5 w-5 text-green-400" />
              <span className="font-medium">
                {formatDate(classData.startTime)}
              </span>
            </div>
            <div className="flex items-center text-zinc-300">
              <Clock className="mr-3 h-5 w-5 text-green-400" />
              <span className="font-medium">
                {formatTime(classData.startTime)}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-green-600/20 p-4 rounded-lg flex justify-between items-center border border-green-500/30"
            variants={item}
          >
            <span className="text-zinc-300 font-medium">Course Fee</span>
            <span className="text-2xl font-bold text-green-400">
              ₹{classData.courseFee}
            </span>
          </motion.div>

          <motion.div
            className="space-y-3 p-4 bg-blue-600/20 rounded-lg border border-blue-500/30"
            variants={item}
          >
            <h4 className="font-semibold text-blue-300">What you'll get:</h4>
            <div className="flex items-start gap-2">
              <Video className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Access to Live Class</p>
                <p className="text-zinc-300 text-sm">
                  Join the class via Zoom with instructor interaction
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Lock className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Secure Zoom Details</p>
                <p className="text-zinc-300 text-sm">
                  Receive meeting ID, password, and direct join link
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-sm p-3 bg-amber-600/20 border border-amber-500/30 rounded-lg text-amber-300"
            variants={item}
          >
            After payment, you'll immediately receive access to the class links.
          </motion.div>
        </motion.div>

        <DialogFooter className="gap-2 sm:gap-0 flex-col sm:flex-row">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto rounded-lg border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Cancel
          </Button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={initiateCourseAccess}
              disabled={isLoading || isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ₹${classData.courseFee}`
              )}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
