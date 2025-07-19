"use client";

import React, { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  CheckCircle,
  Phone,
  Users,
  ArrowRight,
  BarChart2,
  Star,
  TrendingUp,
  Share2,
  Globe,
  Smartphone,
  Headphones,
  BookOpen,
  X,
  IndianRupee,
  Info,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "sonner";

const DEFAULT_AVATAR_IMAGE = "/placeholder.jpeg";

// Affiliate benefits
const affiliateBenefits = [
  {
    icon: IndianRupee,
    title: "15% Commission",
    description: "Earn 15% commission on every course sale you generate",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "High Conversion",
    description: "Premium trading courses with proven high conversion rates",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Get unique affiliate links and marketing materials",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access to international markets and diverse audience",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "All courses work perfectly on mobile devices",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support team to help you succeed",
    color: "from-indigo-500 to-purple-500",
  },
];

// Affiliate registration form data
const initialFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountHolderName: "",
  upiId: "",
  notes: "",
};

// How it works steps
const howItWorks = [
  {
    number: "01",
    title: "Sign Up",
    description: "Register as an affiliate and get your unique tracking links",
  },
  {
    number: "02",
    title: "Promote",
    description: "Share our premium trading courses with your audience",
  },
  {
    number: "03",
    title: "Earn",
    description: "Get 15% commission on every successful sale you generate",
  },
  {
    number: "04",
    title: "Withdraw",
    description:
      "Withdraw your earnings anytime through multiple payment methods",
  },
];

// Success stories
const successStories = [
  {
    name: "Rahul Sharma",
    role: "Financial Blogger",
    earnings: "₹45,000",
    content:
      "I've been promoting MonarkFX courses for 6 months and earned over ₹45,000 in commissions. The courses sell themselves!",
    image: DEFAULT_AVATAR_IMAGE,
  },
  {
    name: "Priya Patel",
    role: "Trading Coach",
    earnings: "₹78,000",
    content:
      "As a trading coach, I recommend these courses to my students. The 15% commission is a great bonus to my income.",
    image: DEFAULT_AVATAR_IMAGE,
  },
  {
    name: "Vikram Singh",
    role: "YouTuber",
    earnings: "₹1,25,000",
    content:
      "My audience loves the quality of MonarkFX courses. I've earned ₹1,25,000 in just 8 months of affiliate marketing.",
    image: DEFAULT_AVATAR_IMAGE,
  },
];

// Marketing tools
const marketingTools = [
  {
    icon: BookOpen,
    title: "Course Materials",
    description:
      "Get access to course previews, testimonials, and marketing copy",
  },
  {
    icon: Share2,
    title: "Social Media Kit",
    description: "Ready-to-use social media posts, graphics, and videos",
  },
  {
    icon: Globe,
    title: "Landing Pages",
    description: "High-converting landing pages optimized for your audience",
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    description: "Track your performance, clicks, and earnings in real-time",
  },
];

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 rounded-2xl p-8 h-full">
        <div
          className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <feature.icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
        <p className="text-zinc-300 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
};

// Affiliate Registration Modal Component
const AffiliateRegistrationModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading("Submitting your application...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/affiliate/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.dismiss(loadingToast);
        toast.success(
          "Affiliate registration submitted successfully! We will contact you soon."
        );
        setFormData(initialFormData);
        setStep(1);
        onClose();
      } else {
        toast.dismiss(loadingToast);
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.phone)) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Become Our Affiliate
            </h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepNumber
                        ? "bg-green-500 text-white"
                        : "bg-zinc-700 text-zinc-400"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        step > stepNumber ? "bg-green-500" : "bg-zinc-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      !formData.name || !formData.email || !formData.phone
                    }
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Address Information
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Full Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-zinc-700 text-white rounded-xl font-semibold hover:bg-zinc-600 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Bank Name"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="ifscCode"
                    placeholder="IFSC Code"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="accountHolderName"
                    placeholder="Account Holder Name"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="upiId"
                    placeholder="UPI ID (Optional)"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none"
                  />
                </div>
                <textarea
                  name="notes"
                  placeholder="Additional Notes (Optional)"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:border-green-500 focus:outline-none resize-none"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-zinc-700 text-white rounded-xl font-semibold hover:bg-zinc-600 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const ProcessCard = ({ step, index }: { step: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex items-start gap-6"
    >
      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {step.number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
        <p className="text-zinc-300">{step.description}</p>
      </div>
    </motion.div>
  );
};

const BusinessPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), {
    stiffness: 100,
    damping: 30,
  });

  // Handle mouse movement for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black font-plus-jakarta-sans">
      {/* Add CSS for grid pattern */}
      <style jsx global>{`
        .bg-dot-pattern {
          background-image: radial-gradient(
            circle,
            #cccccc 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }

        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(34, 197, 94, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(34, 197, 94, 0.1) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }
      `}</style>

      {/* Hero Section with Animated Elements */}
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

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <IndianRupee className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Become Our{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Affiliate
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Earn 15% commission on every course sale. Join our affiliate
              program and start earning while helping others master trading.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <ArrowRight className="h-5 w-5" />
                Join Affiliate Program
              </motion.button>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-all duration-300 px-6 py-4 border border-zinc-700 rounded-xl hover:border-green-500/50 hover:bg-zinc-900/50"
              >
                <span>Contact Us</span>
              </motion.a>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <IndianRupee className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">15%</div>
                  <div className="text-sm text-zinc-400">Commission Rate</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">500+</div>
                  <div className="text-sm text-zinc-400">Active Affiliates</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    ₹25L+
                  </div>
                  <div className="text-sm text-zinc-400">
                    Paid to Affiliates
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    4.8/5
                  </div>
                  <div className="text-sm text-zinc-400">Course Rating</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Information Section */}
      <section className="py-16 bg-gradient-to-br from-zinc-900 to-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
                <Info className="h-4 w-4" />
                How Affiliate System Works
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Complete Guide to Earning with Us
              </h2>
              <p className="text-xl text-zinc-300">
                Understand how the affiliate system works and start earning
                commissions
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  1. Register as Affiliate
                </h3>
              </div>
              <p className="text-zinc-300 mb-4">
                Fill out the registration form with your details. We'll review
                your application and approve qualified affiliates.
              </p>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li>• Complete registration form</li>
                <li>• Provide bank details for payments</li>
                <li>• Wait for admin approval</li>
                <li>• Get your unique referral code</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Share2 className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  2. Share Your Code
                </h3>
              </div>
              <p className="text-zinc-300 mb-4">
                Use your unique referral code (like XVFXYO) to promote our
                courses. Share it on social media, blogs, or directly with
                potential customers.
              </p>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li>• Get unique referral code (e.g., XVFXYO)</li>
                <li>• Share on social media platforms</li>
                <li>• Use in blog posts and content</li>
                <li>• Direct sharing with customers</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <IndianRupee className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  3. Earn Commissions
                </h3>
              </div>
              <p className="text-zinc-300 mb-4">
                When customers purchase courses using your referral code, you
                earn 15% commission on every sale. Track your earnings in
                real-time.
              </p>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li>• 15% commission on every sale</li>
                <li>• Works for all courses and classes</li>
                <li>• Real-time tracking dashboard</li>
                <li>• Monthly commission payments</li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                💡 Pro Tips for Success
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-3">
                    🎯 What You Can Promote
                  </h4>
                  <ul className="text-zinc-300 space-y-2">
                    <li>• Online trading courses (₹19,999 - ₹20,999)</li>
                    <li>• Live trading classes and sessions</li>
                    <li>• Mentorship programs</li>
                    <li>• Any course on our platform</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-3">
                    📈 Earning Potential
                  </h4>
                  <ul className="text-zinc-300 space-y-2">
                    <li>• ₹2,999 - ₹3,149 per course sale</li>
                    <li>• No limit on number of sales</li>
                    <li>• Passive income opportunity</li>
                    <li>• Monthly payment cycles</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium tracking-wide mb-3">
                AFFILIATE BENEFITS
              </span>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose Our Affiliate Program?
              </h2>
              <p className="text-xl text-zinc-300">
                Join thousands of successful affiliates who are earning while
                helping others learn trading.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {affiliateBenefits.map((benefit, index) => (
              <FeatureCard key={index} feature={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium tracking-wide mb-3">
                GET STARTED
              </span>
              <h2 className="text-4xl font-bold text-white mb-6">
                How It Works
              </h2>
              <p className="text-xl text-zinc-300">
                Start earning commissions in just 4 simple steps.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {howItWorks.map((step, index) => (
              <ProcessCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute right-0 top-0 h-32 w-32 opacity-20 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
          <svg
            className="absolute left-0 bottom-0 h-32 w-32 opacity-20 text-white transform rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>

          {/* Animated mesh gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08),transparent_50%)]"></div>
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium tracking-wide mb-3">
                SUCCESS STORIES
              </span>
              <h2 className="text-4xl font-bold mb-6">
                What Our Affiliates Say
              </h2>
              <p className="text-xl text-white/80">
                Hear from successful affiliates who are earning big with our
                program.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
              >
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="inline-block h-5 w-5 text-yellow-300 mr-1"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-white mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-white/20 overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-300 font-bold text-lg">
                      {testimonial.earnings}
                    </p>
                    <p className="text-white/70 text-sm">Total Earnings</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Tools Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium tracking-wide mb-3">
                MARKETING TOOLS
              </span>
              <h2 className="text-4xl font-bold text-white mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-zinc-300">
                We provide all the tools and resources you need to promote our
                courses effectively.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketingTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 rounded-2xl p-8 h-full">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
                    <tool.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {tool.title}
                  </h3>
                  <p className="text-zinc-300">{tool.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join our affiliate program today and start earning 15% commission
              on every sale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowRight className="h-5 w-5" />
                Join Now - It's Free!
              </motion.button>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Talk to Our Team
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Affiliate Registration Modal */}
      <AffiliateRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Toaster for notifications */}
      <Toaster position="top-right" richColors closeButton duration={4000} />
    </div>
  );
};

export default BusinessPage;
