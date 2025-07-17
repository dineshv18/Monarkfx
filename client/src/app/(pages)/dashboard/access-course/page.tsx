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
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { User, Course, DashboardResponse } from "./admin.type";

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
    <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-white">
          Manage Course Access for {user.name}
        </DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
        {courses.map((course) => {
          const isEnrolled = isUserEnrolled(user, course.id);
          return (
            <div
              key={course.id}
              className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                isEnrolled
                  ? "bg-green-900/30 border-green-600"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700"
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
                      <span className="ml-2 text-xs text-green-400">
                        (Already Enrolled)
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-400">
                    {course.category.name} • {course.language}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <Button
          variant="outline"
          onClick={() => setSelectedCourses([])}
          className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600"
        >
          Clear Selection
        </Button>
        <Button
          onClick={() => assignMultipleCourses(user.id)}
          disabled={selectedCourses.length === 0 || assigning === "multiple"}
          className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
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

  return (
    <div className="py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          User Course Management
        </h1>
        <p className="text-gray-400">
          Assign and manage course access for users
        </p>
      </div>

      <Card className="bg-gray-900 border-gray-800 shadow-lg">
        <CardHeader className="space-y-6 border-b border-gray-800">
          <CardTitle className="text-2xl font-bold text-white">
            Course Access Control
          </CardTitle>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-green-600 focus:ring-green-600"
            />
            <Button
              variant="outline"
              onClick={() => setSearchTerm("")}
              className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600"
            >
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-gray-800/50">
                    <TableHead className="w-[200px] text-green-400 font-semibold">
                      Name
                    </TableHead>
                    <TableHead className="w-[250px] text-green-400 font-semibold">
                      Email
                    </TableHead>
                    <TableHead className="w-[100px] text-green-400 font-semibold">
                      Type
                    </TableHead>
                    <TableHead className="w-[200px] text-green-400 font-semibold">
                      Purchased
                    </TableHead>
                    <TableHead className="w-[200px] text-green-400 font-semibold">
                      Enrolled
                    </TableHead>
                    <TableHead className="w-[150px] text-right text-green-400 font-semibold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-10 text-gray-400"
                      >
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        className="border-gray-800 hover:bg-gray-800/30"
                      >
                        <TableCell className="font-medium text-white">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-900/30 text-green-400 border border-green-600">
                            {user.usertype}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-gray-300">
                          {user.purchases.length > 0
                            ? user.purchases
                                .map((p) => p.course.title)
                                .join(", ")
                            : "No purchases"}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-gray-300">
                          {user.enrollments.length > 0
                            ? user.enrollments
                                .map((e) => e.course.title)
                                .join(", ")
                            : "Not enrolled"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                              >
                                Manage Access
                              </Button>
                            </DialogTrigger>
                            {renderDialogContent(user)}
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
