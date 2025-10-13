// backend/controllers/cropLogs.controller.js
import CropLog from "../models/croplogs.model.js";

// ✅ GET all crop logs for a user
export const getAllCropLogs = async (req, res) => {
  try {
    const userId = req.user?._id;
    const logs = await CropLog.find(userId ? { user: userId } : {}).lean();

    console.log(`✅ Fetched cropLogs: ${logs.length} for userId: ${userId}`);
    res.json({ success: true, data: logs });
  } catch (err) {
    console.error("❌ Error fetching crop logs:", err);
    res.status(500).json({ success: false, message: "Failed to fetch crop logs" });
  }
};

// ✅ GET a single crop log by ID
export const getCropLogById = async (req, res) => {
  try {
    const doc = await CropLog.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Crop log not found" });
    res.json({ success: true, data: doc });
  } catch (err) {
    console.error("❌ Error fetching crop log:", err);
    res.status(500).json({ success: false, message: "Failed to fetch crop log" });
  }
};

// ✅ CREATE or UPDATE crop log (project + sale amount)
export const createOrUpdateCropLog = async (req, res) => {
  try {
    const { project, saleAmount } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not logged in",
      });
    }

    // Convert saleAmount to a safe number
    const numericSale = saleAmount ? Number(saleAmount) : 0;

    if (!project || !project.name) {
      return res.status(400).json({ success: false, message: "Project details are required" });
    }

    // ✅ Find existing crop log
    let existing = await CropLog.findOne({ user: userId, "project.name": project.name });

    if (existing) {
      existing.project = { ...existing.project, ...project };
      existing.saleAmount = !isNaN(numericSale) ? numericSale : existing.saleAmount;

      await existing.save();
      console.log(`✅ Updated cropLog: ${existing._id}, SaleAmount: ${existing.saleAmount}`);
      return res.json({ success: true, data: existing });
    }

    // ✅ Create new crop log
    const newDoc = new CropLog({
      user: userId,
      project,
      saleAmount: !isNaN(numericSale) ? numericSale : 0,
    });

    await newDoc.save();
    console.log(`✅ Created cropLog: ${newDoc._id}, SaleAmount: ${newDoc.saleAmount}`);
    res.json({ success: true, data: newDoc });
  } catch (err) {
    console.error("❌ Error creating/updating crop log:", err);
    res.status(500).json({ success: false, message: "Failed to create/update crop log" });
  }
};

// ✅ UPDATE crop log (activities, project, or sale amount)
export const updateCropLog = async (req, res) => {
  try {
    const id = req.params.id;
    const { activities, project, saleAmount } = req.body;

    const numericSale =
      saleAmount !== undefined && saleAmount !== null ? Number(saleAmount) : undefined;

    const updateFields = {
      ...(project ? { project } : {}),
      ...(Array.isArray(activities) ? { activities } : {}),
      ...(numericSale !== undefined && !isNaN(numericSale)
        ? { saleAmount: numericSale }
        : {}),
    };

    const updated = await CropLog.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Crop log not found" });
    }

    console.log(`✅ Updated cropLog: ${updated._id}, SaleAmount: ${updated.saleAmount}`);
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("❌ Error updating crop log:", err);
    res.status(500).json({ success: false, message: "Failed to update crop log" });
  }
};

// ✅ DELETE crop log
export const deleteCropLog = async (req, res) => {
  try {
    const id = req.params.id;
    await CropLog.findByIdAndDelete(id);
    console.log(`🗑️ Deleted cropLog: ${id}`);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("❌ Error deleting crop log:", err);
    res.status(500).json({ success: false, message: "Failed to delete crop log" });
  }
};
