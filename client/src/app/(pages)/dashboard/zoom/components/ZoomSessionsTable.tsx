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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  isOnClassroom?: boolean; // Add this field
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
            description: "Selected registrations approved successfully",
          });

          await handleViewRegistrations(selectedClass);
          setSelectedUsers([]);
        } catch (error) {
          console.error("Error approving registrations:", error);
          toast({
            title: "Error",
            description: "Failed to approve registrations",
            variant: "destructive",
          });
        } finally {
          setProcessingAction(false);
          setShowConfirmDialog(false);
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
      message: `Are you sure you want to remove access for ${selectedUsers.length} selected user(s)? They will need to be approved again to regain access.`,
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
            description: "Access removed for selected users",
          });

          await handleViewRegistrations(selectedClass);
          setSelectedUsers([]);
        } catch (error) {
          console.error("Error removing access:", error);
          toast({
            title: "Error",
            description: "Failed to remove access",
            variant: "destructive",
          });
        } finally {
          setProcessingAction(false);
          setShowConfirmDialog(false);
        }
      },
    });
    setShowConfirmDialog(true);
  };

  const handleDeleteClass = async (liveClass: ZoomLiveClass) => {
    setConfirmAction({
      type: "delete",
      title: "Confirm Delete",
      message: `Are you sure you want to delete "${liveClass.title}"? This action cannot be undone.`,
      action: async () => {
        try {
          setIsLoading(true);
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
            description: "Failed to delete class. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
          setShowConfirmDialog(false);
        }
      },
    });
    setShowConfirmDialog(true);
  };

  const handleToggleClassroom = async (classId: string, enabled: boolean) => {
    try {
      setUpdatingRegistration(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/class/${classId}/toggle-classroom`,
        { isOnClassroom: enabled },
        { withCredentials: true }
      );
      refreshData();
      toast({
        title: "Success",
        description: `Live class ${
          enabled ? "started" : "stopped"
        } successfully`,
      });
    } catch (error) {
      console.error("Error toggling classroom:", error);
      toast({
        title: "Error",
        description: "Failed to update live class status",
        variant: "destructive",
      });
    } finally {
      setUpdatingRegistration(false);
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
        // Open zoom link in new tab
        window.open(response.data.data.zoomLink, "_blank");
        toast({
          title: "Success",
          description: "Joining class... Zoom should open in a new tab.",
        });
      } else {
        toast({
          title: "Error",
          description: "No zoom link available for this class",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error joining class:", error);
      toast({
        title: "Error",
        description:
          "Failed to join class. Please check if the class is active.",
        variant: "destructive",
      });
    } finally {
      setJoiningClass(null);
    }
  };

  return (
    <div className="bg-zinc-900 border border-green-500/30 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-green-500/30 hover:bg-green-500/5">
            <TableHead className="text-green-400 font-semibold"></TableHead>
            <TableHead className="text-green-400 font-semibold">
              Thumbnail
            </TableHead>
            <TableHead className="text-green-400 font-semibold">
              Title
            </TableHead>
            <TableHead className="text-green-400 font-semibold">
              Start Time
            </TableHead>
            <TableHead className="text-green-400 font-semibold">
              Reg. Fee
            </TableHead>
            <TableHead className="text-green-400 font-semibold">
              Course Fee
            </TableHead>
            <TableHead className="text-green-400 font-semibold">
              Registration
            </TableHead>
            <TableHead className="text-center text-green-400 font-semibold">
              <div className="flex items-center justify-center space-x-1">
                <Video size={14} />
                <span>Live Status</span>
              </div>
            </TableHead>
            <TableHead className="text-green-400 font-semibold">
              Status
            </TableHead>
            <TableHead className="text-green-400 font-semibold">
              Subscribers
            </TableHead>
            <TableHead className="text-center text-green-400 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((liveClass) => (
            <React.Fragment key={liveClass.id}>
              <TableRow className="border-green-500/30 hover:bg-green-500/10">
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(liveClass.id)}
                    disabled={
                      !liveClass.hasModules || !liveClass.modules?.length
                    }
                    className={`${
                      !liveClass.hasModules ? "opacity-0" : ""
                    } text-green-400 hover:text-green-300 hover:bg-green-500/20`}
                  >
                    {expandedSessions[liveClass.id] ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </Button>
                </TableCell>
                <TableCell>
                  {liveClass.thumbnailUrl ? (
                    <div className="relative w-12 h-12 rounded-md overflow-hidden border border-green-500/30">
                      <Image
                        src={liveClass.thumbnailUrl}
                        alt={liveClass.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-zinc-800 border border-green-500/30 rounded-md flex items-center justify-center">
                      <span className="text-xs text-zinc-400">No Image</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">
                      {liveClass.title}
                    </h3>
                    {liveClass.description && (
                      <p className="text-xs text-zinc-400 line-clamp-2">
                        {liveClass.description}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300">
                  {formatDate(liveClass.startTime)}
                </TableCell>
                <TableCell className="text-green-400 font-semibold">
                  ₹{liveClass.registrationFee}
                </TableCell>
                <TableCell>
                  {liveClass.courseFeeEnabled ? (
                    <span className="text-green-400 font-semibold">
                      ₹{liveClass.courseFee}
                    </span>
                  ) : (
                    <span className="text-zinc-400">No Fee</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      liveClass.registrationEnabled ? "default" : "secondary"
                    }
                    className={
                      liveClass.registrationEnabled
                        ? "bg-green-500/20 text-green-400 border-green-500/50"
                        : "bg-zinc-700 text-zinc-300 border-zinc-600"
                    }
                  >
                    {liveClass.registrationEnabled ? "Open" : "Closed"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <Switch
                      checked={liveClass.isOnClassroom || false}
                      onCheckedChange={(checked) =>
                        handleToggleClassroom(liveClass.id, checked)
                      }
                      disabled={updatingRegistration}
                      className="data-[state=checked]:bg-green-500"
                    />
                    {liveClass.isOnClassroom && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAdminJoinClass(liveClass.id)}
                        disabled={joiningClass === liveClass.id}
                        className="text-xs bg-green-500/10 border-green-500/50 text-green-400 hover:bg-green-500/20"
                      >
                        {joiningClass === liveClass.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          "Join"
                        )}
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={liveClass.isActive ? "default" : "secondary"}
                    className={
                      liveClass.isActive
                        ? "bg-green-500/20 text-green-400 border-green-500/50"
                        : "bg-red-500/20 text-red-400 border-red-500/50"
                    }
                  >
                    {liveClass.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewRegistrations(liveClass)}
                    className="bg-blue-500/10 border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                  >
                    <Users size={14} className="mr-1" />
                    {liveClass.subscriptions?.length || 0}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Link href={`/dashboard/zoom/edit/${liveClass.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-amber-500/10 border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
                      >
                        <Edit size={14} />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClass(liveClass)}
                      disabled={isLoading}
                      className="bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>

              {/* Expanded Modules Row */}
              {expandedSessions[liveClass.id] && liveClass.modules && (
                <TableRow className="border-green-500/30">
                  <TableCell colSpan={11} className="bg-zinc-800/50">
                    <div className="py-4">
                      <h4 className="font-medium text-green-400 mb-3 flex items-center">
                        <Layers size={16} className="mr-2" />
                        Class Modules ({liveClass.modules.length})
                      </h4>
                      <div className="grid gap-2">
                        {liveClass.modules
                          .sort((a, b) => a.position - b.position)
                          .map((module) => (
                            <div
                              key={module.id}
                              className="flex items-center justify-between p-3 bg-zinc-700 border border-green-500/20 rounded-lg"
                            >
                              <div>
                                <span className="font-medium text-white">
                                  {module.position}. {module.title}
                                </span>
                                <div className="text-xs text-zinc-400 mt-1">
                                  {formatDate(module.startTime)} -{" "}
                                  {formatDate(module.endTime)}
                                </div>
                              </div>
                              <Badge
                                variant={
                                  module.isFree ? "default" : "secondary"
                                }
                                className={
                                  module.isFree
                                    ? "bg-green-500/20 text-green-400 border-green-500/50"
                                    : "bg-orange-500/20 text-orange-400 border-orange-500/50"
                                }
                              >
                                {module.isFree ? "Free" : "Paid"}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
          {classes.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={11}
                className="text-center py-8 text-zinc-400"
              >
                No zoom live classes found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Registration Dialog */}
      {showRegistrationsDialog && selectedClass && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-green-500/30 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Registrations: {selectedClass.title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowRegistrationsDialog(false);
                  setSelectedClass(null);
                  setRegistrations([]);
                  setSelectedUsers([]);
                }}
                className="text-zinc-400 hover:text-white hover:bg-red-500/20"
              >
                ✕
              </Button>
            </div>

            {loadingRegistrations ? (
              <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-green-400" />
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-between">
                  <div>
                    <span className="text-sm text-zinc-300">
                      {registrations.length} Registration(s)
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleBulkApprove}
                      disabled={selectedUsers.length === 0}
                      className="bg-green-500 hover:bg-green-600 text-black font-bold"
                    >
                      Approve Selected
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleRemoveAccess}
                      disabled={selectedUsers.length === 0}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Remove Access
                    </Button>
                  </div>
                </div>

                <div className="bg-zinc-800 border border-green-500/30 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-green-500/30">
                        <TableHead className="w-[40px] text-green-400">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers(
                                  registrations.map((reg) => reg.user.id)
                                );
                              } else {
                                setSelectedUsers([]);
                              }
                            }}
                            checked={
                              selectedUsers.length > 0 &&
                              selectedUsers.length === registrations.length
                            }
                            className="accent-green-500"
                          />
                        </TableHead>
                        <TableHead className="text-green-400 font-semibold">
                          Name
                        </TableHead>
                        <TableHead className="text-green-400 font-semibold">
                          Email
                        </TableHead>
                        <TableHead className="text-green-400 font-semibold">
                          Registration Date
                        </TableHead>
                        <TableHead className="text-green-400 font-semibold">
                          Status
                        </TableHead>
                        <TableHead className="text-green-400 font-semibold">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.map((reg) => (
                        <TableRow
                          key={reg.id}
                          className="border-green-500/30 hover:bg-green-500/10"
                        >
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(reg.user.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers([
                                    ...selectedUsers,
                                    reg.user.id,
                                  ]);
                                } else {
                                  setSelectedUsers(
                                    selectedUsers.filter(
                                      (id) => id !== reg.user.id
                                    )
                                  );
                                }
                              }}
                              className="accent-green-500"
                            />
                          </TableCell>
                          <TableCell className="text-white">
                            {reg.user.name}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {reg.user.email}
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {formatDate(reg.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                reg.status === "ACTIVE"
                                  ? "default"
                                  : reg.status === "PENDING"
                                  ? "outline"
                                  : "destructive"
                              }
                              className={
                                reg.status === "ACTIVE"
                                  ? "bg-green-500/20 text-green-400 border-green-500/50"
                                  : reg.status === "PENDING"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                                  : "bg-red-500/20 text-red-400 border-red-500/50"
                              }
                            >
                              {reg.status}
                            </Badge>
                            {reg.hasAccessToLinks && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/50"
                              >
                                Has Access
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {reg.status !== "ACTIVE" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  try {
                                    setProcessingAction(true);
                                    await axios.post(
                                      `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/class/${selectedClass.id}/approve-registrations`,
                                      { userIds: [reg.user.id] },
                                      { withCredentials: true }
                                    );

                                    toast({
                                      title: "Success",
                                      description:
                                        "Registration approved successfully",
                                    });

                                    await handleViewRegistrations(
                                      selectedClass
                                    );
                                  } catch (error) {
                                    console.error(
                                      "Error approving registration:",
                                      error
                                    );
                                    toast({
                                      title: "Error",
                                      description:
                                        "Failed to approve registration",
                                      variant: "destructive",
                                    });
                                  } finally {
                                    setProcessingAction(false);
                                  }
                                }}
                                disabled={processingAction}
                                className="bg-green-500/10 border-green-500/50 text-green-400 hover:bg-green-500/20"
                              >
                                Approve
                              </Button>
                            )}
                            {reg.status === "ACTIVE" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  try {
                                    setProcessingAction(true);
                                    await axios.post(
                                      `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/class/${selectedClass.id}/remove-access`,
                                      { userIds: [reg.user.id] },
                                      { withCredentials: true }
                                    );

                                    toast({
                                      title: "Success",
                                      description:
                                        "Access removed successfully",
                                    });

                                    await handleViewRegistrations(
                                      selectedClass
                                    );
                                  } catch (error) {
                                    console.error(
                                      "Error removing access:",
                                      error
                                    );
                                    toast({
                                      title: "Error",
                                      description: "Failed to remove access",
                                      variant: "destructive",
                                    });
                                  } finally {
                                    setProcessingAction(false);
                                  }
                                }}
                                disabled={processingAction}
                                className="bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500/20"
                              >
                                Remove Access
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      {registrations.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-8 text-zinc-400"
                          >
                            No registrations found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && confirmAction && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-green-500/30 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">
              {confirmAction.title}
            </h2>
            <p className="mb-6 text-zinc-300">{confirmAction.message}</p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                disabled={processingAction}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button
                variant={
                  confirmAction.type === "delete" ||
                  confirmAction.type === "remove"
                    ? "destructive"
                    : "default"
                }
                onClick={confirmAction.action}
                disabled={processingAction}
                className={
                  confirmAction.type === "delete" ||
                  confirmAction.type === "remove"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-black font-bold"
                }
              >
                {processingAction ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
