"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Code,
  GripVertical,
  Zap,
  Settings,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
} from "lucide-react";
import axios from "axios";

interface TrackingScript {
  id: string;
  name: string;
  description?: string;
  scriptContent: string;
  position: "HEAD" | "BODY_START" | "BODY_END";
  priority: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const TrackingScriptsPage = () => {
  const [scripts, setScripts] = useState<TrackingScript[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingScript, setEditingScript] = useState<TrackingScript | null>(
    null
  );
  const [previewScript, setPreviewScript] = useState<TrackingScript | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    scriptContent: "",
    position: "HEAD" as "HEAD" | "BODY_START" | "BODY_END",
    priority: 1,
    isActive: true,
  });

  // Filter scripts based on search and filter
  const filteredScripts = scripts.filter((script) => {
    const matchesSearch =
      script.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (script.description &&
        script.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && script.isActive) ||
      (filterStatus === "inactive" && !script.isActive);
    return matchesSearch && matchesFilter;
  });

  // Fetch tracking scripts
  const fetchScripts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tracking-scripts`,
        { withCredentials: true }
      );

      // Transform backend response to match frontend interface
      const transformedScripts = response.data.data.map((script: any) => ({
        ...script,
        scriptContent: script.script, // Map script field to scriptContent
      }));
      setScripts(transformedScripts);
    } catch (error) {
      console.error("Error fetching scripts:", error);
      toast.error("Failed to fetch tracking scripts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScripts();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingScript) {
        // Update existing script - transform scriptContent to script for server
        const { scriptContent, ...otherFields } = formData;
        const serverData = {
          ...otherFields,
          script: scriptContent,
        };

        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/tracking-scripts/${editingScript.id}`,
          serverData,
          { withCredentials: true }
        );
        toast.success("Script updated successfully");
      } else {
        // Create new script - transform scriptContent to script for server
        const { scriptContent, ...otherFields } = formData;
        const serverData = {
          ...otherFields,
          script: scriptContent,
        };

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/tracking-scripts`,
          serverData,
          { withCredentials: true }
        );
        toast.success("Script created successfully");
      }

      fetchScripts();
      resetForm();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving script:", error);
      toast.error("Failed to save script");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      scriptContent: "",
      position: "HEAD",
      priority: 1,
      isActive: true,
    });
    setEditingScript(null);
  };

  // Handle edit
  const handleEdit = (script: TrackingScript) => {
    setEditingScript(script);
    setFormData({
      name: script.name,
      description: script.description || "",
      scriptContent: script.scriptContent,
      position: script.position,
      priority: script.priority,
      isActive: script.isActive,
    });
    setDialogOpen(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tracking-scripts/${id}`,
        { withCredentials: true }
      );
      toast.success("Script deleted successfully");
      fetchScripts();
    } catch (error) {
      console.error("Error deleting script:", error);
      toast.error("Failed to delete script");
    }
  };

  // Toggle script status
  const toggleScript = async (id: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tracking-scripts/${id}/toggle`,
        {},
        { withCredentials: true }
      );
      toast.success("Script status updated");
      fetchScripts();
    } catch (error) {
      console.error("Error toggling script:", error);
      toast.error("Failed to update script status");
    }
  };

  // Handle preview
  const handlePreview = (script: TrackingScript) => {
    setPreviewScript(script);
    setPreviewOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
          <Code className="h-4 w-4" />
          Tracking Scripts
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Manage Analytics Scripts
        </h1>
        <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
          Add and manage tracking scripts for analytics, marketing, and
          performance monitoring
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  Total Scripts
                </p>
                <p className="text-3xl font-bold text-white">
                  {scripts.length}
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Code className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  Active Scripts
                </p>
                <p className="text-3xl font-bold text-white">
                  {scripts.filter((script) => script.isActive).length}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Activity className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  Inactive Scripts
                </p>
                <p className="text-3xl font-bold text-white">
                  {scripts.filter((script) => !script.isActive).length}
                </p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search scripts by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-zinc-900/80 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48 bg-zinc-900/80 border-zinc-700 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scripts</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Script
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingScript ? "Edit Script" : "Add New Script"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-zinc-300">
                    Script Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Google Analytics"
                    required
                    className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
                  />
                </div>
                <div>
                  <Label htmlFor="position" className="text-zinc-300">
                    Position
                  </Label>
                  <Select
                    value={formData.position}
                    onValueChange={(
                      value: "HEAD" | "BODY_START" | "BODY_END"
                    ) => setFormData({ ...formData, position: value })}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HEAD">Head Section</SelectItem>
                      <SelectItem value="BODY_START">Body Start</SelectItem>
                      <SelectItem value="BODY_END">Body End</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-zinc-300">
                  Description (Optional)
                </Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of the script"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
                />
              </div>

              <div>
                <Label htmlFor="scriptContent" className="text-zinc-300">
                  Script Content
                </Label>
                <Textarea
                  id="scriptContent"
                  value={formData.scriptContent}
                  onChange={(e) =>
                    setFormData({ ...formData, scriptContent: e.target.value })
                  }
                  placeholder="Paste your tracking script here..."
                  rows={10}
                  className="font-mono text-sm bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority" className="text-zinc-300">
                    Priority
                  </Label>
                  <Input
                    id="priority"
                    type="number"
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: parseInt(e.target.value) || 1,
                      })
                    }
                    min="1"
                    className="bg-zinc-800 border-zinc-700 text-white focus:border-green-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isActive: checked })
                    }
                  />
                  <Label className="text-zinc-300">Active</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white"
                >
                  {editingScript ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Scripts List */}
      <div className="space-y-4">
        {filteredScripts.length === 0 ? (
          <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Code className="h-12 w-12 text-zinc-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No scripts found
              </h3>
              <p className="text-zinc-400 text-center mb-4">
                Add your first tracking script to get started with analytics
              </p>
              <Button
                onClick={() => setDialogOpen(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Script
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredScripts.map((script, index) => (
            <div key={script.id}>
              <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                        <Code className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <span>{script.name}</span>
                          <Badge
                            variant={script.isActive ? "default" : "secondary"}
                            className={
                              script.isActive
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }
                          >
                            {script.isActive ? (
                              <span className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Active
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <XCircle className="h-3 w-3" />
                                Inactive
                              </span>
                            )}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-zinc-600 text-zinc-300"
                          >
                            {script.position.replace(/_/g, " ")}
                          </Badge>
                        </CardTitle>
                        {script.description && (
                          <p className="text-sm text-zinc-400 mt-1">
                            {script.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreview(script)}
                        className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(script)}
                        className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Switch
                        checked={script.isActive}
                        onCheckedChange={() => toggleScript(script.id)}
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">
                              Delete Script
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-zinc-400">
                              Are you sure you want to delete "{script.name}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(script.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        Priority: {script.priority}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Updated:{" "}
                        {new Date(script.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              Script Preview: {previewScript?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-300">Position</Label>
                <p className="text-sm text-zinc-400">
                  {previewScript?.position.replace("_", " ").toUpperCase()}
                </p>
              </div>
              <div>
                <Label className="text-zinc-300">Priority</Label>
                <p className="text-sm text-zinc-400">
                  {previewScript?.priority}
                </p>
              </div>
            </div>
            <div>
              <Label className="text-zinc-300">Script Content</Label>
              <pre className="mt-2 p-4 bg-zinc-800 border border-zinc-700 rounded-lg overflow-auto text-sm text-white">
                {previewScript?.scriptContent}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrackingScriptsPage;
