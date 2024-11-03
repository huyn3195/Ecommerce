import express from "express";
import { authAdmin, authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";
const router = express.Router();
router.post("/create", authAdmin, authMiddleware, createCategory);
export default router;
