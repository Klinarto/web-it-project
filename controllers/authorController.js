//link to author model
const authors = require('../models/author')

// handle request to get all authors
const getAllAuthors = (req, res) => {
    res.send(authors) // send list to browser
}

// handle request to get one particular author
const getAuthorByID = (req, res) => {
	
	// search for author by ID
	const author = authors.find(author => author.id === req.params.id);
	
	if (author){
		res.send(author); // send back the author details
	}
	else{
		// you can decide what to return if author is not found
		// currently, an empty list will be return.
		res.send([]); 
	}
}

// handle requests to add an author
const addAuthor = (req, res) => {
    // assemble a new author
    newAuthor = req.body
    // add to database
    authors.push(newAuthor)
    // return entire authors list to browser as a check that it worked
    res.send(authors)
}


module.exports = {
    getAllAuthors, getAuthorByID, addAuthor
}