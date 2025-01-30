"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  GraduationCap,
  MapPinHouse,
  Menu,
  Puzzle,
  School,
  ShoppingBasket,
} from "lucide-react";
import { BookOpen, Users, FilePlus, FileText } from "lucide-react";
import { NavItem } from "@/type";

const navItems: NavItem[] = [
  {
    title: "All Courses",
    href: "/dashboard",
    icon: BookOpen,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Create Course",
    href: "/dashboard/create-course",
    icon: FilePlus,
  },
  {
    title: "Draft Courses",
    href: "/dashboard/draft-courses",
    icon: FileText,
  },
  {
    title: "Coupons",
    href: "/dashboard/coupons",
    icon: Puzzle,
  },
  {
    title: "Address",
    href: "/dashboard/address",
    icon: MapPinHouse,
  },
  {
    title: "Orders",
    href: "/dashboard/purchase",
    icon: ShoppingBasket,
  },
  {
    title: "Students",
    href: "/dashboard/students",
    icon: School,
  },
];

export function Sidenav() {
  const pathname = usePathname();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-40 shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-56 p-0 border-r">
          <MobileNav />
        </SheetContent>
      </Sheet>
      <nav className="hidden md:block fixed top-0 left-0 h-full w-56 border-r bg-background">
        <ScrollArea className="h-full py-6 pl-4 pr-2">
          <div className="mb-4 px-2">
            <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
          </div>
          <SidenavItems />
        </ScrollArea>
      </nav>
    </>
  );

  function SidenavItems() {
    return (
      <div className="flex flex-col h-full relative">
        <div className="space-y-1 font-inter mb-16">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent" : "transparent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 w-56 bg-white border-t shadow-sm py-2 px-3">
          <Link href="/courses">
            <span className="group flex items-center rounded-md px-3 py-2.5 text-sm font-medium bg-purple-50 hover:bg-purple-100 text-purple-700">
              <GraduationCap className="mr-2 h-5 w-5" />
              <span>View All Courses</span>
            </span>
          </Link>
        </div>
      </div>
    );
  }

  function MobileNav() {
    return (
      <ScrollArea className="h-full py-6 pl-4 pr-2 relative">
        <div className="flex flex-col h-full">
          <div>
            <div className="mb-4 px-2">
              <h2 className="text-lg font-semibold tracking-tight">Menu</h2>
            </div>
            <div className="space-y-1 font-inter mb-16">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent" : "transparent"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 w-56 bg-white border-t shadow-sm py-2 px-3">
            <Link href="/courses">
              <span className="group flex items-center rounded-md px-3 py-2.5 text-sm font-medium bg-purple-50 hover:bg-purple-100 text-purple-700">
                <GraduationCap className="mr-2 h-5 w-5" />
                <span>View All Courses</span>
              </span>
            </Link>
          </div>
        </div>
      </ScrollArea>
    );
  }
}
