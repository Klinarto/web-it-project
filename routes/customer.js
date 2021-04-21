const express = require("express");
const customerController = require("../controllers/customerController.js");
const router = express.Router();

router.post("/", customerController.registerCustomer);

module.exports = router;
