//link to author model
const vendors = require("../models/vendors");

// handle request to get all vendors
const getAllvendors = (req, res) => {
  res.send(vendors); // send list to browser
};

// Send van location to set the status
const setVanStatus = (req, res) => {};

// handle request to get one particular author
const getOrder = (req, res) => {
  // search for author by ID
  const author = vendors.find((author) => author.id === req.params.id);
};

// handle requests to add an author
const markOrder = (req, res) => {
  // assemble a new author
  newAuthor = req.body;
  // add to database
  vendors.push(newAuthor);
  // return entire vendors list to browser as a check that it worked
  res.send(vendors);
};

module.exports = {
  setVanStatus,
  getOrder,
  markOrder,
};
