"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Video, Phone, User } from "lucide-react";
import { useAuth } from "@/helper/AuthContext";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Classes", href: "/live-classes", icon: Video },
  { name: "Contact", href: "/contact", icon: Phone },
  { name: "Profile", href: "/user-profile", icon: User, auth: true },
];

const MobileBottomNav = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800 safe-area-pb">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          // Hide authenticated routes for non-auth users
          if (item.auth && !isAuthenticated) {
            return (
              <Link
                key={item.name}
                href="/auth"
                className="flex flex-col items-center justify-center gap-1 text-zinc-500"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">Login</span>
              </Link>
            );
          }

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive
                  ? "text-red-500"
                  : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              <div
                className={`p-1 rounded-lg ${isActive ? "bg-red-600/10" : ""
                  }`}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
