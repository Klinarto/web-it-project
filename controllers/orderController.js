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

// mark specific order
const markOrder = async (req, res) => {
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
		return res.send("Order updated");
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// handle requests to add an food
const createOrder = async (req, res) => {
	const { foodItems, customerID } = req.body;
	console.log(foodItems);
	try {
		for (const [foodName, count] of Object.entries(foodItems)) {
			const menuItem = await MenuItem.findOne({
				name: foodName,
			});

			if (!menuItem) {
				return res.status(404).send("Menu item not found");
			}
		}

		Order.countDocuments({}, async (err, count) => {
			// Get orderId
			let orderId = count + 1;

			let newOrder = new Order({
				orderId: orderId,
				customerID,
				foodItems,
				status: "pending",
			});
			await newOrder.save();
		});
		return res.send("Order created");
	} catch (error) {
		console.error(error.message);
		return res.status(400).send("Database query failed");
	}
};

module.exports = {
	createOrder,
};

module.exports = { getOrders, markOrder, createOrder };
