// backend/controllers/croplog.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import CropLog from "../models/croplogs.model.js";

/**
 * Create a new crop log for the authenticated user.
 * Expects JSON body: { project: {...}, activities: [...], saleAmount: number }
 */
export const createCropLog = asyncHandler(async (req, res) => {
  const user = req.user;
  const { project = {}, activities = [], saleAmount = 0 } = req.body ?? {};

  const crop = await CropLog.create({
    user: user._id,
    project,
    activities,
    saleAmount: Number(saleAmount) || 0,
  });

  return res.status(201).json(new ApiResponse(201, crop, "Crop log created"));
});

/**
 * List crop logs owned by current user
 */
export const getMyCropLogs = asyncHandler(async (req, res) => {
  const user = req.user;
  const items = await CropLog.find({ user: user._id }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, items, "User crop logs"));
});

/**
 * Retrieve a single crop log by id (owner only).
 */
export const getCropLog = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const item = await CropLog.findById(id);
  if (!item) throw new ApiError(404, "Crop log not found");
  if (item.user.toString() !== user._id.toString()) throw new ApiError(403, "Forbidden");
  return res.status(200).json(new ApiResponse(200, item, "Crop log"));
});

/**
 * Update crop log fields (project, activities, saleAmount).
 * Partial updates allowed; ownership enforced.
 */
export const updateCropLog = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const payload = req.body ?? {};

  const item = await CropLog.findById(id);
  if (!item) throw new ApiError(404, "Crop log not found");
  if (item.user.toString() !== user._id.toString()) throw new ApiError(403, "Forbidden");

  if (payload.project) item.project = payload.project;
  if (Array.isArray(payload.activities)) item.activities = payload.activities;
  if (payload.saleAmount !== undefined) item.saleAmount = Number(payload.saleAmount) || 0;

  await item.save();
  return res.status(200).json(new ApiResponse(200, item, "Crop log updated"));
});

/**
 * Delete a crop log (owner only).
 */
export const deleteCropLog = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const item = await CropLog.findById(id);
  if (!item) throw new ApiError(404, "Crop log not found");
  if (item.user.toString() !== user._id.toString()) throw new ApiError(403, "Forbidden");

  await item.remove();
  return res.status(200).json(new ApiResponse(200, null, "Crop log deleted"));
});




