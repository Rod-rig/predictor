const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
    app.get('/predictions/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.get().collection('predictions').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.post('/predictions', (req, res) => {
        const pred = {
            'ARS': 3,
            'BOU': 0
        };
        db.get().collection('predictions').insertOne(pred, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error occurred'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/predictions/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.get().collection('predictions').removeOne(details, (err) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Predictions ' + id + ' is deleted!');
            }
        });
    });

    app.put('/predictions/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const pred = {'ARS': req.body.ars, 'BOU': req.body.bou};
        db.get().collection('predictions').updateOne(details, pred, (err) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(pred);
            }
        });
    });
};