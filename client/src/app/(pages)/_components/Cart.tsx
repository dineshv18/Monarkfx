"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/helper/AuthContext";
import { ShoppingCart, LogIn, Trash, PackageX } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { toast } from "sonner";
import { CartItem } from "@/type";
import { truncateDescription } from "../dashboard/_components/TruncateDescription";
import { formatPrice } from "@/helper/FormatPrice";
import { getCourseImageUrl } from "@/lib/cloudinary";
import {
  getLocalCart,
  removeFromLocalCart,
  getLocalCartCount,
  LocalCartItem,
} from "@/helper/localCart";

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [localCartItems, setLocalCartItems] = useState<LocalCartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Update local cart count on mount and when local cart changes
  useEffect(() => {
    if (!isAuthenticated) {
      setLocalCartItems(getLocalCart());
    }
  }, [isAuthenticated]);

  // Listen for local cart updates
  useEffect(() => {
    const handleLocalCartUpdate = (e: CustomEvent<LocalCartItem[]>) => {
      setLocalCartItems(e.detail);
    };

    window.addEventListener("localCartUpdated", handleLocalCartUpdate as EventListener);
    return () => {
      window.removeEventListener("localCartUpdated", handleLocalCartUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isOpen) {
      if (isAuthenticated) {
        fetchCartItems();
      } else {
        setLocalCartItems(getLocalCart());
      }
    }
  }, [isAuthenticated, isOpen]);

  const fetchCartItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cart`
      );
      if (response.data && response.data.success) {
        setCartItems(
          Array.isArray(response.data.data) ? response.data.data : []
        );
      }
    } catch (error) {
      setError("Error fetching cart items");
      console.error("Error fetching cart items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: string, courseId?: string) => {
    if (isAuthenticated) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/${id}`);
        setCartItems(cartItems.filter((item) => item.id !== id));
        toast.success("Item removed from cart");
      } catch (error) {
        setError("Error removing item from cart");
        console.error("Error removing item from cart:", error);
      }
    } else if (courseId) {
      // Remove from local cart
      removeFromLocalCart(courseId);
      setLocalCartItems(prev => prev.filter(item => item.courseId !== courseId));
      toast.success("Item removed from cart");
    }
  };

  const calculateTotal = () => {
    if (isAuthenticated) {
      return cartItems.reduce((total, item) => {
        return total + (item.course.salePrice || item.course.price);
      }, 0);
    } else {
      return localCartItems.reduce((total, item) => {
        return total + (item.salePrice || item.price);
      }, 0);
    }
  };

  const calculateOriginalTotal = () => {
    if (isAuthenticated) {
      return cartItems.reduce((total, item) => total + item.course.price, 0);
    } else {
      return localCartItems.reduce((total, item) => total + item.price, 0);
    }
  };

  const getCourseSlugs = () => {
    if (isAuthenticated) {
      return cartItems
        .map((item) => encodeURIComponent(item.course.slug))
        .join("&course-slug=");
    } else {
      return localCartItems
        .map((item) => encodeURIComponent(item.courseSlug))
        .join("&course-slug=");
    }
  };

  const hasSalePrice = isAuthenticated
    ? cartItems.some((item) => item.course.salePrice)
    : localCartItems.some((item) => item.salePrice);

  const totalCount = isAuthenticated ? cartItems.length : localCartItems.length;
  const displayItems = isAuthenticated ? cartItems : localCartItems;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative text-zinc-400 hover:text-red-400 transition-colors duration-200"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
            >
              {totalCount}
            </motion.span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#0a0a0a] p-0 border-l border-zinc-800 flex flex-col z-[100000]"
      >
        <SheetHeader className="p-6 bg-zinc-950 shadow-lg border-b border-zinc-800">
          <SheetTitle className="text-2xl font-bold text-white">
            Shopping Cart
          </SheetTitle>
          {!isAuthenticated && localCartItems.length > 0 && (
            <p className="text-xs text-zinc-500 mt-1">
              Login to sync your cart across devices
            </p>
          )}
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-140px)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              [...Array(2)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-full h-32 bg-zinc-800 rounded-lg"
                />
              ))
            ) : error ? (
              <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            ) : displayItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full space-y-4 p-6"
              >
                <PackageX className="h-16 w-16 text-zinc-600" />
                <p className="text-zinc-400 text-lg font-medium">
                  Your cart is empty
                </p>
                <Link href="/courses">
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg">
                    Browse Courses
                  </Button>
                </Link>
              </motion.div>
            ) : isAuthenticated ? (
              // Authenticated user cart items
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <Card className="bg-zinc-900 border border-zinc-800 shadow-lg hover:border-red-900/50 transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative w-[80px] h-[80px] flex-shrink-0">
                            <Image
                              src={
                                getCourseImageUrl(item.course.thumbnail) ||
                                "/placeholder.jpeg"
                              }
                              alt={item.course.title}
                              fill
                              className="rounded-lg object-cover border border-zinc-800"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white mb-1">
                              {item.course.title}
                            </h3>
                            <p className="text-sm text-zinc-500 line-clamp-2 mb-2">
                              {truncateDescription(item.course.description)}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                                <span className="text-lg font-bold text-red-400">
                                  {formatPrice(
                                    item.course.salePrice || item.course.price
                                  )}
                                </span>
                                {item.course.salePrice !== undefined &&
                                  item.course.salePrice > 0 && (
                                    <span className="text-sm text-zinc-600 line-through">
                                      {formatPrice(item.course.price)}
                                    </span>
                                  )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10 border border-zinc-800 hover:border-red-900/50"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              // Guest local cart items
              <AnimatePresence mode="popLayout">
                {localCartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <Card className="bg-zinc-900 border border-zinc-800 shadow-lg hover:border-red-900/50 transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative w-[80px] h-[80px] flex-shrink-0">
                            {item.thumbnail ? (
                              <Image
                                src={getCourseImageUrl(item.thumbnail) || "/placeholder.jpeg"}
                                alt={item.title}
                                fill
                                className="rounded-lg object-cover border border-zinc-800"
                              />
                            ) : (
                              <div className="w-full h-full bg-zinc-800 rounded-lg flex items-center justify-center">
                                <span className="text-red-600 font-bold text-xs">
                                  {item.category?.slice(0, 3).toUpperCase() || "MFX"}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white mb-1 line-clamp-2">
                              {item.title}
                            </h3>
                            {item.category && (
                              <p className="text-xs text-zinc-500 mb-2">
                                {item.category}
                              </p>
                            )}
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                                <span className="text-lg font-bold text-red-400">
                                  {formatPrice(item.salePrice || item.price)}
                                </span>
                                {item.salePrice && item.salePrice < item.price && (
                                  <span className="text-sm text-zinc-600 line-through">
                                    {formatPrice(item.price)}
                                  </span>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id, item.courseId)}
                                className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10 border border-zinc-800 hover:border-red-900/50"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {displayItems.length > 0 && (
            <div className="sticky bottom-0 p-5 bg-zinc-950 border-t border-zinc-800 mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-medium">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-red-400">
                    {formatPrice(calculateTotal())}
                  </span>
                  {hasSalePrice && (
                    <span className="block text-sm text-zinc-600 line-through">
                      {formatPrice(calculateOriginalTotal())}
                    </span>
                  )}
                </div>
              </div>
              {isAuthenticated ? (
                <Link href="/buy">
                  <Button
                    className="w-full h-12 text-lg font-bold rounded-lg transition-colors duration-300 text-white"
                    style={{
                      background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    Checkout
                  </Button>
                </Link>
              ) : (
                <Link href="/auth?redirect=/buy&action=checkout">
                  <Button
                    className="w-full h-12 text-lg font-bold rounded-lg transition-colors duration-300 text-white flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="h-5 w-5" />
                    Login to Checkout
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
