const jwt = require("jsonwebtoken");
require("dotenv").config;

const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];

	if (!token) {
		return res.status(401).send("No token provided");
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.customer = decoded.customer;
		next();
	} catch (error) {
		console.error(error);
		res.status(401).send("Invalid token");
	}
};

module.exports = verifyToken;
