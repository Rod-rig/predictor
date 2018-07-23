const Prediction = require('../models/prediction');
const User = require('../models/user');
const msg = require('../messages/index');

module.exports.all = (req, res) => {
  Prediction.find({}, (err, predictions) => {
    if (err) return res.status(500).send('Cannot get all predictions');
    res.status(200).send(predictions);
  });
};

module.exports.create = (req, res) => {
  User.findOne({name: 'admin'}, (err, user) => {
    if (err) return res.send(500).send('Did not find current user');
    user.predictions.push(...req.body);
    user.save((err) => {
      if (err) return res.send(500).send('Did not save prediction');
    });
    res.status(200).send(user);
  });
};