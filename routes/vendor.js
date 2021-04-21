const express = require("express");
const vendorController = require("../controllers/vendorController.js");
const router = express.Router();

// Register van
router.post("/", vendorController.registerVan);

// Set van status
router.put("/:vanName", vendorController.setVanStatus);

module.exports = router;
