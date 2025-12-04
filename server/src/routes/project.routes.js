import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createProject, getProject } from "../controller/project.controller.js";


const router = express.Router();

// All routes here require auth
router.use(authMiddleware)

// GET /api/projects  -> list projects
router.get("/", getProject)

// POST /api/projects -> create project
router.post("/", createProject)

export default router
