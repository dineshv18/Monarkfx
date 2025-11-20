"use client";

import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Star,
  Globe,
  IndianRupee,
  TrendingUp,
  Users,
  Award,
  Zap,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/helper/AuthContext";
import { useRouter } from "next/navigation";

const DEFAULT_AVATAR_IMAGE = "/placeholder.jpeg";

// Partnership benefits
const partnershipBenefits = [
  {
    title: "High Commission Rates",
    description: "Earn up to 15% commission on every successful referral sale",
    icon: IndianRupee,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Real-Time Tracking",
    description: "Monitor your sales and earnings with our advanced dashboard",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Marketing Support",
    description: "Get access to promotional materials and marketing resources",
    icon: Globe,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Dedicated Support",
    description: "24/7 support team to help you maximize your earnings",
    icon: Users,
    gradient: "from-orange-500 to-red-500",
  },
];

// Affiliate form data - simplified
type AffiliateFormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  notes: string;
};

const initialFormData: AffiliateFormData = {
  name: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  notes: "",
};

// Process steps
const processSteps = [
  {
    number: "01",
    title: "Apply",
    description: "Fill out the affiliate application form with your details",
    icon: Award,
  },
  {
    number: "02",
    title: "Get Approved",
    description: "Our team reviews and approves qualified affiliates",
    icon: CheckCircle,
  },
  {
    number: "03",
    title: "Start Promoting",
    description: "Receive your unique referral code and marketing materials",
    icon: Zap,
  },
  {
    number: "04",
    title: "Earn Money",
    description: "Track your sales and receive monthly commission payments",
    icon: IndianRupee,
  },
];

// Success stories
const successStories = [
  {
    name: "Rajesh Kumar",
    role: "Finance Blogger",
    earnings: "₹52,000",
    content: "MonarkFX's affiliate program has been a game-changer. The commission structure is excellent!",
    image: DEFAULT_AVATAR_IMAGE,
  },
  {
    name: "Sneha Reddy",
    role: "Trading Educator",
    earnings: "₹85,000",
    content: "I recommend MonarkFX courses to my students. The quality is top-notch and commissions are great.",
    image: DEFAULT_AVATAR_IMAGE,
  },
  {
    name: "Amit Patel",
    role: "Content Creator",
    earnings: "₹1,45,000",
    content: "Best affiliate program in the trading education space. Highly recommend joining!",
    image: DEFAULT_AVATAR_IMAGE,
  },
];

export default function BusinessPage() {
  const [formData, setFormData] = useState<AffiliateFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    document.title = "Affiliate Program - MonarkFX";
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is logged in
    if (!isAuthenticated) {
      toast.error("Please login to apply for affiliate program");
      setTimeout(() => {
        router.push("/auth");
      }, 1500);
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.city || !formData.state) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting your application...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/affiliate/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (data.success) {
        toast.dismiss(loadingToast);
        toast.success("Application submitted successfully! We'll review it soon.");
        setFormData(initialFormData);
      } else {
        toast.dismiss(loadingToast);
        toast.error(data.message || "Application failed. Please try again.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-plus-jakarta-sans">
      {/* Hero Section */}
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
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl"
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:pt-24 xl:pt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl border border-cyan-500/30">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-cyan-400" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
              Partner with{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                MonarkFX
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-300 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
              Join India's leading trading education platform and earn generous commissions
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="flex items-center gap-2 bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                <span className="text-sm sm:text-base font-semibold">Commission</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                <span className="text-sm sm:text-base font-semibold">500+ Active Affiliates</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                <span className="text-sm sm:text-base font-semibold">₹30L+ Paid Out</span>
              </div>
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                  Apply for Affiliate Program
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  {/* City & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="City"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="State"
                        required
                      />
                    </div>
                  </div>

                  {/* Message (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500 transition-colors resize-none"
                      placeholder="Tell us about yourself and why you want to become an affiliate..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-blue-600 hover:to-cyan-600 text-white py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <ArrowRight className="h-5 w-5" />
                        Submit Application
                      </>
                    )}
                  </button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-cyan-500 inline-block mb-2 sm:mb-3">
              Why Partner With Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white relative inline-block px-2">
              Our <span className="text-cyan-500">Benefits</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative"
              >
                <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-cyan-500/30 transition-all duration-300 h-full">
                  <CardContent className="p-6 sm:p-8">
                    <div
                      className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${benefit.gradient} mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <benefit.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-br from-zinc-900 to-black relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-cyan-500 inline-block mb-2 sm:mb-3">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white relative inline-block px-2">
              Simple <span className="text-cyan-500">4-Step</span> Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-cyan-500/30 transition-all duration-300 h-full">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="mb-4 sm:mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-bold text-lg sm:text-xl mb-3 sm:mb-4">
                        {step.number}
                      </div>
                    </div>
                    <div className="mb-4">
                      <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 mx-auto" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 sm:py-24 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-cyan-500 inline-block mb-2 sm:mb-3">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white relative inline-block px-2">
              What Our <span className="text-cyan-500">Affiliates</span> Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-cyan-500/30 transition-all duration-300 h-full">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center mb-6">
                      <Image
                        src={story.image}
                        alt={story.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{story.name}</h3>
                        <p className="text-zinc-400 text-sm">{story.role}</p>
                      </div>
                    </div>
                    <p className="text-zinc-300 mb-4 italic">"{story.content}"</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-cyan-400 font-bold">{story.earnings}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Toaster for notifications */}
      <Toaster position="top-right" richColors closeButton duration={4000} />
    </div>
  );
}
