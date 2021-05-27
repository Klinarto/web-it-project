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

// Set van status
router.route("/:vanName").put(vendorController.setVanStatus);


router.route("/locdetail/:vanName").put(vendorController.setLocationDetail)

module.exports = router;


