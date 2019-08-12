const { User } = require("../db/models/user.model");
const request = require("supertest");
var expect = require("chai").expect;
// var app = require("../app");

describe("User Model Methods", function() {
  describe("password", function() {
    it("should set password hash from password", async function() {
      let user = User({ name: "bilguuntest", email: "bilguun132@gmail.com" });
      let password = "testpassword";
      user.setPassword(password, function(err, hash) {
        expect(hash).to.exist;
        expect(user.hash).to.exist;
      });
    });
  });
});
