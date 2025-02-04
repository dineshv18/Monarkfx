"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Image as ImageIcon,
  Settings,
  Upload,
  Loader2,
  IndianRupee,
  Search
} from "lucide-react"
import { formatIndianPrice } from "@/lib/utils"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

import type { CourseDataNew, Category } from "@/type"
import { toast } from "@/hooks/use-toast"

const CourseForm = ({ isEditing, initialData, courseSlug, onUpdateSuccess }: {
  isEditing: boolean,
  initialData: CourseDataNew | null,
  courseSlug: string | null,
  onUpdateSuccess?: (updatedData: CourseDataNew) => void,
}) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData?.thumbnail ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${initialData.thumbnail}` : null,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [courseData, setCourseData] = useState<CourseDataNew | null>(initialData)
  const [categories, setCategories] = useState<Category[]>([])

  const router = useRouter()

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
  })

  const isPaid = watch("paid")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setThumbnail(file)
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`)
        setCategories(response.data.data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        })
      }
    }
    fetchCategories()
  }, [])

  const onSubmit: SubmitHandler<CourseDataNew> = async (data) => {
    setIsLoading(true)
    try {
      if (isEditing && courseSlug) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/course/update-course/${courseSlug}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        const updatedData = response.data.message
        setCourseData(updatedData)
        onUpdateSuccess?.(updatedData)
        toast({
          title: "Success",
          description: "Course updated successfully!",
        })
        router.push("/dashboard")
      } else {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          if (typeof value === "boolean") {
            formData.append(key, value ? "true" : "false")
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString())
          }
        })
        if (thumbnail) {
          formData.append("thumbnail", thumbnail)
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/course/create-course`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        if (response.data.success) {
          toast({
            title: "Success",
            description: "Course created successfully!",
          })
          router.push(`/dashboard/section/${response.data.message.slug}`)
        } else {
          throw new Error(response.data.message || "Failed to create course")
        }
      }
      router.refresh()
    } catch (error) {
      console.error("Error:", error)
      if (axios.isAxiosError(error) && error.response) {
        toast({
          title: "Error",
          description: error.response.data?.message || "Something went wrong",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!courseSlug) return
    setIsLoading(true)
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/course/delete-course/${courseSlug}`, {
      })
      toast({
        title: "Success",
        description: "Course deleted successfully",
      })
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error deleting course:", error)
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = async (property: keyof CourseDataNew) => {
    if (!courseSlug || !courseData) return
    try {
      const updatedValue = !courseData[property]
      const newData = {
        ...courseData,
        [property]: updatedValue,
      }
      setCourseData(newData)
      setValue(property, updatedValue)
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/course/toggle-course-property/${courseSlug}`,
        { property },
      )
      if (response.data.success) {
        const serverValue = response.data.data[property]
        const updatedCourseData = {
          ...courseData,
          [property]: serverValue,
        }
        setCourseData(updatedCourseData)
        setValue(property, serverValue)
        onUpdateSuccess?.(updatedCourseData)
        toast({
          title: "Success",
          description: `Course ${property} updated successfully`,
        })
      } else {
        throw new Error("Failed to update")
      }
    } catch {
      setCourseData((prev) => ({
        ...prev!,
        [property]: !courseData[property],
      }))
      setValue(property, courseData[property])
      toast({
        title: "Error",
        description: `Failed to update ${property}`,
        variant: "destructive",
      })
    }
  }

  const updateThumbnail = async () => {
    if (!thumbnail || !courseSlug) return
    setIsLoading(true)
    const formData = new FormData()
    formData.append("thumbnail", thumbnail)
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/course/update-course-image/${courseSlug}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

          },
        },
      )
      setThumbnailPreview(`${process.env.NEXT_PUBLIC_IMAGE_URL}/${response.data.message.thumbnail}`)
      toast({
        title: "Success",
        description: "Thumbnail updated successfully",
      })
    } catch (error) {
      console.error("Error updating thumbnail:", error)
      toast({
        title: "Error",
        description: "Failed to update thumbnail",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isEditing && thumbnail) {
      updateThumbnail()
    }
  }, [thumbnail, isEditing, updateThumbnail])

  // Configure ReactQuill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }

  if (!courseData && isEditing) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isEditing ? "Edit Course" : "Create New Course"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Basic
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Media
                </TabsTrigger>
                <TabsTrigger value="pricing" className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  Pricing
                </TabsTrigger>
                <TabsTrigger value="seo" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  SEO
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="basic" className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        {...register("title", { required: "Title is required" })}
                        placeholder="Enter course title"
                        className="w-full"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Course Description</Label>
                      <div className="min-h-[300px]">
                        <Controller
                          name="description"
                          control={control}
                          rules={{ required: "Description is required" }}
                          render={({ field }) => (
                            <ReactQuill
                              theme="snow"
                              modules={modules}
                              value={field.value || ''}
                              onChange={field.onChange}
                              className="bg-white h-[300px] mb-12"
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Controller
                        name="categoryId"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="language">Language</Label>
                      <Input
                        id="language"
                        {...register("language")}
                        placeholder="Course language"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="media" className="space-y-6">
                  {/* Thumbnail Upload */}
                  <div className="grid gap-4">
                    <Label>Course Thumbnail</Label>
                    <div
                      {...getRootProps()}
                      className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors"
                    >
                      <input {...getInputProps()} />
                      {thumbnailPreview ? (
                        <div className="relative h-[200px] w-full">
                          <Image
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
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

                    {/* Video URL */}
                    <div className="grid gap-2 mt-4">
                      <Label htmlFor="videoUrl">Video URL</Label>
                      <Input
                        id="videoUrl"
                        {...register("videoUrl")}
                        placeholder="Enter preview video URL"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-6">
                  {/* Pricing Information */}
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="h-4 w-4" />
                        <Label htmlFor="paid">Paid Course</Label>
                      </div>
                      <Controller
                        name="paid"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    {isPaid && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="price">Price</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                            <Input
                              id="price"
                              type="number"
                              {...register("price", {
                                valueAsNumber: true,
                                validate: (value) => !isPaid || value > 0 || "Price must be greater than 0",
                              })}
                              className="pl-8"
                              placeholder="Enter course price"
                            />
                          </div>
                          {watch("price") && (
                            <p className="text-sm text-muted-foreground">
                              {formatIndianPrice(watch("price"))}
                            </p>
                          )}
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="salePrice">Sale Price (Optional)</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                            <Input
                              id="salePrice"
                              type="number"
                              {...register("salePrice", { valueAsNumber: true })}
                              className="pl-8"
                              placeholder="Enter sale price"
                            />
                          </div>
                          {watch("salePrice") && (
                            <p className="text-sm text-muted-foreground">
                              {formatIndianPrice(watch("salePrice") ?? 0)}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-6">
                  {/* SEO Settings */}
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input
                        id="metaTitle"
                        {...register("metaTitle")}
                        placeholder="SEO meta title"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="metaDesc">Meta Description</Label>
                      <Textarea
                        id="metaDesc"
                        {...register("metaDesc")}
                        placeholder="SEO meta description"
                        rows={4}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  {/* Course Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    {["featured", "popular", "trending", "bestseller"].map((type) => (
                      <div
                        key={type}
                        className="flex items-center justify-between bg-muted p-4 rounded-lg"
                      >
                        <Label className="capitalize text-sm font-medium">
                          {type}
                        </Label>
                        <Controller
                          name={`is${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof CourseDataNew}
                          control={control}
                          render={({ field }) => (
                            <Switch
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            {/* Error Display */}
            {Object.keys(errors).length > 0 && (
              <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg space-y-2">
                <p className="font-semibold">Please fix the following errors:</p>
                <ul className="list-disc list-inside text-sm">
                  {Object.entries(errors).map(([key, error]) => (
                    <li key={key}>{error.message}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Please wait...</span>
                </div>
              ) : isEditing ? (
                "Update Course"
              ) : (
                "Create Course"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CourseForm

