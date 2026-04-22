import express from "express";
import {
  getSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategoryController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getSubcategories);
router.post("/", verifyToken, createSubcategory);
router.put("/:id", verifyToken, updateSubcategory);
router.delete("/:id", verifyToken, deleteSubcategory);

export default router;