"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, Trash2, CheckCircle, XCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { CourseDataNew } from "@/type";

interface CourseFormProps {
  isEditing: boolean;
  initialData: CourseDataNew | null;
  courseSlug: string | null;
  onUpdateSuccess?: (data: CourseDataNew) => void;
}

const ToggleSwitch: React.FC<{
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  activeColor: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
}> = ({
  checked,
  onCheckedChange,
  label,
  activeColor,
  activeIcon,
  inactiveIcon,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          checked ? activeColor : "bg-gray-200"
        }`}
        onClick={() => onCheckedChange(!checked)}
      >
        <span
          className={`${
            checked ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        >
          {checked ? activeIcon : inactiveIcon}
        </span>
      </button>
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </div>
  );
};

const CourseForm: React.FC<CourseFormProps> = ({
  isEditing,
  initialData,
  courseSlug,
  onUpdateSuccess,
}) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData?.thumbnail
      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${initialData.thumbnail}`
      : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState<CourseDataNew | null>(
    initialData
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CourseDataNew>({
    defaultValues: initialData || {},
    mode: "onSubmit",
  });

  const isPaid = watch("paid");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const onSubmit: SubmitHandler<CourseDataNew> = async (data) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/course/update-course/${courseSlug}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const updatedData = response.data.message;
        setCourseData(updatedData);
        onUpdateSuccess?.(updatedData);
        toast.success("Course updated!");
        router.push("/dashboard");
      } else {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (typeof value === "boolean") {
            formData.append(key, value ? "true" : "false");
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        });
        if (thumbnail) {
          formData.append("thumbnail", thumbnail);
        }
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/course/create-course`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          toast.success("Course created successfully!");
          router.push(`/dashboard/section/${response.data.message.slug}`);
        } else {
          throw new Error(response.data.message || "Failed to create course");
        }
      }
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!courseSlug) return;
    setIsLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/course/delete-course/${courseSlug}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Course deleted successfully");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (property: keyof CourseDataNew) => {
    if (!courseSlug || !courseData) return;
    try {
      const updatedValue = !courseData[property];
      const newData = {
        ...courseData,
        [property]: updatedValue,
      };
      setCourseData(newData);
      setValue(property, updatedValue);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/course/toggle-course-property/${courseSlug}`,
        { property },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        const serverValue = response.data.data[property];
        const updatedCourseData = {
          ...courseData,
          [property]: serverValue,
        };
        setCourseData(updatedCourseData);
        setValue(property, serverValue);
        onUpdateSuccess?.(updatedCourseData);
        toast.success(`Course ${property} updated successfully`);
      } else {
        throw new Error("Failed to update");
      }
    } catch {
      setCourseData((prev) => ({
        ...prev!,
        [property]: !courseData[property],
      }));
      setValue(property, courseData[property]);
      toast.error(`Failed to update ${property}`);
    }
  };

  const updateThumbnail = async () => {
    if (!thumbnail || !courseSlug) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/course/update-course-image/${courseSlug}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setThumbnailPreview(
        `${process.env.NEXT_PUBLIC_IMAGE_URL}/${response.data.message.thumbnail}`
      );
      toast.success("Thumbnail updated successfully");
    } catch (error) {
      console.error("Error updating thumbnail:", error);
      toast.error("Failed to update thumbnail");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing && thumbnail) {
      updateThumbnail();
    }
  }, [thumbnail, isEditing]);

  if (!courseData && isEditing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card className="shadow-lg bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            {isEditing ? "Edit Course" : "Create New Course"}
          </CardTitle>
          {isEditing && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Course
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the course and remove all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <Label
                htmlFor="isPublished"
                className="text-lg font-semibold text-gray-700 dark:text-gray-200"
              >
                Course Status
              </Label>
              <Controller
                name="isPublished"
                control={control}
                render={({ field }) => (
                  <ToggleSwitch
                    checked={!!field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (isEditing) {
                        handleToggle("isPublished");
                      }
                    }}
                    label={field.value ? "Published" : "Draft"}
                    activeColor="bg-green-500"
                    activeIcon={<CheckCircle className="w-4 h-4" />}
                    inactiveIcon={<XCircle className="w-4 h-4" />}
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <Label
                htmlFor="paid"
                className="text-lg font-semibold text-gray-700 dark:text-gray-200"
              >
                Course Type
              </Label>
              <Controller
                name="paid"
                control={control}
                render={({ field }) => (
                  <ToggleSwitch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (isEditing) {
                        handleToggle("paid");
                      }
                    }}
                    label={field.value ? "Paid" : "Free"}
                    activeColor="bg-blue-500"
                    activeIcon={<CheckCircle className="w-4 h-4" />}
                    inactiveIcon={<XCircle className="w-4 h-4" />}
                  />
                )}
              />
            </div>

            <Accordion
              type="single"
              collapsible
              defaultValue="basic-info"
              className="bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <AccordionItem value="basic-info">
                <AccordionTrigger className="text-lg font-semibold px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  Basic Information
                </AccordionTrigger>
                <AccordionContent className="space-y-4 p-4">
                  <div>
                    <Label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Title
                    </Label>
                    <Input
                      id="title"
                      {...register("title", { required: "Title is required" })}
                      placeholder="Course title"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Description
                    </Label>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: "Description is required" }}
                      render={({ field }) => (
                        <ReactQuill
                          theme="snow"
                          value={field.value}
                          onChange={field.onChange}
                          className="mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      )}
                    />
                  </div>

                  {isPaid && (
                    <div>
                      <Label
                        htmlFor="price"
                        className="text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Regular Price ($)
                      </Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <Input
                          id="price"
                          {...register("price", {
                            required: {
                              value: isPaid,
                              message: "Price is required for paid courses",
                            },
                            validate: {
                              positive: (value) => {
                                if (!isPaid) return true;
                                const numValue = parseFloat(
                                  value as unknown as string
                                );
                                return (
                                  numValue > 0 ||
                                  "Price must be greater than 0 for paid courses"
                                );
                              },
                            },
                          })}
                          className="pl-8"
                          placeholder="499.00"
                          type="number"
                          min="1"
                          step="0.01"
                          disabled={!isPaid}
                        />
                      </div>
                    </div>
                  )}
                  {isPaid && (
                    <div>
                      <Label
                        htmlFor="salePrice"
                        className="text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Sale Price (Optional) ($)
                      </Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <Input
                          id="salePrice"
                          {...register("salePrice", {
                            validate: {
                              positive: (value) => {
                                if (!value) return true; // Allow empty value
                                if (!isPaid) return true;
                                const numValue = parseFloat(
                                  value as unknown as string
                                );
                                return (
                                  numValue > 0 ||
                                  "Sale Price must be greater than 0"
                                );
                              },
                            },
                          })}
                          className="pl-8"
                          placeholder="299.00"
                          type="number"
                          min="1"
                          disabled={!isPaid}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label
                      htmlFor="language"
                      className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Language
                    </Label>
                    <Input
                      id="language"
                      {...register("language", {
                        required: "Language is required",
                      })}
                      placeholder="Course language"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="subheading"
                      className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Subheading
                    </Label>
                    <Input
                      id="subheading"
                      {...register("subheading")}
                      placeholder="Course subheading"
                      className="mt-1"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="seo">
                <AccordionTrigger className="text-lg font-semibold px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  SEO Settings
                </AccordionTrigger>
                <AccordionContent className="space-y-4 p-4">
                  <div>
                    <Label
                      htmlFor="metaTitle"
                      className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Meta Title
                    </Label>
                    <Input
                      id="metaTitle"
                      {...register("metaTitle")}
                      placeholder="SEO Meta title"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="metaDesc"
                      className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Meta Description
                    </Label>
                    <Textarea
                      id="metaDesc"
                      {...register("metaDesc")}
                      placeholder="SEO Meta description"
                      className="mt-1"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="settings">
                <AccordionTrigger className="text-lg font-semibold px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  Course Settings
                </AccordionTrigger>
                <AccordionContent className="space-y-4 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {["featured", "popular", "trending", "bestseller"].map(
                      (type) => (
                        <div
                          key={type}
                          className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                        >
                          <Label className="capitalize text-sm font-medium text-gray-700 dark:text-gray-200">
                            {type}
                          </Label>
                          <Controller
                            name={
                              `is${
                                type.charAt(0).toUpperCase() + type.slice(1)
                              }` as keyof CourseDataNew
                            }
                            control={control}
                            render={({ field }) => (
                              <ToggleSwitch
                                checked={!!field.value}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked);
                                  if (isEditing) {
                                    handleToggle(
                                      `is${
                                        type.charAt(0).toUpperCase() +
                                        type.slice(1)
                                      }` as keyof CourseDataNew
                                    );
                                  }
                                }}
                                label={field.value ? "Yes" : "No"}
                                activeColor="bg-blue-500"
                                activeIcon={<CheckCircle className="w-4 h-4" />}
                                inactiveIcon={<XCircle className="w-4 h-4" />}
                              />
                            )}
                          />
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="thumbnail">
                <AccordionTrigger className="text-lg font-semibold px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  Course Thumbnail
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200"
                  >
                    <input {...getInputProps()} />
                    {thumbnailPreview ? (
                      <div className="relative h-[200px] w-full">
                        <Image
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="py-8">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Drag & drop or click to select thumbnail
                        </p>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="video">
                <AccordionTrigger className="text-lg font-semibold px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  Thumbnail Video
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <div>
                    <Label
                      htmlFor="videoUrl"
                      className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Video URL
                    </Label>
                    <Input
                      id="videoUrl"
                      {...register("videoUrl")}
                      placeholder="https://www.your-video-url.com"
                      className="mt-1"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col space-y-4">
              {Object.keys(errors).length > 0 && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">
                    Please fix the following errors:
                  </strong>
                  <ul className="mt-2 list-disc list-inside">
                    {Object.entries(errors).map(([key, error]) => (
                      <li key={key}>{error.message}</li>
                    ))}
                  </ul>
                </div>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                text-white font-semibold py-2.5 px-6 rounded-lg 
                transform transition-all duration-200 
                hover:scale-[1.02] hover:shadow-lg 
                active:scale-[0.98] 
                disabled:opacity-70 disabled:cursor-not-allowed
                shadow-md"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Please wait...</span>
                  </div>
                ) : isEditing ? (
                  "Update Course"
                ) : (
                  "Create Course"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseForm;
