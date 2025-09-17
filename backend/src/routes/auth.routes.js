
import { Router } from "express";
import {
  checkUser,
  loginUser,
  logoutUser,
  signupUser,
  updateProfileImage,
} from "../controllers/user.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

// Protected Routes...
router.post("/logout", protectedRoute, logoutUser);
router.put("/update-profile", protectedRoute, upload.single("profilePic"),  updateProfileImage );
router.get("/check", protectedRoute, checkUser)
export default router;
