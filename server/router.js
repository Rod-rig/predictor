const userCtrl = require("./controllers/user");
const predictionCtrl = require("./controllers/prediction");
const { isDevMode } = require("./helpers/is-dev-mode");
const apiCtrl = isDevMode()
  ? require("./controllers/devApi")
  : require("./controllers/api");

module.exports = app => {
  //api
  app.get("/api/tournaments", apiCtrl.getAllTournaments);
  app.get("/api/standings/:id", apiCtrl.getStandings);
  app.get("/api/results/:id", apiCtrl.getResultsByTournamentId);
  app.get("/api/daily-results/:date", apiCtrl.getResultsByDate);
  app.get("/api/schedule/:id", apiCtrl.getScheduleByTournamentId);
  app.get("/api/schedule/:date", apiCtrl.getScheduleByDate);
  app.get("/api/match/:id", apiCtrl.getMatchDetails);

  //users
  app.get("/users", userCtrl.verifyIsAdmin, userCtrl.getAllUsers);
  app.get("/users/:id", userCtrl.getUserById);
  app.post("/login", userCtrl.login);
  app.get("/logout", userCtrl.logout);
  app.get("/current-user", userCtrl.getCurrentUser);
  app.post(
    "/register",
    userCtrl.isUniqueUser,
    userCtrl.register,
    userCtrl.login,
  );
  app.put("/users/:id", userCtrl.updateUser);
  app.delete("/users/:id", userCtrl.deleteUser);

  //predictions
  app.get(
    "/predictions/all",
    userCtrl.verifyIsAdmin,
    predictionCtrl.getAllPredictions,
  );
  app.get(
    "/predictions",
    userCtrl.verify,
    predictionCtrl.getPredictionsByUserId,
  );
  app.get(
    "/available-events/:date",
    userCtrl.verify,
    predictionCtrl.getAvailableEvents,
  );
  app.post("/predictions", userCtrl.verify, predictionCtrl.create);
  app.put("/predictions", predictionCtrl.update);
  app.delete("/predictions/:id", predictionCtrl.delete);
};
