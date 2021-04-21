const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
	name: { type: String, required: true },
	password: { type: String, required: true },
	location: { type: String, required: true },
	status: { type: String, required: true },
});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema, "vendors");
