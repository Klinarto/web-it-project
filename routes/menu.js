const express = require("express");
const menuController = require("../controllers/menuController");
const router = express.Router();

// Get menu
router.get("/", menuController.getMenu);

// Get specific menu item
router.get("/:name", menuController.getMenuItem);

// Create new menu item
router.post("/", menuController.createMenuItem);

module.exports = router;
