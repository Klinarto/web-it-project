//link to author model
const vendors = require("../models/vendors");

// handle request to get all vendors
const getAllvendors = (req, res) => {
  res.send(vendors); // send list to browser
};

// handle request to get one particular author
const getAuthorByID = (req, res) => {
  // search for author by ID
  const author = vendors.find((author) => author.id === req.params.id);

  if (author) {
    res.send(author); // send back the author details
  } else {
    // you can decide what to return if author is not found
    // currently, an empty list will be return.
    res.send([]);
  }
};

// handle requests to add an author
const addAuthor = (req, res) => {
  // assemble a new author
  newAuthor = req.body;
  // add to database
  vendors.push(newAuthor);
  // return entire vendors list to browser as a check that it worked
  res.send(vendors);
};

module.exports = {
  getAllvendors,
  getAuthorByID,
  addAuthor,
};
