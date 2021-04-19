//link to food model
const Menu = require("../models/menu");
const Order = require("../models/orders");

// handle request to get all menus
const getMenu = (req, res) => {
  res.send(Menu); // send list to browser
};

// handle request to get one particular food's detail
const getItem = (req, res) => {
  // search for food by ID
  const food = Menu.find((food) => food.food_id === req.params.food_id);

  if (food) {
    res.send(food); // send back the food details
  } else {
    // you can decide what to return if food is not found
    // currently, an empty list will be return.
    res.send([]);
  }
};

// handle requests to add an food
const makeOrder = (req, res) => {
  // assemble a new food
  const food = Menu.find((order) => food.food_id === req.params.food_id);

  if (food) {
    var order = {};

    order["customer_ID"] = req.body.customer_ID;
    order["food_ID"] = food;
    order["status"] = "incomplete";

    Order.push(order);
    res.send(order);
  } else {
    res.send([]);
  }
  // newfood = req.body;
  // // add to database

  // return entire menus list to browser as a check that it worked
  res.send(order);
};

module.exports = {
  getMenu,
  getItem,
  makeOrder,
};
