const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// register a new customer
const registerCustomer = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const customer = await Customer.findOne({
			email: email,
		});

		if (customer) {
			return res.status(400).send("Email already exists");
		}

		const saltRounds = 10;

		const hashPassword = await bcrypt.hash(password, saltRounds);

		let newCustomer = new Customer({
			name,
			email,
			password: hashPassword,
		});
		await newCustomer.save();

		return res.send("Customer registered");
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
			return res.status(400).send("Invalid email");
		}

		const passwordMatch = await bcrypt.compare(password, customer.password);

		if (!passwordMatch) {
			return res.status(400).send("Invalid password");
		}

		return res.status(200).send("User logged in");
	} catch (error) {}
};

module.exports = { registerCustomer, loginCustomer };
