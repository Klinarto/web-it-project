const express = require("express");
const customerController = require("../controllers/customerController.js");
const router = express.Router();

// register customer
router.post("/register", customerController.registerCustomer);
router.post("/login", customerController.loginCustomer);

module.exports = router;
