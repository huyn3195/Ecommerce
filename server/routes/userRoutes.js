import express from "express";
import {
  registerUser,
  loginUser,
  findUserById,
  updatedUseById,
  getUserProfile,
} from "../controllers/userController.js";
import { authAdmin, authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search/:id", authMiddleware, findUserById);
router.put("/update/:id", authAdmin, authMiddleware, updatedUseById);
router.get("/profile", authMiddleware, getUserProfile);
export default router;
///
