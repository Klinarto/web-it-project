const app = require("../server.js");
const request = require("supertest");

describe("Vendor location & status validation", function () {
	let token = null;
	it("Login with registered vendor", function (done) {
		request(app)
			.post("/vendor/login")
			.set("Content-Type", "application/json")
			.send({ name: "Coffee2Go", password: "hihi" })
			.expect(200)
			.end(function (err, res) {
				token = res.body.token;
				done();
			});
	});

	it("Successfully put a valid location & status for user: Coffee2Go", function (done) {
		request(app)
			.put("/vendor/address")
			.set("Content-Type", "application/json")
			.set("x-access-token", token)
			.send({ status: "open", location: { lst: 0, lng: 0 } })
			.expect(200, done);
	});

	it("Fail login with unregistered vendor", function (done) {
		request(app)
			.post("/vendor/login")
			.set("Content-Type", "application/json")
			.send({ name: "fake Vendor", password: "fake password" })
			.expect(404)
			.end(done);
	});
});
