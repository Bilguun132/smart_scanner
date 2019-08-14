var express = require("express");
var router = express.Router();
var userController = require("../../controllers/user.controller");

/* GET users listing. */

router
  .route("/")
  .get(userController.getUsers)
  .post(userController.createUser);

router.route("/:id").get(userController.getUser);
router.post("/login", userController.loginUser);

module.exports = router;
