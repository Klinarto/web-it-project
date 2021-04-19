const express = require("express");
// const controller = require("../controllers/customerController.js");
const router = express.Router();

router.route("/hello").get((req, res) => res.send("<h1>System2s</h1>"));

// router
//   .route("/")
//   .get(controller.something)
//   .post(controller.something)
//   .put(controller.something)
//   .delete(controller.something);

// router
//   .route("/:id")
//   .get(controller.something)
//   .post(controller.something)
//   .put(controller.something)
//   .delete(controller.something);

module.exports = router;
