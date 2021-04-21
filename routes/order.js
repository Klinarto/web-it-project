const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

// Get all outstanding orders
router.get("/", orderController.getOrders);

// Create new order
router.post("/", orderController.createOrder);

// Mark specific order
router.post("/:orderId", orderController.markOrder);

module.exports = router;
