const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		orderId: { type: String, required: true },
		customerId: { type: mongoose.ObjectId, required: true },
		vendorId: { type: mongoose.ObjectId, required: true },
		foodItems: { type: Object, required: true },
		status: { type: String, required: true },
		orderCost: { type: Number, required: true },
		totalCost: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = Order = mongoose.model("Order", OrderSchema, "orders");
