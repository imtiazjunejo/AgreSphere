// backend/routes/croplog.routes.js
import { Router } from "express";
import {
  createCropLog,
  getMyCropLogs,
  getCropLog,
  updateCropLog,
  deleteCropLog,
} from "../controllers/croplog.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = Router();

// All croplog routes are protected: user must be authenticated
router.use(protectedRoute);

router.post("/", createCropLog);       // create
router.get("/", getMyCropLogs);       // list
router.get("/:id", getCropLog);       // get single
router.put("/:id", updateCropLog);    // update
router.delete("/:id", deleteCropLog); // delete

export default router;
