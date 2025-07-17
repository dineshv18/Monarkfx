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
import { Loader2, ExternalLink } from "lucide-react";
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
  status: "ACTIVE" | "CANCELLED" | "EXPIRED";
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
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-400" />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-green-500/30 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-green-500/30 hover:bg-green-500/5">
            <TableHead className="text-green-400 font-semibold">User</TableHead>
            <TableHead className="text-green-400 font-semibold">
              Session
            </TableHead>
            <TableHead className="text-green-400 font-semibold">
              Start Date
            </TableHead>
            <TableHead className="text-green-400 font-semibold">
              End Date
            </TableHead>
            <TableHead className="text-green-400 font-semibold">
              Next Payment
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
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <TableRow
                key={subscription.id}
                className="border-green-500/30 hover:bg-green-500/10"
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
                <TableCell className="text-zinc-300">
                  {formatDate(subscription.startDate)}
                </TableCell>
                <TableCell className="text-zinc-300">
                  {formatDate(subscription.endDate)}
                </TableCell>
                <TableCell className="text-zinc-300">
                  {formatDate(subscription.nextPaymentDate)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      subscription.status === "ACTIVE"
                        ? "bg-green-500/20 text-green-400 border border-green-500/50"
                        : subscription.status === "CANCELLED"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/50"
                        : "bg-red-500/20 text-red-400 border border-red-500/50"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {subscription.status === "ACTIVE" && (
                      <Link href={`/dashboard/zoom/cancel/${subscription.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500/20"
                        >
                          Cancel
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // View details functionality
                        console.log("View details for:", subscription.id);
                      }}
                      className="bg-blue-500/10 border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-zinc-400">
                No subscriptions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
