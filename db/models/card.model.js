var mongoose = require("mongoose");
var debug = require("debug")("smartscanner:card.model");

var CardSchema = new mongoose.Schema(
  {
    name: String,
    emails: [String],
    notes: String,
    image: String,
    addresses: [String],
    phoneNumbers: [String],
    companies: [String]
  },
  { timestamps: true }
);

module.exports.Card = mongoose.model("Card", CardSchema);
