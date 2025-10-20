// backend/routes/profile.routes.js
import express from "express";
import { getCurrentUser, updateCurrentUser } from "../controllers/profile.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// GET current user profile
router.get("/me", protectedRoute, getCurrentUser);

// PUT update profile
router.put(
  "/update",
  protectedRoute,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateCurrentUser
);

export default router;
