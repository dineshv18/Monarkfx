"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { format, isWithinInterval, parseISO } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, BarChart2, PieChart, Download } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useAuth } from "@/helper/AuthContext";
import { cn } from "@/lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Purchase {
  id: string;
  courseId: string;
  userId: string;
  createdAt: string;
  purchasePrice: number;      
  discountPrice?: number;
  couponCode?: string;
  savingsAmount?: number;
  course: {
    title: string;
    price: number;           
    salePrice?: number;      
  };
  user?: {
    name: string;
    email: string;
  };
}

interface CourseCount {
  [key: string]: number;
}

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("en-IN", options).format(new Date(date));
};

export default function Purchase() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "recent" | "analytics">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const { isAuthenticated } = useAuth();

  const uniqueCourses = Array.from(
    new Set(purchases.map((p) => p.course.title))
  ).sort();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/purchase/all`,
          {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setPurchases(
          Array.isArray(data?.data?.purchases) ? data.data.purchases : []
        );
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch purchases");
        setPurchases([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchPurchases();
  }, [isAuthenticated]);

  const formatPrice = (price?: number) => {
    if (!price && price !== 0) return "$0";
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const courseCounts = purchases.reduce((acc, purchase) => {
    const courseTitle = purchase.course.title;
    acc[courseTitle] = (acc[courseTitle] || 0) + 1;
    return acc;
  }, {} as CourseCount);

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch =
      purchase.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse =
      selectedCourse === "all" || purchase.course.title === selectedCourse;

    const matchesDateRange =
      !dateRange.from ||
      !dateRange.to ||
      isWithinInterval(parseISO(purchase.createdAt), {
        start: dateRange.from,
        end: dateRange.to,
      });

    return matchesSearch && matchesCourse && matchesDateRange;
  });

  const sortedPurchases = [...filteredPurchases].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.course.price - a.course.price;
  });

  const displayPurchases =
    activeTab === "recent" ? sortedPurchases.slice(0, 5) : sortedPurchases;

    const totalAmount = filteredPurchases.reduce(
      (sum, purchase) => sum + purchase.purchasePrice,
      0
    );

  const barChartData = {
    labels: Object.keys(courseCounts),
    datasets: [
      {
        label: "Number of Purchases",
        data: Object.values(courseCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(courseCounts),
    datasets: [
      {
        data: Object.values(courseCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

   const downloadCSV = () => {
    const formatCSVPrice = (price: number) => {
      return price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false 
      });
    };
  
    const escapeCSV = (field: string | number): string => {
      const stringField = String(field);
      if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
      return `"${stringField.replace(/"/g, '""')}"`;
      }
      return stringField;
    };
  
    const headers = [
      "Course",
      "User",
      "Purchase Price ($)",
      "Original Price ($)",
      "Savings ($)",
      "Coupon Code",
      "Purchase Date",
      "Status",
    ];
  
    const csvContent = [
      headers.join(","),
      ...sortedPurchases.map((purchase) =>
        [
          escapeCSV(purchase.course.title),
          escapeCSV(purchase.user?.email || "N/A"),
          formatCSVPrice(purchase.purchasePrice),
          formatCSVPrice(purchase.course.price),
          formatCSVPrice(purchase.savingsAmount || 0),
          escapeCSV(purchase.couponCode || "N/A"),
          escapeCSV(formatDate(purchase.createdAt)),
          "Completed"
        ].join(",")
      ),
    ].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `purchases-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-4 sm:p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Card>
          <div className="p-4 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Input
            placeholder="Search courses or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-[240px] justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Select date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range) => {
                    setDateRange({
                      from: range?.from,
                      to: range?.to,
                    });
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {uniqueCourses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(value: "date" | "price") => setSortBy(value)}
            >
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Purchases
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalAmount.toLocaleString("en-IN")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Popular Course
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.entries(courseCounts).length > 0
                ? Object.entries(courseCounts).reduce((a, b) =>
                    a[1] > b[1] ? a : b
                  )[0]
                : "No courses yet"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Table */}
      <Card className="overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 sm:px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "all"
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setActiveTab("recent")}
            className={`px-4 sm:px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "recent"
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Recent Orders
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 sm:px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "analytics"
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Analytics
          </button>
        </div>

        {activeTab === "analytics" ? (
          <div className="p-4 grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Course Purchases</h3>
              <Bar data={barChartData} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Purchase Distribution
              </h3>
              <Pie data={pieChartData} />
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <ScrollArea className="h-[400px]">
              <div className="min-w-[800px] p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[25%]">Course</TableHead>
                      <TableHead className="w-[20%]">User</TableHead>
                      <TableHead className="w-[20%]">Price Details</TableHead>
                      <TableHead className="w-[20%]">Purchase Date</TableHead>
                      <TableHead className="w-[15%]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayPurchases.length > 0 ? (
                      displayPurchases.map((purchase) => (
                        <TableRow key={purchase.id}>
                          <TableCell className="font-medium">
                            {purchase.course.title}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{purchase.user?.name || "N/A"}</span>
                              <span className="text-xs text-gray-500">
                                {purchase.user?.email || "N/A"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[#610981] font-semibold">
                              {formatPrice(purchase.purchasePrice)}
                            </span>
                            {purchase.purchasePrice < purchase.course.price && (
                              <span className="text-gray-500 line-through text-xs">
                                {formatPrice(purchase.course.price)}
                              </span>
                            )}
                          </div>
                          {(purchase.savingsAmount ?? 0) > 0 && (
                            <span className="text-xs text-green-600">
                              Saved: {formatPrice(purchase.savingsAmount)}
                            </span>
                          )}
                          {purchase.couponCode && (
                            <span className="text-xs text-purple-600">
                              Code: {purchase.couponCode}
                            </span>
                          )}
                        </div>
                      </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>
                                {format(
                                  new Date(purchase.createdAt),
                                  "MMM dd, yyyy"
                                )}
                              </span>
                              <span className="text-xs text-gray-500">
                                {format(
                                  new Date(purchase.createdAt),
                                  "hh:mm a"
                                )}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-6 text-gray-500"
                        >
                          No purchases found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>
        )}
      </Card>

      {/* Download CSV Button */}
      <div className="mt-4 flex justify-end">
        <Button onClick={downloadCSV} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download CSV
        </Button>
      </div>
    </div>
  );
}
