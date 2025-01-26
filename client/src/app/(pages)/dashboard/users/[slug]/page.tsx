"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/helper/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface UserFormData {
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT";
  isVerified: boolean;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT";
  isVerified: boolean;
  slug: string;
}

export default function UserPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { checkAuth } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormData>();

  const currentRole = watch("role");
  const currentVerified = watch("isVerified");

  useEffect(() => {
    const init = async () => {
      const isAuth = await checkAuth();
      if (!isAuth) {
        router.push("/auth");
        return;
      }
      fetchUserData();
    };
    init();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/admin-get-user/${slug}`
      );

      const user = response.data.data.user;
      setUserData(user);

      setValue("name", user.name);
      setValue("email", user.email);
      setValue("role", user.role);
      setValue("isVerified", user.isVerified);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    setUpdating(true);
    try {
      // Only send changed fields
      const changedFields: Partial<UserFormData> = {};
      if (data.name !== userData?.name) changedFields.name = data.name;
      if (data.role !== userData?.role) changedFields.role = data.role;
      if (data.isVerified !== userData?.isVerified)
        changedFields.isVerified = data.isVerified;

      // Use slug for update
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/admin-update-user/${slug}`,
        changedFields
      );

      if (response.data.success) {
        toast.success("User updated successfully");
        await fetchUserData();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/user/admin-delete-user/${userData?.slug}`
      );

      if (response.data.success) {
        toast.success("User deleted successfully");
        router.push("/dashboard/users");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete user");
    }
  };

  if (loading) {
    return <UserSkeleton />;
  }

  return (
    <div className="p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                {userData?.name || "User Details"}
              </CardTitle>
              <CardDescription>{userData?.email}</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the user account and all associated data including:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Course purchases</li>
                        <li>Course enrollments</li>
                        <li>Course progress</li>
                        <li>Billing details</li>
                        <li>Reviews and ratings</li>
                        <li>Cart items</li>
                      </ul>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteUser}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Delete User
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  {...register("name", { required: "Name is required" })}
                  className="mt-1"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...register("email")}
                  className="mt-1 bg-gray-50"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm font-medium">Role</label>
                <Select
                  value={currentRole}
                  onValueChange={(value) =>
                    setValue("role", value as "ADMIN" | "STUDENT")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="STUDENT">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Email Verified
                </label>
                <Switch
                  checked={currentVerified}
                  onCheckedChange={(checked) => setValue("isVerified", checked)}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/users")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updating}
                className="bg-primary hover:bg-primary/90"
              >
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function UserSkeleton() {
  return (
    <div className="p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
