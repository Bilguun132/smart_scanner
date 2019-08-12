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
    bio: String,
    nameCardImage: String,
    hash: String
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.setPassword = function(password, cb) {
  let user = this;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) return cb(err, null);
    user.hash = hash;
    return cb(null, hash);
  });
};

UserSchema.methods.validPassword = function(password) {
  return new Promise(async function(resolve, reject) {
    bcrypt
      .compare(password, this.hash)
      .then(function(res) {
        if (res) return resolve(true);
        return reject(false);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

module.exports.User = mongoose.model("User", UserSchema);
