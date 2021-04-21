const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

// Get all outstanding orders
router.get("/", orderController.getOrders);

// Get specific order
router.get("/:orderId", orderController.getOrder);

// Create new order
router.post("/", orderController.createOrder);

// Update specific order
router.put("/:orderId", orderController.updateOrder);

module.exports = router;
