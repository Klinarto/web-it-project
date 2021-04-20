const mongoose = require("mongoose");
require("dotenv").config();

CONNECTION_STRING =
	"mongodb+srv://admin:<password>@cluster0.jdd2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MONGO_URL = CONNECTION_STRING.replace(
	"<username>",
	process.env.MONGO_USERNAME
).replace("<password>", process.env.MONGO_PASSWORD);

const connectDB = async () => {
	mongoose.connect(MONGO_URL || "mongodb://localhost", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		dbName: "br3",
	});
	const db = mongoose.connection;
	db.on("error", (err) => {
		console.error(err);
		process.exit(1);
	});
	db.once("open", async () => {
		console.log("Mongo connection started on " + db.host + ":" + db.port);
	});
};

module.exports = connectDB;
