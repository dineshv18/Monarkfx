import crypto from "crypto";
import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { razorpay } from "../app.js";

export const getRazorpayKey = asyncHandler(async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID,
  });
});

export const checkout = asyncHandler(async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount),
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);

    if (!order) {
      throw new ApiError(500, "Error creating order");
    }

    res
      .status(200)
      .json(new ApiResponsive(200, order, "Order created successfully"));
  } catch (error) {
    throw new ApiError(500, "Error creating order", [error.message]);
  }
});

export const paymentVerification = asyncHandler(async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseIds,
      billingId,
      couponDetails,
      courseDetails,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new ApiError(400, "Missing required payment details");
    }

    if (!courseIds?.length || !courseDetails?.length) {
      throw new ApiError(400, "Missing course details");
    }

    if (!billingId) {
      throw new ApiError(400, "Missing billing details");
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      throw new ApiError(400, "Invalid payment signature");
    }

    // Validate billing exists
    const billing = await prisma.billingDetails.findUnique({
      where: { id: billingId },
    });

    if (!billing) {
      throw new ApiError(404, "Billing details not found");
    }

    // Start transaction with error handling
    try {
      await prisma.$transaction(async (prisma) => {
        // Create payment record
        await prisma.payment.create({
          data: {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          },
        });

        // Update billing status
        await prisma.billingDetails.update({
          where: { id: billingId },
          data: { paymentStatus: true },
        });

        // Process each course purchase
        for (const courseId of courseIds) {
          const courseDetail = courseDetails.find((c) => c.id === courseId);

          if (!courseDetail) {
            throw new ApiError(
              400,
              `Missing price details for course ${courseId}`
            );
          }

          // Create purchase with validated price
          await prisma.purchase.create({
            data: {
              userId: req.user.id,
              courseId,
              purchasePrice: courseDetail.discountedPrice || courseDetail.price,
              discountPrice: courseDetail.discountedPrice
                ? courseDetail.price - courseDetail.discountedPrice
                : null,
              couponCode: couponDetails?.code || null,
            },
          });

          // Create enrollment if doesn't exist
          await prisma.enrollment.upsert({
            where: {
              userId_courseId: {
                userId: req.user.id,
                courseId,
              },
            },
            create: {
              userId: req.user.id,
              courseId,
            },
            update: {},
          });

          // Handle coupon usage
          if (couponDetails) {
            await prisma.couponUsage.create({
              data: {
                couponId: couponDetails.id,
                userId: req.user.id,
                courseId,
              },
            });
          }
        }

        // Clear cart items
        await prisma.cart.deleteMany({
          where: {
            userId: req.user.id,
            courseId: { in: courseIds },
          },
        });
      });

      res
        .status(200)
        .json(
          new ApiResponsive(
            200,
            true,
            "Payment verified and courses enrolled successfully"
          )
        );
    } catch (error) {
      throw new ApiError(500, "Transaction failed", [error.message]);
    }
  } catch (error) {
    throw new ApiError(error.statusCode || 500, error.message);
  }
});
