const mongoose = require("mongoose");
const _ = require("lodash");
const { Card } = require("../db/models/card.model");

/**
@param {object} newCard - new card json body
**/

module.exports.createCard = async newCard => {
  return new Promise(async (resolve, reject) => {
    delete newCard["_id"];
    let card = new Card(newCard);
    card.save(async err => {
      if (err) return reject({ status: 500, message: err });
      return resolve(card);
    });
  });
};
