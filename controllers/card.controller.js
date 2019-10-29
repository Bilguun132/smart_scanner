const CardService = require("../services/card.service");
var debug = require("debug")("smartscanner:cardController");

/**
 * @param req - containing page size and page number
 *
 */
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
  // increase page size by 1 to see if there is additional items
  pageSize += 1;
  let skip = (pageNum - 1) * pageSize;

  CardService.getCards(skip, pageSize)
    .then(cards => {
      let result = {};
      if (cards.length > 20) {
        cards = cards.pop();
        result.hasNext = true;
      } else {
        result.hasNext = false;
      }
      result.cards = cards;

      res.send(result);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
};

module.exports.getCardCount = async (req, res) => {
  CardService.getCardCount()
    .then(count => {
      return res.send({ count: count });
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
