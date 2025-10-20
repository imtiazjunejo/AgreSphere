import  User  from "../models/users.model.js";
import path from "path";

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { firstName, lastName, role } = req.body;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (role) user.role = role;

    if (req.files?.profilePic?.[0]) {
      const profilePath = `/uploads/${path.basename(req.files.profilePic[0].path)}`;
      user.profilePic = profilePath;
    }

    if (req.files?.coverImage?.[0]) {
      const coverPath = `/uploads/${path.basename(req.files.coverImage[0].path)}`;
      user.coverImage = coverPath;
    }

    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
