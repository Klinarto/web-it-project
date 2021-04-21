const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	orderID: { type: String, required: true },
	customerID: { type: String, required: true },
	food: { type: String, required: true },
	status: { type: String, required: true },
});

module.exports = Order = mongoose.model("Order", OrderSchema, "orders");
