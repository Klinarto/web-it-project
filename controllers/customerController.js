//link to author model
const menus = require("../models/menu");

// handle request to get all menus
const getMenu = (req, res) => {
  res.send(menus); // send list to browser
};

// handle request to get one particular author
const getItem = (req, res) => {
  // search for author by ID
  const author = menus.find((author) => author.id === req.params.id);

  if (author) {
    res.send(author); // send back the author details
  } else {
    // you can decide what to return if author is not found
    // currently, an empty list will be return.
    res.send([]);
  }
};

// handle requests to add an author
const makeOrder = (req, res) => {
  // assemble a new author
  newAuthor = req.body;
  // add to database
  menus.push(newAuthor);
  // return entire menus list to browser as a check that it worked
  res.send(menus);
};

module.exports = {
  getMenu,
  getItem,
  makeOrder,
};
