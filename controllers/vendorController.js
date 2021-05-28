const Vendor = require("../models/vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Set van status by sending location
const setVanStatus = async (req, res) => {
	try {
		const van = await Vendor.findOneAndUpdate(
			{
				_id: req.vendor.id,
			},
			req.body
		);
		if (!van) {
			return res.status(404).send("Van not found");
		}
		return res.send(van);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

const registerVan = async (req, res) => {
	const { name, password } = req.body;

	const saltRounds = 10;

	const hashPassword = await bcrypt.hash(password, saltRounds);

	try {
		let van = await Vendor.findOne({
			name: name,
		});

		if (van) {
			return res.status(400).send("Van already exists");
		}

		van = new Vendor({
			name,
			password: hashPassword,
			location: "",
			locationDetails: "",
			status: "closed",
		});

		await van.save();
		return res.send("Van registered");
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error");
	}
};

const updateVanDetails = async (req, res) => {
	const { newPassword, password } = req.body;
	try {
		const vendor = await Vendor.findOne({ _id: req.vendor.id });

		if (!vendor) {
			return res.status(404).send("Vendor doesn't exist");
		}

		const passMatch = await bcrypt.compare(password, vendor.password);

		if (!passMatch) {
			return res.status(400).send("Invalid password");
		}
		const saltRounds = 10;

		vendor.password = await bcrypt.hash(newPassword, saltRounds);

		console.log(vendor);

		await vendor.save();

		const payload = {
			vendor: { id: vendor.id },
		};

		// expires in 24 hours
		const expiry = 86400;

		// sign jwt
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: expiry,
		});

		return res.status(200).send({ token: token });
	} catch (error) {}
};

const loginVendor = async (req, res) => {
	const { name, password } = req.body;
	try {
		const vendor = await Vendor.findOne({ name });

		if (!vendor) {
			return res.status(404).send("Vendor doesn't exist");
		}

		const validPassword = await bcrypt.compare(password, vendor.password);

		if (!validPassword) {
			return res.status(401).send("Invalid password");
		}

		const payload = {
			vendor: { id: vendor.id },
		};

		// expires in 24 hours
		const expiry = 86400;

		// sign jwt
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: expiry,
		});

		return res.status(200).send({ token: token });
	} catch (error) {
		console.error(error);
		res.status(500).send("Database query failed after");
	}
};

const getVendors = async (req, res) => {
	try {
		const vendors = await Vendor.find();
		return res.send(vendors);
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

module.exports = {
	getVendors,
	setVanStatus,
	registerVan,
	loginVendor,
	updateVanDetails,
};
