const bcrypt = require("bcrypt");
const User = require("../models/user");
const msg = require("../messages/index");
const isDevMode = require("../helpers/is-dev-mode");

exports.getCurrentUser = (req, res) => {
  const { isLoggedIn, name, userId } = req.session;
  res.status(200).send({
    isLoggedIn: isLoggedIn ? isLoggedIn : false,
    name: name ? name : null,
    id: userId ? userId : null,
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
      if (!user) return res.sendStatus(404);
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
          req.session.userId = user._id;
          return res.sendStatus(200);
        }
        return res.sendStatus(401);
      });
    })
    .catch(err => {
      res.status(404).send(err);
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
  User.findOneAndRemove({ _id: id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.status(404).send(err);
    });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  User.findById(id)
    .then(user => {
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      return user.save();
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
