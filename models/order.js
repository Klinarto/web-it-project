const { mongoose } = require("mongoose");

menuSchema = new mongoose.Schema({
  OrderID: { type: String, required: true },
  customer_ID: { type: String, required: true },
  food_ID: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = [
  {
    OrderID: "0001",
    customer_ID: "",
    food_ID: "",
    status: "complete",
  },
  {
    OrderID: "0002",
    customer_ID: "",
    food_ID: "",
    status: "complete",
  },
];
