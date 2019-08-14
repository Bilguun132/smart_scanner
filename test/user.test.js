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
  beforeEach(async () => {
    await User.remove({});
  });
  afterEach(async () => {
    await User.remove({});
  });

  describe.only("GET /", () => {
    let id = "";
    before(async () => {
      console.log("before");
      let users = await User.insertMany([
        {
          name: "Bilguun",
          email: "test@gmail.com"
        },
        {
          name: "Bilguun",
          email: "test@gmail.com"
        }
      ]);
      console.log(users);
    });

    it("should return all users when requested", async () => {
      let users = await User.find({});
      console.log(users);
      let res = await request(app).get("/api/users");
      expect(res.status).to.equal(200);
      expect(res.body).length.to.equal(2);
    });
  });

  describe("POST /", () => {
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
      expect(res.status).to.not.equal(200);
    });
  });

  describe("POST /login", () => {
    it("should return user when the login credentials are correct", async () => {
      let user = new User({
        name: "Bilguun",
        email: "Bilguun132@gmail.com"
      });
      await user.setPassword("testpassword");
      console.log(user);
      console.log("saving");
      await user.save();
      console.log("saved");

      let res = await request(app)
        .post("/api/users/login")
        .send({ email: "Bilguun132@gmail.com", password: "testpassword" });
      // console.log(res);
      expect(res.status).to.equal(200);
    });
  });
});
