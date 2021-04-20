//link to food model
const Order = require("../models/order");
const MenuItem = require("../models/menuItem");

// handle requests to add an food
const createOrder = async (req, res) => {
	const { foodName, customerID } = req.body;
	console.log(foodName);
	try {
		const menuItem = await MenuItem.findOne({
			name: foodName,
		});

		if (!menuItem) {
			return res.status(404).send("Menu item not found");
		}
		let newOrder = new Order({
			orderID: "1",
			customerID,
			food: foodName,
			status: "Pending",
		});

		await newOrder.save();
		return res.send("Order created");
	} catch (error) {
		console.error(error.message);
		return res.status(400).send("Database query failed");
	}
};

module.exports = {
	createOrder,
};
