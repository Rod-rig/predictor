const mongoose = require('mongoose');
const config = require('./config/config');

let state = {
  db: null
};

module.exports.connect = (url, done) => {
  if (state.db) {
    done();
  }

  mongoose.connect(config.dbUrl, {useNewUrlParser: true})
    .then(() => {
      state.db = config.dbName;
      done();
    })
    .catch((err) => done(err));
};

module.exports.get = () => {
  return state.db;
};