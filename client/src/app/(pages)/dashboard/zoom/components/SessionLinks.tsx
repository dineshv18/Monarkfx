"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
  RefreshCw,
  Link2,
  Copy,
  ExternalLink,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ZoomLiveClass {
  id: string;
  title: string;
  startTime: string;
  isActive: boolean;
  isOnClassroom?: boolean;
  zoomLink?: string;
  zoomMeetingId?: string;
  zoomPassword?: string;
  slug: string;
}

export default function SessionLinks() {
  const [sessions, setSessions] = useState<ZoomLiveClass[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/classes`,
        { withCredentials: true }
      );
      setSessions(response.data.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast({
        title: "Error",
        description: "Failed to load session data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchSessions();
      toast({
        title: "Success",
        description: "Session links refreshed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh session links",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Success",
        description: "Link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white border border-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white border border-red-500">
        <XCircle className="h-3 w-3 mr-1" />
        Inactive
      </span>
    );
  };

  const getLiveStatusBadge = (isOnClassroom: boolean) => {
    if (isOnClassroom) {
      return (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white border border-red-500">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></div>
            LIVE
          </span>
        </div>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-600 text-white border border-zinc-500">
        Offline
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Filter for active sessions
  const activeSessions = sessions.filter((session) => session.isActive);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
          <Link2 className="h-5 w-5 text-green-400" />
          Class Links Management
        </h3>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 border-green-500/50 text-green-400 hover:bg-green-500/10"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
              <TableHead className="text-zinc-300">Class Title</TableHead>
              <TableHead className="text-zinc-300">Start Time</TableHead>
              <TableHead className="text-zinc-300">Status</TableHead>
              <TableHead className="text-zinc-300">Live Status</TableHead>
              <TableHead className="text-zinc-300">Zoom Details</TableHead>
              <TableHead className="text-zinc-300">Student Link</TableHead>
              <TableHead className="text-zinc-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeSessions.length > 0 ? (
              activeSessions.map((session) => {
                const studentLink = `${window.location.origin}/live-classes/${session.id}`;

                return (
                  <TableRow
                    key={session.id}
                    className="border-zinc-700 hover:bg-zinc-800/50"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">
                          {session.title}
                        </p>
                        <p className="text-xs text-zinc-400">
                          ID: {session.id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {formatDate(session.startTime)}
                    </TableCell>
                    <TableCell>{getStatusBadge(session.isActive)}</TableCell>
                    <TableCell>
                      {getLiveStatusBadge(session.isOnClassroom || false)}
                    </TableCell>
                    <TableCell>
                      {session.zoomLink ? (
                        <div className="space-y-1">
                          <div className="text-xs text-zinc-400">
                            Meeting ID: {session.zoomMeetingId}
                          </div>
                          <div className="text-xs text-zinc-400">
                            Password: {session.zoomPassword}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-500">
                          No Zoom details
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300 max-w-xs truncate">
                          {studentLink}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(studentLink)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(studentLink, "_blank")}
                          className="text-green-400 hover:text-green-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        {session.zoomLink && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              window.open(session.zoomLink, "_blank")
                            }
                            className="text-purple-400 hover:text-purple-300"
                          >
                            <Link2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-zinc-400"
                >
                  No active sessions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
