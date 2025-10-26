// backend/routes/profitLoss.routes.js
import express from "express";
import { getProfitLossAnalytics } from "../controllers/profitLoss.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Secure route to fetch profit/loss analytics
router.get("/analytics", protectedRoute, getProfitLossAnalytics);

export default router;
