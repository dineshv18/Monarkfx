"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAuth } from "@/helper/AuthContext"
import { format } from "date-fns"
import { toast } from "sonner"

// UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

// Custom Components

// Icons
import {
  BookOpenIcon,
  PencilIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  UserIcon,
  MapPinIcon,
  GraduationCap,
  Target,
  Trophy,
  Award,
  ChevronRight,
  Building2,
  Clock4,
  AlertCircle,
} from "lucide-react"

// Types
import type { ApiResponseTh, Enrollment, UserSec, Purchase } from "@/type"
import EnhancedCourseCard from "../../_components/EnhancedCourseCard"
import CustomSeparator from "./custom-separator"
import CustomProgress from "./custom-progress"
import CustomAvatar from "./custom-avatar"
import CustomTooltip from "./custom-tooltip"
import SpotlightCard from "../business/SpotlightCard"

interface UserSubscription {
  type: "ONLINE" | "OFFLINE"
  startDate: string
  endDate: string
  fees: number
  status: "ACTIVE" | "EXPIRED"
  lastPayment: string
  progress?: number
  achievements?: number
  attendance?: number
  batchTiming?: string
  location?: string
}

interface ExtendedUserSec extends UserSec {
  subscription?: UserSubscription
  lastActive?: string
  location?: string
  totalCourses?: number
  completedCourses?: number
  certificatesEarned?: number
  joinedDate?: string
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: any
  label: string
  value: string | number
  description?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 bg-white rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-all duration-200"
  >
    <div className="flex items-start space-x-3">
      <div className="p-2 bg-red-50 rounded-lg">
        <Icon className="h-5 w-5 text-red-600" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
    </div>
  </motion.div>
)

const UserStats = ({ user }: { user: ExtendedUserSec }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <StatCard icon={BookOpenIcon} label="Total Courses" value={user.totalCourses || 0} description="Enrolled courses" />
    <StatCard
      icon={GraduationCap}
      label="Completed"
      value={user.completedCourses || 0}
      description="Successfully finished"
    />
    <StatCard
      icon={Trophy}
      label="Certificates"
      value={user.certificatesEarned || 0}
      description="Achievements earned"
    />
    <StatCard
      icon={Target}
      label="Overall Progress"
      value={`${user.subscription?.progress || 0}%`}
      description="Course completion"
    />
  </div>
)

