import { Router } from "express";

import { verifyJWTToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  createAffiliate,
  getAllAffiliates,
  getAffiliateById,
  updateAffiliate,
  deleteAffiliate,
  createAffiliateSale,
  getAllAffiliateSales,
  updateAffiliateSaleStatus,
  getAffiliateStats,
  getAffiliateByReferralCode,
} from "../controllers/affiliate.controllers.js";

const router = Router();

// Public routes
router.get("/referral/:referralCode", getAffiliateByReferralCode);
router.post("/create", createAffiliate);

// Protected routes (admin only)
router.use(verifyJWTToken, verifyAdmin);

// Affiliate management
router.get("/", getAllAffiliates);
router.get("/stats", getAffiliateStats);
router.get("/:id", getAffiliateById);
router.put("/:id", updateAffiliate);
router.delete("/:id", deleteAffiliate);

// Affiliate sales management
router.get("/sales/all", getAllAffiliateSales);
router.post("/sales/create", createAffiliateSale);
router.put("/sales/:id/status", updateAffiliateSaleStatus);

export default router;
