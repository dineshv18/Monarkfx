"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Loader2,
  Users,
  BookOpen,
  Key,
  ArrowLeft,
  Search,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { User, Course, DashboardResponse } from "./admin.type";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AccessCoursePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<{ data: DashboardResponse }>(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard-data`,
        {
          withCredentials: true,
        }
      );
      setUsers(response.data.data.users);
      setCourses(response.data.data.courses);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const assignCourse = async (userId: string, courseId: string) => {
    try {
      setAssigning(courseId);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/assign-course`,
        { userId, courseId },
        {
          withCredentials: true,
        }
      );

      toast({
        title: "Success",
        description: "Course assigned successfully",
      });

      await fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign course",
        variant: "destructive",
      });
    } finally {
      setAssigning("");
    }
  };

  const assignMultipleCourses = async (userId: string) => {
    try {
      setAssigning("multiple");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/assign-bulk-courses`,
        {
          assignments: [
            {
              userId,
              courseIds: selectedCourses,
            },
          ],
        },
        {
          withCredentials: true,
        }
      );

      toast({
        title: "Success",
        description: "Courses assigned successfully",
      });

      setSelectedCourses([]);
      await fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign courses",
        variant: "destructive",
      });
    } finally {
      setAssigning("");
    }
  };

  const removeCourseAccess = async (userId: string, courseId: string) => {
    try {
      setAssigning(`removing-${courseId}`);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/remove-course-access`,
        { userId, courseId },
        { withCredentials: true }
      );

      toast({
        title: "Success",
        description: "Course access removed successfully",
      });

      await fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove course access",
        variant: "destructive",
      });
    } finally {
      setAssigning("");
    }
  };

  const isUserEnrolled = (user: User, courseId: string) => {
    return (
      user.enrollments.some((e) => e.course.id === courseId) ||
      user.purchases.some((p) => p.course.id === courseId)
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDialogContent = (user: User) => (
    <DialogContent className="max-w-2xl bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-white">
          Manage Course Access for {user.name}
        </DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
        {courses.map((course) => {
          const isEnrolled = isUserEnrolled(user, course.id);
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-300 ${
                isEnrolled
                  ? "bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-600/50"
                  : "bg-gradient-to-r from-zinc-800/50 to-zinc-700/50 border-zinc-700 hover:border-green-500/50 hover:bg-zinc-700/70"
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course.id) || isEnrolled}
                  onChange={(e) => {
                    if (isEnrolled) {
                      // If enrolled, clicking checkbox will remove access
                      removeCourseAccess(user.id, course.id);
                    } else {
                      if (e.target.checked) {
                        setSelectedCourses([...selectedCourses, course.id]);
                      } else {
                        setSelectedCourses(
                          selectedCourses.filter((id) => id !== course.id)
                        );
                      }
                    }
                  }}
                  className="h-4 w-4 accent-green-600"
                />
                <div>
                  <p className="font-medium text-white truncate">
                    {course.title}
                    {isEnrolled && (
                      <span className="ml-2 text-xs text-green-400 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Enrolled
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {course.category.name} • {course.language}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <Button
          variant="outline"
          onClick={() => setSelectedCourses([])}
          className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:border-green-500/50 hover:text-green-400 transition-all duration-300"
        >
          Clear Selection
        </Button>
        <Button
          onClick={() => assignMultipleCourses(user.id)}
          disabled={selectedCourses.length === 0 || assigning === "multiple"}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {assigning === "multiple" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            `Assign ${selectedCourses.length} Course${
              selectedCourses.length !== 1 ? "s" : ""
            }`
          )}
        </Button>
      </div>
    </DialogContent>
  );

  // Stats data
  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Courses",
      value: courses.length.toString(),
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Active Enrollments",
      value: users
        .reduce((acc, user) => acc + user.enrollments.length, 0)
        .toString(),
      icon: Key,
      color: "from-purple-500 to-pink-500",
    },
  ];

  if (loading) {
    return (
      <div className="py-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      {/* Header Section */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg hover:from-zinc-700 hover:to-zinc-600 transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5 text-zinc-300" />
              </motion.div>
            </Link>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Course{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                  Access
                </span>
              </h1>
              <p className="text-xl text-zinc-300 max-w-3xl">
                Manage user access to courses and track enrollment status
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-zinc-400">{stat.title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>{filteredUsers.length} users found</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">
                  User Course Management
                </h3>
                <p className="text-zinc-400">
                  Assign and manage course access for users
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                    <TableHead className="text-zinc-300 font-semibold">
                      User
                    </TableHead>
                    <TableHead className="text-zinc-300 font-semibold">
                      Email
                    </TableHead>
                    <TableHead className="text-zinc-300 font-semibold">
                      Enrollments
                    </TableHead>
                    <TableHead className="text-zinc-300 font-semibold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-zinc-700 hover:bg-zinc-800/30 transition-colors"
                    >
                      <TableCell className="text-white font-medium">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 font-medium">
                            {user.enrollments.length + user.purchases.length}
                          </span>
                          <span className="text-zinc-500">courses</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white border-0 transition-all duration-300"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Manage Access
                            </Button>
                          </DialogTrigger>
                          {renderDialogContent(user)}
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
