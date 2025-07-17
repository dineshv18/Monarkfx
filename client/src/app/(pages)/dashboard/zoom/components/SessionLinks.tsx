"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshCw, Link2, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ZoomLiveClass {
  id: string;
  title: string;
  startTime: string;
  isActive: boolean;
  isOnClassroom?: boolean;
  zoomLink?: string;
  slug: string;
}

interface SessionLinksProps {
  sessions: ZoomLiveClass[];
  classes?: ZoomLiveClass[];
  refreshData: () => void;
}

export default function SessionLinks({
  sessions,
  classes,
  refreshData,
}: SessionLinksProps) {
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshData();
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
    return new Date(dateString).toLocaleString();
  };

  // Combine sessions and classes, prioritizing sessions
  const allSessions = sessions || classes || [];

  // Filter for active sessions that are in the future
  const activeUpcomingClasses =
    allSessions.filter(
      (session) => session.isActive && new Date(session.startTime) > new Date()
    ) || [];

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
          className="flex items-center gap-2 bg-green-500/10 border-green-500/50 text-green-400 hover:bg-green-500/20"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      <div className="bg-zinc-900 border border-green-500/30 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-green-500/30 hover:bg-green-500/5">
              <TableHead className="text-green-400 font-semibold">
                Class Title
              </TableHead>
              <TableHead className="text-green-400 font-semibold">
                Start Time
              </TableHead>
              <TableHead className="text-green-400 font-semibold">
                Status
              </TableHead>
              <TableHead className="text-green-400 font-semibold">
                Live Status
              </TableHead>
              <TableHead className="text-green-400 font-semibold">
                Student Link
              </TableHead>
              <TableHead className="text-green-400 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeUpcomingClasses.length > 0 ? (
              activeUpcomingClasses.map((session) => {
                const studentLink = `${window.location.origin}/courses/zoom/${session.slug}`;

                return (
                  <TableRow
                    key={session.id}
                    className="border-green-500/30 hover:bg-green-500/10"
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
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          session.isActive
                            ? "bg-green-500/20 text-green-400 border border-green-500/50"
                            : "bg-red-500/20 text-red-400 border border-red-500/50"
                        }`}
                      >
                        {session.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            session.isOnClassroom
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                              : "bg-zinc-700 text-zinc-300 border border-zinc-600"
                          }`}
                        >
                          {session.isOnClassroom ? "LIVE" : "Offline"}
                        </span>
                        {session.isOnClassroom && (
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300 max-w-xs truncate">
                          {studentLink}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(studentLink)}
                          className="bg-green-500/10 border-green-500/50 text-green-400 hover:bg-green-500/20"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(studentLink, "_blank")}
                          className="bg-blue-500/10 border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        {session.zoomLink && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(session.zoomLink!)}
                            className="bg-amber-500/10 border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Zoom Link
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
                  colSpan={6}
                  className="text-center py-8 text-zinc-400"
                >
                  No active upcoming classes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 p-4 bg-zinc-800 border border-green-500/20 rounded-lg">
        <h4 className="font-medium text-white mb-2">
          How to share class links:
        </h4>
        <ul className="text-sm text-zinc-300 space-y-1">
          <li>
            • Share the <strong className="text-green-400">Student Link</strong>{" "}
            with students for them to access the class
          </li>
          <li>
            • Use the <strong className="text-blue-400">Preview</strong> button
            to see how students will view the class
          </li>
          <li>
            • Copy the <strong className="text-amber-400">Zoom Link</strong> to
            join the class as an instructor
          </li>
          <li>
            • Classes must be marked as{" "}
            <strong className="text-green-400">Active</strong> and{" "}
            <strong className="text-blue-400">Live</strong> for students to join
          </li>
        </ul>
      </div>
    </div>
  );
}
