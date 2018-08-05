const axios = require('axios');
const config = require('../config/config');
const User = require('../models/user');
const msg = require('../messages/index');

module.exports.all = (req, res) => {
  User.findOne({name: 'admin'}, (err, user) => {
    if (err) return res.status(500).send('Cannot get all predictions');
    res.status(200).send(user.predictions);
  });
};

module.exports.getAvailablePredictions = (req, res) => {
  axios.get(`${config.url}:${config.port}/api/schedule/${req.params.date}`)
    .then((response) => {
      User.findOne({name: 'admin'}, (err, user) => {
        if (err) return res.status(500).send('Cannot get all predictions');
        const sportEvents = response.data;
        const ids = user.predictions.map((prediction) => {
          return prediction.id;
        });
        const availablePredictions = sportEvents.filter((match) => {
          return ids.indexOf(match.id) === -1;
        });
        res.status(200).send(availablePredictions);
      });
    })
    .catch((err) => {
      console.log(err);
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