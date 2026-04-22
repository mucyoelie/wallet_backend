import express from "express";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/accountsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAccounts);
router.post("/", verifyToken, createAccount);
router.put("/:id", verifyToken, updateAccount);
router.delete("/:id", verifyToken, deleteAccount);

export default router;