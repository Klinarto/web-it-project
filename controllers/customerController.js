const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// register a new customer
const registerCustomer = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	try {
		let customer = await Customer.findOne({
			email: email,
		});

		if (customer) {
			return res.status(400).send("Email already exists");
		}

		const saltRounds = 10;

		const hashPassword = await bcrypt.hash(password, saltRounds);

		customer = new Customer({
			firstName,
			lastName,
			email,
			password: hashPassword,
		});
		await customer.save();

		const payload = {
			customer: { id: customer.id },
		};

		// expires in 24 hours
		const expiry = 86400;

		// sign jwt
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: expiry,
		});
		res.status(200).send({ token: token });
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	}
};

const loginCustomer = async (req, res) => {
	const { email, password } = req.body;
	try {
		const customer = await Customer.findOne({ email });

		if (!customer) {
			return res.status(404).send("User doesn't exist");
		}

		const validPassword = await bcrypt.compare(password, customer.password);

		if (!validPassword) {
			return res.status(401).send("Invalid password");
		}

		const payload = {
			customer: { id: customer.id },
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
		res.status(500).send("Database query failed");
	}
};

const getCustomer = async (req, res) => {
	try {
		const customer = await Customer.findById(req.customer.id);
		if (!customer) {
			return res.status(404).send("Customer not found");
		}
		return res.status(200).send(customer);
	} catch (error) {
		console.error(error);
		res.status(400).send("Database query failed");
	}
};

const updateProfile = async (req, res) => {

	try {
		const customer = await Customer.findByIdAndUpdate(
			req.customer.id,
			req.body
		);
		if (!customer) {
			return res.status(404).send("customer not found");
		}
		return res.send("Profile updated");
	} catch (error) {
		console.error(error);
		return res.status(400).send("Database query failed");
	}
};

const updateCustomerPassword = async (req, res) => {
	console.log(req.body);
	const { newPassword, password } = req.body;

	try {
		const customer = await Customer.findOne({ _id: req.customer.id });

		if (!customer) {
			return res.status(404).send("Vendor doesn't exist");
		}

		const passMatch = await bcrypt.compare(password, customer.password);

		if (!passMatch) {
			return res.status(400).send("Invalid password");
		}
		const saltRounds = 10;

		customer.password = await bcrypt.hash(newPassword, saltRounds);

		console.log(customer);

		await customer.save();

		const payload = {
			vendor: { id: customer.id },
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
		return res.status(400).send("Database query failed");
	}
};

module.exports = {
	registerCustomer,
	loginCustomer,
	getCustomer,
	updateProfile,
	updateCustomerPassword,
};
