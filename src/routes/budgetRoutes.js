import express from "express";
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getBudgets);
router.post("/", verifyToken, createBudget);
router.put("/:id", verifyToken, updateBudget);
router.delete("/:id", verifyToken, deleteBudget);

export default router;