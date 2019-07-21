const tournamentListMock = require("../config/mocks/tournamentListMock");
const tableMock = require("../config/mocks/tableMock");
const resultsMock = require("../config/mocks/resultsMock");
const resultsByDateMock = require("../config/mocks/resultsByDateMock");
const scheduleByDateMock = require("../config/mocks/scheduleByDateMock");
const scheduleByTournamentIdMock = require("../config/mocks/scheduleByTournamentIdMock");

module.exports.getAllTournaments = (req, res) => {
  res.status(200).send(tournamentListMock);
};

module.exports.getStandings = (req, res) => {
  res.status(200).send(tableMock);
};

module.exports.getResultsByTournamentId = (req, res) => {
  res.status(200).send(resultsMock);
};

module.exports.getResultsByDate = (req, res) => {
  res.status(200).send(resultsByDateMock);
};

module.exports.getScheduleByTournamentId = (req, res) => {
  res.status(200).send(scheduleByTournamentIdMock);
};

module.exports.getScheduleByDate = (req, res) => {
  res.status(200).send(scheduleByDateMock);
};
