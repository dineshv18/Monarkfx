"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/helper/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  Shield,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
} from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

interface NewUser {
  name: string;
  email: string;
  password: string;
  role: "STUDENT" | "ADMIN";
  usertype: "ONLINE" | "OFFLINE";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "ADMIN";
  usertype: "ONLINE" | "OFFLINE";
  isVerified: boolean;
  slug: string;
  verificationToken?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserChanges {
  [userId: string]: {
    [field: string]: any;
  };
}

const AdminUsersPage: React.FC = () => {
  const { checkAuth } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    usertype: "ONLINE",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [userChanges, setUserChanges] = useState<UserChanges>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  // Animation refs
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const tableRef = useRef(null);
  const formRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true });
  const isTableInView = useInView(tableRef, { once: true });
  const isFormInView = useInView(formRef, { once: true });

  useEffect(() => {
    const init = async () => {
      const isAuth = await checkAuth();
      if (!isAuth) {
        setLoading(false);
        toast({
          title: "Authentication Error",
          description: "You are not authorized to view this page.",
          variant: "destructive",
        });
        return;
      }
      fetchUsers();
    };
    init();
  }, [checkAuth]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<{
        data: { users: User[]; totalUsers: number };
      }>(`${process.env.NEXT_PUBLIC_API_URL}/user/get-all-users`, {
        withCredentials: true,
      });
      setUsers(response.data.data.users);
      setTotalUsers(response.data.data.totalUsers);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewUser({
      ...newUser,
      [name]: value as "STUDENT" | "ADMIN" | "ONLINE" | "OFFLINE",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        newUser,
        {
          withCredentials: true,
        }
      );
      toast({
        title: "Success",
        description: response.data.message,
      });
      fetchUsers();
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "STUDENT",
        usertype: "ONLINE",
      });
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleDelete = async (slug: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/user/admin-delete-user/${slug}`,
          {
            withCredentials: true,
          }
        );
        toast({
          title: "Success",
          description: response.data.message,
        });
        fetchUsers();
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };

  const handleUserChange = (userId: string, field: string, value: any) => {
    // Update changes tracker
    setUserChanges((prev) => ({
      ...prev,
      [userId]: {
        ...(prev[userId] || {}),
        [field]: value,
      },
    }));

    // Update UI state
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );
  };

  const handleUpdate = async (slug: string, userId: string) => {
    const changes = userChanges[userId];

    if (!changes || Object.keys(changes).length === 0) {
      setEditingUser(null);
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/admin-update-user/${slug}`,
        changes,
        { withCredentials: true }
      );

      toast({
        title: "Success",
        description: response.data.message,
      });

      // Clear changes for this user
      setUserChanges((prev) => {
        const { [userId]: _, ...rest } = prev;
        return rest;
      });

      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Filter users based on search and filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const UserTableSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Animated Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
          <Users className="h-4 w-4" />
          Student Management
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Manage Your Students
        </h1>
        <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
          Create, edit, and monitor student accounts with comprehensive user
          management tools
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <Link href="/dashboard/students/import-users">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Users
          </Button>
        </Link>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Data
        </Button>
      </motion.div>

      {/* Animated Stats Cards */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-white">{totalUsers}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  Verified Users
                </p>
                <p className="text-3xl font-bold text-white">
                  {users.filter((user) => user.isVerified).length}
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <UserCheck className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">Admins</p>
                <p className="text-3xl font-bold text-white">
                  {users.filter((user) => user.role === "ADMIN").length}
                </p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900/80 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-full sm:w-48 bg-zinc-900/80 border-zinc-700 text-white">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="STUDENT">Students</SelectItem>
            <SelectItem value="ADMIN">Admins</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Users Table */}
      <motion.div
        ref={tableRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isTableInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              User List ({filteredUsers.length} users)
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Manage existing users and their permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <UserTableSkeleton />
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-zinc-800/50 to-black/50 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {user.name}
                          </h3>
                          <p className="text-zinc-400">{user.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === "ADMIN"
                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            }`}
                          >
                            {user.role}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.isVerified
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {user.isVerified ? (
                              <span className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Verified
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <XCircle className="h-3 w-3" />
                                Not Verified
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-zinc-400 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(user.createdAt)}</span>
                        </div>

                        <div className="flex space-x-2">
                          {editingUser === user.id ? (
                            <Button
                              onClick={() => handleUpdate(user.slug, user.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              disabled={!userChanges[user.id]}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              onClick={() => setEditingUser(user.id)}
                              size="sm"
                              variant="outline"
                              className="border-zinc-600 hover:border-green-500 text-zinc-300 hover:text-white"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDelete(user.slug)}
                            size="sm"
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Edit Form (when editing) */}
                    {editingUser === user.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-zinc-700"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-zinc-300">Name</Label>
                            <Input
                              value={user.name}
                              onChange={(e) =>
                                handleUserChange(
                                  user.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="mt-1 bg-zinc-800 border-zinc-700 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-zinc-300">Role</Label>
                            <Select
                              value={user.role}
                              onValueChange={(value) =>
                                handleUserChange(user.id, "role", value)
                              }
                            >
                              <SelectTrigger className="mt-1 bg-zinc-800 border-zinc-700 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="STUDENT">Student</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-zinc-300">
                              Verification
                            </Label>
                            <Select
                              value={user.isVerified.toString()}
                              onValueChange={(value) =>
                                handleUserChange(
                                  user.id,
                                  "isVerified",
                                  value === "true"
                                )
                              }
                            >
                              <SelectTrigger className="mt-1 bg-zinc-800 border-zinc-700 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">Verified</SelectItem>
                                <SelectItem value="false">
                                  Not Verified
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Create New User Form */}
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isFormInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New User
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Add a new student or admin to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-zinc-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={newUser.password}
                      onChange={handleInputChange}
                      required
                      className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500 pr-10"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-zinc-300">
                    Role
                  </Label>
                  <Select
                    name="role"
                    value={newUser.role}
                    onValueChange={(value) => handleSelectChange("role", value)}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usertype" className="text-zinc-300">
                    User Type
                  </Label>
                  <Select
                    name="usertype"
                    value={newUser.usertype}
                    onValueChange={(value) =>
                      handleSelectChange("usertype", value)
                    }
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ONLINE">Online</SelectItem>
                      <SelectItem value="OFFLINE">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!newUser.name || !newUser.email || !newUser.password}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create User
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminUsersPage;
