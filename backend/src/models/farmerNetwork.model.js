import mongoose from "mongoose";

const farmerNetworkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    crops: {
      type: [String],
      default: [],
    },
    contact: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
      },
    ],
  },
  { timestamps: true }
);

export const Farmer = mongoose.model("Farmer", farmerNetworkSchema);
