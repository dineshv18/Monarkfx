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
import {
  Loader2,
  Calendar,
  Clock,
  User,
  Check,
  IndianRupee,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Add TypeScript declarations after imports
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Module {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  isFree: boolean;
}

export default function PurchaseDialog({
  classData,
  onClose,
  onSuccess,
}: {
  classData: any;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const { toast } = useToast();

  // Set default selected module on component mount
  useEffect(() => {
    if (
      classData &&
      classData.hasModules &&
      classData.modules &&
      classData.modules.length > 0
    ) {
      // Set the first module as default selected
      setSelectedModuleId(classData.modules[0].id);
    }
  }, [classData]);

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
      toast({
        title: "Error",
        description: "Payment system failed to load. Please refresh the page.",
        variant: "destructive",
      });
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

  const initiatePayment = async () => {
    try {
      setIsLoading(true);

      // Ensure Razorpay is loaded
      if (typeof window.Razorpay === "undefined") {
        toast({
          title: "Error",
          description:
            "Payment gateway not loaded. Please refresh the page and try again.",
          variant: "destructive",
        });
        return;
      }

      // Check if it's a free module - if so, we can directly join without payment
      if (selectedModuleId && classData.modules) {
        const selectedModule = classData.modules.find(
          (m: Module) => m.id === selectedModuleId
        );
        if (selectedModule && selectedModule.isFree) {
          // For free modules, we check subscription which will auto-create if needed
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/check-subscription/${classData.id}?moduleId=${selectedModuleId}`,
            { withCredentials: true }
          );

          console.log("Free module check response:", response.data);

          if (response.data.data.isSubscribed) {
            toast({
              title: "Success",
              description: "You now have access to this free module.",
            });
            onSuccess();
            return;
          }
        }
      }

      // Create registration order
      const orderResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/register`,
        {
          zoomLiveClassId: classData.id,
          moduleId: selectedModuleId,
        },
        { withCredentials: true }
      );

      console.log("Registration order created:", orderResponse.data);

      const order = orderResponse.data.data.order;
      const zoomLiveClass = orderResponse.data.data.zoomLiveClass;
      const alreadyRegistered = orderResponse.data.data.alreadyRegistered;

      // If user is already registered, show success and return
      if (alreadyRegistered) {
        toast({
          title: "Already Registered",
          description: "You are already registered for this class.",
        });
        onSuccess();
        return;
      }

      // Get Razorpay Key from server
      const keyResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/getpublickey`
      );
      const key = keyResponse.data.key;

      console.log("Payment key received:", key);

      // Initialize Razorpay
      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "Monark FX",
        description: `Purchase: ${zoomLiveClass.title}${
          selectedModuleId ? ` - Module` : ""
        }`,
        order_id: order.id,
        image: "/logo.png",
        handler: async function (response: any) {
          try {
            console.log("Payment successful, verifying:", response);

            // Verify payment
            const verifyResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/verify-registration`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                zoomLiveClassId: classData.id,
                moduleId: selectedModuleId,
              },
              { withCredentials: true }
            );

            console.log("Payment verification response:", verifyResponse.data);
            const resultData = verifyResponse.data.data;

            // Show appropriate message based on approval status
            if (resultData.isModuleFree) {
              toast({
                title: "Success",
                description: "You now have access to this free module.",
              });
            } else if (
              resultData.message &&
              resultData.message.includes("approval")
            ) {
              toast({
                title: "Payment Successful",
                description:
                  "Your payment was successful. The administrator will approve your access shortly.",
              });
            } else {
              toast({
                title: "Success",
                description:
                  "Payment successful! You now have access to this class.",
              });
            }

            onSuccess();
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast({
              title: "Payment Failed",
              description:
                "We couldn't verify your payment. Please try again or contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#10B981",
        },
      };

      // Create and open Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        toast({
          title: "Payment Failed",
          description:
            response.error.description ||
            "Your payment attempt failed. Please try again.",
          variant: "destructive",
        });
      });
      razorpay.open();
    } catch (error: any) {
      console.error("Payment initiation failed:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Unable to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const defaultThumbnail = "/images/default-class-thumbnail.jpg";

  // Check if the selected module is free
  const isSelectedModuleFree = () => {
    if (!selectedModuleId || !classData.modules) return false;

    const selectedModule = classData.modules.find(
      (m: Module) => m.id === selectedModuleId
    );
    return selectedModule && selectedModule.isFree;
  };

  // Get module price (free or regular price)
  const getModulePrice = () => {
    if (isSelectedModuleFree()) return 0;
    return classData.registrationFee;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get current selected module
  const getSelectedModule = () => {
    if (!selectedModuleId || !classData.modules) return null;
    return classData.modules.find((m: Module) => m.id === selectedModuleId);
  };

  const selectedModule = getSelectedModule();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle className="text-2xl font-bold text-white">
              Purchase Live Class
            </DialogTitle>
            <DialogDescription className="text-zinc-400 mt-1">
              Secure your spot in this exclusive live class session
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
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-zinc-800/50 to-zinc-700/50 p-4 rounded-lg border border-zinc-600"
            variants={item}
          >
            <h3 className="font-bold text-xl text-white">{classData.title}</h3>
            <p className="text-zinc-300 mt-1">{classData.description}</p>
          </motion.div>

          {/* Module selection */}
          {classData.hasModules &&
            classData.modules &&
            classData.modules.length > 0 && (
              <motion.div className="space-y-3" variants={item}>
                <h4 className="font-semibold text-white">Select Module:</h4>
                <RadioGroup
                  value={selectedModuleId || ""}
                  onValueChange={setSelectedModuleId}
                  className="space-y-2"
                >
                  {classData.modules.map((module: Module) => (
                    <div
                      key={module.id}
                      className="flex items-start space-x-2 border border-zinc-600 rounded-lg p-3 bg-zinc-800/30"
                    >
                      <RadioGroupItem
                        value={module.id}
                        id={module.id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={module.id}
                          className="font-medium text-white"
                        >
                          {module.title}
                          {module.isFree && (
                            <span className="ml-2 text-green-400 font-bold">
                              (Free)
                            </span>
                          )}
                        </Label>
                        <div className="text-sm text-zinc-400 mt-1">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {formatDate(module.startTime)}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {formatTime(module.startTime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            )}

          <motion.div className="space-y-3" variants={item}>
            <div className="flex items-center text-zinc-300">
              <Calendar className="mr-3 h-5 w-5 text-green-400" />
              <span>
                {selectedModule
                  ? formatDate(selectedModule.startTime)
                  : classData.formattedDate}
              </span>
            </div>
            <div className="flex items-center text-zinc-300">
              <Clock className="mr-3 h-5 w-5 text-green-400" />
              <span>
                {selectedModule
                  ? formatTime(selectedModule.startTime)
                  : classData.formattedTime}
              </span>
            </div>
            <div className="flex items-center text-zinc-300">
              <User className="mr-3 h-5 w-5 text-green-400" />
              <span>Instructor: {classData.teacherName}</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-green-500/10 p-4 rounded-lg flex justify-between items-center border border-green-500/20"
            variants={item}
          >
            <span className="text-zinc-300 font-medium">Price</span>
            <span className="text-2xl font-bold text-green-400">
              {isSelectedModuleFree() ? "Free" : `₹${getModulePrice()}`}
            </span>
          </motion.div>

          <motion.div className="space-y-2" variants={item}>
            <h4 className="font-semibold text-white">What's included:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-zinc-300">
                <Check className="mr-2 h-4 w-4 text-green-400" />
                <span>Live interactive session with the instructor</span>
              </li>
              <li className="flex items-center text-zinc-300">
                <Check className="mr-2 h-4 w-4 text-green-400" />
                <span>Q&A opportunity during the class</span>
              </li>
              <li className="flex items-center text-zinc-300">
                <Check className="mr-2 h-4 w-4 text-green-400" />
                <span>Access to session recording (if available)</span>
              </li>
            </ul>
          </motion.div>

          {!isSelectedModuleFree() && (
            <motion.div
              className="text-sm p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400"
              variants={item}
            >
              Note: After payment, your access will require admin approval
              before you can join the class.
            </motion.div>
          )}
        </motion.div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full border-zinc-600 text-zinc-300 hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={initiatePayment}
              disabled={isLoading}
              className={`${
                isSelectedModuleFree()
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white rounded-full px-6 shadow-md`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : isSelectedModuleFree() ? (
                "Join Free Module"
              ) : (
                "Secure Your Spot"
              )}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
