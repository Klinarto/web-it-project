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

module.exports = {
	setVanStatus,
};
