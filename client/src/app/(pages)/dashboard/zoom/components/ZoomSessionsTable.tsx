"use client";

import { useState } from "react";
import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Users,
  ChevronDown,
  ChevronUp,
  Layers,
  Video,
  Loader2,
  Eye,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
}

interface Module {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  position: number;
  isFree: boolean;
}

interface Registration {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  isRegistered: boolean;
  hasAccessToLinks: boolean;
  status: string;
  createdAt: string;
}

interface ZoomLiveClass {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  price: number;
  registrationFee: number;
  courseFee: number;
  courseFeeEnabled: boolean;
  registrationEnabled: boolean;
  isActive: boolean;
  hasModules: boolean;
  isFirstModuleFree: boolean;
  currentRaga?: string;
  currentOrientation?: string;
  thumbnailUrl?: string | null;
  subscriptions?: User[];
  modules?: Module[];
  slug: string;
  isOnClassroom?: boolean;
  zoomLink?: string | null;
  zoomMeetingId?: string | null;
  zoomPassword?: string | null;
}

interface ZoomLiveClassTableProps {
  classes: ZoomLiveClass[];
  refreshData: () => void;
}

export default function ZoomSessionsTable({
  classes,
  refreshData,
}: ZoomLiveClassTableProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expandedSessions, setExpandedSessions] = useState<{
    [key: string]: boolean;
  }>({});
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState<ZoomLiveClass | null>(
    null
  );
  const [showRegistrationsDialog, setShowRegistrationsDialog] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loadingRegistrations, setLoadingRegistrations] = useState(false);
  const [updatingRegistration, setUpdatingRegistration] = useState(false);
  const [joiningClass, setJoiningClass] = useState<string | null>(null);
  const [processingAction, setProcessingAction] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "approve" | "remove" | "delete";
    title: string;
    message: string;
    action: () => Promise<void>;
  } | null>(null);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getStatusBadge = (isActive: boolean, isOnClassroom: boolean) => {
    if (isOnClassroom) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white border border-red-500">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></div>
          LIVE
        </span>
      );
    }

    if (isActive) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white border border-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-600 text-white border border-zinc-500">
        <XCircle className="h-3 w-3 mr-1" />
        Inactive
      </span>
    );
  };

  const getRegistrationStatusBadge = (enabled: boolean) => {
    if (enabled) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white border border-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Open
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white border border-red-500">
        <XCircle className="h-3 w-3 mr-1" />
        Closed
      </span>
    );
  };

  const toggleExpand = (classId: string) => {
    setExpandedSessions((prev) => ({
      ...prev,
      [classId]: !prev[classId],
    }));
  };

  const handleToggleRegistration = async (
    classId: string,
    enabled: boolean
  ) => {
    try {
      setUpdatingRegistration(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/class/${classId}/toggle-registration`,
        { registrationEnabled: enabled },
        { withCredentials: true }
      );
      refreshData();
      toast({
        title: "Success",
        description: `Registration ${
          enabled ? "enabled" : "disabled"
        } successfully`,
      });
    } catch (error) {
      console.error("Error toggling registration:", error);
      toast({
        title: "Error",
        description: "Failed to update registration setting",
        variant: "destructive",
      });
    } finally {
      setUpdatingRegistration(false);
    }
  };

  const handleViewRegistrations = async (liveClass: ZoomLiveClass) => {
    try {
      setSelectedClass(liveClass);
      setShowRegistrationsDialog(true);
      setLoadingRegistrations(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/class/${liveClass.id}/registrations`,
        { withCredentials: true }
      );

      setRegistrations(response.data.data.registrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast({
        title: "Error",
        description: "Failed to load registrations",
        variant: "destructive",
      });
    } finally {
      setLoadingRegistrations(false);
    }
  };

  const handleBulkApprove = async () => {
    if (!selectedClass || selectedUsers.length === 0) return;

    setConfirmAction({
      type: "approve",
      title: "Confirm Approval",
      message: `Are you sure you want to approve ${
        selectedUsers.length
      } selected user(s)? ${
        selectedClass.courseFeeEnabled
          ? "They will still need to pay the course fee to access the class."
          : "They will get immediate access to the class."
      }`,
      action: async () => {
        try {
          setProcessingAction(true);
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/class/${selectedClass.id}/approve-registrations`,
            { userIds: selectedUsers },
            { withCredentials: true }
          );

          toast({
            title: "Success",
            description: `${selectedUsers.length} user(s) approved successfully`,
          });

          setShowRegistrationsDialog(false);
          setSelectedUsers([]);
          refreshData();
        } catch (error) {
          console.error("Error approving registrations:", error);
          toast({
            title: "Error",
            description: "Failed to approve registrations",
            variant: "destructive",
          });
        } finally {
          setProcessingAction(false);
        }
      },
    });
    setShowConfirmDialog(true);
  };

  const handleRemoveAccess = async () => {
    if (!selectedClass || selectedUsers.length === 0) return;

    setConfirmAction({
      type: "remove",
      title: "Confirm Access Removal",
      message: `Are you sure you want to remove access for ${selectedUsers.length} selected user(s)?`,
      action: async () => {
        try {
          setProcessingAction(true);
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/class/${selectedClass.id}/remove-access`,
            { userIds: selectedUsers },
            { withCredentials: true }
          );

          toast({
            title: "Success",
            description: `Access removed for ${selectedUsers.length} user(s)`,
          });

          setShowRegistrationsDialog(false);
          setSelectedUsers([]);
          refreshData();
        } catch (error) {
          console.error("Error removing access:", error);
          toast({
            title: "Error",
            description: "Failed to remove access",
            variant: "destructive",
          });
        } finally {
          setProcessingAction(false);
        }
      },
    });
    setShowConfirmDialog(true);
  };

  const handleDeleteClass = async (liveClass: ZoomLiveClass) => {
    setConfirmAction({
      type: "delete",
      title: "Confirm Deletion",
      message: `Are you sure you want to delete "${liveClass.title}"? This action cannot be undone.`,
      action: async () => {
        try {
          setProcessingAction(true);
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/class/${liveClass.id}`,
            { withCredentials: true }
          );

          toast({
            title: "Success",
            description: "Class deleted successfully",
          });

          refreshData();
        } catch (error) {
          console.error("Error deleting class:", error);
          toast({
            title: "Error",
            description: "Failed to delete class",
            variant: "destructive",
          });
        } finally {
          setProcessingAction(false);
        }
      },
    });
    setShowConfirmDialog(true);
  };

  const handleToggleClassroom = async (classId: string, enabled: boolean) => {
    try {
      setIsLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/class/${classId}/toggle-classroom`,
        { isOnClassroom: enabled },
        { withCredentials: true }
      );
      refreshData();
      toast({
        title: "Success",
        description: `Class ${enabled ? "started" : "stopped"} successfully`,
      });
    } catch (error) {
      console.error("Error toggling classroom:", error);
      toast({
        title: "Error",
        description: "Failed to update class status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminJoinClass = async (classId: string) => {
    try {
      setJoiningClass(classId);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/class/${classId}/join`,
        { withCredentials: true }
      );

      if (response.data.data.zoomLink) {
        window.open(response.data.data.zoomLink, "_blank");
        toast({
          title: "Success",
          description: "Opening Zoom meeting...",
        });
      }
    } catch (error) {
      console.error("Error joining class:", error);
      toast({
        title: "Error",
        description: "Failed to join class",
        variant: "destructive",
      });
    } finally {
      setJoiningClass(null);
    }
  };

  return (
    <div className="space-y-6">
      {classes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-zinc-400 mb-4">No live classes found</div>
          <div className="text-sm text-zinc-500">
            Start by creating your first live class
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                <TableHead className="text-zinc-300">Class</TableHead>
                <TableHead className="text-zinc-300">Date & Time</TableHead>
                <TableHead className="text-zinc-300">Status</TableHead>
                <TableHead className="text-zinc-300">Registration</TableHead>
                <TableHead className="text-zinc-300">Fees</TableHead>
                <TableHead className="text-zinc-300">Participants</TableHead>
                <TableHead className="text-zinc-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((liveClass) => (
                <React.Fragment key={liveClass.id}>
                  <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                    <TableCell className="font-medium text-white">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-8 rounded overflow-hidden bg-zinc-800">
                          {liveClass.thumbnailUrl ? (
                            <Image
                              src={
                                liveClass.thumbnailUrl.includes(
                                  "cloudinary.com"
                                )
                                  ? liveClass.thumbnailUrl
                                  : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/monarkfx/zoom-thumbnails/${liveClass.thumbnailUrl}`
                              }
                              alt={liveClass.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Video className="h-4 w-4 text-zinc-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-white">
                            {liveClass.title}
                          </div>
                          <div className="text-sm text-zinc-400">
                            {liveClass.description?.substring(0, 50)}
                            {liveClass.description &&
                              liveClass.description.length > 50 &&
                              "..."}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {formatDate(liveClass.startTime)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(
                        liveClass.isActive,
                        liveClass.isOnClassroom || false
                      )}
                    </TableCell>
                    <TableCell>
                      {getRegistrationStatusBadge(
                        liveClass.registrationEnabled
                      )}
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      <div className="space-y-1">
                        <div className="text-sm">
                          Reg: {formatCurrency(liveClass.registrationFee)}
                        </div>
                        {liveClass.courseFeeEnabled && (
                          <div className="text-sm">
                            Course: {formatCurrency(liveClass.courseFee)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {liveClass.subscriptions?.length || 0}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewRegistrations(liveClass)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link href={`/dashboard/zoom/edit/${liveClass.id}`}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-green-400 hover:text-green-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteClass(liveClass)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Live Class Controls Row */}
                  <TableRow className="border-zinc-700 bg-zinc-800/20">
                    <TableCell colSpan={7}>
                      <div className="p-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-zinc-400">
                                Live Status:
                              </span>
                              <Switch
                                checked={liveClass.isOnClassroom || false}
                                onCheckedChange={(enabled) =>
                                  handleToggleClassroom(liveClass.id, enabled)
                                }
                                disabled={isLoading}
                                className="data-[state=checked]:bg-green-500"
                              />
                              <span className="text-sm text-zinc-300">
                                {liveClass.isOnClassroom ? "ON" : "OFF"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-sm text-zinc-400">
                                Registration:
                              </span>
                              <Switch
                                checked={liveClass.registrationEnabled}
                                onCheckedChange={(enabled) =>
                                  handleToggleRegistration(
                                    liveClass.id,
                                    enabled
                                  )
                                }
                                disabled={updatingRegistration}
                                className="data-[state=checked]:bg-blue-500"
                              />
                              <span className="text-sm text-zinc-300">
                                {liveClass.registrationEnabled
                                  ? "Open"
                                  : "Closed"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {liveClass.isOnClassroom ? (
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleAdminJoinClass(liveClass.id)
                                }
                                className="bg-green-600 hover:bg-green-700 text-white"
                                disabled={joiningClass === liveClass.id}
                              >
                                {joiningClass === liveClass.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                  <Play className="h-4 w-4 mr-2" />
                                )}
                                Join Live Class
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleToggleClassroom(liveClass.id, true)
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={isLoading}
                              >
                                <Video className="h-4 w-4 mr-2" />
                                Start Class
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Zoom Meeting Details */}
                        {liveClass.zoomLink && (
                          <div className="bg-zinc-700/50 p-3 rounded-lg">
                            <h4 className="text-sm font-semibold text-white mb-2">
                              Zoom Meeting Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              <div>
                                <span className="text-zinc-400">
                                  Meeting ID:
                                </span>
                                <div className="text-white font-mono">
                                  {liveClass.zoomMeetingId}
                                </div>
                              </div>
                              <div>
                                <span className="text-zinc-400">Password:</span>
                                <div className="text-white font-mono">
                                  {liveClass.zoomPassword}
                                </div>
                              </div>
                              <div>
                                <span className="text-zinc-400">
                                  Join Link:
                                </span>
                                <div className="text-blue-400 font-mono text-xs truncate">
                                  {liveClass.zoomLink}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Details */}
                  {expandedSessions[liveClass.id] && (
                    <TableRow className="border-zinc-700 bg-zinc-800/30">
                      <TableCell colSpan={7}>
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-white mb-2">
                                Class Details
                              </h4>
                              <div className="space-y-2 text-sm text-zinc-300">
                                <div>Title: {liveClass.title}</div>
                                <div>Description: {liveClass.description}</div>
                                <div>
                                  Start Time: {formatDate(liveClass.startTime)}
                                </div>
                                <div>
                                  Registration Fee:{" "}
                                  {formatCurrency(liveClass.registrationFee)}
                                </div>
                                {liveClass.courseFeeEnabled && (
                                  <div>
                                    Course Fee:{" "}
                                    {formatCurrency(liveClass.courseFee)}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white mb-2">
                                Settings
                              </h4>
                              <div className="space-y-2 text-sm text-zinc-300">
                                <div className="flex items-center justify-between">
                                  <span>Registration Enabled:</span>
                                  <Switch
                                    checked={liveClass.registrationEnabled}
                                    onCheckedChange={(enabled) =>
                                      handleToggleRegistration(
                                        liveClass.id,
                                        enabled
                                      )
                                    }
                                    disabled={updatingRegistration}
                                  />
                                </div>
                                <div>
                                  Has Modules:{" "}
                                  {liveClass.hasModules ? "Yes" : "No"}
                                </div>
                                <div>
                                  First Module Free:{" "}
                                  {liveClass.isFirstModuleFree ? "Yes" : "No"}
                                </div>
                                {liveClass.currentRaga && (
                                  <div>
                                    Current Raga: {liveClass.currentRaga}
                                  </div>
                                )}
                                {liveClass.currentOrientation && (
                                  <div>
                                    Orientation: {liveClass.currentOrientation}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {liveClass.modules &&
                            liveClass.modules.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-white mb-2">
                                  Modules
                                </h4>
                                <div className="space-y-2">
                                  {liveClass.modules.map((module) => (
                                    <div
                                      key={module.id}
                                      className="flex items-center justify-between p-2 bg-zinc-700/50 rounded"
                                    >
                                      <div>
                                        <div className="font-medium text-white">
                                          {module.title}
                                        </div>
                                        <div className="text-sm text-zinc-400">
                                          {formatDate(module.startTime)} -{" "}
                                          {formatDate(module.endTime)}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {module.isFree && (
                                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                                            Free
                                          </span>
                                        )}
                                        <span className="text-sm text-zinc-400">
                                          Position: {module.position}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Registrations Dialog */}
      <Dialog
        open={showRegistrationsDialog}
        onOpenChange={setShowRegistrationsDialog}
      >
        <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              Registrations - {selectedClass?.title}
            </DialogTitle>
          </DialogHeader>

          {loadingRegistrations ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-zinc-400">
                  {registrations.length} registration(s) found
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleBulkApprove}
                    disabled={selectedUsers.length === 0 || processingAction}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {processingAction ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Approve Selected ({selectedUsers.length})
                  </Button>
                  <Button
                    onClick={handleRemoveAccess}
                    disabled={selectedUsers.length === 0 || processingAction}
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Remove Access
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700">
                      <TableHead className="text-zinc-300">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(
                                registrations.map((r) => r.user.id)
                              );
                            } else {
                              setSelectedUsers([]);
                            }
                          }}
                          checked={
                            selectedUsers.length === registrations.length
                          }
                          className="rounded border-zinc-600 bg-zinc-800"
                        />
                      </TableHead>
                      <TableHead className="text-zinc-300">Name</TableHead>
                      <TableHead className="text-zinc-300">Email</TableHead>
                      <TableHead className="text-zinc-300">Status</TableHead>
                      <TableHead className="text-zinc-300">
                        Registered
                      </TableHead>
                      <TableHead className="text-zinc-300">Access</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((registration) => (
                      <TableRow
                        key={registration.id}
                        className="border-zinc-700"
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(
                              registration.user.id
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers([
                                  ...selectedUsers,
                                  registration.user.id,
                                ]);
                              } else {
                                setSelectedUsers(
                                  selectedUsers.filter(
                                    (id) => id !== registration.user.id
                                  )
                                );
                              }
                            }}
                            className="rounded border-zinc-600 bg-zinc-800"
                          />
                        </TableCell>
                        <TableCell className="font-medium text-white">
                          {registration.user.name}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {registration.user.email}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              registration.status === "ACTIVE"
                                ? "bg-green-600 text-white border border-green-500"
                                : registration.status === "PENDING_APPROVAL"
                                ? "bg-yellow-600 text-white border border-yellow-500"
                                : "bg-red-600 text-white border border-red-500"
                            }`}
                          >
                            {registration.status === "ACTIVE" && (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            )}
                            {registration.status === "PENDING_APPROVAL" && (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {registration.status === "REJECTED" && (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {registration.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              registration.isRegistered
                                ? "bg-green-600 text-white border border-green-500"
                                : "bg-red-600 text-white border border-red-500"
                            }`}
                          >
                            {registration.isRegistered ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Yes
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3 mr-1" />
                                No
                              </>
                            )}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              registration.hasAccessToLinks
                                ? "bg-green-600 text-white border border-green-500"
                                : "bg-red-600 text-white border border-red-500"
                            }`}
                          >
                            {registration.hasAccessToLinks ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Granted
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3 mr-1" />
                                Denied
                              </>
                            )}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-gradient-to-br from-zinc-900/95 to-black/95 border-zinc-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              {confirmAction?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-zinc-300">{confirmAction?.message}</p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmAction?.action}
                disabled={processingAction}
                className={`${
                  confirmAction?.type === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {processingAction ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {confirmAction?.type === "delete" ? "Delete" : "Confirm"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
