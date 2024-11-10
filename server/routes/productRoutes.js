import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import {
  addProduct,
  removeProduct,
  fetchProducts,
  findProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  filterProducts,
  updateProductDetails,
  fetchNewProducts,
} from "../controllers/productController.js";
import checkId from "../middlewares/checkId.js";
import { authMiddleware, authAdmin } from "../middlewares/authMiddleware.js";

router.get("/", fetchProducts);
router.post("/add", authMiddleware, authAdmin, formidable(), addProduct);
router.get("/all", fetchAllProducts);
router.post("/:id/reviews", authMiddleware, checkId, addProductReview);
router.get("/top", fetchTopProducts);
router.delete("/remove/:id", authMiddleware, authAdmin, checkId, removeProduct);
router.get("/new", fetchNewProducts);
router.get("/find/:id", checkId, findProductById);
router.post("/filter", filterProducts);
router.put(
  "/update/:id",
  authMiddleware,
  authAdmin,
  checkId,
  updateProductDetails
);
export default router;
