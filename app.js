const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
// const exphbs = require("express-handlebars");
const app = express();
// const router = require("./routes/router");
const customer = require("./routes/customer");
// const vendor = require("./routes/vendor");
// const menu = require("./routes/menu");
// const order = require("./routes/order");

// let connectionURL = "mongodb://localhost/BR3";
// if ("PORT" in process.env) {
//   connectionURL =
//     "mongodb+srv://admin:admin@cluster0.jdd2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// }
// mongoose.connect(connectionURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   dbName: "admin",
// });

// const db = mongoose.connection;
// db.on("error", console / console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("connected to Mongo");
// });

// handler for GET home page
app.get("/", (req, res) => {
  res.send("<h1>System</h1>");
});

// handler for customers-management requests
// customers routes are added onto the end of '/customers-management'
app.use("/customer", customer);
// app.use("/vendor", vendor);
// app.use("/menu", menu);
// app.use("/order", order);

app.listen(port, () => {
  console.log("The app is listening on port 3000!");
});
