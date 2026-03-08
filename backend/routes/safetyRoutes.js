import express from "express";
import { getSafetyLocations, createSafetyLocation } from "../controllers/safetyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: anyone can view safe locations
router.get("/", getSafetyLocations);

// Authenticated users can submit new locations
router.post("/", protect, createSafetyLocation);

export default router;

