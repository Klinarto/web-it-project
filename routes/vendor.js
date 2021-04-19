const express = require("express");
const controller = require("../controllers/controller.js");
const router = express.Router();

router
  .route("/")
  .get(controller.something)
  .post(controller.something)
  .put(controller.something)
  .delete(controller.something);

router
  .route("/:id")
  .get(controller.something)
  .post(controller.something)
  .put(controller.something)
  .delete(controller.something);

module.exports = router;
