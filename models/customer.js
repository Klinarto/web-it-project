const { mongoose } = require("mongoose");

customerSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  orders: [],
});

module.exports = [
  {
    id: "10001",
    first_name: "Jennifer",
    last_name: "Robbins",
    password: "123",
    email: "jennifer@gmail.com",
    orders: [],
  },
  {
    id: "10002",
    first_name: "Evan",
    last_name: "Hahn",
    password: "456",
    email: "evanr@gmail.com",
    orders: [],
  },
];
