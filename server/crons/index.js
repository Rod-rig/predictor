require("dotenv").config();
const { updateStatuses } = require("./update-statuses");
const express = require("express");
const mongoose = require("mongoose");
const router = require("../router");
const app = express();
const db = require("../db");

db.connect(process.env.DB_URL, err => {
  if (err) {
    return console.error(err);
  }
  router(app);
  app.listen(process.env.PORT, () => {
    console.log("Server started");
    updateStatuses();

    setTimeout(() => {
      mongoose.connection.close(() => {
        console.log("Mongoose default connection is disconnected");
      });
      console.log("...waited 15s, exiting.");
      process.exit();
    }, 15000);
  });
});
