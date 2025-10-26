import express from "express";
import {
  getFarmers,
  addFarmer,
  connectFarmer,
  acceptConnection,
  rejectConnection,
  getConnections,
} from "../controllers/farmerNetwork.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(protectedRoute);

router.get("/", getFarmers);                          // ✅ Get all farmers
router.post("/", addFarmer);                          // ✅ Add new farmer
router.post("/connect/:id", connectFarmer);           // ✅ Send connection request
router.post("/accept/:connectionId", acceptConnection); // ✅ Accept connection request
router.post("/reject/:connectionId", rejectConnection); // ✅ Reject connection request
router.get("/connections", getConnections);           // ✅ Get user's connections

export default router;
