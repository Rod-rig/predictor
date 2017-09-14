const MongoClient = require('mongodb').MongoClient;
const config = require('./config/config').dev;

let state = {
    db: null
};

module.exports.connect = (url, done) => {
    if (state.db) {
        done();
    }

    MongoClient.connect(config.dbUrl, (err, db) => {
        if (err) {
            return done(err);
        }
        state.db = db;
        done();
    });
};

module.exports.get = () => {
    return state.db;
};