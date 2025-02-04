"use client";

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { 
    CreditCard, 
    AlertCircle, 
    Clock, 
    CheckCircle2, 
    IndianRupee,
    Calendar,
    ArrowRight
} from "lucide-react"
import axios from "axios"
import Script from "next/script";


declare global {
    interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Razorpay: any;
    }
  }

interface Fee {
    id: string
    title: string
    amount: number
    dueDate: string
    type: string
    status: string
    description?: string
    lateFeeDate?: string
    lateFeeAmount?: number
    totalPaid: number
    remaining: number
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function UserFees() {
    const [fees, setFees] = useState<Fee[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchUserFees()
    }, [])

    const fetchUserFees = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fees/details`, {
                withCredentials: true
            })
            
            if (response.data?.success) {
                setFees(response.data.data)
            } else {
                setError("Failed to fetch fees data")
            }
        } catch (error: any) {
            console.error("Error fetching fees:", error)
            setError(error.response?.data?.message || "Error fetching fees")
            toast.error(error.response?.data?.message || "Error fetching fees")
        } finally {
            setLoading(false)
        }
    }

    const handlePayFee = async (feeId: string, amount: number) => {
        try {
            // Show loading toast
            const loadingToast = toast.loading("Initiating payment...");

            // First get the Razorpay key
            const keyResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/fees/getkey`,
                { withCredentials: true }
            );

            if (!keyResponse.data?.success) {
                throw new Error("Failed to get payment configuration");
            }

            const key = keyResponse.data.data.key;

            // Then create the order
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/fees/pay`,
                { feeId, amount },
                { withCredentials: true }
            );

            toast.dismiss(loadingToast);

            if (!response.data?.success) {
                throw new Error(response.data?.message || "Failed to initiate payment");
            }

            const { order_id, amount: orderAmount, currency, user, fee } = response.data.data;

            const options = {
                key: key,
                amount: orderAmount,
                currency: "INR",
                name: "MonarkFX - Global Trading Excellence",
                description: "Empower your financial future with expert trading education in stocks, forex, and cryptocurrency.",
                image: "/logo.png", 
                order_id: order_id,
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                notes: {
                    feeId: fee.id
                },
                theme: {
                    color: "#EF4444",
                  },
                handler: async function(response: any) {
                    try {
                        const verifyToast = toast.loading("Verifying payment...");
                        
                        const verifyResponse = await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/fees/verify-payment`,
                            {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                feeId: fee.id,
                                amount: orderAmount / 100,
                            },
                            { withCredentials: true }
                        );

                        toast.dismiss(verifyToast);

                        if (verifyResponse.data?.success) {
                            toast.success("Payment successful!");
                            fetchUserFees(); // Refresh fee list
                        } else {
                            throw new Error(verifyResponse.data?.message || "Payment verification failed");
                        }
                    } catch (error: any) {
                        console.error("Payment verification error:", error);
                        toast.error(error.message || "Payment verification failed");
                    }
                },
                modal: {
                    ondismiss: function() {
                        toast.error("Payment cancelled");
                    },
                    confirm_close: true,
                    escape: true
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on('payment.failed', function(resp: any) {
                toast.error(`Payment failed: ${resp.error.description}`);
            });

            razorpay.open();

        } catch (error: any) {
            toast.dismiss();
            console.error("Payment initiation error:", error);
            toast.error(
                error.response?.data?.message || 
                error.message || 
                "Failed to initiate payment"
            );
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PAID":
                return "bg-green-100 text-green-800 border-green-200";
            case "PARTIAL":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "OVERDUE":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    if (loading) {
        return (
            <Card>
                <CardContent className="p-8">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <CardContent className="p-8">
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <AlertCircle className="h-8 w-8 text-red-500" />
                        <p className="text-red-600">{error}</p>
                        <Button onClick={fetchUserFees} variant="outline">
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload"
            />
            <Card className="shadow-lg">
                <CardHeader className="border-b bg-gray-50/50">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-primary" />
                            Fee Management
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                            {fees.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No fees due at the moment</p>
                                </div>
                            ) : (
                                fees.map((fee) => (
                                    <div
                                        key={fee.id}
                                        className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <h3 className="font-medium text-gray-900">
                                                    {fee.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>
                                                        Due: {format(new Date(fee.dueDate), "PPP")}
                                                    </span>
                                                </div>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={getStatusColor(fee.status)}
                                            >
                                                {fee.status}
                                            </Badge>
                                        </div>

                                        <div className="mt-4 grid grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">Total Amount</p>
                                                <p className="font-semibold text-gray-900">
                                                    ₹{fee.amount.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">Paid</p>
                                                <p className="font-semibold text-green-600">
                                                    ₹{fee.totalPaid.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">Remaining</p>
                                                <p className="font-semibold text-red-600">
                                                    ₹{fee.remaining.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        {fee.remaining > 0 && (
                                            <div className="mt-4 flex justify-end">
                                                <Button
                                                    onClick={() => handlePayFee(fee.id, fee.remaining)}
                                                    className="bg-primary hover:bg-primary/90"
                                                >
                                                    <IndianRupee className="h-4 w-4 mr-2" />
                                                    Pay Now
                                                    <ArrowRight className="h-4 w-4 ml-2" />
                                                </Button>
                                            </div>
                                        )}

                                        {fee.lateFeeAmount && new Date() > new Date(fee.lateFeeDate!) && (
                                            <div className="mt-4 flex items-center gap-2 text-sm text-red-600">
                                                <Clock className="h-4 w-4" />
                                                <span>
                                                    Late fee of ₹{fee.lateFeeAmount} will be applied after{" "}
                                                    {format(new Date(fee.lateFeeDate!), "PPP")}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    )
} 