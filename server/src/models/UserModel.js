import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passHash: {
        type: String,
        required: true,
    },

}, { timestamps: true })

export default mongoose.model("User", userSchema)