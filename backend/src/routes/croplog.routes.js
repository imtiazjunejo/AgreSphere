// backend/routes/cropLogs.routes.js
import express from "express";
import {
  getAllCropLogs,
  getCropLogById,
  createOrUpdateCropLog,
  updateCropLog,
  deleteCropLog,
} from "../controllers/croplog.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js"; // ✅ import this

const router = express.Router();

// ✅ Apply protection to all crop log routes
router.use(protectedRoute);

router.get("/", getAllCropLogs);
router.get("/:id", getCropLogById);
router.post("/", createOrUpdateCropLog);
router.put("/:id", updateCropLog);
router.delete("/:id", deleteCropLog);

export default router;
