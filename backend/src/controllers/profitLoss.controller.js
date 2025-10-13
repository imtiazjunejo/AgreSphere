import mongoose from "mongoose";
import CropLog from "../models/croplogs.model.js";

export const getProfitLossAnalytics = async (req, res) => {
  try {
    const userId = req.user?._id || req.query.userId || req.body.userId;

    // ✅ Ensure we only get current user's crop logs
    const query = userId ? { user: userId } : {};
    const cropLogs = await CropLog.find(query).lean();

    console.log("✅ Fetched cropLogs:", cropLogs.length, "for userId:", userId);

    if (!cropLogs.length) {
      return res.json({
        data: [],
        summary: { totalProfit: 0, totalLoss: 0, net: 0 },
      });
    }

    // ✅ Process each crop log
    const analytics = cropLogs.map((log) => {
      const totalExpenses = Array.isArray(log.activities)
        ? log.activities.reduce((sum, a) => sum + (Number(a.cost) || 0), 0)
        : 0;

      const leaseAmount =
        log.project?.farmingType === "lease"
          ? Number(log.project?.leaseAmount) || 0
          : 0;

      const sale =
        Number(log.saleAmount) ||
        Number(log.project?.saleAmount) ||
        Number(log.project?.revenue) ||
        0;

      const totalCost = totalExpenses + leaseAmount;
      const profit = sale - totalCost;

      return {
        id: String(log._id),
        cropName: log.project?.name || "Unnamed Crop",
        season: log.project?.season || "",
        revenue: sale,
        expenses: totalCost,
        profit,
        farmingType: log.project?.farmingType || "owner",
        date: log.createdAt
          ? new Date(log.createdAt).toISOString().split("T")[0]
          : "",
      };
    });

    // ✅ Calculate totals
    const totalProfit = analytics
      .filter((a) => a.profit >= 0)
      .reduce((sum, a) => sum + a.profit, 0);

    const totalLoss = analytics
      .filter((a) => a.profit < 0)
      .reduce((sum, a) => sum + Math.abs(a.profit), 0);

    const net = totalProfit - totalLoss;

    console.log("📊 Profit/Loss Summary:", { totalProfit, totalLoss, net });

    return res.json({
      data: analytics,
      summary: { totalProfit, totalLoss, net },
    });
  } catch (err) {
    console.error("❌ Error fetching profit/loss analytics:", err);
    return res.status(500).json({
      data: [],
      summary: { totalProfit: 0, totalLoss: 0, net: 0 },
      message: "Server error fetching analytics",
    });
  }
};
