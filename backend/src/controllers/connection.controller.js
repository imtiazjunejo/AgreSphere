import { Connection } from "../models/connection.model.js";
import User from "../models/users.model.js";


export const connectFarmer = async (req, res) => {
  try {
    // handle case where body is missing
    if (!req.body || !req.body.userId || !req.body.farmerId) {
      return res.status(400).json({ message: "Missing userId or farmerId" });
    }

    const { userId, farmerId } = req.body;

    // Find both users
    const user = await User.findById(userId);
    const farmer = await User.findById(farmerId);

    if (!user || !farmer) {
      return res.status(404).json({ message: "User or farmer not found" });
    }

    // Prevent duplicates
    if (user.connections.includes(farmerId)) {
      return res.status(400).json({ message: "Already connected" });
    }

    user.connections.push(farmerId);
    farmer.connections.push(userId);

    await user.save();
    await farmer.save();

    res.json({ message: "Connection successful" });
  } catch (err) {
    console.error("Error connecting farmer:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get received requests for a farmer
export const getReceivedRequests = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const requests = await Connection.find({ receiver: farmerId, status: "pending" })
      .populate("sender", "name location profilePic crops");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests" });
  }
};

// ✅ Accept request
export const acceptConnection = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await Connection.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    );
    res.json(connection);
  } catch (err) {
    res.status(500).json({ message: "Error accepting request" });
  }
};

// ✅ Reject request
export const rejectConnection = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await Connection.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );
    res.json(connection);
  } catch (err) {
    res.status(500).json({ message: "Error rejecting request" });
  }
};
