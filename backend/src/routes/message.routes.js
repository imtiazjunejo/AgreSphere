import { Router } from "express";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";




const router = Router()

// Protected Routes....
router.get("/user", protectedRoute, getUsersForSidebar)
router.get("/:id", protectedRoute, getMessages)
router.post("/:id", protectedRoute, sendMessage)






export default router