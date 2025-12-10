import mongoose from "mongoose"

const userStateSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true
    },

    level: {
        type: Number,
        default: 0
    },

    xp: {
        type: Number,
        default: 0,
    },

    points: {
        type: Number,
        default: 0,
    },

    completedTask: {
        type: Number,
        default: 0,
    },

}, { timestamps: true })

export default mongoose.model("Userstate", userStateSchema)


