const express = require("express");
const vendorController = require("../controllers/vendorController.js");
const router = express.Router();

// Register van
router
  .route("/register")
  .post(vendorController.registerVan)
  .get(vendorController.getVendors);

// Login van 
router.post("/login", vendorController.loginVendor);

// Set van status or location
router.route("/:vanName").put(vendorController.setVanStatus);


module.exports = router;


