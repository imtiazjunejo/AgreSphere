import mongoose from "mongoose";

const ProfitLossSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
    expenses: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-calculate profit before saving
ProfitLossSchema.pre("save", function (next) {
  this.profit = this.revenue - this.expenses;
  next();
});

const ProfitLoss = mongoose.model("ProfitLoss", ProfitLossSchema);

export default ProfitLoss;
