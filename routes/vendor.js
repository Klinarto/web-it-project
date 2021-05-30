const express = require("express");
const vendorController = require("../controllers/vendorController.js");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

// Register van
router.post("/register", vendorController.registerVan);

// Get vans
router.get("/", vendorController.getVendors);

// Login van
router.post("/login", vendorController.loginVendor);

// Change specific vendor password
router.put("/me/password", verifyToken, vendorController.updateVanPassword);

// Set van status or location
router.put("/address", verifyToken, vendorController.updateVan);

router.put("/rate", verifyToken, vendorController.addVanRating);

module.exports = router;
