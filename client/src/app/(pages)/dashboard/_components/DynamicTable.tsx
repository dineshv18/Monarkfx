"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  FileText,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/helper/AuthContext";
import { truncateDescription } from "./TruncateDescription";
import { formatPrice } from "@/helper/FormatPrice";

interface Column {
  key: string;
  label: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  paid: boolean;
  isPublished: boolean;
  [key: string]: string | number | boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  [key: string]: string | number | boolean;
}

interface TableProps {
  columns: Column[];
  apiUrl: string;
  editUrl?: string;
  editChapter?: string;
  hideCourse?: boolean;
  hideChapter?: boolean;
}

export function DynamicTable({
  columns,
  apiUrl,
  hideCourse,
  hideChapter,
}: TableProps) {
  const [data, setData] = useState<(Course | User)[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      // Wait for auth to complete loading first
      if (authLoading) return;

      // If not authenticated, don't fetch data
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${apiUrl}?page=${currentPage}`
        );

        const responseData =
          response.data.data?.users ||
          response.data.message?.courses ||
          response.data.data?.courses ||
          [];

        const totalPagesData =
          response.data.message?.totalPages ||
          response.data.data?.totalPages ||
          1;

        const totalItemsData =
          response.data.message?.totalCourses ||
          response.data.data?.totalCourses ||
          responseData.length;

        setData(responseData);
        setTotalPages(totalPagesData);
        setTotalItems(totalItemsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, currentPage, isAuthenticated, authLoading]);

  const handleNavigation = (type: string, slug: string) => {
    switch (type) {
      case "course":
        router.push(`/dashboard/${slug}`);
        break;
      case "section":
        router.push(`/dashboard/section/${slug}`);
        break;
      case "user":
        router.push(`/dashboard/users/${slug}`);
        break;
    }
  };

  const renderStatus = (item: Course | User) => {
    if ("paid" in item) {
      return (
        <span
          className={`${
            item.paid
              ? "bg-green-500/20 text-green-400 border-green-500"
              : "bg-gray-700 text-gray-300 border-gray-600"
          } px-2 py-1 text-xs font-medium rounded-md`}
        >
          {item.paid ? "Paid" : "Free"}
        </span>
      );
    }

    if ("isVerified" in item) {
      return (
        <span
          className={`${
            item.isVerified
              ? "bg-green-500/20 text-green-400 border-green-500"
              : "bg-yellow-500/20 text-yellow-400 border-yellow-500"
          } px-2 py-1 text-xs font-medium rounded-md`}
        >
          {item.isVerified ? "Verified" : "Unverified"}
        </span>
      );
    }
  };

  const renderPublishStatus = (item: Course) => {
    if ("isPublished" in item) {
      return (
        <span
          className={`${
            item.isPublished
              ? "bg-green-500/20 text-green-400 border-green-500"
              : "bg-yellow-500/20 text-yellow-400 border-yellow-500"
          } px-2 py-1 text-xs font-medium rounded-md`}
        >
          {item.isPublished ? "Published" : "Draft"}
        </span>
      );
    }
  };

  const renderLoadingSkeleton = () => (
    <div className="w-full overflow-hidden rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>
                <Skeleton className="h-4 w-full" />
              </TableHead>
            ))}
            <TableHead>
              <Skeleton className="h-4 w-20" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
              <TableCell>
                <Skeleton className="h-8 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderActionMenu = (item: Course | User) => {
    if ("role" in item) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem
              onClick={() => {
                handleNavigation("user", item.slug as string);
              }}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4 text-gray-600" />
              <span>Edit User</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {!hideCourse && (
            <DropdownMenuItem
              onClick={() => handleNavigation("course", (item as Course).slug)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4 text-gray-600" />
              <span>Edit Course</span>
            </DropdownMenuItem>
          )}
          {!hideCourse && (
            <DropdownMenuItem
              onClick={() => handleNavigation("section", (item as Course).slug)}
              className="cursor-pointer"
            >
              <FileText className="mr-2 h-4 w-4 text-gray-600" />
              <span>Manage Sections</span>
            </DropdownMenuItem>
          )}
          {!hideChapter && <DropdownMenuSeparator />}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  if (loading || authLoading) return renderLoadingSkeleton();

  if (!isAuthenticated) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Please log in to view this content.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="rounded-lg border border-gray-800 bg-gray-900 shadow-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 border-b border-gray-700">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="py-3 px-4 font-semibold text-green-400"
                >
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="py-3 px-4 font-semibold text-green-400">
                Status
              </TableHead>
              <TableHead className="py-3 px-4 font-semibold text-green-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-inter">
            {data.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-800 transition-colors border-b border-gray-700"
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className="py-3 px-4 text-gray-300"
                  >
                    {column.key === "description" ? (
                      truncateDescription(String(item[column.key] || ""))
                    ) : column.key === "price" ? (
                      <div className="flex flex-col">
                        {(item as Course).salePrice ? (
                          <>
                            <span className="text-green-400 font-semibold">
                              {formatPrice(Number((item as Course).salePrice))}
                            </span>
                            <span className="text-gray-500 line-through text-sm">
                              {formatPrice(Number(item[column.key]))}
                            </span>
                          </>
                        ) : (
                          <span className="text-green-400 font-semibold">
                            {formatPrice(Number(item[column.key]))}
                          </span>
                        )}
                      </div>
                    ) : column.key === "category" ? (
                      // Handle category object display
                      item[column.key] &&
                      typeof item[column.key] === "object" ? (
                        <span className="bg-blue-500/20 text-blue-400 border-blue-500 border px-2 py-1 text-xs font-medium rounded-md inline-block">
                          {(item[column.key] as any)?.name || "No Category"}
                        </span>
                      ) : (
                        String(item[column.key] || "No Category")
                      )
                    ) : column.key === "createdAt" ||
                      column.key === "updatedAt" ? (
                      new Date(item[column.key] as string).toLocaleDateString()
                    ) : typeof item[column.key] === "boolean" ? (
                      // Handle boolean status fields as badges
                      column.key.startsWith("is") ? (
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-md border inline-block ${
                            item[column.key]
                              ? "bg-green-500/20 text-green-400 border-green-500"
                              : "bg-gray-700 text-gray-300 border-gray-600"
                          }`}
                        >
                          {(() => {
                            const value = Boolean(item[column.key]);
                            switch (column.key) {
                              case "isPublished":
                                return value ? "Published" : "Draft";
                              case "isFeatured":
                                return value ? "Featured" : "Not Featured";
                              case "isPopular":
                                return value ? "Popular" : "Not Popular";
                              case "isTrending":
                                return value ? "Trending" : "Not Trending";
                              case "isBestseller":
                                return value ? "Bestseller" : "Not Bestseller";
                              case "isPublic":
                                return value ? "Public" : "Private";
                              default:
                                return value ? "Yes" : "No";
                            }
                          })()}
                        </span>
                      ) : item[column.key] ? (
                        "Yes"
                      ) : (
                        "No"
                      )
                    ) : column.key === "language" ? (
                      // Handle language display with badge
                      <span className="bg-purple-500/20 text-purple-400 border-purple-500 border px-2 py-1 text-xs font-medium rounded-md capitalize inline-block">
                        {String(item[column.key] || "Not Set")}
                      </span>
                    ) : item[column.key] === null ||
                      item[column.key] === undefined ? (
                      "-"
                    ) : (
                      String(item[column.key])
                    )}
                  </TableCell>
                ))}

                <TableCell className="py-3 px-4">
                  <div className="flex flex-wrap gap-2">
                    {"isPublished" in item &&
                      renderPublishStatus(item as Course)}
                    {renderStatus(item)}
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4">
                  {renderActionMenu(item)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalItems > 12 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 px-2">
          <p className="text-sm text-gray-400">
            Showing {(currentPage - 1) * 12 + 1} to{" "}
            {Math.min(currentPage * 12, totalItems)} of {totalItems} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="h-8"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="flex items-center px-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="h-8"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
