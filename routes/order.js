const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

// get all outstanding orders
router.get("/", orderController.getOrders);

// get specific order
router.get("/:orderId", orderController.getOrder);

// create new order
router.post("/", orderController.createOrder);

// update specific order
router.put("/:orderId", orderController.updateOrder);

module.exports = router;
