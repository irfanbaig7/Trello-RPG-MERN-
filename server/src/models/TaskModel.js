import mongoose from "mongoose";

export const taskSchema = new mongoose.Schema({

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 2,
    },
    description: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["todo", "in_progress", "done"],
        default: "todo",
    },
    points: {
        type: Number,
        default: 10,
    },

}, { timestamps: true })


export default mongoose.model("Task", taskSchema);