const express = require("express");
const vendor = require("./vendor");
const customer = require("./customer");

const controller = require("../controllers/controller.js");
const app = express();
const router = app.router();

app
  .route("/")
  .get(controller.something)
  .post(controller.something)
  .put(controller.something)
  .delete(controller.something);

app
  .route("/:id")
  .get(controller.something)
  .post(controller.something)
  .put(controller.something)
  .delete(controller.something);


module.exports = app;

// Your group needs to implement routes to support the following customer features:
// 1)View menu of snacks (including pictures and prices) (get)
// 2)View details of a snack (get)
// 3)Customer starts a new order by requesting a snack (post)

// Your group needs to implementroutes to support the following vendorfeatures:
// 1)Setting van status (vendor sends location,marksvan as ready-for-orders) (post)
// 2)Show list of all outstanding orders (get)
// 3)Mark an orderas "fulfilled" (ready to be picked up by customer) (post)
