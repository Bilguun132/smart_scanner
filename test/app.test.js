const request = require("supertest");
var expect = require("chai").expect;
var app = require("../app");
var debug = require("debug")("smartscanner:app.test");

describe("app", () => {
  it("should return 404 when unknown page requested", async () => {
    let res = await request(app).get("/asdasdasdas");
    expect(res.status).to.not.equal(200);
  });

  it("should return a page when main index route is requsted", async () => {
    let res = await request(app).get("/");
    expect(res.status).to.equal(200);
  });

  it("should return a page when api index route is requsted", async () => {
    let res = await request(app).get("/api");
    expect(res.status).to.equal(200);
  });
});
