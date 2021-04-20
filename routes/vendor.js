const express = require("express");
const vendorController = require("../controllers/vendorController.js");
const router = express.Router();

// Set van status
router.post("/:vanName", vendorController.setVanStatus);

module.exports = router;
