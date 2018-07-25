const axios = require('axios');
const circularJSON = require('circular-json');
const config = require('../config/config');

module.exports.all = (req, res) => {
  axios.get(`${config.apiUrl}/en/schedules/2018-08-11/schedule.json?api_key=${config.apiKey}`)
    .then((response) => {
      res.status(200).send(circularJSON.stringify(response.data));
    })
    .catch((err) => {
      console.log(err);
    })
};

module.exports.getEngDailySchedule = (req, res) => {
  axios.get(`${config.apiUrl}/en/schedules/2018-08-11/schedule.json?api_key=${config.apiKey}`)
    .then((response) => {
      const engMatches = response.data.sport_events.filter((match) => {
        return match.tournament.id === 'sr:tournament:17';
      });
      res.status(200).send(engMatches);
    })
    .catch((err) => {
      console.log(err);
    })
};