import express from "express";
import { getReportByDate } from "../controllers/reportsController.js";

const router = express.Router();

router.get("/", getReportByDate);

export default router;