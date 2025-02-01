"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Edit2, Trash2, InfoIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Course {
  id: string
  title: string
  price: number
}

interface Coupon {
  id: string
  code: string
  discount: number
  limit: number
  isActive: boolean
  oneTimePerUser: boolean
  validFrom: string
  validUntil: string | null
  minimumPurchase: number
  createdAt: string
  updatedAt: string
  courses: Course[]
}

interface EditingCoupon extends Omit<Coupon, "id" | "createdAt" | "updatedAt"> {
  id?: string
  courses: Course[]
}

const AdminCouponsPage: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [editingCoupon, setEditingCoupon] = useState<EditingCoupon | null>(null)
  const [courses, setCourses] = useState<Course[]>([])

  const [newCoupon, setNewCoupon] = useState<EditingCoupon>({
    code: "",
    discount: 0,
    limit: -1,
    isActive: true,
    oneTimePerUser: false,
    validFrom: new Date().toISOString(),
    validUntil: null,
    minimumPurchase: 0,
    courses: [],
  })

  const fetchData = async () => {
    try {
      const [couponsRes, coursesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coupon`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coupon/courses`),
      ])
      setCoupons(couponsRes.data.data.map((coupon: Coupon) => ({
        ...coupon,
        courses: coupon.courses || []
      })))
      setCourses(coursesRes.data.data.courses || [])
    } catch (error) {
      toast.error("Error fetching data")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const validateCoupon = (coupon: EditingCoupon): boolean => {
    if (coupon.code.trim().length === 0) {
      toast.error("Coupon code cannot be empty")
      return false
    }
    if (coupon.discount < 1 || coupon.discount > 100) {
      toast.error("Discount must be between 1% and 100%")
      return false
    }
    if (coupon.validUntil && new Date(coupon.validUntil) <= new Date(coupon.validFrom)) {
      toast.error("Valid until date must be after valid from date")
      return false
    }
    if (coupon.minimumPurchase < 0) {
      toast.error("Minimum purchase amount cannot be negative")
      return false
    }
    return true
  }

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCoupon(newCoupon)) {
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/coupon`, newCoupon, {
        withCredentials: true,
      })

      if (response.data.success) {
        toast.success("Coupon created successfully")
        fetchData()
        setNewCoupon({
          code: "",
          discount: 0,
          limit: -1,
          isActive: true,
          oneTimePerUser: false,
          validFrom: new Date().toISOString(),
          validUntil: null,
          minimumPurchase: 0,
          courses: [],
        })
      } else {
        toast.error(response.data.message || "Failed to create coupon")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error creating coupon")
      } else {
        toast.error("Error creating coupon")
      }
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/coupon/${id}`)
      if (response.data.success) {
        toast.success("Coupon deleted successfully")
        fetchData()
      } else {
        toast.error(response.data.message || "Failed to delete coupon")
      }
    } catch (error) {
      toast.error("Error deleting coupon")
    }
  }

  const startEditing = (coupon: Coupon) => {
    setEditingCoupon({
      ...coupon,
      validFrom: new Date(coupon.validFrom).toISOString(),
      validUntil: coupon.validUntil ? new Date(coupon.validUntil).toISOString() : null,
    })
  }

  const handleEdit = async (couponId: string) => {
    if (!editingCoupon) {
      toast.error("No coupon to update")
      return
    }

    if (!validateCoupon(editingCoupon)) {
      return
    }

    try {
      const originalCoupon = coupons.find((c) => c.id === couponId)
      if (!originalCoupon) {
        toast.error("Coupon not found")
        return
      }

      const changedFields: Partial<EditingCoupon> = {}
        ; (Object.keys(editingCoupon) as Array<keyof EditingCoupon>).forEach((key) => {
          if (editingCoupon[key] !== originalCoupon[key]) {
            changedFields[key] = editingCoupon[key]
          }
        })

      if (Object.keys(changedFields).length === 0) {
        toast.info("No changes to update")
        setEditingCoupon(null)
        return
      }

      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/coupon/${couponId}`, changedFields, {
        withCredentials: true,
      })

      if (response.data.success) {
        toast.success("Coupon updated successfully")
        setEditingCoupon(null)
        fetchData()
      } else {
        toast.error(response.data.message || "Failed to update coupon")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error updating coupon")
      } else {
        toast.error("Error updating coupon")
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Coupon</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateCoupon} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                  id="code"
                  value={newCoupon.code}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Valid From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(new Date(newCoupon.validFrom), "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={new Date(newCoupon.validFrom)}
                      onSelect={(date) =>
                        date &&
                        setNewCoupon({
                          ...newCoupon,
                          validFrom: date.toISOString(),
                        })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Valid Until</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newCoupon.validUntil ? format(new Date(newCoupon.validUntil), "PPP") : "No expiry"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newCoupon.validUntil ? new Date(newCoupon.validUntil) : undefined}
                      onSelect={(date) =>
                        setNewCoupon({
                          ...newCoupon,
                          validUntil: date ? date.toISOString() : null,
                        })
                      }
                      disabled={(date) => date <= new Date(newCoupon.validFrom)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Label>Minimum Purchase Amount</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Minimum cart value required to use this coupon</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="minimumPurchase"
                  type="number"
                  value={newCoupon.minimumPurchase}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      minimumPurchase: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="limit">Usage Limit</Label>
                <Input
                  id="limit"
                  type="number"
                  value={newCoupon.limit}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      limit: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Label>Apply to Courses</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Leave empty to apply to all courses, or select specific courses</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={newCoupon.courses.map((c) => c.id).join(",")}
                onValueChange={(value) => {
                  const selectedIds = value.split(",").filter(Boolean)
                  const selectedCourses = courses.filter((c) => selectedIds.includes(c.id))
                  setNewCoupon({
                    ...newCoupon,
                    courses: selectedCourses,
                  })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select courses (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="oneTimePerUser"
                checked={newCoupon.oneTimePerUser}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    oneTimePerUser: e.target.checked,
                  })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label htmlFor="oneTimePerUser">One-time use per user</Label>
            </div>

            <Button type="submit">Create Coupon</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Existing Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Valid Period</TableHead>
                  <TableHead>Min Purchase</TableHead>
                  <TableHead>Limit</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      {editingCoupon?.id === coupon.id ? (
                        <Input
                          value={editingCoupon.code}
                          onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value })}
                        />
                      ) : (
                        coupon.code
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCoupon?.id === coupon.id ? (
                        <Input
                          type="number"
                          value={editingCoupon.discount}
                          onChange={(e) => setEditingCoupon({ ...editingCoupon, discount: Number(e.target.value) })}
                        />
                      ) : (
                        `${coupon.discount}%`
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCoupon?.id === coupon.id ? (
                        <>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant={"outline"} className="w-full mb-2">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {format(new Date(editingCoupon.validFrom), "PPP")}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={new Date(editingCoupon.validFrom)}
                                onSelect={(date) =>
                                  date &&
                                  setEditingCoupon({
                                    ...editingCoupon,
                                    validFrom: date.toISOString(),
                                  })
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant={"outline"} className="w-full">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {editingCoupon.validUntil
                                  ? format(new Date(editingCoupon.validUntil), "PPP")
                                  : "No expiry"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={editingCoupon.validUntil ? new Date(editingCoupon.validUntil) : undefined}
                                onSelect={(date) =>
                                  setEditingCoupon({
                                    ...editingCoupon,
                                    validUntil: date ? date.toISOString() : null,
                                  })
                                }
                                disabled={(date) => date <= new Date(editingCoupon.validFrom)}
                              />
                            </PopoverContent>
                          </Popover>
                        </>
                      ) : (
                        <>
                          {new Date(coupon.validFrom).toLocaleDateString()} -
                          {coupon.validUntil ? new Date(coupon.validUntil).toLocaleDateString() : "No expiry"}
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCoupon?.id === coupon.id ? (
                        <Input
                          type="number"
                          value={editingCoupon.minimumPurchase}
                          onChange={(e) =>
                            setEditingCoupon({
                              ...editingCoupon,
                              minimumPurchase: Number(e.target.value),
                            })
                          }
                        />
                      ) : (
                        `₹${coupon.minimumPurchase}`
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCoupon?.id === coupon.id ? (
                        <Input
                          type="number"
                          value={editingCoupon.limit}
                          onChange={(e) =>
                            setEditingCoupon({
                              ...editingCoupon,
                              limit: Number(e.target.value),
                            })
                          }
                        />
                      ) : coupon.limit === -1 ? (
                        "Unlimited"
                      ) : (
                        coupon.limit
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCoupon?.id === coupon.id ? (
                        <Select
                          value={editingCoupon.courses.map((c) => c.id).join(",")}
                          onValueChange={(value) => {
                            const selectedIds = value.split(",").filter(Boolean)
                            const selectedCourses = courses.filter((c) => selectedIds.includes(c.id))
                            setEditingCoupon({
                              ...editingCoupon,
                              courses: selectedCourses,
                            })
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : coupon.courses.length ? (
                        coupon.courses.map((c) => c.title).join(", ")
                      ) : (
                        "All Courses"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {editingCoupon?.id === coupon.id ? (
                          <>
                            <Button onClick={() => handleEdit(coupon.id)} size="sm" variant="outline">
                              Save
                            </Button>
                            <Button onClick={() => setEditingCoupon(null)} size="sm" variant="outline">
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button onClick={() => startEditing(coupon)} size="sm" variant="outline">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                        <Button onClick={() => handleDelete(coupon.id)} size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminCouponsPage

