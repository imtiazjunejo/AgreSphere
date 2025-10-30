import express from "express";
import {
  getFarmers,
  addFarmer,
  connectFarmer,
} from "../controllers/farmerNetwork.controller.js";

const router = express.Router();

router.get("/", getFarmers);                  // ✅ Get all farmers
router.post("/", addFarmer);                  // ✅ Add new farmer
router.post("/connect/:id", connectFarmer);   // ✅ Connect with another farmer

export default router;
