import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import {
  getAllUsers,
  getAllStories,
  deleteStory,
  approveStory,
  createAchiever,
  deleteAchiever
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect, requireAdmin);

router.get("/users", getAllUsers);
router.get("/stories", getAllStories);
router.delete("/story/:id", deleteStory);
router.patch("/story/:id/approve", approveStory);
router.post("/achiever", createAchiever);
router.delete("/achiever/:id", deleteAchiever);

export default router;

