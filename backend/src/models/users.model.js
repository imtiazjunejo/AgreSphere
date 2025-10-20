import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        profilePic: {
            type: String,
            default: ""
        },
        coverImage: {
            type: String,
            default: ""
        },

        location: { type: String, default: "" },
        phone: { type: String, default: "" },
        role: { type: String, enum: ["Farmer", "landloard", "labourer", "stackholder"], default: "Farmer" },
        bio: { type: String, default: "" },



    },
    {timestamps: true}
)

const User = mongoose.model("User", userSchema);

export default User

