const mongoose = require("mongoose");

let state = {
  db: null,
};

module.exports.connect = (url, done) => {
  if (state.db) {
    done();
  }

  mongoose
    .connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      state.db = process.env.DB_NAME;
      done();
    })
    .catch(err => done(err));
};

module.exports.get = () => {
  return state.db;
};
