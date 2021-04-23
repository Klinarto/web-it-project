const Order = require("../models/order");
const MenuItem = require("../models/menuItem");

// get all outstanding orders
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

// get specific order
const getOrder = async (req, res) => {
	try {
		const order = await Order.findOne({
			orderId: req.params.orderId,
		});

		if (!order) {
			return res.status(404).send("Order not found");
		}

		return res.send(order);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// update specific order
// can be used to update order status or change the order
const updateOrder = async (req, res) => {
	try {
		const order = await Order.findOneAndUpdate(
			{
				orderId: req.params.orderId,
			},
			req.body
		);

		if (!order) {
			return res.status(404).send("Order not found");
		}

		// check if only the order status has been changed
		// or if the order has been modified
		if (req.body.status) {
			return res.send("Order status updated");
		} else {
			return res.send("Order changed");
		}
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// create new order
const createOrder = async (req, res) => {
	const { foodItems, customerId, vendorId } = req.body;
	let totalCost = 0;
	try {
		for (const [foodName, quantity] of Object.entries(foodItems)) {
			const menuItem = await MenuItem.findOne({
				name: foodName,
			});

			if (!menuItem) {
				return res.status(404).send("Menu item not found");
			}
			totalCost += menuItem.price * quantity;
		}

		Order.countDocuments({}, async (err, count) => {
			// count how many orders are in the database
			// and make the orderId the total number of
			// order + 1
			let orderId = count + 1;

			let newOrder = new Order({
				orderId: orderId,
				customerId,
				vendorId,
				foodItems,
				status: "pending",
				orderCost: totalCost,
				totalCost: totalCost,
			});
			await newOrder.save();
		});
		return res.send("Order created");
	} catch (error) {
		console.error(error.message);
		return res.status(400).send("Database query failed");
	}
};

module.exports = { getOrders, getOrder, updateOrder, createOrder };
