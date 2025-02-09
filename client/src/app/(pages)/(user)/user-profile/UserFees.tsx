"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { format, differenceInDays, isAfter } from "date-fns"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CreditCard, IndianRupee, Calendar, ArrowRight, History } from "lucide-react"
import Script from "next/script"
import { Fee, FeeData, PaginationInfo } from "@/type"



export default function UserFees() {
  const [loading, setLoading] = useState(true)
  const [feeData, setFeeData] = useState<FeeData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pages: 1,
  })

  useEffect(() => {
    fetchUserFees()
    fetchPaymentHistory()
  }, [])

  const fetchUserFees = async (page = 1) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fees/details?page=${page}`, {
        withCredentials: true,
      })

      if (response.data?.success) {
        const { fees, payments } = response.data.data
        setFeeData({
          fees: {
            upcoming: fees.upcoming,
            overdue: fees.overdue,
            summary: fees.summary,
          },
          payments: payments,
        })
        setPagination({
          total: fees.summary.upcomingCount + fees.summary.overdueCount,
          page: page,
          pages: Math.ceil((fees.summary.upcomingCount + fees.summary.overdueCount) / 10),
        })
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

  const fetchPaymentHistory = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fees/history`, { withCredentials: true })

      if (response.data?.success) {
        setFeeData((prevData) => ({
          ...prevData!,
          payments: response.data.data.payments || [],
        }))
      }
    } catch (error) {
      console.error("Error fetching payment history:", error)
    }
  }

  const handlePayFee = async (feeId: string, amount: number) => {
    try {
      const loadingToast = toast.loading("Initiating payment...")

      const keyResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fees/getkey`, { withCredentials: true })

      if (!keyResponse.data?.success) {
        throw new Error("Failed to get payment configuration")
      }

      const key = keyResponse.data.data.key

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/fees/pay`,
        { feeId, amount },
        { withCredentials: true },
      )

      toast.dismiss(loadingToast)

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to initiate payment")
      }

      const { order_id, amount: orderAmount, currency, user, fee } = response.data.data

      const options = {
        key: key,
        amount: orderAmount,
        currency: "INR",
        name: "MonarkFX - Global Trading Excellence",
        description:
          "Empower your financial future with expert trading education in stocks, forex, and cryptocurrency.",
        image: "/logo.png",
        order_id: order_id,
        prefill: {
          name: user.name,
          email: user.email,
        },
        notes: {
          feeId: fee.id,
        },
        theme: {
          color: "#EF4444",
        },
        handler: async (response: any) => {
          try {
            const verifyToast = toast.loading("Verifying payment...")

            const verifyResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/fees/verify-payment`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                feeId: fee.id,
                amount: orderAmount / 100,
              },
              { withCredentials: true },
            )

            toast.dismiss(verifyToast)

            if (verifyResponse.data?.success) {
              toast.success("Payment successful!")
              fetchUserFees()
            } else {
              throw new Error(verifyResponse.data?.message || "Payment verification failed")
            }
          } catch (error: any) {
            console.error("Payment verification error:", error)
            toast.error(error.message || "Payment verification failed")
          }
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled")
          },
          confirm_close: true,
          escape: true,
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on("payment.failed", (resp: any) => {
        toast.error(`Payment failed: ${resp.error.description}`)
      })

      razorpay.open()
    } catch (error: any) {
      toast.dismiss()
      console.error("Payment initiation error:", error)
      toast.error(error.response?.data?.message || error.message || "Failed to initiate payment")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800 border-green-200"
      case "PARTIAL":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "PENDING":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "OVERDUE":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const isLateFeeApplicable = (fee: Fee) => {
    const currentDate = new Date()
    const dueDate = new Date(fee.dueDate)
    const lateFeeDate = fee.lateFeeDate ? new Date(fee.lateFeeDate) : null

    if (lateFeeDate && isAfter(currentDate, lateFeeDate)) {
      return true
    }

    if (fee.gracePeriod) {
      const gracePeriodEnd = new Date(dueDate)
      gracePeriodEnd.setDate(gracePeriodEnd.getDate() + fee.gracePeriod)
      return isAfter(currentDate, gracePeriodEnd)
    }

    return isAfter(currentDate, dueDate)
  }

  const renderFeeCard = (fee: Fee, isOverdue: boolean) => {
    const dueDate = new Date(fee.dueDate)
    const currentDate = new Date()
    const daysDifference = differenceInDays(dueDate, currentDate)
    const lateFeeApplicable = isLateFeeApplicable(fee)

    return (
      <div key={fee.id} className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-medium text-gray-900">{fee.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Due: {format(dueDate, "PPP")}</span>
              {isOverdue ? (
                <span className="text-red-600">(Overdue by {Math.abs(daysDifference)} days)</span>
              ) : (
                <span className="text-primary">({daysDifference} days remaining)</span>
              )}
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(isOverdue ? "OVERDUE" : fee.status)}>
            {isOverdue ? "OVERDUE" : fee.status}
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="font-semibold text-gray-900">₹{fee.amount.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Paid</p>
            <p className="font-semibold text-green-600">₹{fee.totalPaid.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Remaining</p>
            <p className="font-semibold text-red-600">
              ₹{fee.remaining.toLocaleString()}
              {lateFeeApplicable && (
                <span>
                  + ₹{fee.lateFeeAmount.toLocaleString()} <span className="font-normal">(Late Fee)</span>
                </span>
              )}
            </p>
          </div>
        </div>

        {fee.remaining > 0 && (
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => handlePayFee(fee.id, fee.remaining + (lateFeeApplicable ? fee.lateFeeAmount : 0))}
              className="bg-primary hover:bg-primary/90"
            >
              <IndianRupee className="h-4 w-4 mr-2" />
              Pay Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Fees</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {!loading && feeData && feeData.fees.upcoming.length === 0 && feeData.fees.overdue.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No upcoming fees due</p>
                    </div>
                  ) : (
                    <>
                      {feeData && feeData.fees.overdue.map((fee) => renderFeeCard(fee, true))}
                      {feeData && feeData.fees.upcoming.map((fee) => {
                        const dueDate = new Date(fee.dueDate)
                        const currentDate = new Date()
                        const daysDifference = differenceInDays(dueDate, currentDate)
                        if (daysDifference <= 10 && daysDifference > 0) {
                          return renderFeeCard(fee, false)
                        }
                        return null
                      })}
                    </>
                  )}
                </div>
              </ScrollArea>
              {pagination.pages > 1 && (
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => fetchUserFees(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    variant="outline"
                    className="mr-2"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => fetchUserFees(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {!loading && feeData && feeData.payments.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No payment history available</p>
                    </div>
                  ) : (
                    feeData &&
                    feeData.payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h3 className="font-medium text-gray-900">{payment.fee.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <History className="h-4 w-4" />
                              <span>Paid on: {format(new Date(payment.paymentDate), "PPP")}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">Amount Paid</p>
                            <p className="font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">Receipt Number</p>
                            <p className="font-semibold text-gray-900">{payment.receiptNumber}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}

