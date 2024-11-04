import { authAdmin, authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";
import express from "express";
const router = express.Router();
router.post("/create", authMiddleware, createOrder);
router.get("/all", authMiddleware, authAdmin, getAllOrders);
router.get("/myOrder", authMiddleware, getUserOrders);
router.get("/total-orders", countTotalOrders);
router.get("/total-sales", calculateTotalSales);
router.get("total-sales-by-date", calculateTotalSalesByDate);
router.get("/:id", authMiddleware, findOrderById);
router.put("/:id/pay", authMiddleware, markOrderAsPaid);
router.put("/:id/deliver", authMiddleware, authAdmin, markOrderAsDelivered);

export default router;
