import { Router } from "express";
import {
  markChapterComplete,
  getProgress,
  getCourseProgress,
} from "../controllers/userProgress.controllers.js";
import { verifyJWTToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:chapterId", verifyJWTToken, getProgress);
router.get("/course/:courseId", verifyJWTToken, getCourseProgress);

router.post("/complete", verifyJWTToken, markChapterComplete);

export default router;
