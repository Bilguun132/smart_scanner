var express = require("express");
var router = express.Router();
var usersRouter = require("./users.route");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express API" });
});

router.use("/users", usersRouter);

module.exports = router;
