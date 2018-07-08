const userController = require('./controllers/user');

module.exports = (app) => {
  //users
  app.get('/users', userController.all);
  app.get('/users/:id', userController.getById);
  app.post('/users', userController.create);
};