import express from "express";
import { getReport } from "../controllers/reportsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getReport);

export default router;