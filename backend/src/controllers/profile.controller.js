import User from "../models/users.model.js";
import path from "path";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { firstName, lastName, email, password, location, phone, bio, role } = req.body;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (location) user.location = location;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    if (role) user.role = role;

    if (password && password.trim()) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (req.files?.profilePic?.[0]) {
      const profilePath = `/uploads/${path.basename(req.files.profilePic[0].path)}`;
      user.profilePic = profilePath;
    }

    if (req.files?.coverImage?.[0]) {
      const coverPath = `/uploads/${path.basename(req.files.coverImage[0].path)}`;
      user.coverImage = coverPath;
    }

    await user.save();
    const updatedUser = await User.findById(user._id).select("-password");
    res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
  } catch (error) {
    next(error);
  }
};
