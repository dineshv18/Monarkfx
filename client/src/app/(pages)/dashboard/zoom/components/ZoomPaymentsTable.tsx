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
import { Loader2 } from "lucide-react";
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
  status: string;
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
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-zinc-900 border border-green-500/30 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-green-500/30 hover:bg-green-500/5">
              <TableHead className="text-green-400 font-semibold">
                Receipt #
              </TableHead>
              <TableHead className="text-green-400 font-semibold">
                User
              </TableHead>
              <TableHead className="text-green-400 font-semibold">
                Session
              </TableHead>
              <TableHead className="text-green-400 font-semibold">
                Amount
              </TableHead>
              <TableHead className="text-green-400 font-semibold">
                Payment ID
              </TableHead>
              <TableHead className="text-green-400 font-semibold">
                Date
              </TableHead>
              <TableHead className="text-green-400 font-semibold">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="border-green-500/30 hover:bg-green-500/10"
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
                  <TableCell className="text-green-400 font-bold">
                    ₹{payment.amount}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-zinc-300 font-mono bg-zinc-800 px-2 py-1 rounded">
                      {payment.razorpay_payment_id}
                    </span>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {formatDate(payment.createdAt)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        payment.status === "COMPLETED"
                          ? "bg-green-500/20 text-green-400 border border-green-500/50"
                          : "bg-red-500/20 text-red-400 border border-red-500/50"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-zinc-400"
                >
                  No payments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
