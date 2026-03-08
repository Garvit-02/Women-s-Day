import express from "express";
import { generateStory, mentorAnswer } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-story", generateStory);
router.post("/mentor", mentorAnswer);

export default router;

