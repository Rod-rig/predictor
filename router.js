const predictionsController = require('./controllers/predictions');

module.exports = (app) => {
    app.get('/table', predictionsController.all);
    app.get('/predictions/:id', predictionsController.getById);
    app.post('/predictions', predictionsController.create);
    app.delete('/predictions/:id', predictionsController.delete);
    app.put('/predictions/:id', predictionsController.update);
};