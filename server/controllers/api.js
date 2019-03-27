const axios = require("axios");
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

module.exports.getAllTournaments = (req, res) => {
  axios
    .get(`${apiUrl}/en/tournaments.json?api_key=${apiKey}`)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(404).send(err);
    });
};

module.exports.getStandings = (req, res) => {
  axios
    .get(
      `${apiUrl}/en/tournaments/${
        req.params.id
      }/standings.json?api_key=${apiKey}`,
    )
    .then(response => {
      res.status(200).send(response.data);
    });
};

module.exports.getResults = (req, res) => {
  axios
    .get(
      `${apiUrl}/en/tournaments/${
        req.params.id
      }/results.json?api_key=${apiKey}`,
    )
    .then(response => {
      res.status(200).send(response.data);
    });
};

module.exports.getSchedule = (req, res) => {
  axios
    .get(
      `${apiUrl}/en/schedules/${
        req.params.date
      }/schedule.json?api_key=${apiKey}`,
    )
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(404).send(err.data);
    });
};
