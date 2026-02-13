import express from "express";
import {
  createOrder,
  getOrdersById,
  // getAllOrders,
  // updateOrderStatus,
  // deleteOrder
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
// router.get("/", getAllOrders);
router.get("/:id", getOrdersById);
// router.patch("/:id/status", updateOrderStatus);
// router.delete("/:id", deleteOrder);

export default router;
