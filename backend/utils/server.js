import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "../config/db.js";
import { configureCloudinary } from "../config/cloudinary.js";
import authRoutes from "../routes/authRoutes.js";
import storyRoutes from "../routes/storyRoutes.js";
import achieverRoutes from "../routes/achieverRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";
import aiRoutes from "../routes/aiRoutes.js";
import safetyRoutes from "../routes/safetyRoutes.js";
import { notFound, errorHandler } from "../middleware/errorMiddleware.js";
import { seedSampleData } from "../seed/sampleData.js";

dotenv.config();
configureCloudinary();
connectDB().then(() => {
  if (process.env.NODE_ENV !== "production") {
    seedSampleData().catch((err) => console.error("Sample data seeding failed", err));
  }
});

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Women's Day API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/achievers", achieverRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/safety-locations", safetyRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});

