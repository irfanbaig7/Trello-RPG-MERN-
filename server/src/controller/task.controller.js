import ProjectModel from "../models/ProjectModel.js";
import Task from "../models/TaskModel.js";
import { applyTaskCompletionReward } from "../utils/userStatsUtils.js";

// Create Task
export const createTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Task title is required" });
        }

        // Ensure project belongs to user
        const project = await ProjectModel.findOne({
            _id: projectId,
            userId: req.userId,
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const task = await Task.create({
            projectId,
            userId: req.userId,
            title,
            description,
        });

        res.status(201).json({ task });
    } catch (err) {
        console.error("Create Task Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get tasks of a project
export const getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const tasks = await Task.find({
            projectId,
            userId: req.userId,
        }).sort({ createdAt: -1 });

        res.json({ tasks });
    } catch (err) {
        console.error("Get Tasks Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update task status (kanban move)
export const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const wasDone = task.status === "done";

        task.status = status;
        await task.save();

        let updatedStats = null;

        // Reward ONLY when moving to DONE
        if (status === "done" && !wasDone) {
            updatedStats = await applyTaskCompletionReward(
                req.userId,
                task.points
            );
        }

        res.json({
            task,
            statsUpdated: updatedStats, // frontend later use karega
        });
    } catch (err) {
        console.error("Update Task Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
