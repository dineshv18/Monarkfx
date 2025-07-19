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
  Loader2,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
}

interface ZoomSession {
  id: string;
  title: string;
  slug: string;
}

interface Subscription {
  id: string;
  startDate: string;
  endDate: string;
  nextPaymentDate: string;
  status: "ACTIVE" | "CANCELLED" | "EXPIRED" | "PENDING_APPROVAL";
  isApproved: boolean;
  isRegistered: boolean;
  hasAccessToLinks: boolean;
  user: User;
  zoomSession: ZoomSession;
}

export default function ZoomSubscriptionsTable() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/subscriptions`,
        { withCredentials: true }
      );
      setSubscriptions(response.data.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast({
        title: "Error",
        description: "Failed to load subscription data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string, isApproved: boolean) => {
    if (status === "ACTIVE") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white border border-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </span>
      );
    }

    if (status === "PENDING_APPROVAL") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-600 text-white border border-yellow-500">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </span>
      );
    }

    if (status === "CANCELLED") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white border border-red-500">
          <XCircle className="h-3 w-3 mr-1" />
          Cancelled
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-600 text-white border border-zinc-500">
        {status}
      </span>
    );
  };

  const getRegistrationBadge = (isRegistered: boolean) => {
    if (isRegistered) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white border border-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Registered
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white border border-red-500">
        <XCircle className="h-3 w-3 mr-1" />
        Not Registered
      </span>
    );
  };

  const getAccessBadge = (hasAccess: boolean) => {
    if (hasAccess) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white border border-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Granted
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white border border-red-500">
        <XCircle className="h-3 w-3 mr-1" />
        Denied
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

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
            <TableHead className="text-zinc-300">User</TableHead>
            <TableHead className="text-zinc-300">Session</TableHead>
            <TableHead className="text-zinc-300">Status</TableHead>
            <TableHead className="text-zinc-300">Registration</TableHead>
            <TableHead className="text-zinc-300">Access</TableHead>
            <TableHead className="text-zinc-300">Start Date</TableHead>
            <TableHead className="text-zinc-300">End Date</TableHead>
            <TableHead className="text-zinc-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <TableRow
                key={subscription.id}
                className="border-zinc-700 hover:bg-zinc-800/50"
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-white">
                      {subscription.user.name}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {subscription.user.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  {subscription.zoomSession?.title ?? "Unknown Session"}
                </TableCell>
                <TableCell>
                  {getStatusBadge(subscription.status, subscription.isApproved)}
                </TableCell>
                <TableCell>
                  {getRegistrationBadge(subscription.isRegistered)}
                </TableCell>
                <TableCell>
                  {getAccessBadge(subscription.hasAccessToLinks)}
                </TableCell>
                <TableCell className="text-zinc-300">
                  {formatDate(subscription.startDate)}
                </TableCell>
                <TableCell className="text-zinc-300">
                  {formatDate(subscription.endDate)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {subscription.status === "ACTIVE" && (
                      <Link href={`/dashboard/zoom/cancel/${subscription.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-400 hover:bg-red-500/10"
                        >
                          Cancel
                        </Button>
                      </Link>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        // View details functionality
                        console.log("View details for:", subscription.id);
                      }}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-zinc-400">
                No subscriptions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
