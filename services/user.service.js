const mongoose = require("mongoose");
const _ = require("lodash");
const { User } = require("../db/models/user.model");
const CardService = require("../services/card.service");

/**
 * @param {object} newUser - new user object
 */

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

/**
 * @param {string} email - user email
 * @param {string} password - user password
 */
module.exports.loginUser = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    let user = await User.findOne({ email: email });
    if (!user)
      return reject({
        status: 400,
        message: "User does not exist or invalid password"
      });

    console.log(user);
    user
      .validPassword(password)
      .then(res => {
        return resolve(user);
      })
      .catch(err =>
        reject({
          status: 400,
          message: "User does not exist or invalid password"
        })
      );
  });
};

/**
 * @param ()
 */
module.exports.getUsers = async () => {
  return new Promise(async (resolve, reject) => {
    User.find({}, (err, doc) => {
      if (err) return reject({ status: 400, message: "Bad request" });
      return resolve(doc);
    });
  });
};

/**
 * @param {string} id - user id
 */
module.exports.getUser = async id => {
  return new Promise(async (resolve, reject) => {
    User.findById(id)
      .then(user => {
        if (!user) return reject({ status: 404, message: "User not found" });
        return resolve(user);
      })
      .catch(err => {
        reject({ status: 400, message: err });
      });
  });
};

/**
 * @param {object} card - new card object
 * @param {string} id - user id
 */
module.exports.addCard = async (card, id) => {
  return new Promise(async (resolve, reject) => {
    let user = await User.findById(id);
    if (!user) return reject({ status: 404, message: "User not found" });

    CardService.createCard(card)
      .then(async card => {
        user.cards.push(card._id);
        await user.save();
        return resolve(user);
      })
      .catch(err => {
        reject({ status: 500, message: err });
      });
  });
};
