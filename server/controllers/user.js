const bcrypt = require("bcrypt");
const User = require("../models/user");
const msg = require("../messages/index");
const isDevMode = require("../helpers/is-dev-mode");

exports.getCurrentUser = (req, res) => {
  res.status(200).send({
    isLoggedIn: req.session.isLoggedIn ? req.session.isLoggedIn : false,
    name: req.session.name ? req.session.name : null,
  });
};

exports.verify = (req, res, next) => {
  if (req.session.isLoggedIn || isDevMode) {
    next();
  } else {
    res.status(403).send(msg.notVerifiedUserErrMsg);
  }
};

exports.verifyIsAdmin = (req, res, next) => {
  User.findOne({ role: "admin" })
    .then(user => {
      const { isLoggedIn, name } = req.session;
      if ((isLoggedIn && user.name === name) || isDevMode) {
        next();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      res.sendStatus(401);
    });
};

exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => res.status(200).send(users))
    .catch(() => {
      res.sendStatus(404);
    });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .populate("predictions")
    .exec()
    .then(user => {
      if (!user) return res.status(404).send(msg.notFoundUserMsg);
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.login = (req, res) => {
  User.findOne({ name: req.body.name })
    .then(user => {
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          req.session.isLoggedIn = true;
          req.session.name = user.name;
          res.sendStatus(200);
        } else {
          throw new Error();
        }
      });
    })
    .catch(err => {
      res.status(401).send(err);
    });
};

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.status(200).send();
    });
  }
};

exports.register = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then(hashedPassword => {
    const user = new User({ name, email, password: hashedPassword });
    User.create(user, next);
  });
};

exports.isUniqueUser = (req, res, next) => {
  const { name, email } = req.body;
  User.find({ $or: [{ name }, { email }] })
    .then(users => {
      if (users.length >= 1) {
        throw new Error();
      }
      next();
    })
    .catch(err => {
      res.status(401).send(err);
    });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.status(404).send(err);
    });
};
