const User = require('../models/user');
const msg = require('../messages/index');

module.exports.all = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send(msg.allUsersRequestErrMsg);
    res.status(200).send(users);
  });
};

module.exports.getById = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send(msg.userRequestErrMsg);
    if (!user) return res.status(404).send(msg.notFoundUserMsg);
    res.status(200).send(user);
  });
};

module.exports.create = (req, res) => {
  User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    },
    (err, user) => {
      if (err) return res.status(500).send(msg.cannotCreateUserMsg);
      res.status(200).send(user);
    }
  );
};
