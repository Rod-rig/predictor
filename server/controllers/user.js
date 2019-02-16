const bcrypt = require("bcrypt");
const User = require("../models/user");
const msg = require("../messages/index");

exports.isLoggedIn = (req, res) => {
  res.status(200).send({
    isLoggedIn: req.session.isLoggedIn ? req.session.isLoggedIn : false,
    name: req.session.name ? req.session.name : null,
  });
};

exports.verify = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.status(403).send(msg.notVerifiedUserErrMsg);
  }
};

exports.verifyIsAdmin = (req, res, next) => {
  User.findOne({ role: "admin" }, (err, user) => {
    if (req.session.isLoggedIn && user.name === req.session.name) {
      next();
    } else {
      res.status(403).send(msg.notAdminErrMsg);
    }
  });
};

exports.all = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send(msg.allUsersRequestErrMsg);
    res.status(200).send(users);
  });
};

exports.getById = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send(msg.userRequestErrMsg);
    if (!user) return res.status(404).send(msg.notFoundUserMsg);
    res.status(200).send(user);
  });
};

exports.login = (req, res) => {
  User.findOne({ name: req.body.name }, (err, user) => {
    if (err || user === null)
      return res.status(500).send(msg.allUsersRequestErrMsg);
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        req.session.isLoggedIn = true;
        req.session.name = user.name;
        res.status(200).send(user.name);
      } else {
        res.status(500).send(msg.allUsersRequestErrMsg);
      }
    });
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
  User.find({ $or: [{ name }, { email }] }, (err, users) => {
    console.log(users);
    if (err || users.length >= 1) return res.status(500).send(msg.userExists);
    next();
  });
};
