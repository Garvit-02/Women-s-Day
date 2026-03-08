import express from "express";
import multer from "multer";
import { createStory, getStories } from "../controllers/storyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/", getStories);
router.post("/", protect, upload.single("image"), createStory);

export default router;

