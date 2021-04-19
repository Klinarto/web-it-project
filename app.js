const express = require("express");
const bodyParser = require("body-parser");
// const exphbs = require("express-handlebars");
const app = express();
const router = require("./routes/router");
const customer = require("./routes/customer");
const vendor = require("./routes/vendor");
const menu = require("./routes/menu");
const order = require("./routes/order");

// app.engine('hbs', exphbs({
//   defaultLayout = 'main',
//   extnames = 'hbs'
// }))

// app.set('view engine', 'hbs')

// app.use(bodyParser.json());

// // set up customers routes

// handler for GET home page
app.get("/", (req, res) => {
  res.send("<h1>System</h1>");
});

// handler for customers-management requests
// customers routes are added onto the end of '/customers-management'
app.use("/customer", customer);

app.listen(3000, () => {
  console.log("The app is listening on port 3000!");
});
