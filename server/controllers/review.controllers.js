import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";

// Add review
export const addReview = asyncHandler(async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    const userId = req.user.id;

    const review = await prisma.review.create({
      data: {
        userId,
        courseId,
        rating,
        comment,
      },
    });

    res
      .status(201)
      .json(new ApiResponsive(201, review, "Review added successfully"));
  } catch (error) {
    throw new ApiError(500, "Error adding review", [error.message]);
  }
});

// Get reviews by course ID
export const getReviewsByCourse = asyncHandler(async (req, res) => {
  try {
    const { courseId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { courseId },
      include: {
        user: true,
      },
    });

    res
      .status(200)
      .json(new ApiResponsive(200, reviews, "Reviews fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error fetching reviews", [error.message]);
  }
});

// Update review
export const updateReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await prisma.review.update({
      where: { id },
      data: {
        rating,
        comment,
      },
    });

    res
      .status(200)
      .json(new ApiResponsive(200, review, "Review updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Error updating review", [error.message]);
  }
});

// Delete review
export const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.review.delete({
      where: { id },
    });

    res
      .status(200)
      .json(new ApiResponsive(200, null, "Review deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Error deleting review", [error.message]);
  }
});
