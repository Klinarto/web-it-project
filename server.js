const express = require("express");
const port = process.env.PORT || 5000;
const app = express();

const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Use express' inbuilt body parser
app.use(express.json());

// Home page
app.get("/", (req, res) => {
	res.send("<h1>Home Page</h1>");
});

// App routes
app.use("/customer", require("./routes/customer"));
app.use("/menu", require("./routes/menu"));
app.use("/vendor", require("./routes/vendor"));
app.use("/order", require("./routes/order"));

app.listen(port, () => {
	console.log(`The app is listening on port ${port}`);
});
