const axios = require('axios');
const config = require('../config/config');

module.exports.getAllTournaments = (req, res) => {
  axios.get(`${config.apiUrl}/en/tournaments.json?api_key=${config.apiKey}`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getStandings = (req, res) => {
  axios.get(`${config.apiUrl}/en/tournaments/${req.params.id}/standings.json?api_key=${config.apiKey}`)
    .then((response) => {
      res.status(200).send(response.data);
    });
};

module.exports.getResults = (req, res) => {
  axios.get(`${config.apiUrl}/en/tournaments/${req.params.id}/results.json?api_key=${config.apiKey}`)
    .then((response) => {
      res.status(200).send(response.data);
    });
};

module.exports.getSchedule = (req, res) => {
  axios.get(`${config.apiUrl}/en/schedules/${req.params.date}/schedule.json?api_key=${config.apiKey}`)
    .then((response) => {
      res.status(200).send(response.data.sport_events);
    })
    .catch((err) => {
      console.log(err);
    });
};