const axios = require('axios');
const circularJSON = require('circular-json');
const config = require('../config/config');

module.exports.all = (req, res) => {
  axios.get(`${config.apiUrl}/en/schedules/2018-08-11/schedule.json?api_key=${config.apiKey}`)
    .then((data) => {
      res.status(200).send(circularJSON.stringify(data.data));
    })
    .catch((err) => {
      console.log(err);
    })
};