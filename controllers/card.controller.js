const CardService = require("../services/card.service");
var debug = require("debug")("smartscanner:cardController");

module.exports.getAllCards = async (req, res) => {
  let pageNum = req.query.PageNum;
  debug("Page Number is", pageNum);
  if (pageNum == null || pageNum == undefined) {
    pageNum = 1;
  }
  let pageSize = req.query.pageSize;
  debug("Page Size is ", pageSize);
  if (pageSize == null || pageSize == undefined) {
    pageSize = 20;
  }
  let skip = (pageNum - 1) * pageSize;

  CardService.getCards(skip, pageSize)
    .then(cards => {
      res.send(cards);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
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
