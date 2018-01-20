const Predictions = require('../models/predictions');

module.exports.all = (req, res) => {
    Predictions.all((err, docs) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(docs);
        }
    });
};

module.exports.getById = (req, res) => {
    Predictions.getById(req.params.id, (err, docs) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(docs);
        }
    });
};

module.exports.create = (req, res) => {
    let pred = req.body;
    Predictions.create(pred, (err) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(pred);
        }
    });
};

module.exports.update = (req, res) => {
    const pred = {'ARS': req.body.ars, 'BOU': req.body.bou};
    Predictions.update(req.params.id, pred, (err) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(pred);
        }
    });
};

module.exports.delete = (req, res) => {
    Predictions.delete(req.params.id, (err) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send('Predictions ' + req.params.id + ' is deleted!');
        }
    });
};