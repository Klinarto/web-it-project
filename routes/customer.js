const express = require("express");
const customerController = require("../controllers/customerController.js");
const router = express.Router();

// Create new order
router.post("/", customerController.createOrder);

module.exports = router;
