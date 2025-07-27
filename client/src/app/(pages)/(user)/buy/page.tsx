"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

import Script from "next/script";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BillingForm from "./BillingForm";
import CouponForm from "./CouponForm";
import { useAuth } from "@/helper/AuthContext";
import { AddressData, CouponDetails, CourseDataNew, UserData } from "@/type";
import CourseCard from "./CourseCard";
import AddressList from "./AddressList";

import {
  Trash2,
  XCircle,
  CheckCircle,
  CreditCard,
  ShoppingBag,
} from "lucide-react";
import { formatPrice } from "@/helper/FormatPrice";
import { CourseParams } from "@/components/CourseParams";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function BuyPage() {
  return (
    <Suspense fallback={<BuyPageSkeleton />}>
      <CourseParams>
        {(courseSlugs) => <BuyPageContent courseSlugs={courseSlugs} />}
      </CourseParams>
    </Suspense>
  );
}

function BuyPageContent({ courseSlugs }: { courseSlugs: string[] }) {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseDataNew[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [referralCode, setReferralCode] = useState<string>("");

  // Get referral code from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("ref");
    if (refCode) {
      setReferralCode(refCode);
    }
  }, []);

  const { checkAuth } = useAuth();

  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponDetails | null>(
    null
  );

  useEffect(() => {
    fetchData(courseSlugs);
  }, []);

  const fetchData = async (slugs: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push("/auth");
        return;
      }

      // Fetch course data
      const courseDataPromises = slugs.map((slug) =>
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/course/get-course-page/${slug}`
        )
      );
      const courseResponses = await Promise.all(courseDataPromises);
      const fetchedCourses = courseResponses.map(
        (response) => response.data.data
      );
      setCourses(fetchedCourses);

      // Fetch user data
      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/get-user`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      setUser(userResponse.data.user);

      // Fetch saved addresses
      const addressResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/billing/addresses`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      setAddresses(addressResponse.data.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Unauthorized access - Invalid token");
        router.push("/auth");
      } else {
        setError("An error occurred while fetching data");
        console.error("Fetch error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCouponApplied = (
    discountedPrice: number,
    couponDetails: CouponDetails
  ) => {
    setDiscountedPrice(discountedPrice);
    setAppliedCoupon(couponDetails);
  };

  const removeCoupon = () => {
    setDiscountedPrice(null);
    setAppliedCoupon(null);
  };

  const handleAddressSelect = (address: AddressData) => {
    // This function is now handled by the BillingForm component
    toast.success("Address selected - please fill the form manually");
  };

  if (isLoading) {
    return <BuyPageSkeleton />;
  }

  if (error) {
    return <ErrorCard error={error} retry={() => fetchData(courseSlugs)} />;
  }

  if (!courses.length) {
    return <div>No course data available.</div>;
  }

  const originalTotalPrice = courses.reduce(
    (total, course) => total + course.price,
    0
  );

  const currentTotalPrice = courses.reduce(
    (total, course) => total + (course.salePrice || course.price),
    0
  );

  return (
    <div className="min-h-screen bg-black font-plus-jakarta-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl" />
      </div>

      <div className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-xs sm:text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              SECURE CHECKOUT
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Complete Your{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Purchase
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto">
              You're just one step away from accessing premium trading knowledge
            </p>
          </div>

          {/* User Welcome Card */}
          {user && (
            <div className="mb-8 sm:mb-12 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-green-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-green-500/20 rounded-xl">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">
                      Welcome, {user.name}!
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-300">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Course Cards */}
          <div className="mb-8 sm:mb-12">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Main Checkout Section */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Billing Form Section */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
                    <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Payment Details
                  </h2>
                </div>
                <BillingForm
                  courseId={courses[0]?.id || ""}
                  courseTitle={courses[0]?.title || ""}
                  coursePrice={discountedPrice || currentTotalPrice}
                  onSuccess={() => {
                    toast.success("Purchase completed successfully!");
                    router.push("/dashboard");
                  }}
                  referralCode={referralCode}
                  addresses={addresses}
                  onAddressSelect={handleAddressSelect}
                  appliedCoupon={appliedCoupon}
                  originalPrice={originalTotalPrice}
                />
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 sticky top-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                    <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Order Summary
                  </h2>
                </div>

                <div className="bg-zinc-800/50 border border-zinc-600 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <CouponForm
                    onCouponApplied={handleCouponApplied}
                    originalPrice={originalTotalPrice}
                    salePrice={
                      currentTotalPrice < originalTotalPrice
                        ? currentTotalPrice
                        : undefined
                    }
                    courseId={courses.map((course) => course.id)}
                  />

                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between text-zinc-300">
                      <span>Subtotal:</span>
                      <span>{formatPrice(originalTotalPrice)}</span>
                    </div>
                    {currentTotalPrice < originalTotalPrice && (
                      <div className="flex justify-between text-green-400">
                        <span>Course Sale Discount:</span>
                        <span>
                          -{formatPrice(originalTotalPrice - currentTotalPrice)}
                        </span>
                      </div>
                    )}
                    {appliedCoupon && discountedPrice && (
                      <div className="flex justify-between text-green-400">
                        <span>Coupon Discount:</span>
                        <span>
                          -{formatPrice(currentTotalPrice - discountedPrice)}
                        </span>
                      </div>
                    )}
                    <hr className="border-green-500/30" />
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total:</span>
                      <span className="text-green-400">
                        {formatPrice(discountedPrice || currentTotalPrice)}
                      </span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                        <span className="text-lg text-zinc-300">
                          Applied Coupon:
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-semibold text-green-400 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/50">
                            {appliedCoupon.code}
                          </span>
                          <Button
                            onClick={removeCoupon}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <p className="text-green-400 text-center text-sm sm:text-base">
                      💳 Secure payment powered by Razorpay
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuyPageSkeleton() {
  return (
    <div className="min-h-screen bg-black font-plus-jakarta-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-8 sm:mb-12">
            <Skeleton className="h-6 w-32 mx-auto mb-4 bg-zinc-800" />
            <Skeleton className="h-12 w-80 mx-auto mb-4 bg-zinc-800" />
            <Skeleton className="h-6 w-96 mx-auto bg-zinc-800" />
          </div>

          {/* Course Cards Skeleton */}
          <div className="mb-8 sm:mb-12">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 rounded-xl p-4"
                >
                  <Skeleton className="h-48 bg-zinc-800 rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4 bg-zinc-800 mb-2" />
                  <Skeleton className="h-4 w-full bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Sections Skeleton */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 rounded-xl p-6">
              <Skeleton className="h-8 w-48 mb-6 bg-zinc-800" />
              <div className="space-y-4">
                <Skeleton className="h-12 bg-zinc-800" />
                <Skeleton className="h-12 bg-zinc-800" />
                <Skeleton className="h-32 bg-zinc-800" />
                <Skeleton className="h-12 bg-zinc-800" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 rounded-xl p-6">
              <Skeleton className="h-8 w-48 mb-6 bg-zinc-800" />
              <div className="space-y-4">
                <Skeleton className="h-6 bg-zinc-800" />
                <Skeleton className="h-6 bg-zinc-800" />
                <Skeleton className="h-6 bg-zinc-800" />
                <Skeleton className="h-8 bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorCard({ error, retry }: { error: string; retry: () => void }) {
  return (
    <div className="min-h-screen bg-black font-plus-jakarta-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gradient-to-br from-zinc-900/80 to-black/80 border border-red-500/30 rounded-xl sm:rounded-2xl p-6 sm:p-8">
          <div className="text-center">
            <div className="p-3 bg-red-500/20 rounded-xl w-fit mx-auto mb-4">
              <XCircle className="h-12 w-12 text-red-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Something went wrong
            </h3>
            <p className="text-zinc-300 mb-6 text-sm sm:text-base">{error}</p>
            <Button
              onClick={retry}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
