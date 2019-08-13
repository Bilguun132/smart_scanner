const UserService = require("../services/user.service");

module.exports.createUser = async (req, res) => {
  UserService.createUser(req.body)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
};
