import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    description: {
        type: String,
        default: "",
    },

}, { timestamps: true })

export default mongoose.model("Project", projectSchema);
