const userController = require('./controllers/user');
const predictionController = require('./controllers/prediction');

module.exports = (app) => {
  //users
  app.get('/users', userController.all);
  app.get('/users/:id', userController.getById);
  app.post('/users', userController.create);

  //predictions
  app.get('/predictions', predictionController.all);
  app.post('/predictions', predictionController.create);
};