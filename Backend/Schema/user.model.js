const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: [true, "Email already registered!"],
        required: [true, "Email is required!"],
        match: [/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim, "Invalid Email"]
    },
    city: {
        type: String,
        city: "Unknown City"
    },
    name: {
        type: String,
        default: "Unknown",
        minlength: [2, "Name must be 2 characters long"]
    },
    bio: {
        type: String,
        default: "I’m someone who believes in continuous learning and steady growth. I enjoy exploring new ideas, building meaningful connections, and improving myself both personally and professionally. I value discipline, consistency, and clear goals. Here to network, collaborate, and make the most out of every opportunity that comes my way."
    },
    profilepic: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg"
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [6, "Password must be 6 characters long"]
    },
    age: {
        type: Number,
        default: 0
    }
}, { timestamps: true })
const userModel = mongoose.model("revision", userSchema);
module.exports = userModel;