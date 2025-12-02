import express from "express";
import { testApi } from "../controller/test.controller.js";

const router = express.Router();

router.get("/", testApi)

export default router