const SubscriptionInfo = ({ subscription }: { subscription?: UserSubscription }) => {
  if (!subscription) {
    return (
      <Card className="border-red-100 mb-6">
        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <Award className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Subscription</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              Join Monark FX to access premium trading courses and expert mentorship
            </p>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => (window.location.href = "/pricing")}
            >
              View Plans
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className="border-red-100 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-semibold text-gray-900">Subscription Details</span>
          <Badge
            variant={subscription.status === "ACTIVE" ? "default" : "destructive"}
            className={subscription.status === "ACTIVE" ? "bg-green-500" : ""}
          >
            {subscription.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Type</span>
              </div>
              <Badge variant="outline" className="font-medium">
                {subscription.type}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock4 className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Batch Timing</span>
              </div>
              <span className="font-medium">{subscription.batchTiming || "Not specified"}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Fees</span>
              </div>
              <span className="font-medium">₹{subscription.fees.toLocaleString()}</span>
            </div>

            <CustomSeparator />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Started: {format(new Date(subscription.startDate), "PP")}</p>
              <p className="text-sm text-gray-600">Expires: {format(new Date(subscription.endDate), "PP")}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Course Progress</span>
                <span className="font-medium">{subscription.progress || 0}%</span>
              </div>
              <CustomProgress value={subscription.progress || 0} className="bg-red-100" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Attendance</span>
                <span className="font-medium">{subscription.attendance || 0}%</span>
              </div>
              <CustomProgress value={subscription.attendance || 0} className="bg-red-100" />
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Location</h4>
              <p className="text-sm text-gray-600">{subscription.location || "Online"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const LoadingState = () => (
  <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-white via-red-50 to-gray-50">
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <CustomSeparator />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

const ErrorState = ({ error, retry }: { error: string; retry: () => void }) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-white via-red-50 to-gray-50">
    <Card className="w-full max-w-md">
      <CardContent className="p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={retry} className="bg-red-600 hover:bg-red-700 text-white">
          Try Again
        </Button>
      </CardContent>
    </Card>
  </div>
)

const UserProfile = () => {
  const { checkAuth } = useAuth()
  const [user, setUser] = useState<ExtendedUserSec | null>(null)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const isAuthenticated = await checkAuth()
        if (!isAuthenticated) {
          router.push("/auth")
          return
        }

        const [userResponse, enrollmentsResponse, purchasesResponse] = await Promise.all([
          axios.get<ApiResponseTh<{ user: UserSec }>>(`${process.env.NEXT_PUBLIC_API_URL}/user/get-user`),
          axios.get<ApiResponseTh<Enrollment[]>>(`${process.env.NEXT_PUBLIC_API_URL}/enrollment/user`),
          axios.get<ApiResponseTh<Purchase[]>>(`${process.env.NEXT_PUBLIC_API_URL}/purchase/my-course`),
        ])

        if (userResponse.data && userResponse.data.success) {
          setUser(userResponse.data.data.user)
          setNewName(userResponse.data.data.user.name)
        }

        if (enrollmentsResponse.data && enrollmentsResponse.data.success) {
          setEnrollments(enrollmentsResponse.data.data)
        }

        if (purchasesResponse.data && purchasesResponse.data.success) {
          setPurchases(Array.isArray(purchasesResponse.data.message) ? purchasesResponse.data.message : [])
        }
      } catch (error) {
        setError("An error occurred while fetching data")
        console.error("Fetch error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [checkAuth, router])

  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update-name`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )

      if (response.data && response.data.success) {
        setUser((prevUser) => (prevUser ? { ...prevUser, name: newName } : null))
        setIsEditing(false)
        toast.success("Name updated successfully")
      }
    } catch (error) {
      console.error("Error updating name:", error)
      toast.error("Failed to update name")
    }
  }

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} retry={() => router.refresh()} />
  if (!user) return null

  return (
    <div className="min-h-screen p-6  font-plus-jakarta-sans mt-20" >
      <SpotlightCard
        spotlightColor="rgba(220, 38, 38, 0.85)"
        className="bg-gradient-to-br from-gray-900/10 via-red-600/20 to-gray-100"

      >
        <Card className="max-w-4xl mx-auto ">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <CustomAvatar
                src={`https://ui-avatars.com/api/?name=${user.name.replace(" ", "+")}&background=610981&color=fff`}
                alt={user.name}
                size="lg"
              />
              <div>
                {isEditing ? (
                  <form onSubmit={handleNameUpdate} className="flex items-center space-x-2">
                    <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="text-2xl font-bold" />
                    <Button type="submit" variant="outline">
                      Save
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                    <CustomTooltip content="Edit name">
                      <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="h-8 w-8">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </CustomTooltip>
                  </div>
                )}
                <p className="text-gray-600 font-inter">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant={user.role === "ADMIN" ? "default" : "secondary"} className="text-sm">
                    {user.role}
                  </Badge>
                  {user.isVerified && (
                    <Badge variant="outline" className="text-sm flex items-center space-x-1">
                      <ShieldCheckIcon className="h-3 w-3" />
                      <span>Verified</span>
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <CustomSeparator className="my-6" />

            <UserStats user={user} />
            <SubscriptionInfo subscription={user.subscription} />

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <BookOpenIcon className="mr-2" />
                  My Enrolled Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {enrollments.length === 0 ? (
                    <p className="text-gray-500 font-inter">You haven&apos;t enrolled in any courses yet.</p>
                  ) : (
                    enrollments.map((enrollment) => (
                      <EnhancedCourseCard key={enrollment.course.id} course={enrollment.course} />
                    ))
                  )}
                </div>
              </div>

              <CustomSeparator className="my-6" />

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <ShoppingCartIcon className="mr-2" />
                  My Purchased Courses
                </h2>
                {purchases.length === 0 ? (
                  <p className="text-gray-500 font-inter">You haven&apos;t purchased any courses yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {purchases.map((purchase, idx) => (
                      <EnhancedCourseCard key={idx} course={purchase.course} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </SpotlightCard>
    </div>
  )
}

export default UserProfile

