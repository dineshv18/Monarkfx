"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Tag, X, ShoppingBag, ArrowLeft } from "lucide-react";

import { useAuth } from "@/helper/AuthContext";
import { clearLocalCart, getLocalCart } from "@/helper/localCart";

interface CartItem {
  id: string;
  course: {
    id: string;
    title: string;
    slug: string;
    price: number;
    salePrice?: number;
    thumbnail?: string;
    category?: { name: string };
  };
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface CouponData {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
}

export default function BuyPage() {
  const router = useRouter();
  const { checkAuth, isAuthenticated, isLoading: authLoading } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      initializeCheckout();
    }
  }, [authLoading, isAuthenticated]);

  const initializeCheckout = async () => {
    setIsLoading(true);

    // Check if logged in
    const authenticated = await checkAuth();
    if (!authenticated) {
      // Redirect to login with return URL
      router.push("/auth?redirect=/buy&action=checkout");
      return;
    }

    try {
      // Fetch user data
      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/get-user`,
        { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } }
      );
      setUser(userResponse.data.user);

      // Check if there are local cart items to sync
      const localItems = getLocalCart();
      if (localItems.length > 0) {
        // Sync local cart to server
        for (const item of localItems) {
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/cart/add/${item.courseSlug}`
            );
          } catch (error) {
            // Ignore if already in cart
          }
        }
        // Clear local cart after sync
        clearLocalCart();
      }

      // Fetch server cart
      const cartResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`);
      if (cartResponse.data?.data) {
        setCartItems(cartResponse.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error loading checkout");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/coupon/apply`,
        { code: couponCode.trim() }
      );

      if (response.data?.success && response.data?.data) {
        setAppliedCoupon(response.data.data);
        toast.success("Coupon applied successfully!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid coupon code");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  const handleConfirmPayment = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);
    try {
      // Create order/enrollment for each course in cart
      for (const item of cartItems) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/enrollment/enroll`,
          {
            courseId: item.course.id,
            couponId: appliedCoupon?.id,
          },
          {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
          }
        );

        // Remove from cart after enrollment
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/${item.id}`);
      }

      setIsSuccess(true);
      toast.success("Enrollment successful!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.course.price,
    0
  );
  const saleDiscount = cartItems.reduce(
    (sum, item) => sum + (item.course.price - (item.course.salePrice || item.course.price)),
    0
  );
  const afterSalePrice = subtotal - saleDiscount;

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      couponDiscount = (afterSalePrice * appliedCoupon.discountValue) / 100;
    } else {
      couponDiscount = appliedCoupon.discountValue;
    }
  }

  const finalTotal = afterSalePrice - couponDiscount;

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto" />
          <p className="text-[#525252] mt-4">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-red-950/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Thank you for enrolling.
          </h1>
          <p className="text-[#737373] mb-8">
            You have been successfully enrolled. Access your courses from your profile.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/user-profile">
              <button className="px-6 py-3 text-white text-sm font-medium rounded-lg" style={{ background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)" }}>
                View My Courses
              </button>
            </Link>
            <Link href="/courses">
              <button className="px-6 py-3 text-white text-sm border border-zinc-800 rounded-lg hover:border-red-900/50 transition-colors">
                Browse More
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-900/20 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-zinc-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Your cart is empty
          </h1>
          <p className="text-[#737373] mb-8">
            Add some courses to proceed with checkout.
          </p>
          <Link href="/courses">
            <button className="px-6 py-3 text-white text-sm font-medium rounded-lg" style={{ background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)" }}>
              Browse Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="py-12 lg:py-16 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cart" className="inline-flex items-center gap-2 text-[#737373] hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <span className="text-[#525252] text-xs tracking-[0.3em] uppercase block mb-4">
            Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            Secure Enrollment
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left: Details */}
            <div className="lg:col-span-3 space-y-10">
              {/* Student Info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-red-600 text-sm font-medium">01</span>
                  <h2 className="text-[#525252] text-xs tracking-[0.2em] uppercase">
                    Student Information
                  </h2>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-3 border-b border-zinc-900">
                    <span className="text-[#525252]">Name</span>
                    <span className="text-white">{user?.name}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-zinc-900">
                    <span className="text-[#525252]">Email</span>
                    <span className="text-white">{user?.email}</span>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-red-600 text-sm font-medium">02</span>
                  <h2 className="text-[#525252] text-xs tracking-[0.2em] uppercase">
                    Your Courses ({cartItems.length})
                  </h2>
                </div>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-zinc-900">
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                        {item.course.thumbnail ? (
                          <Image
                            src={item.course.thumbnail}
                            alt={item.course.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-red-600 font-bold text-xs">MFX</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-sm line-clamp-1">
                          {item.course.title}
                        </h3>
                        {item.course.category && (
                          <p className="text-[#525252] text-xs mt-1">{item.course.category.name}</p>
                        )}
                      </div>
                      <div className="text-right">
                        {item.course.salePrice && item.course.salePrice < item.course.price ? (
                          <>
                            <p className="text-[#525252] text-xs line-through">
                              {formatPrice(item.course.price)}
                            </p>
                            <p className="text-red-500 font-medium text-sm">
                              {formatPrice(item.course.salePrice)}
                            </p>
                          </>
                        ) : (
                          <p className="text-white font-medium text-sm">
                            {formatPrice(item.course.price)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-red-600 text-sm font-medium">03</span>
                  <h2 className="text-[#525252] text-xs tracking-[0.2em] uppercase">
                    Coupon Code
                  </h2>
                </div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Tag className="w-4 h-4 text-red-500" />
                      <span className="text-white font-medium text-sm">{appliedCoupon.code}</span>
                      <span className="text-green-500 text-sm">
                        (-{appliedCoupon.discountType === "percentage"
                          ? `${appliedCoupon.discountValue}%`
                          : formatPrice(appliedCoupon.discountValue)})
                      </span>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-[#525252] hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-3 bg-transparent border-b border-zinc-800 text-white text-sm focus:border-red-700 focus:outline-none placeholder-[#525252] uppercase"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon}
                      className="px-5 py-3 text-sm text-white border border-zinc-800 rounded-lg hover:border-red-900/50 transition-colors disabled:opacity-50"
                    >
                      {isApplyingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-28 bg-[#0f0f0f] border border-zinc-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Payment Summary
                </h3>

                <div className="space-y-3 text-sm pb-6 border-b border-zinc-800">
                  <div className="flex justify-between">
                    <span className="text-[#737373]">Subtotal</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  {saleDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#737373]">Sale Discount</span>
                      <span className="text-green-500">-{formatPrice(saleDiscount)}</span>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#737373]">Coupon Discount</span>
                      <span className="text-green-500">-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between py-6 border-b border-zinc-800">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-2xl font-bold text-red-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                <button
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full py-4 mt-6 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${formatPrice(finalTotal)}`
                  )}
                </button>

                {/* Trust */}
                <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
                  <div className="flex items-center gap-3 text-[#525252] text-xs">
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span>ISO 21008:2018 Certified</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#525252] text-xs">
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span>Secure payment via Razorpay</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#525252] text-xs">
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span>Education-only services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-24 md:hidden" />
    </div>
  );
}
