var mongoose = require("mongoose");
var debug = require("debug")("smartscanner:card.model");

var CardSchema = new mongoose.Schema(
  {
    name: String,
    nameBoundingBox: [String],
    title: String,
    titleBoundingBox: [String],
    emails: [String],
    notes: String,
    image: String,
    imagePath: String,
    imageString: String,
    addresses: [String],
    phoneNumbers: [String],
    company: String,
    companyBoundingBox: [String]
  },
  { timestamps: true }
);

module.exports.Card = mongoose.model("Card", CardSchema);
