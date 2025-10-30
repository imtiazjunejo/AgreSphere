import User from "../models/users.model.js";

// ✅ Get all farmers
export const getFarmers = async (req, res) => {
  try {
    const farmers = await User.find();
    res.status(200).json(farmers);
  } catch (error) {
    console.error("Error fetching farmers:", error);
    res.status(500).json({ message: "Server error fetching farmers" });
  }
};

// ✅ Add a new farmer (if needed)
export const addFarmer = async (req, res) => {
  try {
    const farmer = new User(req.body);
    await farmer.save();
    res.status(201).json(farmer);
  } catch (error) {
    console.error("Error adding farmer:", error);
    res.status(500).json({ message: "Error adding farmer" });
  }
};

// ✅ Connect with another farmer
export const connectFarmer = async (req, res) => {
  try {
    const { id } = req.params;        // farmer to connect with
    const { userId } = req.body;      // current logged-in user

    if (!userId)
      return res.status(400).json({ message: "Missing userId" });

    const farmer = await User.findById(id);
    const user = await User.findById(userId);

    if (!farmer || !user)
      return res.status(404).json({ message: "Farmer not found" });

    if (!farmer.connections.includes(userId)) {
      farmer.connections.push(userId);
      await farmer.save();
    }

    if (!user.connections.includes(id)) {
      user.connections.push(id);
      await user.save();
    }

    res.status(200).json({ message: "Connection successful" });
  } catch (error) {
    console.error("Error connecting farmer:", error);
    res.status(500).json({ message: "Error connecting farmer" });
  }
};
