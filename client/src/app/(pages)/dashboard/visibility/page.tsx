"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, UserCheck, Shield } from "lucide-react";
import { useAuth } from "@/helper/AuthContext";

interface User {
    id: string;
    name: string;
    email: string;
}

interface Course {
    id: string;
    title: string;
    isPublic: boolean;
}

interface AccessList {
    id: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

const VisibilityPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [accessList, setAccessList] = useState<AccessList[]>([]);
    const [loading, setLoading] = useState(false);
    const { checkAuth } = useAuth();
    useEffect(() => {
        const initializePage = async () => {
            try {
                setLoading(true);
                const isAuth = await checkAuth();
                if (!isAuth) {
                    toast.error("Authentication required");
                    return;
                }
                await Promise.all([fetchCourses(), fetchUsers()]);
            } catch (error) {
                toast.error("Failed to initialize page");
            } finally {
                setLoading(false);
            }
        };

        initializePage();
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            fetchAccessList(selectedCourse);
        }
    }, [selectedCourse]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/course/get-courses`, {
                withCredentials: true
            });
            setCourses(response.data.data.courses);
        } catch (error) {
            toast.error("Failed to fetch courses");
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/get-all-users`, {
                withCredentials: true
            });
            setUsers(response.data.data.users);
        } catch (error) {
            toast.error("Failed to fetch users");
        }
    };

    const fetchAccessList = async (courseId: string) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/visibility/access-list/${courseId}`
                , {
                    withCredentials: true
                }
            );
            setAccessList(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch access list");
        }
    };

    const handleGrantAccess = async () => {
        if (!selectedCourse || selectedUsers.length === 0) {
            toast.error("Please select course and users");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/visibility/grant`, {
                courseId: selectedCourse,
                userIds: selectedUsers,
            }, { withCredentials: true });
            toast.success("Access granted successfully");
            fetchAccessList(selectedCourse);
            setSelectedUsers([]);
        } catch (error) {
            toast.error("Failed to grant access");
        } finally {
            setLoading(false);
        }
    };

    const handleRevokeAccess = async (userId: string) => {
        if (!selectedCourse) return;

        setLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/visibility/revoke`, {
                courseId: selectedCourse,
                userIds: [userId],
            }, { withCredentials: true });
            toast.success("Access revoked successfully");
            fetchAccessList(selectedCourse);
        } catch (error) {
            toast.error("Failed to revoke access");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !selectedCourse) {
        return (
            <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <Shield className="h-8 w-8 text-red-500" />
                <h1 className="text-3xl font-bold">Course Access Control</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-red-100">
                    <CardHeader className="border-b border-red-50 bg-red-50/30">
                        <CardTitle className="text-red-600 flex items-center gap-2">
                            <UserCheck className="h-5 w-5" />
                            Grant Course Access
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Select Course
                            </label>
                            <Select
                                value={selectedCourse}
                                onValueChange={setSelectedCourse}
                            >
                                <SelectTrigger className="border-red-100 focus:ring-red-200">
                                    <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem
                                            key={course.id}
                                            value={course.id}
                                            className="hover:bg-red-50"
                                        >
                                            {course.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Select Users
                            </label>
                            <Select
                                value={selectedUsers[0]}
                                onValueChange={(value) => setSelectedUsers([value])}
                            >
                                <SelectTrigger className="border-red-100 focus:ring-red-200">
                                    <SelectValue placeholder="Select users" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((user) => (
                                        <SelectItem
                                            key={user.id}
                                            value={user.id}
                                            className="hover:bg-red-50"
                                        >
                                            {user.name} ({user.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={handleGrantAccess}
                            disabled={loading}
                            className="w-full bg-red-500 hover:bg-red-600"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Grant Access
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-red-100">
                    <CardHeader className="border-b border-red-50 bg-red-50/30">
                        <CardTitle className="text-red-600">Access List</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {selectedCourse ? (
                            <div className="space-y-4">
                                {accessList.map((access) => (
                                    <div
                                        key={access.id}
                                        className="flex items-center justify-between p-3 bg-red-50/50 rounded-lg border border-red-100"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {access.user.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {access.user.email}
                                            </p>
                                        </div>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRevokeAccess(access.user.id)}
                                            disabled={loading}
                                            className="bg-red-100 text-red-600 hover:bg-red-200"
                                        >
                                            Revoke
                                        </Button>
                                    </div>
                                ))}
                                {accessList.length === 0 && (
                                    <p className="text-center text-gray-500">
                                        No users have been granted access to this course
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">
                                Select a course to view access list
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default VisibilityPage;