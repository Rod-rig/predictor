const tournamentListMock = require('../config/mocks/tournamentListMock');
const tableMock = require('../config/mocks/tableMock');
const resultsMock = require('../config/mocks/resultsMock');
const scheduleMock = require('../config/mocks/scheduleMock');

module.exports.getAllTournaments = (req, res) => {
  res.status(200).send(tournamentListMock);
};

module.exports.getStandings = (req, res) => {
  res.status(200).send(tableMock);
};

module.exports.getResults = (req, res) => {
  res.status(200).send(resultsMock);
};

module.exports.getSchedule = (req, res) => {
  res.status(200).send({sport_events: scheduleMock});
};