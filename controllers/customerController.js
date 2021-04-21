const Customer = require("../models/customer");

// handle requests to add an food
const registerCustomer = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const customer = await Customer.findOne({
			email: email,
		});

		if (customer) {
			return res.status(400).send("Email already exists");
		}

		let newCustomer = new Customer({
			name,
			email,
			password,
		});
		await newCustomer.save();

		return res.send("Customer registered");
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	}
};

module.exports = { registerCustomer };
