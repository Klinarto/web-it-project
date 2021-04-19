const { mongoose } = require("mongoose");

menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  detail: { type: String, required: true },
});

module.exports = [
  {
    food_id: "1",
    name: "Latte",
    price: "4.5",
    image_url: "",
    detail: "Double expresso with foam milk",
  },
  {
    food_id: "2",
    name: "Flat White",
    price: "4.5",
    image_url: "",
    detail: "Double expresso with steam milk",
  },
];
