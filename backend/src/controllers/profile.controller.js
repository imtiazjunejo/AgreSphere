import bcrypt from "bcrypt";
import User from "../models/users.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

export const updateCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

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

  // Handle profile picture upload
  if (req.files?.profilePic?.[0]) {
    const profilePath = `/uploads/${req.files.profilePic[0].filename}`;
    user.profilePic = profilePath;
  }

  // Handle cover image upload
  if (req.files?.coverImage?.[0]) {
    const coverPath = `/uploads/${req.files.coverImage[0].filename}`;
    user.coverImage = coverPath;
  }

  await user.save();
  const updatedUser = await User.findById(user._id).select("-password");
  return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});