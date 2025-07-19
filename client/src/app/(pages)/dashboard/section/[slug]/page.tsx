"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Loader2,
  BookOpen,
  Trash,
  CheckCircle,
  XCircle,
  GripVertical,
  MoreVertical,
  PlusCircle,
  Book,
  Pencil,
  ArrowLeft,
  Plus,
  Layers,
} from "lucide-react";
import { Chapter } from "@/type";
import { useAuth } from "@/helper/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ToggleSwitch } from "../../_components/ToggleSwitch";

interface FormValues {
  title: string;
  isPublished: boolean;
  isFree: boolean;
}

interface Section {
  id: string;
  title: string;
  slug: string;
  position: number;
  isPublished: boolean;
  chapters: Chapter[];
  isEditing?: boolean;
}

const SortableRow = ({
  section,
  onPublishToggle,
  onDelete,
  onUpdate,
  deletingId,
  router,
}: {
  section: Section;
  onPublishToggle: (slug: string) => void;
  onDelete: (slug: string) => void;
  onUpdate: (slug: string, title: string) => Promise<void>;
  deletingId: string | null;
  router: ReturnType<typeof useRouter>;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(section.title);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleUpdate = async () => {
    if (editTitle.trim() === "") return;
    if (editTitle === section.title) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(section.slug, editTitle);
      setIsEditing(false);
    } catch {
      setEditTitle(section.title);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className="border-zinc-700 hover:bg-zinc-800/30 transition-colors"
    >
      <TableCell>
        <button
          className="cursor-grab focus:cursor-grabbing text-zinc-400 hover:text-green-400 transition-colors"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </TableCell>
      <TableCell className="text-zinc-300">{section.position}</TableCell>
      <TableCell className="font-medium text-white">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-green-500 focus:ring-green-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdate();
                if (e.key === "Escape") {
                  setEditTitle(section.title);
                  setIsEditing(false);
                }
              }}
              autoFocus
            />{" "}
            <Button
              onClick={handleUpdate}
              size="sm"
              disabled={isUpdating}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
            <Button
              onClick={() => {
                setEditTitle(section.title);
                setIsEditing(false);
              }}
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white hover:bg-zinc-700"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div
            className="flex items-center gap-2"
            onDoubleClick={() => setIsEditing(true)}
          >
            {section.title}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-zinc-400 hover:text-green-400 hover:bg-zinc-700"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => onPublishToggle(section.slug)}
          variant={section.isPublished ? "default" : "secondary"}
          size="sm"
          className={`flex items-center gap-2 ${
            section.isPublished
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-zinc-700 hover:bg-zinc-600 text-zinc-300"
          }`}
        >
          {section.isPublished ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Published
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" />
              Draft
            </>
          )}
        </Button>
      </TableCell>
      <TableCell className="text-zinc-300">
        <span className="font-medium text-green-400">
          {section.chapters.length}
        </span>{" "}
        chapters
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:border-green-500/50 hover:text-green-400"
              >
                <BookOpen className="h-4 w-4" />
                Chapters
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-zinc-800 border-zinc-700"
            >
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/create-course/${section.slug}`)
                }
                className="flex items-center gap-2 text-zinc-300 hover:bg-zinc-700 hover:text-green-400"
              >
                <PlusCircle className="h-4 w-4" />
                Create Chapters
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/chapter/${section.slug}`)
                }
                className="flex items-center gap-2 text-zinc-300 hover:bg-zinc-700 hover:text-green-400"
              >
                <Book className="h-4 w-4" />
                View Chapters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => onDelete(section.slug)}
            size="sm"
            variant="destructive"
            disabled={deletingId === section.slug}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {deletingId === section.slug ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash className="h-4 w-4" />
            )}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const SectionPage = () => {
  const params = useParams();
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { checkAuth } = useAuth();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      isPublished: false,
      isFree: false,
    },
  });

  useEffect(() => {
    const initPage = async () => {
      await checkAuth();
      fetchSections();
    };
    initPage();
  }, [params.slug]);

  const fetchSections = async () => {
    if (!params.slug) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/section/get/${params.slug}`
      );

      const sectionsData = response.data.data || [];

      if (Array.isArray(sectionsData)) {
        setSections(sectionsData);
      } else {
        setSections([]);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
      toast.error("Failed to fetch sections");
      setSections([]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/section/create/${params.slug}`,
        data
      );
      toast.success("Section created!");
      reset();
      fetchSections();
    } catch {
      toast.error("Failed to create section");
    } finally {
      reset();
    }
  };

  const handlePublishToggle = async (sectionSlug: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/section/toggle-publish/${sectionSlug}`,
        {}
      );
      fetchSections();
      toast.success("Section status updated");
    } catch (error) {
      console.error("Error toggling section status:", error);
      toast.error("Failed to update section status");
    }
  };

  const handleDelete = async (sectionSlug: string) => {
    try {
      setDeletingId(sectionSlug);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/section/delete/${sectionSlug}`
      );
      toast.success("Section deleted successfully");
      fetchSections();
    } catch (error) {
      console.error("Error deleting section:", error);
      toast.error("Failed to delete section");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);

      const reorderedSections = arrayMove(sections, oldIndex, newIndex).map(
        (section, index) => ({
          ...section,
          position: index + 1,
        })
      );

      setSections(reorderedSections);

      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/section/reorder/${params.slug}`,
          {
            sections: reorderedSections.map((s) => ({
              id: s.id,
              position: s.position,
            })),
          }
        );
      } catch (error) {
        console.error("Error reordering sections:", error);
        toast.error("Failed to reorder sections");
        fetchSections();
      }
    }
  };

  const handleUpdate = async (sectionSlug: string, title: string) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/section/update/${sectionSlug}`,
        { title },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.success) {
        setSections(
          sections.map((section) =>
            section.slug === sectionSlug
              ? { ...section, title: response.data.message.title }
              : section
          )
        );
        toast.success("Section updated successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Please login to continue");
        router.push("/auth");
        return;
      }
      console.error("Error updating section:", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to update section"
        );
      } else {
        toast.error("Failed to update section");
      }
      throw error;
    }
  };

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
                  Sections
                </span>
              </h1>
              <p className="text-xl text-zinc-300 max-w-3xl">
                Manage and organize your course sections and chapters
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Create Section Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-zinc-800/50 to-zinc-700/50 border-b border-zinc-700 rounded-t-lg">
              <CardTitle className="text-2xl font-semibold text-green-400 flex items-center gap-2">
                <Plus className="h-6 w-6" />
                Create New Section
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-br from-zinc-900/80 to-black/80">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-green-400">
                    Section Title
                  </Label>
                  <Input
                    {...register("title", { required: "Title is required" })}
                    placeholder="Enter section title"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                  />
                  {errors.title && (
                    <span className="text-red-400">{errors.title.message}</span>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="isPublished"
                      control={control}
                      render={({ field }) => (
                        <ToggleSwitch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          label="Published"
                          activeColor="bg-green-500"
                          activeIcon={<CheckCircle className="w-4 h-4" />}
                          inactiveIcon={<XCircle className="w-4 h-4" />}
                        />
                      )}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="isFree"
                      control={control}
                      render={({ field }) => (
                        <ToggleSwitch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          label="Free Access"
                          activeColor="bg-blue-500"
                          activeIcon={<CheckCircle className="w-4 h-4" />}
                          inactiveIcon={<XCircle className="w-4 h-4" />}
                        />
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Create Section
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sections Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-zinc-800/50 to-zinc-700/50 border-b border-zinc-700 rounded-t-lg">
              <CardTitle className="text-2xl font-semibold text-green-400 flex items-center gap-2">
                <Layers className="h-6 w-6" />
                Course Sections
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-br from-zinc-900/80 to-black/80">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-zinc-800/50 to-zinc-700/50 border-b border-zinc-700">
                    <TableHead></TableHead>
                    <TableHead className="font-semibold text-green-400">
                      Position
                    </TableHead>
                    <TableHead className="font-semibold text-green-400">
                      Title
                    </TableHead>
                    <TableHead className="font-semibold text-green-400">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-green-400">
                      Chapters
                    </TableHead>
                    <TableHead className="text-right font-semibold text-green-400">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={(sections || []).map((s) => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <TableBody>
                      {(sections || []).length > 0 ? (
                        sections.map((section) => (
                          <SortableRow
                            key={section.id}
                            section={section}
                            onPublishToggle={handlePublishToggle}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            deletingId={deletingId}
                            router={router}
                          />
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center text-zinc-400 py-8"
                          >
                            No sections found. Create your first section above.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </SortableContext>
                </DndContext>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionPage;
