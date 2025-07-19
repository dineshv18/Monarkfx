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

import { Trash2, XCircle } from "lucide-react";
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
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 font-plus-jakarta-sans">
      <div className="max-w-7xl mx-auto">
        <div className="bg-zinc-900 rounded-2xl shadow-2xl border border-green-500/20">
          <div className="p-6 md:p-8 lg:p-10">
            <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>
            {user && (
              <div className="mb-8 p-6 bg-green-500/10 rounded-xl border border-green-500/30">
                <h2 className="text-2xl font-semibold text-green-400 mb-2">
                  Welcome, {user.name}!
                </h2>
                <p className="text-green-300 text-lg">{user.email}</p>
              </div>
            )}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-semibold text-white">
                    Complete Your Purchase
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
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-semibold text-white">
                    Order Summary
                  </h2>
                </div>
                <Card className="bg-zinc-800 border border-green-500/30">
                  <CardContent className="p-6">
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
                            -
                            {formatPrice(
                              originalTotalPrice - currentTotalPrice
                            )}
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
                      <p className="text-green-400 text-center text-sm">
                        Complete your purchase using the billing form on the
                        left
                      </p>
                    </div>
                  </CardContent>
                </Card>
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
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-zinc-900 rounded-2xl shadow-2xl border border-green-500/20 p-8">
          <Skeleton className="h-12 w-48 mb-8 bg-zinc-800" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-48 bg-zinc-800" />
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 bg-zinc-800" />
            <Skeleton className="h-96 bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorCard({ error, retry }: { error: string; retry: () => void }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-zinc-900 border border-red-500/30">
        <CardContent className="p-6 text-center">
          <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Error</h3>
          <p className="text-zinc-400 mb-4">{error}</p>
          <Button
            onClick={retry}
            className="bg-green-500 hover:bg-green-600 text-black font-bold"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
