const UserService = require("../services/user.service");
// const LinkedInScraperService = require("../services/linkedinscraper.service");

module.exports.getUser = async (req, res) => {
  UserService.getUser(req.params.id)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
};

module.exports.getUsers = async (req, res) => {
  UserService.getUsers()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
};

module.exports.createUser = async (req, res) => {
  UserService.createUser(req.body)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
};

module.exports.loginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  UserService.loginUser(email, password)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
};

module.exports.addCard = async (req, res) => {
  let card = req.body.card;
  let id = req.body.id;
  UserService.addCard(card, id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
};

// module.exports.publishToQueue = async (req, res) => {
//   let id = req.body.id;
//   let query = req.body.query;
//   let tnxId = "qweqweqwe";
//   let fullName = req.body.fullName;
//   let resultsUrl = 'http://localhost:3000/api/users/linkedinScraperResults'
//   let data = {
//     id,
//     query,
//     tnxId,
//     resultsUrl,
//     fullName
//   };
//   LinkedInScraperService.publishToQueue("linkedinscraper", data);
//   res.send("success");
// };

// module.exports.linkedinScraperResults = async (req, res) => {
//   console.log(req.body);
//   let results = req.body.result;
//   console.log('results found is ', results.length)
//   res.send("success");
// };
