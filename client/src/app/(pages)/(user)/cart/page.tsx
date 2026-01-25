"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Loader2, ShoppingBag, ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/helper/AuthContext";
import { useRouter } from "next/navigation";
import {
    getLocalCart,
    removeFromLocalCart,
    clearLocalCart,
    LocalCartItem,
} from "@/helper/localCart";

interface ServerCartItem {
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

const CartPage = () => {
    const [serverCart, setServerCart] = useState<ServerCartItem[]>([]);
    const [localCart, setLocalCart] = useState<LocalCartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [removingId, setRemovingId] = useState<string | null>(null);

    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading) {
            fetchCart();
        }
    }, [isAuthenticated, authLoading]);

    // Listen for local cart updates
    useEffect(() => {
        const handleLocalCartUpdate = (e: CustomEvent<LocalCartItem[]>) => {
            setLocalCart(e.detail);
        };

        window.addEventListener("localCartUpdated", handleLocalCartUpdate as EventListener);
        return () => {
            window.removeEventListener("localCartUpdated", handleLocalCartUpdate as EventListener);
        };
    }, []);

    const fetchCart = async () => {
        setIsLoading(true);

        if (isAuthenticated) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`);
                if (response.data?.data) {
                    setServerCart(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        } else {
            // Use local cart
            setLocalCart(getLocalCart());
        }

        setIsLoading(false);
    };

    const handleRemoveFromCart = async (itemId: string, courseId?: string) => {
        setRemovingId(itemId);

        if (isAuthenticated) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`);
                setServerCart((prev) => prev.filter((item) => item.id !== itemId));
                toast.success("Removed from cart");
            } catch (error) {
                toast.error("Failed to remove item");
            }
        } else if (courseId) {
            removeFromLocalCart(courseId);
            setLocalCart((prev) => prev.filter((item) => item.courseId !== courseId));
            toast.success("Removed from cart");
        }

        setRemovingId(null);
    };

    const handleProceedToCheckout = () => {
        if (isAuthenticated) {
            router.push("/buy");
        } else {
            // Save return URL and redirect to login
            router.push("/auth?redirect=/cart&action=checkout");
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    // Combine cart items for display
    const cartItems = isAuthenticated
        ? serverCart.map((item) => ({
            id: item.id,
            courseId: item.course.id,
            courseSlug: item.course.slug,
            title: item.course.title,
            price: item.course.price,
            salePrice: item.course.salePrice,
            thumbnail: item.course.thumbnail,
            category: item.course.category?.name,
        }))
        : localCart;

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const total = cartItems.reduce((acc, item) => acc + (item.salePrice || item.price), 0);
    const savings = subtotal - total;

    if (isLoading || authLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto" />
                    <p className="text-[#525252] mt-4">Loading cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] py-12 lg:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <span className="text-[#525252] text-xs tracking-[0.3em] uppercase block mb-4">
                        Shopping Cart
                    </span>
                    <h1
                        className="text-3xl sm:text-4xl font-bold text-white"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Your <span className="text-red-600">Enrollment</span> Cart
                    </h1>
                    {!isAuthenticated && cartItems.length > 0 && (
                        <p className="text-[#737373] mt-4 text-sm">
                            You&apos;re browsing as a guest. Login to sync your cart across devices.
                        </p>
                    )}
                </motion.div>

                {cartItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-900/20 flex items-center justify-center">
                            <ShoppingBag className="w-10 h-10 text-zinc-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">Your cart is empty</h2>
                        <p className="text-[#737373] mb-8">
                            Browse our programs and add courses to get started.
                        </p>
                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium rounded-lg transition-colors"
                            style={{
                                background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                            }}
                        >
                            Browse Courses
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#0f0f0f] border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors"
                                >
                                    <div className="flex gap-4">
                                        {/* Thumbnail */}
                                        <div className="relative w-24 h-16 sm:w-32 sm:h-20 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                                            {item.thumbnail ? (
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-red-600 font-bold text-sm">
                                                        {item.category?.slice(0, 3).toUpperCase() || "MFX"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <Link href={`/courses/${item.courseSlug}`}>
                                                <h3 className="font-medium text-white hover:text-red-400 transition-colors line-clamp-2 text-sm sm:text-base">
                                                    {item.title}
                                                </h3>
                                            </Link>
                                            {item.category && (
                                                <p className="text-[#525252] text-xs mt-1">{item.category}</p>
                                            )}

                                            {/* Price */}
                                            <div className="flex items-center gap-2 mt-2">
                                                {item.salePrice && item.salePrice < item.price ? (
                                                    <>
                                                        <span className="text-[#525252] text-xs line-through">
                                                            {formatPrice(item.price)}
                                                        </span>
                                                        <span className="text-red-500 font-bold text-sm">
                                                            {formatPrice(item.salePrice)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-white font-bold text-sm">
                                                        {formatPrice(item.price)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => handleRemoveFromCart(item.id, item.courseId)}
                                            disabled={removingId === item.id}
                                            className="p-2 text-[#525252] hover:text-red-500 transition-colors flex-shrink-0"
                                        >
                                            {removingId === item.id ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-[#0f0f0f] border border-zinc-800 rounded-xl p-6 sticky top-24"
                            >
                                <h2
                                    className="text-lg font-semibold text-white mb-6"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Order Summary
                                </h2>

                                <div className="space-y-4 pb-6 border-b border-zinc-800">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#737373]">Subtotal ({cartItems.length} items)</span>
                                        <span className="text-white">{formatPrice(subtotal)}</span>
                                    </div>
                                    {savings > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#737373]">Discount</span>
                                            <span className="text-green-500">-{formatPrice(savings)}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between py-6 border-b border-zinc-800">
                                    <span className="text-white font-medium">Total</span>
                                    <span
                                        className="text-xl font-bold text-white"
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                        {formatPrice(total)}
                                    </span>
                                </div>

                                <div className="mt-6">
                                    {isAuthenticated ? (
                                        <button
                                            onClick={handleProceedToCheckout}
                                            className="w-full py-3 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                            style={{
                                                background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                                            }}
                                        >
                                            Proceed to Checkout
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleProceedToCheckout}
                                                className="w-full py-3 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 mb-3"
                                                style={{
                                                    background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                                                }}
                                            >
                                                <LogIn className="w-4 h-4" />
                                                Login to Checkout
                                            </button>
                                            <p className="text-[#525252] text-xs text-center">
                                                Login required to complete your enrollment
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="mt-6 pt-6 border-t border-zinc-800">
                                    <Link
                                        href="/courses"
                                        className="text-sm text-[#737373] hover:text-red-400 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>

            <div className="h-24 md:hidden" />
        </div>
    );
};

export default CartPage;
