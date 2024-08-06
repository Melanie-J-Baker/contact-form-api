const messages = require("../routes/messages");
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/", messages);

describe("GET / index route works", function () {
  it("responds with json", function (done) {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /all", function () {
  it("responds with json", function (done) {
    request(app)
      .get("/all")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /:id", function () {
  it("responds with json", function (done) {
    request(app)
      .get("/:id")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /new", function () {
  it("responds with json", function (done) {
    request(app)
      .post("/new")
      .send({
        name: "Daniel Kitson",
        email: "dkitson@yahoo.com",
        text: "I saw Helen last week at Up The Creek",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("Message sent");
      })
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe("DELETE /:id", function () {
  it("responds with json", function (done) {
    request(app)
      .delete("/:id")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("Message deleted");
      });
  });
});
