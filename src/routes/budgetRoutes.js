import express from "express";
import { getBudgets, createBudget } from "../controllers/budgetsController.js";

const router = express.Router();

router.get("/", getBudgets);
router.post("/", createBudget);

export default router;