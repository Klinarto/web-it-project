const express = require("express");
const vendor = require("./vendor");
const customer = require("./customer");

const controller = require("../controllers/controller.js");
const app = express();
const router = app.router();

router.get("/", controller.something);
router.get("/:id", controller.something);
router.get("/vendor/:id", controller.something);
router.get("/vendor/", controller.something);
router.get("/customer/", controller.something);
router.get("/customer/:id", controller.something);
router.get("/food/:id", controller.something);
router.get("/food/", controller.something);
router.get("/order/:id", controller.something);
router.get("/order/", controller.something);

router.post("/", controller.something);
router.post("/:id", controller.something);
router.post("/vendor/:id", controller.something);
router.post("/vendor/", controller.something);
router.post("/customer/:id", controller.something);
router.post("/customer/", controller.something);
router.post("/food/:id", controller.something);
router.post("/food/", controller.something);
router.post("/order/:id", controller.something);
router.post("/order/", controller.something);

router.put("/", controller.something);
router.put("/:id", controller.something);
router.put("/vendor/:id", controller.something);
router.put("/vendor/", controller.something);
router.put("/customer/:id", controller.something);
router.put("/customer/", controller.something);
router.put("/food/:id", controller.something);
router.put("/food/", controller.something);
router.put("/order/:id", controller.something);
router.put("/order/", controller.something);

router.delete("/", controller.something);
router.delete("/:id", controller.something);
router.delete("/vendor/:id", controller.something);
router.delete("/vendor/", controller.something);
router.delete("/customer/:id", controller.something);
router.delete("/customer/", controller.something);
router.delete("/food/:id", controller.something);
router.delete("/food/", controller.something);
router.delete("/order/:id", controller.something);
router.delete("/order/", controller.something);

module.exports = router;

// Your group needs to implement routes to support the following customer features:
// 1)View menu of snacks (including pictures and prices) (get)
// 2)View details of a snack (get)
// 3)Customer starts a new order by requesting a snack (post)

// Your group needs to implementroutes to support the following vendorfeatures:
// 1)Setting van status (vendor sends location,marksvan as ready-for-orders) (post)
// 2)Show list of all outstanding orders (get)
// 3)Mark an orderas "fulfilled" (ready to be picked up by customer) (post)
