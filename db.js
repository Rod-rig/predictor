const MongoClient = require('mongodb').MongoClient;
const config = require('./config/config').dev;

let state = {
  db: null
};

module.exports.connect = (url, done) => {
  if (state.db) {
    done();
  }

  MongoClient.connect(config.dbUrl, (err, database) => {
    if (err) {
      return done(err);
    }
    state.db = database.db('football');
    done();
  });
};

module.exports.get = () => {
  return state.db;
};