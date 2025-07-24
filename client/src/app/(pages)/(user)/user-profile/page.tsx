"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/helper/AuthContext";
import { format } from "date-fns";
import { toast } from "sonner";
import Image from "next/image";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icons
import {
  BookOpenIcon,
  PencilIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  CalendarIcon,
  UserIcon,
  AlertCircle,
  Mail,
  GraduationCap,
  Video,
  LayoutDashboard,
  Camera,
  Link,
  ArrowRight,
  IndianRupee,
  Share2,
} from "lucide-react";

// Types
import type { ApiResponseTh, UserSec, Purchase } from "@/type";
import type { Enrollment } from "@/type/course";
import UserCertificates from "./UserCertificates";
import MyLiveClasses from "./MyLiveClasses";
import SecureChainCourseCard from "../../_components/SecureChainCourseCard";

// Define a type for processed purchases
type ProcessedPurchase = Purchase & {
  isExpired: boolean;
  daysLeft: number | null;
};

interface UserSubscription {
  tier: string;
  expiryDate: string;
  isActive: boolean;
}

interface ExtendedUserSec extends UserSec {
  subscription?: UserSubscription;
  lastActive?: string;
  location?: string;
  totalCourses?: number;
  completedCourses?: number;
  certificatesEarned?: number;
  joinedDate?: string;
  profileImage?: string;
}

