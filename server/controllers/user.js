const bcrypt = require('bcrypt');
const User = require('../models/user');
const msg = require('../messages/index');

module.exports.isLoggedIn = (req, res) => {
  res.status(200).send({
    isLoggedIn: req.session.isLoggedIn ? req.session.isLoggedIn : false,
    name: req.session.name ? req.session.name : null
  });
};

module.exports.verify = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.status(403).send(msg.notVerifiedUserErrMsg);
  }
};

module.exports.verifyIsAdmin = (req, res, next) => {
  User.findOne({
    role: 'admin'
  }, (err, user) => {
    if (req.session.isLoggedIn && user.name === req.session.name) {
      next();
    } else {
      res.status(403).send(msg.notAdminErrMsg);
    }
  });
};

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

module.exports.login = (req, res) => {
  const query = {
    name: req.body.name,
    password: req.body.password
  };
  User.findOne(query, (err, user) => {
    if (err || user === null) return res.status(500).send(msg.allUsersRequestErrMsg);
    req.session.isLoggedIn = true;
    req.session.name = user.name;
    res.status(200).send(user.name);
  });
};

module.exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.status(200).send();
    });
  }
};

module.exports.create = (req, res) => {
  const {name, email, password} = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({
          name, email, password: hashedPassword
        },
        (err, user) => {
          if (err) return res.status(500).send(msg.cannotCreateUserMsg);
          req.session.isLoggedIn = true;
          req.session.name = user.name;
          res.status(200).send(user);
        }
      );
    });
};
