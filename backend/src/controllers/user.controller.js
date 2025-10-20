import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { generateTokn } from "../utils/generateToken.js"; 
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const signupUser = asyncHandler(async (req, res) => {
  const {
  firstName = "",
  lastName = "",
  email = "",
  password = "",
  location = "",
  phone = "",
  role = "Farmer",
  bio = ""
} = req.body ?? {};


  if (![firstName, lastName, email, password, role, location].every((v) => typeof v === "string" && v.trim())) {
    throw new ApiError(400, "All fields are required.");
  }

  if (password.length < 8) {
    throw new ApiError(409, "Password must be 8 characters long");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existedUser = await User.findOne({ email: normalizedEmail });
  if (existedUser) {
    throw new ApiError(409, "Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  const newUser = await User.create({
  firstName: firstName.trim(),
  lastName: lastName.trim(),
  email: normalizedEmail,
  password: hashedPassword,
  location,
  phone,
  role,
  bio,
});


  console.log(newUser)
  generateTokn(newUser._id, res);

  
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        role: newUser.role,
        location: newUser.location,
        phone: newUser.phone,
        bio: newUser.bio,
      },
      "User has been signup successfully"
    )
  );

});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((f) => !f || f.trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "User does not exits.");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Incorrect password");
  }

  generateTokn(user._id, res);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profilePic: user.profilePic,
        },
        "user is logged in successfully..."
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  console.log("Cookie has been cleared successfully..");

  return res.status(200).json(new ApiResponse(200, {}, "Logout successfully"));
});

export const updateProfileImage = asyncHandler(async (req, res) => {
  const profileLocalPath = req.file?.path;
  console.log("UPLOAD LOCAL PATH:", profileLocalPath);

  if (!profileLocalPath) {
    throw new ApiError(400, "Profile file is missing");
  }

  const profile = await uploadOnCloudinary(profileLocalPath);

  if (!profile || (!profile.url && !profile.secure_url)) {
    throw new ApiError(400, "Error while uploading profile");
  }

  const imageUrl = profile.secure_url || profile.url;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { profilePic: imageUrl } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile image updated successfully"));
});

export const checkUser = asyncHandler(async (req, res) => {

  try {
    return res
      .status(200)
      .json(
        new ApiResponse(200, req.user, "User is Authorized")
      )
  } catch (error) {
    console.log("Error in checkAuth controller", error.message)
    throw new ApiError(500, "Internal Server Error")
  }
})
