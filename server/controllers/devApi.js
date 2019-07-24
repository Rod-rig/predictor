const tournamentListMock = require("../config/mocks/tournamentListMock");
const tableMock = require("../config/mocks/tableMock");
const resultsMock = require("../config/mocks/resultsMock");
const resultsByDateMock = require("../config/mocks/resultsByDateMock");
const scheduleByDateMock = require("../config/mocks/scheduleByDateMock");
const scheduleByTournamentIdMock = require("../config/mocks/scheduleByTournamentIdMock");

const methods = {
  getAllTournaments: tournamentListMock,
  getStandings: tableMock,
  getResultsByTournamentId: resultsMock,
  getResultsByDate: resultsByDateMock,
  getScheduleByTournamentId: scheduleByTournamentIdMock,
  getScheduleByDate: scheduleByDateMock,
};

Object.keys(methods).forEach(key => {
  module.exports[key] = (req, res) => {
    res.status(200).send(methods[key]);
  };
});
