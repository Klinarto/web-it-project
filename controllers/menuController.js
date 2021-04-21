const mongoose = require("mongoose");
const MenuItem = require("../models/menuItem");

// Get all menu items, i.e. get menu items
const getMenu = async (req, res) => {
	try {
		const menu = await MenuItem.find();
		return res.send(menu);
	} catch (error) {
		return res.status(400).send("Database query failed");
	}
};

// Get specific menu item
const getMenuItem = async (req, res) => {
	try {
		const menuItem = await MenuItem.findOne({ name: req.params.name });
		if (!menuItem) {
			return res.status(404).send("Menu item not found");
		}
		return res.send(menuItem);
	} catch (error) {
		console.error(error.message);
		return res.status(400).send("Database query failed");
	}
};

// Create menu item
const createMenuItem = async (req, res) => {
	const { name, price, image, detail } = req.body;
	try {
		let newMenuItem = new MenuItem({ name, price, image, detail });

		await newMenuItem.save();
		return res.send("Menu item added");
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	}
};

// Create menu item
const updateMenuItem = async (req, res) => {
	try {
		const menuItem = await MenuItem.findOneAndUpdate(
			{
				name: req.params.name,
			},
			req.body
		);

		if (!menuItem) {
			res.status(404).send("Menu item not found");
		}
		res.send(menuItem);

		await newMenuItem.save();
		return res.send("Menu item added");
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	}
};

module.exports = {
	getMenu,
	getMenuItem,
	createMenuItem,
	updateMenuItem,
};
