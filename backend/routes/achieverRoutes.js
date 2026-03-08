import express from "express";
import { getAchievers, createAchiever } from "../controllers/achieverController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAchievers);
router.post("/", protect, createAchiever);

export default router;

