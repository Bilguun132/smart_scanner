var debug = require("debug")("smartscanner:db");
var mongoose = require("mongoose");
const { User } = require("../db/models/user.model");

module.exports = function() {
  const db = process.env.DB;
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => debug(`Connected to MongoDB at ${db}...`))
    .catch(err => {
      debug("Failed to connect to MongoDB...", err);
      process.exit();
    });
};
