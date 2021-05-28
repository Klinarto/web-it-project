const express = require("express");
const vendorController = require("../controllers/vendorController.js");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

// Register van
router
	.route("/register")
	.post(vendorController.registerVan)
	.get(vendorController.getVendors);

// Login van
router.post("/login", vendorController.loginVendor);

router.put("/me", verifyToken, vendorController.updateVanDetails);

// Set van status or location
router.put("/address", verifyToken, vendorController.setVanStatus);

module.exports = router;
