import User from "../models/users.model.js";
import { Connection } from "../models/connection.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// ✅ Get all farmers (excluding current user) with pagination and search
export const getFarmers = asyncHandler(async (req, res) => {
  const currentUserId = req.user?._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12; // 12 farmers per page
  const search = req.query.search || '';
  const skip = (page - 1) * limit;

  // Build search query
  let searchQuery = { _id: { $ne: currentUserId } };

  if (search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    searchQuery = {
      ...searchQuery,
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { location: searchRegex },
        { role: searchRegex },
        { bio: searchRegex }
      ]
    };
  }

  // Get total count of farmers matching search (excluding current user)
  const totalFarmers = await User.countDocuments(searchQuery);

  // Get paginated farmers with search
  const farmers = await User.find(searchQuery)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // Get connection status for each farmer
  const farmersWithConnectionStatus = await Promise.all(
    farmers.map(async (farmer) => {
      // Check if there's a connection request between current user and this farmer
      const connection = await Connection.findOne({
        $or: [
          { sender: currentUserId, receiver: farmer._id },
          { sender: farmer._id, receiver: currentUserId }
        ]
      });

      let connectionStatus = 'none';
      if (connection) {
        connectionStatus = connection.status;
      }

      return {
        ...farmer.toObject(),
        connectionStatus,
        connectionId: connection?._id
      };
    })
  );

  const totalPages = Math.ceil(totalFarmers / limit);

  return res.status(200).json(new ApiResponse(200, {
    farmers: farmersWithConnectionStatus,
    pagination: {
      currentPage: page,
      totalPages,
      totalFarmers,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  }, "Farmers fetched successfully"));
});

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

// ✅ Send connection request to another farmer
export const connectFarmer = asyncHandler(async (req, res) => {
  const { id } = req.params; // farmer to connect with
  const currentUserId = req.user._id; // current logged-in user from auth middleware

  if (currentUserId === id) {
    return res.status(400).json(new ApiResponse(400, null, "Cannot connect to yourself"));
  }

  // Check if connection already exists
  const existingConnection = await Connection.findOne({
    $or: [
      { sender: currentUserId, receiver: id },
      { sender: id, receiver: currentUserId }
    ]
  });

  if (existingConnection) {
    if (existingConnection.status === 'pending') {
      return res.status(400).json(new ApiResponse(400, null, "Connection request already sent"));
    } else if (existingConnection.status === 'accepted') {
      return res.status(400).json(new ApiResponse(400, null, "Already connected"));
    }
  }

  // Create new connection request
  const newConnection = new Connection({
    sender: currentUserId,
    receiver: id,
    status: 'pending'
  });

  await newConnection.save();

  return res.status(200).json(new ApiResponse(200, newConnection, "Connection request sent successfully"));
});

// ✅ Accept connection request
export const acceptConnection = asyncHandler(async (req, res) => {
  const { connectionId } = req.params;
  const currentUserId = req.user._id;

  const connection = await Connection.findById(connectionId);

  if (!connection) {
    return res.status(404).json(new ApiResponse(404, null, "Connection request not found"));
  }

  // Only receiver can accept
  if (connection.receiver.toString() !== currentUserId.toString()) {
    return res.status(403).json(new ApiResponse(403, null, "Not authorized to accept this request"));
  }

  connection.status = 'accepted';
  await connection.save();

  return res.status(200).json(new ApiResponse(200, connection, "Connection request accepted"));
});

// ✅ Reject connection request
export const rejectConnection = asyncHandler(async (req, res) => {
  const { connectionId } = req.params;
  const currentUserId = req.user._id;

  const connection = await Connection.findById(connectionId);

  if (!connection) {
    return res.status(404).json(new ApiResponse(404, null, "Connection request not found"));
  }

  // Only receiver can reject
  if (connection.receiver.toString() !== currentUserId.toString()) {
    return res.status(403).json(new ApiResponse(403, null, "Not authorized to reject this request"));
  }

  connection.status = 'rejected';
  await connection.save();

  return res.status(200).json(new ApiResponse(200, connection, "Connection request rejected"));
});

// ✅ Get user's connections
export const getConnections = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;

  // Get accepted connections where user is either sender or receiver
  const connections = await Connection.find({
    $or: [
      { sender: currentUserId, status: 'accepted' },
      { receiver: currentUserId, status: 'accepted' }
    ]
  }).populate('sender', 'firstName lastName email profilePic location role')
    .populate('receiver', 'firstName lastName email profilePic location role');

  // Get connection requests sent to user
  const pendingRequests = await Connection.find({
    receiver: currentUserId,
    status: 'pending'
  }).populate('sender', 'firstName lastName email profilePic location role');

  return res.status(200).json(new ApiResponse(200, {
    connections,
    pendingRequests
  }, "Connections fetched successfully"));
});