// Name Editor Component for focused editing
const NameEditor = ({
  initialName,
  onSave,
  onCancel,
}: {
  initialName: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}) => {
  const [name, setName] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (name.trim()) {
      onSave(name.trim());
    } else {
      onCancel();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  // Create a completely isolated input to prevent focus issues
  return (
    <div className="flex-1 isolate" onClick={(e) => e.stopPropagation()}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-xs">
          <Input
            ref={inputRef}
            value={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full"
            autoComplete="off"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="outline" size="sm">
            Save
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

const LoadingState = () => (
  <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-50 mt-20">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 flex-shrink-0">
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-32 w-full rounded-lg mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

const ErrorState = ({ error, retry }: { error: string; retry: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-slate-50 mt-20">
    <Card className="p-8 text-center max-w-md mx-auto">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-4">{error}</p>
      <Button onClick={retry} className="bg-black hover:bg-gray-800">
        Try Again
      </Button>
    </Card>
  </div>
);

const UserProfile = () => {
  const { checkAuth } = useAuth();
  const [user, setUser] = useState<ExtendedUserSec | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [purchases, setPurchases] = useState<ProcessedPurchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "dashboard"
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const [affiliateData, setAffiliateData] = useState<any>(null);
  const [affiliateLoading, setAffiliateLoading] = useState(false);
  const [affiliateError, setAffiliateError] = useState<string | null>(null);

  // Function to update URL when tab changes
  const updateTab = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`/user-profile?${params.toString()}`, { scroll: false });
  };

  // Function to handle admin dashboard navigation
  const handleAdminDashboard = () => {
    // Use window.location for navigation to avoid hooks issues
    window.location.href = "/dashboard";
  };

  // Sync tab with URL parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams, activeTab]);

  // Function to refresh data
  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      const [enrollmentsResponse, purchasesResponse] = await Promise.all([
        axios.get<ApiResponseTh<Enrollment[]>>(
          `${process.env.NEXT_PUBLIC_API_URL}/enrollment/user`
        ),
        axios.get<ApiResponseTh<{ purchases: Purchase[] }>>(
          `${process.env.NEXT_PUBLIC_API_URL}/purchase/my-course`
        ),
      ]);

      if (enrollmentsResponse.data && enrollmentsResponse.data.success) {
        // Process enrollment data to add validity information
        const processedEnrollments = enrollmentsResponse.data.data.map(
          (enrollment: Enrollment) => {
            const expiryDate = enrollment.expiryDate;
            const isExpired = expiryDate
              ? new Date(expiryDate) < new Date()
              : false;
            const daysLeft = expiryDate
              ? Math.max(
                  0,
                  Math.ceil(
                    (new Date(expiryDate).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                )
              : null;

            return {
              ...enrollment,
              isExpired,
              daysLeft,
            };
          }
        );
        setEnrollments(processedEnrollments);
      }

      if (purchasesResponse.data && purchasesResponse.data.success) {
        // Process purchase data to add validity information
        const purchases = purchasesResponse.data.data?.purchases || [];

        const processedPurchases = purchases.map((purchase: Purchase) => {
          const expiryDate = purchase.expiryDate;
          const isExpired = expiryDate
            ? new Date(expiryDate) < new Date()
            : false;
          const daysLeft = expiryDate
            ? Math.max(
                0,
                Math.ceil(
                  (new Date(expiryDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              )
            : null;

          return {
            ...purchase,
            isExpired,
            daysLeft,
          };
        });
        setPurchases(processedPurchases);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast.error("Failed to refresh data");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Fetch affiliate dashboard data
  const fetchAffiliateDashboard = async () => {
    setAffiliateLoading(true);
    setAffiliateError(null);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/affiliate/me/dashboard`,
        { withCredentials: true }
      );
      if (res.data && res.data.success) {
        setAffiliateData(res.data.data.affiliate);
      } else {
        setAffiliateData(null);
      }
    } catch (err: any) {
      setAffiliateError(err?.response?.data?.message || "Not an affiliate");
      setAffiliateData(null);
    } finally {
      setAffiliateLoading(false);
    }
  };

  // Fetch affiliate data when tab is selected
  useEffect(() => {
    if (activeTab === "affiliate") {
      fetchAffiliateDashboard();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          router.push("/auth");
          return;
        }

        const [userResponse, enrollmentsResponse, purchasesResponse] =
          await Promise.all([
            axios.get<ApiResponseTh<{ user: UserSec }>>(
              `${process.env.NEXT_PUBLIC_API_URL}/user/get-user`
            ),
            axios.get<ApiResponseTh<Enrollment[]>>(
              `${process.env.NEXT_PUBLIC_API_URL}/enrollment/user`
            ),
            axios.get<ApiResponseTh<{ purchases: Purchase[] }>>(
              `${process.env.NEXT_PUBLIC_API_URL}/purchase/my-course`
            ),
          ]);

        if (userResponse.data && userResponse.data.success) {
          setUser(userResponse.data.data.user);
        }

        if (enrollmentsResponse.data && enrollmentsResponse.data.success) {
          // Process enrollment data to add validity information
          const processedEnrollments = enrollmentsResponse.data.data.map(
            (enrollment: Enrollment) => {
              const expiryDate = enrollment.expiryDate;
              const isExpired = expiryDate
                ? new Date(expiryDate) < new Date()
                : false;
              const daysLeft = expiryDate
                ? Math.max(
                    0,
                    Math.ceil(
                      (new Date(expiryDate).getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                  )
                : null;

              return {
                ...enrollment,
                isExpired,
                daysLeft,
              };
            }
          );
          setEnrollments(processedEnrollments);
        }

        if (purchasesResponse.data && purchasesResponse.data.success) {
          // Process purchase data to add validity information
          const purchases = purchasesResponse.data.data?.purchases || [];

          const processedPurchases = purchases.map((purchase: Purchase) => {
            const expiryDate = purchase.expiryDate;
            const isExpired = expiryDate
              ? new Date(expiryDate) < new Date()
              : false;
            const daysLeft = expiryDate
              ? Math.max(
                  0,
                  Math.ceil(
                    (new Date(expiryDate).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                )
              : null;

            return {
              ...purchase,
              isExpired,
              daysLeft,
            };
          });
          setPurchases(processedPurchases);
        }
      } catch (error) {
        setError("An error occurred while fetching data");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [checkAuth, router]);

  // Add an effect to refresh data when the component is focused
  useEffect(() => {
    // This will refresh data when the page is focused after navigating back from another page
    const handleFocus = () => {
      refreshData();
    };

    // Add event listeners
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} retry={() => router.refresh()} />;
  if (!user) return null;

  // Dashboard content components
  const UserInfo = () => {
    const handleEditStart = () => {
      if (isUpdating) return;
      setIsEditing(true);
    };

    const handleSaveName = async (name: string) => {
      if (isUpdating) return;

      if (!name.trim() || name === user?.name) {
        setIsEditing(false);
        return;
      }

      setIsEditing(false);

      try {
        setIsUpdating(true);

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/update-name`,
          { name },
          { withCredentials: true }
        );

        if (response.data && response.data.success) {
          setUser((prevUser: ExtendedUserSec | null) =>
            prevUser ? { ...prevUser, name } : null
          );
          toast.success("Name updated successfully");
        } else {
          throw new Error(response.data.message || "Failed to update name");
        }
      } catch (error: any) {
        console.error("Error updating name:", error);
        toast.error(error.response?.data?.message || "Failed to update name");
      } finally {
        setIsUpdating(false);
      }
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
    };

    return (
      <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-zinc-900/90 to-black/90 border-zinc-700 backdrop-blur-sm mb-6">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="relative group">
              {user?.profileImage ? (
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-3 border-green-500 shadow-lg">
                  <Image
                    src={user.profileImage}
                    alt={user.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLElement;
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="h-full w-full rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">${user?.name.charAt(
                          0
                        )}</div>`;
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold border-3 border-green-500 shadow-lg">
                  {user?.name.charAt(0)}
                </div>
              )}
              {user?.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-3 border-zinc-900 shadow-lg">
                  <ShieldCheckIcon className="h-4 w-4 text-white" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <NameEditor
                    initialName={user?.name || ""}
                    onSave={handleSaveName}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-white">
                      {user?.name}
                    </h1>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEditStart}
                      className="text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Mail className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-medium">Email</p>
                    <span className="text-sm font-semibold text-white">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <UserIcon className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-medium">Role</p>
                    <span className="text-sm font-semibold text-white">
                      {user?.role}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <CalendarIcon className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-medium">Joined</p>
                    <span className="text-sm font-semibold text-white">
                      {format(
                        new Date(user?.joinedDate || Date.now()),
                        "MMMM yyyy"
                      )}
                    </span>
                  </div>
                </div>
                {user?.role === "ADMIN" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleAdminDashboard}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const EnrolledCoursesContent = () => (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500/20 rounded-xl">
            <BookOpenIcon className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              My Enrolled Courses
            </h2>
            <p className="text-zinc-400 text-sm">Free courses you've joined</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshData}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-zinc-900/50 border-zinc-700 text-white hover:bg-zinc-800 hover:border-green-500/50 transition-all duration-300"
        >
          {isRefreshing ? (
            <>
              <span className="animate-spin">⟳</span>
              Refreshing...
            </>
          ) : (
            <>⟳ Refresh</>
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.length === 0 ? (
          <Card className="col-span-full p-12 text-center border-dashed border-2 border-zinc-700 bg-gradient-to-br from-zinc-900/50 to-black/50">
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-zinc-800/50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <BookOpenIcon className="h-12 w-12 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                No Enrolled Courses Yet
              </h3>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                You haven't enrolled in any courses yet. Start your learning
                journey today.
              </p>
              <Button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
                onClick={() => router.push("/courses")}
              >
                Browse Courses
              </Button>
            </div>
          </Card>
        ) : (
          enrollments.map((enrollment: any) => (
            <SecureChainCourseCard
              hidePrice={true}
              key={enrollment.course.id}
              course={enrollment.course}
              expiryDate={enrollment.expiryDate}
              isExpired={enrollment.isExpired}
              daysLeft={enrollment.daysLeft}
            />
          ))
        )}
      </div>
    </section>
  );

  const PurchasedCoursesContent = () => (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <ShoppingCartIcon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Purchased Courses</h2>
            <p className="text-zinc-400 text-sm">
              Premium courses you've bought
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshData}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-zinc-900/50 border-zinc-700 text-white hover:bg-zinc-800 hover:border-green-500/50 transition-all duration-300"
        >
          {isRefreshing ? (
            <>
              <span className="animate-spin">⟳</span>
              Refreshing...
            </>
          ) : (
            <>⟳ Refresh</>
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchases.length === 0 ? (
          <Card className="col-span-full p-12 text-center border-dashed border-2 border-zinc-700 bg-gradient-to-br from-zinc-900/50 to-black/50">
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-zinc-800/50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <ShoppingCartIcon className="h-12 w-12 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                No Purchased Courses Yet
              </h3>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                You haven't purchased any courses yet. Explore our premium
                content.
              </p>
              <Button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
                onClick={() => router.push("/courses")}
              >
                Explore Courses
              </Button>
            </div>
          </Card>
        ) : (
          purchases.map((purchase: any) => (
            <SecureChainCourseCard
              hidePrice={true}
              key={purchase.course.id}
              course={purchase.course}
              expiryDate={purchase.expiryDate}
              isExpired={purchase.isExpired}
              daysLeft={purchase.daysLeft}
            />
          ))
        )}
      </div>
    </section>
  );

  // Dashboard Stats Component
  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 group">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
              <BookOpenIcon className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Course Summary</h3>
              <p className="text-zinc-400 text-sm">Your learning overview</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-700">
              <span className="text-zinc-300 font-medium">
                Enrolled Courses
              </span>
              <span className="bg-green-500/20 text-green-300 font-bold border-green-500/30 px-2 py-1 rounded-md">
                {enrollments.length}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-zinc-700">
              <span className="text-zinc-300 font-medium">
                Purchased Courses
              </span>
              <span className="bg-blue-500/20 text-blue-300 font-bold border-blue-500/30 px-2 py-1 rounded-md">
                {purchases.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-300 font-medium">Total Resources</span>
              <span className="bg-purple-500/20 text-purple-300 font-bold border-purple-500/30 px-2 py-1 rounded-md">
                {enrollments.length + purchases.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700 hover:border-green-500/30 group">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
              <Video className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Live Sessions</h3>
              <p className="text-zinc-400 text-sm">Interactive learning</p>
            </div>
          </div>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Access your upcoming live classes and recorded sessions.
          </p>
          <Button
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => updateTab("live-classes")}
          >
            View Live Classes
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  // Affiliate Tab Content
  const AffiliateTabContent = () => {
    if (affiliateLoading) {
      return (
        <div className="p-8 text-center text-zinc-400">
          Loading affiliate info...
        </div>
      );
    }
    if (affiliateError) {
      return (
        <div className="p-8 text-center">
          <AlertCircle className="mx-auto mb-2 text-yellow-400" />
          <div className="text-zinc-400 mb-4">{affiliateError}</div>
          <a
            href="/business"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowRight className="h-4 w-4" />
            Become an Affiliate
          </a>
        </div>
      );
    }
    if (!affiliateData) {
      return (
        <div className="p-8 text-center text-zinc-400">
          You are not an affiliate yet.
        </div>
      );
    }
    return (
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Share2 className="h-6 w-6 text-green-400" />
              <span className="text-lg font-bold text-white">
                Your Referral Code:
              </span>
              <span className="bg-zinc-800 text-green-400 px-3 py-1 rounded-lg font-mono text-lg">
                {affiliateData.referralCode}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <IndianRupee className="h-5 w-5 text-yellow-400" />
              <span className="text-zinc-300">Total Earnings:</span>
              <span className="text-green-400 font-bold text-lg">
                ₹{affiliateData.totalEarnings}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-zinc-300">Status:</span>
              <span
                className={`font-bold px-2 py-1 rounded ${
                  affiliateData.status === "APPROVED"
                    ? "bg-green-600 text-white"
                    : affiliateData.status === "PENDING"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {affiliateData.status}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Affiliate Sales</h3>
          {affiliateData.sales.length === 0 ? (
            <div className="text-zinc-400">No sales yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-zinc-300">
                <thead>
                  <tr className="bg-zinc-800">
                    <th className="px-4 py-2 text-left">Course</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Commission</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliateData.sales.map((sale: any) => (
                    <tr key={sale.id} className="border-b border-zinc-700">
                      <td className="px-4 py-2">{sale.course?.title || "-"}</td>
                      <td className="px-4 py-2">₹{sale.saleAmount}</td>
                      <td className="px-4 py-2">₹{sale.commissionAmount}</td>
                      <td className="px-4 py-2">
                        {format(new Date(sale.createdAt), "dd MMM yyyy")}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            sale.status === "COMPLETED"
                              ? "bg-green-600 text-white"
                              : sale.status === "PENDING"
                              ? "bg-yellow-500 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black font-plus-jakarta-sans mt-20 mb-10">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar / Mobile Tabs */}
          <div className="w-full lg:w-72 flex-shrink-0">
            {/* Mobile Tabs */}
            <div className="block lg:hidden mb-6">
              <Tabs
                defaultValue={activeTab}
                value={activeTab}
                onValueChange={updateTab}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-4 bg-zinc-900 border border-zinc-700 shadow-lg rounded-lg p-1">
                  <TabsTrigger
                    value="dashboard"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2 sm:mr-0 lg:mr-2" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="certificates"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <GraduationCap className="h-4 w-4 mr-2 sm:mr-0 lg:mr-2" />
                    <span className="hidden sm:inline">Certificates</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="live-classes"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <Video className="h-4 w-4 mr-2 sm:mr-0 lg:mr-2" />
                    <span className="hidden sm:inline">Live Classes</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="my-courses"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <BookOpenIcon className="h-4 w-4 mr-2 sm:mr-0 lg:mr-2" />
                    <span className="hidden sm:inline">My Courses</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="affiliate"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <Share2 className="h-4 w-4 mr-2 sm:mr-0 lg:mr-2" />
                    <span className="hidden sm:inline">Affiliate</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Desktop Sidebar */}
            <Card className="hidden lg:block sticky top-24 shadow-xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-black/90 border-zinc-700 backdrop-blur-sm">
              <div className="p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-b border-green-500/30">
                <h2 className="font-bold text-xl text-white flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <UserIcon className="h-5 w-5 text-green-400" />
                  </div>
                  My Dashboard
                </h2>
              </div>
              <div className="p-4 space-y-2">
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  className={`w-full justify-start font-medium transition-all duration-300 ${
                    activeTab === "dashboard"
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white border-zinc-700"
                  }`}
                  onClick={() => updateTab("dashboard")}
                >
                  <LayoutDashboard className="h-4 w-4 mr-3" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "certificates" ? "default" : "ghost"}
                  className={`w-full justify-start font-medium transition-all duration-300 ${
                    activeTab === "certificates"
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white border-zinc-700"
                  }`}
                  onClick={() => updateTab("certificates")}
                >
                  <GraduationCap className="h-4 w-4 mr-3" />
                  Certificates
                </Button>
                <Button
                  variant={activeTab === "live-classes" ? "default" : "ghost"}
                  className={`w-full justify-start font-medium transition-all duration-300 ${
                    activeTab === "live-classes"
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white border-zinc-700"
                  }`}
                  onClick={() => updateTab("live-classes")}
                >
                  <Video className="h-4 w-4 mr-3" />
                  Live Classes
                </Button>
                <Button
                  variant={
                    activeTab === "enrolled-courses" ? "default" : "ghost"
                  }
                  className={`w-full justify-start font-medium transition-all duration-300 ${
                    activeTab === "enrolled-courses"
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white border-zinc-700"
                  }`}
                  onClick={() => updateTab("enrolled-courses")}
                >
                  <BookOpenIcon className="h-4 w-4 mr-3" />
                  Enrolled Courses
                </Button>
                <Button
                  variant={
                    activeTab === "purchased-courses" ? "default" : "ghost"
                  }
                  className={`w-full justify-start font-medium transition-all duration-300 ${
                    activeTab === "purchased-courses"
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white border-zinc-700"
                  }`}
                  onClick={() => updateTab("purchased-courses")}
                >
                  <ShoppingCartIcon className="h-4 w-4 mr-3" />
                  Purchased Courses
                </Button>
                <Button
                  variant={activeTab === "affiliate" ? "default" : "ghost"}
                  className={`w-full justify-start font-medium transition-all duration-300 ${
                    activeTab === "affiliate"
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white border-zinc-700"
                  }`}
                  onClick={() => updateTab("affiliate")}
                >
                  <Share2 className="h-4 w-4 mr-3" />
                  Affiliate
                </Button>
              </div>
            </Card>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Mobile Tabs Content */}
            <div className="block lg:hidden">
              <Tabs value={activeTab} className="w-full">
                <TabsContent value="dashboard" className="mt-0">
                  <UserInfo />
                  <DashboardStats />
                  <UserCertificates />
                </TabsContent>
                <TabsContent value="certificates" className="mt-0">
                  <UserInfo />
                  <UserCertificates />
                </TabsContent>
                <TabsContent value="live-classes" className="mt-0">
                  <UserInfo />
                  <MyLiveClasses />
                </TabsContent>
                <TabsContent value="my-courses" className="mt-0">
                  <UserInfo />
                  <div className="space-y-8">
                    <EnrolledCoursesContent />
                    <PurchasedCoursesContent />
                  </div>
                </TabsContent>
                <TabsContent value="affiliate" className="mt-0">
                  <AffiliateTabContent />
                </TabsContent>
              </Tabs>
            </div>

            {/* Desktop Content */}
            <div className="hidden lg:block">
              <UserInfo />

              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  <DashboardStats />
                  <UserCertificates />
                </div>
              )}

              {activeTab === "certificates" && <UserCertificates />}
              {activeTab === "live-classes" && <MyLiveClasses />}
              {activeTab === "enrolled-courses" && <EnrolledCoursesContent />}
              {activeTab === "purchased-courses" && <PurchasedCoursesContent />}
              {activeTab === "affiliate" && <AffiliateTabContent />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
