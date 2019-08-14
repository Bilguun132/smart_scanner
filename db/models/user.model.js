var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var bcrypt = require("bcrypt");
var debug = require("debug")("smartscanner:user.model");

const saltRounds = 10;

var UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true
    },
    notes: String,
    nameCardImage: String,
    hash: String,
    addresses: [String],
    phoneNumbers: [String],
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }]
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.setPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return reject(err);
      this.hash = hash;
      resolve(hash);
    });
  });
};

UserSchema.methods.validPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.hash, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

module.exports.User = mongoose.model("User", UserSchema);
