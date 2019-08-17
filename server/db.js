const mongoose = require("mongoose");
const { green, red } = require("chalk");

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
      console.log(green(`Connected to mongoose ${process.env.DB_NAME}`));
    })
    .catch(err => {
      console.log(red("Could not connect mongoose"));
      done(err);
    });
};

module.exports.disconnect = () => {
  if (state.db) {
    mongoose.connection.close(() => {
      console.log("Mongoose default connection is disconnected");
    });
  }
};

module.exports.get = () => {
  return state.db;
};
