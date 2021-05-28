const express = require("express");
const customerController = require("../controllers/customerController.js");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// register customer
router.post("/register", customerController.registerCustomer);
router.post("/login", customerController.loginCustomer);
router.get("/me", verifyToken, customerController.getCustomer);

// profile customer profile
router.put("/customer/myaccount",verifyToken,customerController.updateProfile);
module.exports = router;
