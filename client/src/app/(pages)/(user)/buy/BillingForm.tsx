import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  MapPin,
  User,
  Mail,
  Phone,
  CreditCard,
  IndianRupee,
  CheckCircle,
} from "lucide-react";
import Script from "next/script";

interface BillingFormProps {
  courseId: string;
  courseTitle: string;
  coursePrice: number;
  onSuccess: () => void;
  referralCode?: string;
  addresses?: any[];
  onAddressSelect?: (address: any) => void;
  appliedCoupon?: any;
  originalPrice?: number;
}

// Indian cities and states data
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry",
];

const majorCities = {
  Delhi: ["Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"],
  Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Vellore"],
  Telangana: ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BillingForm({
  courseId,
  courseTitle,
  coursePrice,
  onSuccess,
  referralCode: initialReferralCode,
  addresses = [],
  onAddressSelect,
  appliedCoupon,
  originalPrice,
}: BillingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    zipCode: "",
    mobileNumber: "",
    referralCode: initialReferralCode || "",
    saveAddress: false,
  });
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  // Update cities when state changes
  useEffect(() => {
    if (
      selectedState &&
      majorCities[selectedState as keyof typeof majorCities]
    ) {
      setAvailableCities(
        majorCities[selectedState as keyof typeof majorCities]
      );
    } else {
      setAvailableCities([]);
    }
  }, [selectedState]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "state") {
      setSelectedState(value);
      setFormData((prev) => ({ ...prev, city: "" })); // Reset city when state changes
    }
  };

  const handleAddressSelect = (address: any) => {
    setFormData({
      ...formData,
      fullName: address.fullName || "",
      email: address.email || "",
      address: address.address || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "India",
      zipCode: address.zipCode || "",
      mobileNumber: address.mobileNumber || "",
    });
    setSelectedState(address.state || "");
    toast.success("Address loaded successfully!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get Razorpay Key first (public route)
      const keyResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/getpublickey`
      );

      if (!keyResponse.ok) {
        const errorData = await keyResponse.json();
        throw new Error(errorData.message || "Failed to get payment key");
      }

      const keyData = await keyResponse.json();

      if (!keyData.success || !keyData.key) {
        throw new Error("Invalid payment key received");
      }

      const key = keyData.key;

      // Create Razorpay order
      const amountInPaise = Math.round(coursePrice * 100);
      const orderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({ amount: amountInPaise }),
        }
      );

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.message || "Failed to create payment order");
      }

      const orderData = await orderResponse.json();
      const order = orderData.data;

      // Initialize Razorpay
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "MonarkFX - Global Trading Excellence",
        description: `Purchase: ${courseTitle}`,
        order_id: order.id,
        image: "/logo.png",

        handler: async function (response: any) {
          try {
            // First save billing details after successful payment
            const billingResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/billing`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
                body: JSON.stringify({
                  fullName: formData.fullName,
                  email: formData.email,
                  address: formData.address,
                  city: formData.city,
                  state: formData.state,
                  country: formData.country,
                  zipCode: formData.zipCode,
                  courseIds: [courseId],
                  saveAddress: formData.saveAddress,
                }),
              }
            );

            if (!billingResponse.ok) {
              throw new Error("Failed to save billing details");
            }

            const billingData = await billingResponse.json();

            // Then verify payment
            const verificationResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/payment/payment-verification`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  courseIds: [courseId],
                  billingId: billingData.data.id,
                  referralCode: formData.referralCode || undefined,
                  couponDetails: appliedCoupon || undefined,
                  courseDetails: {
                    originalPrice: originalPrice || coursePrice,
                    discountedPrice: coursePrice,
                  },
                }),
              }
            );

            if (!verificationResponse.ok) {
              throw new Error("Payment verification failed");
            }

            const verificationData = await verificationResponse.json();

            if (verificationData.success) {
              toast.success("Payment successful! Course purchased.");
              onSuccess();
            } else {
              throw new Error(
                verificationData.message || "Payment verification failed"
              );
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobileNumber,
        },
        theme: {
          color: "#10B981",
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled. Please try again.");
          },
        },

        notes: {
          source: "web",
          payment_method: "all_methods_enabled",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Purchase error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      if (errorMessage.includes("payment key")) {
        toast.error("Payment service unavailable. Please try again later.");
      } else if (errorMessage.includes("order")) {
        toast.error("Failed to create payment order. Please try again.");
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="space-y-6">
        {/* Course Info Card */}
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {courseTitle}
                </h3>
                <p className="text-zinc-400 text-sm">Course Purchase</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">
                  <IndianRupee className="inline h-6 w-6" />
                  {coursePrice.toLocaleString("en-IN")}
                </div>
                <p className="text-zinc-400 text-sm">Total Amount</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-300 text-sm">
                <strong>✅ All Payment Methods Supported:</strong>
                <br />• <strong>UPI:</strong> Any UPI ID (e.g., ritesh@paytm)
                <br />• <strong>Cards:</strong> All Indian debit/credit cards
                <br />• <strong>Net Banking:</strong> All major banks
                <br />• <strong>Wallets:</strong> Paytm, PhonePe, Google Pay
                <br />
                <strong>Test Cards:</strong>
                <br />• 4111 1111 1111 1111 (Visa - Success)
                <br />• 5555 5555 5555 4444 (Mastercard - Success)
                <br />• 4000 0000 0000 0002 (Visa - Failure)
                <br />• CVV: 123, Expiry: Any future date
                <br />
                <strong>Test UPI:</strong> success@razorpay
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Saved Addresses */}
        {addresses.length > 0 && (
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-400" />
                Saved Addresses
              </h3>
              <div className="grid gap-3">
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    className="p-4 bg-zinc-700/50 rounded-lg border border-zinc-600 hover:border-green-500/50 cursor-pointer transition-all"
                    onClick={() => handleAddressSelect(address)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">
                          {address.fullName}
                        </p>
                        <p className="text-zinc-400 text-sm">
                          {address.address}, {address.city}, {address.state} -{" "}
                          {address.zipCode}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-green-500 text-green-400"
                      >
                        Use This
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Billing Form */}
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-green-400" />
              Billing Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Referral Code */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-green-500/30">
                <Label
                  htmlFor="referralCode"
                  className="text-white flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Referral Code (Optional)
                </Label>
                <Input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  placeholder="Enter referral code if you have one"
                  className="mt-2 bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-green-500 focus:ring-green-500"
                />
                <p className="text-xs text-zinc-400 mt-2">
                  Help someone earn commission by entering their referral code
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <Label
                    htmlFor="fullName"
                    className="text-white flex items-center"
                  >
                    <User className="h-4 w-4 mr-2 text-green-400" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="mt-2 bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label
                    htmlFor="email"
                    className="text-white flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-2 text-green-400" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    className="mt-2 bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <Label
                    htmlFor="mobileNumber"
                    className="text-white flex items-center"
                  >
                    <Phone className="h-4 w-4 mr-2 text-green-400" />
                    Mobile Number *
                  </Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 98765 43210"
                    className="mt-2 bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {/* PIN Code */}
                <div>
                  <Label htmlFor="zipCode" className="text-white">
                    PIN Code *
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    placeholder="400001"
                    className="mt-2 bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {/* State */}
                <div>
                  <Label htmlFor="state" className="text-white">
                    State *
                  </Label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full bg-zinc-700 border border-zinc-600 text-white rounded-md px-3 py-2 focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">Select State</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <Label htmlFor="city" className="text-white">
                    City *
                  </Label>
                  {formData.city === "Other" ? (
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city === "Other" ? "" : formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your city name"
                      className="mt-2 bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-green-500 focus:ring-green-500"
                    />
                  ) : (
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="mt-2 w-full bg-zinc-700 border border-zinc-600 text-white rounded-md px-3 py-2 focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="">Select City</option>
                      {availableCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                      <option value="Other">Other (Enter manually)</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <Label
                  htmlFor="address"
                  className="text-white flex items-center"
                >
                  <MapPin className="h-4 w-4 mr-2 text-green-400" />
                  Complete Address *
                </Label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="House/Flat No., Street, Area, Landmark"
                  rows={3}
                  className="mt-2 w-full bg-zinc-700 border border-zinc-600 text-white rounded-md px-3 py-2 placeholder:text-zinc-400 focus:border-green-500 focus:ring-green-500 resize-none"
                />
              </div>

              {/* Save Address Checkbox */}
              <div className="flex items-center space-x-3 bg-zinc-700/50 p-4 rounded-lg border border-zinc-600">
                <Checkbox
                  id="saveAddress"
                  checked={formData.saveAddress}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      saveAddress: checked as boolean,
                    }))
                  }
                  className="h-5 w-5 border-zinc-600 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label htmlFor="saveAddress" className="text-white">
                  Save this address for future purchases
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay ₹{coursePrice.toLocaleString("en-IN")} & Complete
                    Purchase
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
