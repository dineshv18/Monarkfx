"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BookOpen, Users, Video, LogIn } from "lucide-react";
import { useAuth } from "@/helper/AuthContext";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
}

const MobileBottomNav = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Navigation items based on authentication status
  const getNavItems = (): NavItem[] => {
    if (isAuthenticated) {
      // For logged in users: Home, Live Classes, My Courses, Affiliate
      return [
        {
          name: "Home",
          href: "/",
          icon: Home,
        },
        {
          name: "Live Classes",
          href: "/user-profile?tab=live-classes",
          icon: Video,
        },
        {
          name: "My Courses",
          href: "/user-profile?tab=my-courses",
          icon: BookOpen,
        },
        {
          name: "Affiliate",
          href: "/user-profile?tab=affiliate",
          icon: Users,
        },
      ];
    } else {
      // For non-logged in users: Home, Courses, Live Classes, Auth
      return [
        {
          name: "Home",
          href: "/",
          icon: Home,
        },
        {
          name: "Courses",
          href: "/courses",
          icon: BookOpen,
        },
        {
          name: "Live Classes",
          href: "/live-classes",
          icon: Video,
        },
        {
          name: "Auth",
          href: "/auth",
          icon: LogIn,
        },
      ];
    }
  };

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  // Don't show on desktop
  if (!isMobile) {
    return null;
  }

  // Don't show on admin pages
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/verify")) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/user-profile?tab=live-classes") {
      return (
        pathname?.includes("user-profile") &&
        pathname?.includes("tab=live-classes")
      );
    }
    if (href === "/user-profile?tab=my-courses") {
      return (
        pathname?.includes("user-profile") &&
        pathname?.includes("tab=my-courses")
      );
    }
    if (href === "/user-profile?tab=affiliate") {
      return (
        pathname?.includes("user-profile") &&
        pathname?.includes("tab=affiliate")
      );
    }
    if (href === "/courses") {
      return pathname?.startsWith("/courses");
    }
    if (href === "/live-classes") {
      return pathname?.startsWith("/live-classes");
    }
    if (href === "/auth") {
      return pathname?.startsWith("/auth");
    }
    return pathname === href;
  };

  // Add haptic feedback for mobile devices
  const handleNavClick = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-t border-gray-700/50 shadow-2xl"
      >
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl transition-all duration-300 relative group min-w-0 ${
                  active
                    ? "text-green-400 bg-green-900/30 shadow-lg"
                    : "text-gray-300 hover:text-green-400 hover:bg-green-900/20"
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`h-5 w-5 mb-1 transition-all duration-300 ${
                      active
                        ? "text-green-400 scale-110"
                        : "text-gray-300 group-hover:text-green-400"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-medium transition-all duration-300 text-center truncate max-w-full ${
                    active
                      ? "text-green-400"
                      : "text-gray-300 group-hover:text-green-400"
                  }`}
                >
                  {item.name}
                </span>
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 w-1 h-1 bg-green-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* Bottom padding to prevent content from being hidden behind nav */}
      <div className="h-20 md:hidden" />
    </>
  );
};

export default MobileBottomNav;
