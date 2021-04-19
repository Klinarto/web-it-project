const { mongoose } = require("mongoose");

menuSchema = new mongoose.Schema({
  OrderID: { type: String, required: true },
  customer_ID: { type: String, required: true },
  food_ID: { type: String, required: true },
  order_time: { type: String, required: true },
});

module.exports = [
  {
    OrderID: "0001",
    customer_ID: "",
    food_ID: "",
    order_time: "09:00",
  },
  {
    food_id: "2",
    name: "Flat White",
    price: "4.5",
    image_url: "",
    detail: "Double expresso with steam milk",
  },
];
