const Order = require("../models/order");

// Get all outstanding orders
const getOrders = async (req, res) => {
	try {
		// Find all documents where their status is not fulfilled
		const orders = await Order.find({ status: { $ne: "fulfilled" } });
		return res.send(orders);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// Mark specific order
const markOrder = async (req, res) => {
	try {
		const order = await Order.findOneAndUpdate(
			{
				orderID: req.params.orderId,
			},
			req.body
		);

		if (!order) {
			return res.status(404).send("Order not found");
		}
		return res.send("Order updated");
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

module.exports = { getOrders, markOrder };
