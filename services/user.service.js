const mongoose = require("mongoose");
const _ = require("lodash");
const { User } = require("../db/models/user.model");

module.exports.createUser = async newUser => {
  return new Promise(async (resolve, reject) => {
    let user = await User.findOne({ email: newUser.email });
    if (user) return reject({ status: 400, message: "User exists." });

    user = new User(newUser);
    user.save(async err => {
      if (err) return reject({ status: 500, message: err });
      return resolve(user);
    });
  });
};
