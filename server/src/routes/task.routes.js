import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createTask, getTasksByProject, updateTaskStatus } from "../controller/task.controller.js";

const router = express.Router();

// All task routes require auth
router.use(authMiddleware);

// GET tasks for a project
router.get("/project/:projectId", getTasksByProject);

// CREATE task
router.post("/project/:projectId", createTask);

// UPDATE status
router.patch("/:id/status", updateTaskStatus);

export default router;

