const userController = require('./controllers/user');
const predictionController = require('./controllers/prediction');
const apiController = require('./controllers/api');

module.exports = (app) => {
  //api
  app.get('/api/tournaments', apiController.getAllTournaments);
  app.get('/api/standings/:id', apiController.getStandings);
  app.get('/api/results/:id', apiController.getResults);
  app.get('/api/schedule/:date', apiController.getSchedule);

  //users
  app.get('/users', userController.verifyIsAdmin, userController.all);
  app.get('/users/:id', userController.verifyIsAdmin, userController.getById);
  app.post('/login', userController.login);
  app.get('/logout', userController.logout);
  app.get('/is-logged-in', userController.isLoggedIn);
  app.post('/users', userController.create);

  //predictions
  app.get('/predictions', userController.verify, predictionController.all);
  app.get('/available-predictions/:date', userController.verify, predictionController.getAvailablePredictions);
  app.post('/predictions', userController.verify, predictionController.create);
};