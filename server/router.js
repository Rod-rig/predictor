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
  app.get('/users', userController.all);
  app.get('/users/:id', userController.getById);
  app.post('/login', userController.login);
  app.get('/is-logged-in', userController.isLoggedIn);
  app.post('/users', userController.create);

  //predictions
  app.get('/predictions', predictionController.all);
  app.get('/available-predictions/:date', predictionController.getAvailablePredictions);
  app.post('/predictions', predictionController.create);
};