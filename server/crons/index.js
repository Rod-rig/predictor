require("dotenv").config();
const { updateStatuses } = require("./update-statuses");
const express = require("express");
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
  });
});
