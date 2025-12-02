import express from "express"
import { registerUser } from "../controller/auth.controller.js";

const router = express.Router();

// Register
router.post("/register", registerUser)

export default router