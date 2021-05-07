const express = require("express");
const vendorController = require("../controllers/vendorController.js");
const router = express.Router();

// Register van
router
  .route("/")
  .post(vendorController.registerVan)
  .get(vendorController.getVendors);

// Set van status
router.route("/:vanName").put(vendorController.setVanStatus);

module.exports = router;
