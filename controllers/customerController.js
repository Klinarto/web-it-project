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
		res.status(500).send("Database query failed");
	}
};

module.exports = { registerCustomer, loginCustomer, getCustomer };
