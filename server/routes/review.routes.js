import { Router } from "express";
import {
  addReview,
  getReviewsByCourse,
  updateReview,
  deleteReview,
} from "../controllers/review.controllers.js";
import { verifyJWTToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWTToken, addReview);

router.route("/:courseId").get(getReviewsByCourse);

router
  .route("/:id")
  .put(verifyJWTToken, updateReview)
  .delete(verifyJWTToken, deleteReview);

export default router;
