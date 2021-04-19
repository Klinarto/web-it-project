const express = require("express");
const router = express.Router();

router
  .route('*')
  .get( (req, res) => {
      res.status(404).send("<p>invalid request</p>")
  })

router
  .route("/")
  .get(controller.something)
  .post(controller.something)
  .put(controller.something)
  .delete(controller.something);


module.exports = router;
