"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader2, BookOpen, Calendar, Award, User, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  createdAt?: string;
}

interface EnrolledCourse {
  id: string;
  courseId: string;
  createdAt: string;
  expiryDate?: string;
  isExpired?: boolean;
  daysLeft?: number;
  course: {
    id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    category?: { name: string };
  };
}

const UserProfilePage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [user, setUser] = useState<UserData | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        setError("Please login to view your profile");
        setIsLoading(false);
        return;
      }

      // Fetch user data
      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/get-user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // API returns { data: { user: {...} } }
      if (userResponse.data?.data?.user) {
        setUser(userResponse.data.data.user);
      }

      // Fetch enrolled courses
      const enrollmentResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/enrollment/user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // API returns { data: [...enrollments] }
      if (enrollmentResponse.data?.data) {
        setEnrolledCourses(enrollmentResponse.data.data);
      }
    } catch (err: any) {
      console.error("Error fetching user data:", err);
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto" />
          <p className="text-zinc-500 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-950/30 flex items-center justify-center">
            <User className="w-8 h-8 text-zinc-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            {error || "Profile not found"}
          </h1>
          <Link href="/auth">
            <button className="px-6 py-3 text-white text-sm font-medium rounded-lg bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 transition-all">
              Login to Continue
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <section className="py-12 border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-zinc-500 text-xs tracking-[0.3em] uppercase">
            Student Portal
          </span>
        </div>
      </section>

      {/* Main Content */}
      <section ref={ref} className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Left Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28">
                {/* User Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-800 to-red-600 flex items-center justify-center mb-4 shadow-lg shadow-red-900/20">
                  <span className="text-2xl font-bold text-white">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>

                <h1
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {user.name}
                </h1>

                <div className="space-y-4 mt-6">
                  <div>
                    <span className="text-zinc-500 text-xs uppercase tracking-wide block mb-1">
                      Member Since
                    </span>
                    <span className="text-zinc-300 text-sm">{user.createdAt ? formatDate(user.createdAt) : 'N/A'}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 text-xs uppercase tracking-wide block mb-1">
                      Total Courses
                    </span>
                    <span className="text-red-500 text-sm font-semibold">{enrolledCourses.length}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 text-xs uppercase tracking-wide block mb-1">
                      Status
                    </span>
                    <span className="text-green-500 text-sm font-medium">Active</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 space-y-12"
            >
              {/* Profile Overview */}
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                <h2
                  className="text-zinc-400 text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <User className="w-4 h-4" />
                  Profile Overview
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-red-500 mt-1" />
                    <div>
                      <span className="text-zinc-500 text-xs uppercase tracking-wide block mb-1">
                        Full Name
                      </span>
                      <span className="text-white">{user.name}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-red-500 mt-1" />
                    <div>
                      <span className="text-zinc-500 text-xs uppercase tracking-wide block mb-1">
                        Email
                      </span>
                      <span className="text-white">{user.email}</span>
                    </div>
                  </div>
                  {user.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-red-500 mt-1" />
                      <div>
                        <span className="text-zinc-500 text-xs uppercase tracking-wide block mb-1">
                          Phone
                        </span>
                        <span className="text-white">{user.phone}</span>
                      </div>
                    </div>
                  )}
                  {user.city && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-red-500 mt-1" />
                      <div>
                        <span className="text-zinc-500 text-xs uppercase tracking-wide block mb-1">
                          City
                        </span>
                        <span className="text-white">{user.city}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enrolled Courses */}
              <div>
                <h2
                  className="text-zinc-400 text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <BookOpen className="w-4 h-4" />
                  Enrolled Courses ({enrolledCourses.length})
                </h2>

                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-12 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
                    <BookOpen className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500 mb-4">No courses enrolled yet</p>
                    <Link href="/courses">
                      <button className="px-6 py-2 text-sm text-white border border-zinc-700 rounded-lg hover:border-red-700/50 hover:bg-red-950/20 transition-all">
                        Browse Courses
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledCourses.map((enrollment) => (
                      <Link
                        key={enrollment.id}
                        href={`/courses/${enrollment.course.slug}`}
                        className="block"
                      >
                        <div className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-red-900/50 hover:bg-zinc-900/70 transition-all group">
                          {/* Thumbnail */}
                          <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                            {enrollment.course.thumbnail ? (
                              <Image
                                src={enrollment.course.thumbnail}
                                alt={enrollment.course.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/50 to-red-950">
                                <span className="text-red-400 font-bold text-xs">MFX</span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-white text-sm line-clamp-1 group-hover:text-red-400 transition-colors">
                              {enrollment.course.title}
                            </h3>
                            {enrollment.course.category && (
                              <p className="text-zinc-500 text-xs mt-1">
                                {enrollment.course.category.name}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-zinc-600 text-xs flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Enrolled: {formatDate(enrollment.createdAt)}
                              </span>
                              {enrollment.daysLeft !== null && enrollment.daysLeft !== undefined && (
                                <span className={`text-xs font-medium ${enrollment.isExpired ? 'text-red-500' : enrollment.daysLeft < 30 ? 'text-yellow-500' : 'text-green-500'}`}>
                                  {enrollment.isExpired ? 'Expired' : `${enrollment.daysLeft} days left`}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex items-center">
                            <span className="text-zinc-600 group-hover:text-red-500 transition-colors">→</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <Link href="/courses">
                  <button className="px-6 py-3 text-sm text-white font-medium rounded-lg bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 transition-all">
                    Browse More Courses
                  </button>
                </Link>
                <Link href="/cart">
                  <button className="px-6 py-3 text-sm text-white border border-zinc-700 rounded-lg hover:border-red-700/50 hover:bg-red-950/20 transition-all">
                    View Cart
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom padding for mobile nav */}
      <div className="h-24 md:hidden" />
    </div>
  );
};

export default UserProfilePage;
