import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/check", authMiddleware, (req, res) => {
  res.json({ message: "Protected data access granted", userId: req.userId });
});

export default router;
