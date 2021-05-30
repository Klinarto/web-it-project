// const request = require("supertest");
// const app = require("../server");

// describe("GET /user", function () {
//   it("responds with json", function (done) {
//     request(app)
//       .get("/user")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200, done);
//   });
// });

// const request = require("supertest");
// const app = require("../server");

// describe("My API tests", function () {
//   var token = null;
//   var url = "http://localhost:5000/";

// before(function (done) {
//   request(app)
//     .post("/vendor/login")
//     .send({ _id: "Coffee2Go", password: "hihi" })
//     .end(function (err, res) {
//       token = res.body.token; // Or something
//       console.log(res.body);
//       done();
//     });
// });

//   it("should get a valid token for user: Coffee2Go", function (done) {
//     request(url)
//       .put("/vendor/address")
//       .set("Accept", "application/json")
//       // .set("x-access-token", token)
//       .set(
//         "x-access-token",
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZW5kb3IiOnsiaWQiOiI2MDkzOWY5YWE2NzYyYjY0YjgyNTQ3YjMifSwiaWF0IjoxNjIyMzY2MTc4LCJleHAiOjE2MjI0NTI1Nzh9.9myzi-EqIonSOD4v0JnsAwZYdjXWCGruFVMnuksSPW0"
//       )
//       .send({ status: "Asdfasdfasdf" })
//       .expect(200, done);
//   });
// });
