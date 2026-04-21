import express from "express";
import { signup, login ,logout} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
export default router;