import express from "express";
import {
    createInquiry,
    getAllInquiries,
    updateInquiryStatus,
    getInquiryStats,
} from "../controllers/inquiry.controllers.js";
import { verifyJWTToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

// Public route - create inquiry
router.post("/", createInquiry);

// Admin routes
router.get("/", verifyJWTToken, verifyAdmin, getAllInquiries);
router.get("/stats", verifyJWTToken, verifyAdmin, getInquiryStats);
router.patch("/:id", verifyJWTToken, verifyAdmin, updateInquiryStatus);

export default router;
