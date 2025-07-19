"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Save,
  Calendar,
  Info,
  Tag,
  IndianRupee,
  Clock,
  User,
  Video,
  Settings,
  FileImage,
  Loader2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { generateSlug } from "@/utils/slugUtils";
import { FileUpload } from "@/components/dropzone";

interface FormData {
  title: string;
  description: string;
  startTime: string;
  thumbnailUrl: string;
  registrationFee: string;
  courseFee: string;
  courseFeeEnabled: boolean;
  registrationEnabled: boolean;
  currentRaga: string;
  currentOrientation: string;
  sessionDescription: string;
  isActive: boolean;
  author: string;
  slug: string;
}

export default function CreateZoomLiveClassPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    startTime: "",
    thumbnailUrl: "",
    registrationFee: "0",
    courseFee: "0",
    courseFeeEnabled: true,
    registrationEnabled: true,
    currentRaga: "",
    currentOrientation: "",
    sessionDescription: "",
    isActive: true,
    author: "",
    slug: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const { toast } = useToast();

  // Generate slug from title automatically
  useEffect(() => {
    if (formData.title && !slugManuallyEdited) {
      const generatedSlug = generateSlug(formData.title);
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, slugManuallyEdited]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Format slug field specifically
    if (name === "slug") {
      const formattedSlug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setFormData((prev) => ({ ...prev, [name]: formattedSlug }));
      setSlugManuallyEdited(true);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // If user is manually editing the slug, track this
    if (name === "slug") {
      setSlugManuallyEdited(true);
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (fileUrl: string) => {
    setFormData((prev) => ({ ...prev, thumbnailUrl: fileUrl }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.title ||
      !formData.startTime ||
      !formData.registrationFee ||
      !formData.courseFee ||
      !formData.thumbnailUrl
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Use the slug directly if provided, otherwise generate from title
      const slug = formData.slug || generateSlug(formData.title);

      // Prepare payload
      const payload: any = {
        title: formData.title,
        description: formData.description || "",
        startTime: formData.startTime,
        registrationFee: parseFloat(formData.registrationFee),
        courseFee: parseFloat(formData.courseFee),
        courseFeeEnabled: true,
        registrationEnabled: formData.registrationEnabled,
        currentRaga: formData.currentRaga || null,
        currentOrientation: formData.currentOrientation || null,
        sessionDescription: formData.sessionDescription || null,
        isActive: formData.isActive,
        thumbnailUrl: formData.thumbnailUrl,
        slug: slug,
        price: 0,
        getPrice: false,
        hasModules: false,
        isFirstModuleFree: false,
        recurringClass: false,
        author: formData.author || "",
      };

      // Create zoom live class
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/class`,
        payload,
        { withCredentials: true }
      );

      toast({
        title: "Success",
        description: "Live class created successfully",
      });

      router.push("/dashboard/zoom");
    } catch (error: any) {
      console.error("Error creating live class:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create class",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="p-0 h-auto text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Live Classes
          </Button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Create New Live Class
            </h1>
            <p className="text-zinc-400 mt-2">
              Set up a new live trading session for your students
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center text-white">
                <Info className="h-5 w-5 mr-2 text-blue-400" />
                Class Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Class Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a descriptive title for your class"
                    className="w-full bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="slug"
                    className="text-sm font-medium text-zinc-300"
                  >
                    URL Slug
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="custom-url-path (leave empty to auto-generate from title)"
                    className="w-full bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                  />
                  <p className="text-xs text-zinc-500">
                    Custom URL identifier (e.g.,
                    "intermediate-bansuri-class-june"). The slug will
                    auto-update as you type the title unless you manually edit
                    it.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="author"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Meeting Author/Host
                  </Label>
                  <div className="relative">
                    <User className="h-4 w-4 absolute left-3 top-3 text-zinc-500" />
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="Host name"
                      className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="startTime"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Start Time <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="h-4 w-4 absolute left-3 top-3 text-zinc-500" />
                    <Input
                      id="startTime"
                      name="startTime"
                      type="datetime-local"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-zinc-300"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what students will learn in this session..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Fees */}
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center text-white">
                <IndianRupee className="h-5 w-5 mr-2 text-green-400" />
                Pricing & Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="registrationFee"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Registration Fee <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <IndianRupee className="h-4 w-4 absolute left-3 top-3 text-zinc-500" />
                    <Input
                      id="registrationFee"
                      name="registrationFee"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.registrationFee}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="courseFee"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Course Fee <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <IndianRupee className="h-4 w-4 absolute left-3 top-3 text-zinc-500" />
                    <Input
                      id="courseFee"
                      name="courseFee"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.courseFee}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="registrationEnabled"
                    checked={formData.registrationEnabled}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("registrationEnabled", checked)
                    }
                  />
                  <Label
                    htmlFor="registrationEnabled"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Enable Registration
                  </Label>
                </div>
                <div className="text-sm text-zinc-400">
                  Allow students to register for this class
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail Upload */}
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center text-white">
                <FileImage className="h-5 w-5 mr-2 text-purple-400" />
                Class Thumbnail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-zinc-400">
                  Upload an image that represents your live class. This will be
                  displayed to students.
                </p>
                <FileUpload
                  onUploadComplete={handleImageUpload}
                  existingImageUrl={formData.thumbnailUrl}
                />
                {formData.thumbnailUrl && (
                  <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-green-400">
                      ✓ Thumbnail uploaded successfully
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Settings */}
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border-zinc-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center text-white">
                <Settings className="h-5 w-5 mr-2 text-yellow-400" />
                Additional Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="currentRaga"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Current Raga
                  </Label>
                  <Input
                    id="currentRaga"
                    name="currentRaga"
                    value={formData.currentRaga}
                    onChange={handleChange}
                    placeholder="e.g., Yaman, Bhairav"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="currentOrientation"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Current Orientation
                  </Label>
                  <Input
                    id="currentOrientation"
                    name="currentOrientation"
                    value={formData.currentOrientation}
                    onChange={handleChange}
                    placeholder="e.g., Beginner, Intermediate"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="sessionDescription"
                  className="text-sm font-medium text-zinc-300"
                >
                  Session Description
                </Label>
                <Textarea
                  id="sessionDescription"
                  name="sessionDescription"
                  value={formData.sessionDescription}
                  onChange={handleChange}
                  placeholder="Detailed description of what will be covered in this session..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("isActive", checked)
                    }
                  />
                  <Label
                    htmlFor="isActive"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Active Class
                  </Label>
                </div>
                <div className="text-sm text-zinc-400">
                  Make this class available to students
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Live Class
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
