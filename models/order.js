const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	orderId: { type: String, required: true },
	customerID: { type: mongoose.ObjectId, required: true },
	foodItems: { type: Object, required: true },
	status: { type: String, required: true },
});

module.exports = Order = mongoose.model("Order", OrderSchema, "orders");
