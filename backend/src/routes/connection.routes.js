import express from "express";
import {
  getReceivedRequests,
  acceptConnection,
  rejectConnection,
} from "../controllers/connection.controller.js";

const router = express.Router();

// ✅ Only requests-related routes stay here
router.get("/connections/:farmerId", getReceivedRequests);
router.patch("/connections/accept/:id", acceptConnection);
router.patch("/connections/reject/:id", rejectConnection);

export default router;
