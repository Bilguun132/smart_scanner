const { User } = require("../db/models/user.model");
const request = require("supertest");
var expect = require("chai").expect;
var app = require("../app");

describe("User Model Methods", () => {
  describe("password", () => {
    it("should set password hash from password", async () => {
      let user = User({ name: "bilguuntest", email: "bilguun132@gmail.com" });
      let password = "testpassword";
      user.setPassword(password).then(hash => {
        expect(hash).to.exist;
        expect(user.hash).to.exist;
      });
    });
    it("should validate password correctly", async () => {
      let user = User({ name: "bilguuntest", email: "bilguun132@gmail.com" });
      let password = "testpassword";
      user
        .setPassword(password)
        .then(() => {
          return user.validPassword(password);
        })
        .then(res => {
          expect(res).to.be.true;
        });
    });
  });
});

describe("api/users", () => {
  before(async () => {
    await User.remove({});
  });
  after(async () => {
    await User.remove({});
  });
  describe("POST", () => {
    it("should create a new user when valid post request is made", async () => {
      let user = {
        name: "Bilguun",
        email: "Bilguun132@gmail.com"
      };
      let res = await request(app)
        .post("/api/users")
        .send(user);
      expect(res.status).to.equal(200);
    });

    it("should return 400 when duplicate user email is used", async () => {
      let user = {
        name: "Bilguun",
        email: "Bilguun132@gmail.com"
      };

      await request(app)
        .post("/api/users")
        .send(user);
      let res = await request(app)
        .post("/api/users")
        .send(user);
      expect(res.status).to.equal(400);
    });

    it("should fail when invalid email is used", async () => {
      let user = {
        name: "Bilguun",
        email: "Bilguun132"
      };
      let res = await request(app)
        .post("/api/users")
        .send(user);
      console.log(res.text)
      expect(res.status).to.not.equal(200);
    })
  });
});
