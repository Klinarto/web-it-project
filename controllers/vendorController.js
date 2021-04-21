const Vendor = require("../models/vendor");

// Set van status by sending location
const setVanStatus = async (req, res) => {
	try {
		const van = await Vendor.findOneAndUpdate(
			{
				name: req.params.vanName,
			},
			req.body
		);
		if (!van) {
			return res.status(404).send("Van not found");
		}
		return res.send("Van status updated");
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

const registerVan = async (req, res) => {
	const { name, password, location } = req.body;
	try {
		let newVan = new Vendor({
			name,
			password,
			location,
			status: "closed",
		});

		await newVan.save();
		return res.send("Van registered");
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error");
	}
};


const getVendorLocationDetails = async (req, res) => {
	try {
		
		const vendor = await Vendor.find()
		return res.send(vendor);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

module.exports = {
	getVendorLocationDetails,
	setVanStatus,
	registerVan,
};

