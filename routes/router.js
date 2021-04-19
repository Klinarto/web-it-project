const express = require("express");
const vendor = require("./vendor");
const customer = require("./customer");

const controller = require("../controllers/controller.js");

const app = express();
const router = app.router();

// app.use("/vendor", vendor);
// app.use("/customer", customer);

// handle the GET request to get all s
router.get("/vendor/:id", controller.getAlls);

router.get("menu", controller.getAlls);

// handle the GET request to get one
router.get("/:id", controller.getByID);

// handle POST requests to add one
// router.get("/customers",

// export the router
module.exports = router;

// Your group needs to implement routes to support the following customer features:
// 1)View menu of snacks (including pictures and prices) (get)
// 2)View details of a snack (get)
// 3)Customer starts a new order by requesting a snack (post)

// Your group needs to implementroutes to support the following vendorfeatures:
// 1)Setting van status (vendor sends location,marksvan as ready-for-orders) (post)
// 2)Show list of all outstanding orders (get)
// 3)Mark an orderas "fulfilled" (ready to be picked up by customer) (post)
