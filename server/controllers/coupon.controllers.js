import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";

// Create new coupon
export const createCoupon = asyncHandler(async (req, res) => {
  try {
    const { code, discount, limit, oneTimePerUser } = req.body;

    const validLimit =
      limit === undefined || limit === "" ? -1 : parseInt(limit);

    const coupon = await prisma.coupon.create({
      data: {
        code,
        discount,
        limit: validLimit,
        oneTimePerUser: oneTimePerUser || false,
        isActive: true,
      },
    });

    res
      .status(201)
      .json(new ApiResponsive(201, coupon, "Coupon created successfully"));
  } catch (error) {
    throw new ApiError(500, "Error creating coupon", [error.message]);
  }
});

// Get all coupons
export const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany();

    res
      .status(200)
      .json(new ApiResponsive(200, coupons, "Coupons fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error fetching coupons", [error.message]);
  }
});

// Update coupon
export const updateCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { code, discount, isActive, oneTimePerUser } = req.body;

    const updateData = {};

    if (code) updateData.code = code;
    if (discount) updateData.discount = discount;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (oneTimePerUser !== undefined)
      updateData.oneTimePerUser = oneTimePerUser;

    const coupon = await prisma.coupon.update({
      where: { id },
      data: updateData,
    });

    res
      .status(200)
      .json(new ApiResponsive(200, coupon, "Coupon updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Error updating coupon", [error.message]);
  }
});

// Delete coupon
export const deleteCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.coupon.delete({
      where: { id },
    });

    res
      .status(200)
      .json(new ApiResponsive(200, null, "Coupon deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Error deleting coupon", [error.message]);
  }
});

export const applyCoupon = asyncHandler(async (req, res) => {
  const { code, courseIds, originalPrice } = req.body;

  if (!code || !courseIds || !originalPrice) {
    throw new ApiError(400, "Missing required fields");
  }

  const userId = req.user.id;

  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code },
      include: { usedBy: true },
    });

    if (!coupon || !coupon.isActive) {
      throw new ApiError(400, "Invalid or inactive coupon");
    }

    // Check courses already purchased
    const existingPurchases = await prisma.purchase.findMany({
      where: {
        AND: [{ userId: userId }, { courseId: { in: courseIds } }],
      },
    });

    if (existingPurchases.length > 0) {
      throw new ApiError(400, "You've already purchased one or more courses");
    }

    // Check usage limit
    if (coupon.limit !== -1 && coupon.usedBy.length >= coupon.limit) {
      throw new ApiError(400, "Coupon usage limit exceeded");
    }

    const discountedPrice = calculateDiscountedPrice(
      originalPrice,
      coupon.discount
    );

    return res.status(200).json(
      new ApiResponsive(
        200,
        {
          discountedPrice,
          couponDetails: {
            id: coupon.id,
            code: coupon.code,
            oneTimePerUser: coupon.oneTimePerUser,
          },
        },
        "Coupon applied successfully"
      )
    );
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

function calculateDiscountedPrice(originalPrice, discount) {
  const discountAmount = (originalPrice * discount) / 100;
  return originalPrice - discountAmount;
}
