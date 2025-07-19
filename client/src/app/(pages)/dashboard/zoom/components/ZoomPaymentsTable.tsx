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
import { Loader2, CheckCircle, XCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Subscription {
  zoomSession: {
    title: string;
  };
}

interface Payment {
  id: string;
  receiptNumber: string;
  amount: number;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  status: string;
  paymentType: string;
  createdAt: string;
  user: User;
  subscription: Subscription;
}

interface Pagination {
  page: number;
  pages: number;
  total: number;
}

export default function ZoomPaymentsTable() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pages: 1,
    total: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments(1);
  }, []);

  const fetchPayments = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/zoom-live-class/admin/payments?page=${page}&limit=10`,
        { withCredentials: true }
      );
      setPayments(response.data.data.payments);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast({
        title: "Error",
        description: "Failed to load payment data. Please try again.",
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    if (status === "COMPLETED") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white border border-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white border border-red-500">
        <XCircle className="h-3 w-3 mr-1" />
        Failed
      </span>
    );
  };

  const getPaymentTypeBadge = (type: string) => {
    if (type === "REGISTRATION") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white border border-blue-500">
          Registration
        </span>
      );
    }

    if (type === "COURSE_ACCESS") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-600 text-white border border-purple-500">
          Course Access
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-600 text-white border border-zinc-500">
        {type}
      </span>
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Payment ID copied to clipboard",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
              <TableHead className="text-zinc-300">Receipt #</TableHead>
              <TableHead className="text-zinc-300">User</TableHead>
              <TableHead className="text-zinc-300">Session</TableHead>
              <TableHead className="text-zinc-300">Amount</TableHead>
              <TableHead className="text-zinc-300">Type</TableHead>
              <TableHead className="text-zinc-300">Payment ID</TableHead>
              <TableHead className="text-zinc-300">Date</TableHead>
              <TableHead className="text-zinc-300">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="border-zinc-700 hover:bg-zinc-800/50"
                >
                  <TableCell className="text-white font-mono">
                    {payment.receiptNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">
                        {payment.user.name}
                      </p>
                      <p className="text-xs text-zinc-400">
                        {payment.user.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    {payment.subscription?.zoomSession?.title ??
                      "Unknown Session"}
                  </TableCell>
                  <TableCell className="text-green-400 font-semibold">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>
                    {getPaymentTypeBadge(payment.paymentType)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-300 font-mono bg-zinc-800 px-2 py-1 rounded">
                        {payment.razorpay_payment_id}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(payment.razorpay_payment_id)
                        }
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {formatDate(payment.createdAt)}
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-zinc-400"
                >
                  No payments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchPayments(Math.max(1, pagination.page - 1))}
            disabled={pagination.page === 1}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Previous
          </Button>
          <span className="text-zinc-300">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              fetchPayments(Math.min(pagination.pages, pagination.page + 1))
            }
            disabled={pagination.page === pagination.pages}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
