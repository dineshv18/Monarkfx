"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChapterFormData } from "@/type";

interface ChapterFormPropsSecond {
  onSubmit: (data: FormData) => Promise<any>;
  submitButtonText: string;
  isSubmitting: boolean;
}
import FileUpload from "./chapters/FileUpload";

// ChapterFormItem component for individual chapter forms
function ChapterFormItem({
  index,
  register,
  errors,
  control,
  remove,
  setValue,
  watch,
  filesState,
  onFileChange,
}: any) {
  return (
    <div
      key={index}
      className="space-y-4 p-4 border border-gray-700 bg-gray-800 rounded-lg"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-green-400">
          Chapter {index + 1}
        </h3>
        {index > 0 && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`chapters.${index}.title`} className="text-green-400">
          Title
        </Label>
        <Input
          id={`chapters.${index}.title`}
          {...register(`chapters.${index}.title` as const, {
            required: "Title is required",
          })}
          className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500"
        />
        {errors.chapters?.[index]?.title && (
          <p className="text-sm text-red-400">
            {errors.chapters[index]?.title?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor={`chapters.${index}.description`}
          className="text-green-400"
        >
          Description
        </Label>
        <Textarea
          id={`chapters.${index}.description`}
          {...register(`chapters.${index}.description` as const, {
            required: "Description is required",
          })}
          className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 h-32"
        />
        {errors.chapters?.[index]?.description && (
          <p className="text-sm text-red-400">
            {errors.chapters[index]?.description?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor={`chapters.${index}.videoUrl`}
          className="text-green-400"
        >
          Video URL
        </Label>
        <Input
          id={`chapters.${index}.videoUrl`}
          type="text"
          placeholder="Enter video URL"
          {...register(`chapters.${index}.videoUrl` as const, {
            required: "Video URL is required",
          })}
          className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500"
        />
        {errors.chapters?.[index]?.videoUrl && (
          <p className="text-sm text-red-400">
            {errors.chapters[index]?.videoUrl?.message}
          </p>
        )}
      </div>

      {/* <div className="space-y-2">
        <Label className="text-green-400">PDF Document</Label>
        <FileUpload
          accept={{ "application/pdf": [".pdf"] }}
          value={filesState[index]?.pdf || null}
          onChange={(file) => onFileChange(index, "pdf", file)}
          onRemove={() => onFileChange(index, "pdf", null)}
          fileType="pdf"
          existingFileUrl={null}
        />
      </div> */}

      {/* <div className="space-y-2">
        <Label className="text-green-400">Audio File</Label>
        <FileUpload
          accept={{ "audio/*": [".mp3", ".wav"] }}
          value={filesState[index]?.audio || null}
          onChange={(file) => onFileChange(index, "audio", file)}
          onRemove={() => onFileChange(index, "audio", null)}
          fileType="audio"
          existingFileUrl={null}
        />
      </div> */}

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Controller
            name={`chapters.${index}.isFree`}
            control={control}
            render={({ field }) => (
              <Checkbox
                id={`chapters.${index}.isFree`}
                checked={field.value}
                onCheckedChange={(checked) =>
                  setValue(`chapters.${index}.isFree`, !!checked)
                }
              />
            )}
          />
          <Label htmlFor={`chapters.${index}.isFree`}>Free Chapter</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            name={`chapters.${index}.isPublished`}
            control={control}
            render={({ field }) => (
              <Checkbox
                id={`chapters.${index}.isPublished`}
                checked={field.value}
                onCheckedChange={(checked) =>
                  setValue(`chapters.${index}.isPublished`, !!checked)
                }
              />
            )}
          />
          <Label htmlFor={`chapters.${index}.isPublished`}>
            Publish Chapter
          </Label>
        </div>
      </div>
    </div>
  );
}

function ChapterForm({
  onSubmit,
  submitButtonText,
  isSubmitting,
}: ChapterFormPropsSecond) {
  const [filesState, setFilesState] = useState<
    Array<{ pdf: File | null; audio: File | null }>
  >([{ pdf: null, audio: null }]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<{ chapters: ChapterFormData[] }>({
    defaultValues: {
      chapters: [
        {
          title: "",
          description: "",
          videoUrl: "",
          isFree: false,
          isPublished: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "chapters",
  });

  const handleFileChange = (
    index: number,
    type: "pdf" | "audio",
    file: File | null
  ) => {
    setFilesState((prev) => {
      // Make sure the files array is at least as long as the current index+1
      const newState = [...prev];
      while (newState.length <= index) {
        newState.push({ pdf: null, audio: null });
      }

      newState[index] = {
        ...newState[index],
        [type]: file,
      };

      return newState;
    });
  };

  const onSubmitForm = async (data: { chapters: ChapterFormData[] }) => {
    // Process each chapter with its files
    for (let i = 0; i < data.chapters.length; i++) {
      // Create FormData for each chapter
      const formData = new FormData();
      formData.append("title", data.chapters[i].title || "");
      formData.append("description", data.chapters[i].description || "");
      formData.append("videoUrl", data.chapters[i].videoUrl || "");

      // Explicitly convert boolean values to strings
      formData.append("isFree", data.chapters[i].isFree ? "true" : "false");
      formData.append(
        "isPublished",
        data.chapters[i].isPublished ? "true" : "false"
      );

      // Add files if they exist
      if (filesState[i]?.pdf) {
        formData.append("pdf", filesState[i].pdf as Blob);
      }
      if (filesState[i]?.audio) {
        formData.append("audio", filesState[i].audio as Blob);
      }

      // Submit the chapter data
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error("Error creating chapter:", error);
        throw error; // Re-throw so parent component can handle it
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
      {fields.map((field, index) => (
        <ChapterFormItem
          key={field.id}
          index={index}
          register={register}
          errors={errors}
          control={control}
          remove={remove}
          setValue={setValue}
          watch={watch}
          filesState={filesState}
          onFileChange={handleFileChange}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          append({
            title: "",
            description: "",
            videoUrl: "",
            isFree: false,
            isPublished: false,
          });
          // Extend files state with empty values for the new chapter
          setFilesState((prev) => [...prev, { pdf: null, audio: null }]);
        }}
        className="bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Chapter
      </Button>

      <Button
        type="submit"
        className="md:ml-2 bg-green-600 hover:bg-green-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          submitButtonText
        )}
      </Button>
    </form>
  );
}

export default function AddChapters({ params }: { params: { slug: string } }) {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chapter/create/${params.slug}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status !== 201) {
        throw new Error(`Failed to create chapter: ${response.statusText}`);
      }

      return response;
    } catch (error: any) {
      console.error("Error creating chapter:", error);
      toast.error(
        `Failed to create chapter: ${error.message || "Unknown error"}`
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChaptersSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await handleSubmit(formData);
      setShowSuccessDialog(true);
      toast.success("Chapter created successfully");
    } catch (error) {
      // Error is already handled in handleSubmit
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-gray-900 border-gray-800 shadow-xl">
        <CardHeader className="bg-gray-800 border-b border-gray-700">
          <CardTitle className="text-2xl sm:text-3xl text-green-400">
            Add Chapters
          </CardTitle>
          <CardDescription className="text-gray-400">
            Create chapters for your course
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-gray-900 p-6">
          <ChapterForm
            onSubmit={handleChaptersSubmit}
            submitButtonText="Create Chapters"
            isSubmitting={isSubmitting}
          />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 bg-gray-900 border-t border-gray-700">
          <span className="text-sm text-gray-400">
            Note: You can add more chapters later from the course dashboard
          </span>
        </CardFooter>
      </Card>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Chapters Created Successfully</AlertDialogTitle>
            <AlertDialogDescription>
              All chapters have been created successfully. Would you like to
              view the course?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.back()}>
              Go Back
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
