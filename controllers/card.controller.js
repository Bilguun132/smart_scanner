const CardService = require("../services/card.service");
module.exports.getAllCards = async (req, res) => {
  res.send([]);
};

module.exports.createCardWithImage = async (req, res) => {
  let file = req.file;
  console.log(file);
  let card = req.body;
  card.imagePath = file.path;
  console.log(card);
  CardService.createCard(card)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
};

module.exports.createCardWithImageString = async (req, res) => {
  let card = req.body;
  CardService.createCard(card)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(err.status).send(err);
    });
};
