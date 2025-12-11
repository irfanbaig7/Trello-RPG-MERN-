import express from "express"
import {authMiddleware} from "../middleware/auth.middleware.js"
import UserStats from "../models/UserStats.js";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
    const stats = await UserStats.find({ userId: req.userId })
    res.json({ stats })
})

export default router