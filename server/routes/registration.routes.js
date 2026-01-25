import express from "express";
import { registerUser } from "../controllers/registration.controller.js";

const router = express.Router();

// Register user
router.post("/", registerUser);

export default router;
