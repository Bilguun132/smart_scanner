const mongoose = require("mongoose");
const _ = require("lodash");
const { Card } = require("../db/models/card.model");
var debug = require("debug")("smartscanner:cardService");
/**
 * @param {Number} skip - pagination to skip
 * @param {NUmber} limit - number of cards to return
 */

module.exports.getCards = async (skip, limit) => {
  debug("Skip is %s limit is %s", skip, limit);
  return new Promise(async (resolve, reject) => {
    Card.find({})
      .skip(skip)
      .limit(limit)
      .then(cards => {
        return resolve(cards);
      })
      .catch(err => {
        return reject({ status: 500, message: err });
      });
  });
};

/**
@param {object} newCard - new card json body
**/

module.exports.createCard = async newCard => {
  return new Promise(async (resolve, reject) => {
    delete newCard["_id"];
    let card = await Card.findOne({
      name: newCard.name,
      title: newCard.title,
      company: newCard.company
    });
    if (card != null || card != undefined) {
      return reject({ status: 422, errorMessage: "Record already exists" });
    }
    card = new Card(newCard);
    card.save(async err => {
      if (err) return reject({ status: 500, message: err });
      return resolve(card);
    });
  });
};

module.exports.getCardCount = async () => {
  return new Promise(async (resolve, reject) => {
    Card.countDocuments()
      .then(number => {
        return resolve(number);
      })
      .catch(err => {
        return reject({ status: 500, message: err });
      });
  });
};
