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

module.exports = {
	getMenu,
	getMenuItem,
};
