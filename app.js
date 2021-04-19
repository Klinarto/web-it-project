const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// set up customers routes
const router = require("./routes/router");

// handler for GET home page
app.get("/", (req, res) => {
  res.send("<h1>System</h1>");
});

// handler for customers-management requests
// customers routes are added onto the end of '/customers-management'
app.use("/management", Router);

app.listen(3000, () => {
  console.log("The app is listening on port 3000!");
});
