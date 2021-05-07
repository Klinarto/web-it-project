const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Use express' inbuilt body parser
app.use(express.json(), cors());

// App routes
app.use("/customer", require("./routes/customer"));
app.use("/menu", require("./routes/menu"));
app.use("/vendor", require("./routes/vendor"));
app.use("/order", require("./routes/order"));

app.listen(port, () => {
	console.log(`The app is listening on port ${port}`);
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
