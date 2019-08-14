const { User } = require("../db/models/user.model");
const request = require("supertest");
var expect = require("chai").expect;
var app = require("../app");
var debug = require("debug")("smartscanner:user.test");

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

  describe("GET /", () => {
    before(async () => {
      await User.insertMany([
        {
          name: "Bilguun",
          email: "test@gmail.com"
        },
        {
          name: "Bilguun",
          email: "test@gmail.com"
        }
      ]);
    });

    it("should return all users when requested", async () => {
      User.find()
        .then(async users => {
          let res = await request(app).get("/api/users");
          expect(res.status).to.equal(200);
          expect(res.body).length.to.equal(2);
        })
        .catch(err => {
          debug(err);
        });
    });
  });

  describe("GET /id", () => {
    let user;
    before(async () => {
      user = new User({
        name: "Test",
        email: "test@gmail.com"
      });
      await user.save();
    });

    it("should return a users when requested with valid id", async () => {
      let res = await request(app).get("/api/users/" + user._id);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name");
    });

    it("should return error when invalid id is requested", async () => {
      let res = await request(app).get("/api/users/" + 111);
      expect(res.status).to.not.equal(200);
      expect(res.body).to.have.property("message");
    });

    it("should return 404 when valid id but non existent user is requested", async () => {
      let res = await request(app).get("/api/users/" + 111111111111)
      expect(res.status).to.equal(404);
    })
  });

  describe("POST /", () => {
    it("should create a new user when valid post request is made", async () => {
      let user = {
        name: "Bilguun",
        email: "Bilguun132@gmail.com",
        password: "test"
      };
      let res = await request(app)
        .post("/api/users")
        .send(user);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("hash");
    });

    it("should return 400 when duplicate user email is used", async () => {
      let user = new User({
        name: "Bilguun",
        email: "Bilguun132@gmail.com"
      });
      await user.save();
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
      await user.save();

      let res = await request(app)
        .post("/api/users/login")
        .send({ email: "Bilguun132@gmail.com", password: "testpassword" });
      expect(res.status).to.equal(200);
    });

    it("should return error when email does not exist", async () => {
      let res = await request(app)
        .post("/api/users/login")
        .send({ email: "123123213@gmail.com", password: "testpassword" });
      expect(res.status).to.not.equal(200);
    });
  });

  describe("POST /addCard", () => {
    let user;
    before(async () => {
      user = new User({
        name: "Bilguun",
        email: "Bilguun132@gmail.com"
      });
      await user.setPassword("testpassword");
      await user.save();
    });
    it("should return a success result when a valid card is added", async () => {
      let card = {
        name: "bilguun",
        emails: ["bilguun132@gmail.com"],
        notes: "none",
        image: "image data"
      };
      let data = {
        card: card,
        id: user._id
      };
      let res = await request(app)
        .post("/api/users/addCard")
        .send(data);
      expect(res.status).to.equal(200);
      let updatedUser = await User.findById(user._id);
      expect(updatedUser.cards).to.be.an("array");
      expect(updatedUser.cards.length).to.equal(1);
    });
  });
});
