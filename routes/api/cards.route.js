var express = require("express");
var router = express.Router();
var cardController = require("../../controllers/card.controller");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  }
});

var upload = multer({ storage: storage });

/* GET users listing. */

router.get("/", cardController.getAllCards);
router.get("/count", cardController.getCardCount);
router.post(
  "/image",
  upload.single("namecard"),
  cardController.createCardWithImage
);
router.post("/imagestring", cardController.createCardWithImageString);

module.exports = router;
