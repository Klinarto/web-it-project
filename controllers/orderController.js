const Order = require("../models/order");
const MenuItem = require("../models/menuItem");

// get all outstanding orders
const getOrders = async (req, res) => {
	const filter = {};
	if ((req.customer || req.vendor) && !(req.customer || req.vendor)) {
		return res.status(401).send("No token provided");
	}
	if (req.customer) {
		filter["customerId"] = req.customer.id;
	} else if (req.vendor) {
		filter["vendorId"] = req.vendor.id;
	}

	try {
		// Find all documents where their status is not fulfilled

		const orders = await Order.find(filter)
			.populate("vendorId", ["name"])
			.populate("customerId", ["firstName", "lastName", "email"], "Customer");
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
		})
			.populate("vendorId", ["name"], "Vendor")
			.populate("customerId", ["firstName", "lastName", "email"], "Customer");

		if (!order) {
			return res.status(404).send("Order not found");
		}

		if (req.customer) {
			if (req.customer.id != order.customerId._id) {
				return res.status(401).send("Unauthorized customer access to order");
			}
		}

		if (req.vendor) {
			if (req.vendor.id != order.vendorId._id) {
				return res.status(401).send("Unauthorized vendor access to order");
			}
		}

		return res.status(200).send(order);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// update specific order
// can be used to update order status or change the order
const updateOrder = async (req, res) => {
	let options = null;
	let totalCost = 0;
	let updatedOrder = null;
	let resMsg = "";

	if (req.body.foodItems) {
		const { foodItems } = req.body;
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
			updatedOrder = {
				foodItems: foodItems,
				totalCost: totalCost,
				orderCost: totalCost,
			};
			options = { timestamps: true };

			resMsg = "Order changed";
		} catch (error) {
			console.error(error);
			return res.status(400).send("Food item not found");
		}
	} else {
		if (req.body.totalCost) {
			resMsg = "Discount applied";
		}
		if (req.body.status) {
			resMsg = "Order status updated";
		}
		updatedOrder = req.body;
		options = { timestamps: false };
	}
	try {
		const order = await Order.findOneAndUpdate(
			{
				orderId: req.params.orderId,
			},
			updatedOrder,
			options
		);

		if (!order) {
			return res.status(404).send("Order not found");
		}

		if (req.customer) {
			if (req.customer.id != order.customerId._id) {
				return res.status(401).send("Unauthorized customer access to order");
			}
		}
		if (req.vendor) {
			if (req.vendor.id != order.vendorId._id) {
				return res.status(401).send("Unauthorized vendor access to order");
			}
		}

		return res.send(resMsg);

		// // check if only the order status has been changed
		// // or if the order has been modified
		// if (req.body.status) {
		// 	return res.send("Order status updated");
		// } else {
		// 	return res.send("Order changed");
		// }
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

// create new order
const createOrder = async (req, res) => {
	const { foodItems, vendorId } = req.body;
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
				customerId: req.customer.id,
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
