const jwt = require("jsonwebtoken");
const customer = require("../models/customer");
require("dotenv").config;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.customer) {
      // console.log("Customer token");
      req.customer = decoded.customer;
    } else if (decoded.vendor) {
      // console.log("Vendor token");
      req.vendor = decoded.vendor;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid token");
  }
};

module.exports = verifyToken;
