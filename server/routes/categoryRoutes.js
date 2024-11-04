import express from "express";
import { authAdmin, authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  listCategory,
  readCategory,
  removeCategory,
} from "../controllers/categoryController.js";
const router = express.Router();
router.post("/create", authMiddleware, authAdmin, createCategory);
router.put("/update/:categoryId", authMiddleware, authAdmin, updateCategory);
router.delete("/delete/:categoryId", authMiddleware, authAdmin, removeCategory);
router.get("/all", authMiddleware, listCategory);
router.get("/:id", authMiddleware, readCategory);
export default router;
