"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  isActive: boolean;
  limit: number;
  oneTimePerUser: boolean;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: 0,
    limit: -1,
    oneTimePerUser: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch coupons on component mount
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/coupon`
      );
      setCoupons(response.data.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      setError("Failed to fetch coupons. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateCoupon = async (id: string, data: Partial<Coupon>) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/coupon/${id}`,
        data
      );

      if (response.data.success) {
        setCoupons(
          coupons.map((coupon) =>
            coupon.id === id ? { ...coupon, ...data } : coupon
          )
        );
        toast.success("Coupon updated successfully");
      }
    } catch (error) {
      console.error("Error updating coupon:", error);
      toast.error("Failed to update coupon");
    }
  };

  const deleteCoupon = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/coupon/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCoupons(coupons.filter((coupon) => coupon.id !== id));
      toast.success("Coupon deleted successfully");
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("Failed to delete coupon");
    }
  };

  const createCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCoupon.discount >= 100) {
      toast.error("Discount cannot be greater than 99%");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/coupon`,
        newCoupon
      );
      setCoupons([...coupons, response.data.data]);
      setNewCoupon({
        code: "",
        discount: 1,
        limit: -1,
        oneTimePerUser: false,
      });
      toast.success("Coupon created successfully");
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast.error("Failed to create coupon");
    }
  };

  // Loading and Error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Coupon Management</h1>

      {/* Create Coupon Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Coupon</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createCoupon} className="space-y-4">
            {/* Code Input */}
            <div>
              <label className="block text-sm font-medium mb-1">Code</label>
              <Input
                value={newCoupon.code}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    code: e.target.value.toUpperCase(),
                  })
                }
                placeholder="EXAMPLE10"
                required
              />
            </div>

            {/* Discount Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Discount (%)
              </label>
              <Input
                type="number"
                value={newCoupon.discount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value <= 0) {
                    toast.error("Discount must be greater than 0");
                    return;
                  }
                  if (value > 100) {
                    toast.error("Discount cannot be greater than 100%");
                    return;
                  }
                  setNewCoupon({
                    ...newCoupon,
                    discount: value,
                  });
                }}
                min="1"
                max="100"
                required
              />
            </div>

            {/* Usage Limit Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Usage Limit (-1 for unlimited)
              </label>
              <Input
                type="number"
                value={newCoupon.limit}
                onChange={(e) => {
                  const value = e.target.value;
                  const parsedValue = parseInt(value);
                  if (value === "" || isNaN(parsedValue)) {
                    setNewCoupon({
                      ...newCoupon,
                      limit: -1,
                    });
                  } else {
                    setNewCoupon({
                      ...newCoupon,
                      limit: parsedValue < -1 ? -1 : parsedValue,
                    });
                  }
                }}
                min="-1"
                required
              />
            </div>

            {/* One-Time Per User Switch */}
            <div className="flex items-center space-x-2">
              <Switch
                id="oneTimePerUser"
                checked={newCoupon.oneTimePerUser}
                onCheckedChange={(checked) =>
                  setNewCoupon({
                    ...newCoupon,
                    oneTimePerUser: checked,
                  })
                }
              />
              <label htmlFor="oneTimePerUser" className="text-sm font-medium">
                One-time use per user
              </label>
            </div>

            <Button type="submit">Create Coupon</Button>
          </form>
        </CardContent>
      </Card>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Limit</TableHead>
                <TableHead>One-time Use</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>{coupon.code}</TableCell>
                  <TableCell>{coupon.discount}%</TableCell>
                  <TableCell>
                    {coupon.limit === -1 ? "Unlimited" : coupon.limit}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={coupon.oneTimePerUser}
                      onCheckedChange={(checked) =>
                        updateCoupon(coupon.id, { oneTimePerUser: checked })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={coupon.isActive}
                      onCheckedChange={(checked) =>
                        updateCoupon(coupon.id, { isActive: checked })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteCoupon(coupon.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
