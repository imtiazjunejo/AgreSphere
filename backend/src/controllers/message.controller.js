import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/users.model.js";
import Message from "../models/messages.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



export const getUsersForSidebar = asyncHandler(async (req, res) => {
    
    const loggedInUserId = req.user._id

    const filteredUsers = await User.find({_id: { $ne: loggedInUserId } }).select("-password").lean()

    if(!filteredUsers || filteredUsers === 0) {
        throw new ApiError(401, "No users found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, filteredUsers , "Filltered users fetched")
        )
    
})

export const getMessages = asyncHandler(async (req, res) => {

    const {id: userToChat} = req.params
    const myId = req.user._id

    const messages = await Message.find({
        $or:[
            {senderId: myId, receiverId: userToChat},
            {senderId: userToChat, receiverId: myId}
        ]
    })
    .sort({createdAt: 1})
    .lean()

    if(!messages || messages.length === 0) {
        throw new ApiError(404, "No messages found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, messages, "All messages are fetched")
        )
})

export const sendMessage = asyncHandler(async (req, res) => {

    const { text, image } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

    let imageUrl;
    if(image) {
        // updload base64 image to cloudinary
        const uploadResponse = await uploadOnCloudinary(image)
        imageUrl = uploadResponse.secure_url
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl
    })

    await newMessage.save()
    // todo: realtime functionality goes here => socket.io

    return res
        .status(200)
        .json(
            new ApiResponse(200, newMessage, "Message sent successfully")
        )

}) 