import express from "express";
import {
  registerUser,
  loginUser,
  findUserById,
  updateUserById,
  getUserProfile,
  deletesUserById,
} from "../controllers/userController.js";
import { authAdmin, authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search/:id", authMiddleware, findUserById);
router.put("/update/:id", authAdmin, authMiddleware, updateUserById);
router.get("/profile", authMiddleware, getUserProfile);
router.delete("/delete/:id", authAdmin, authMiddleware, deletesUserById);
export default router;
///
