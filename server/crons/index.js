require("dotenv").config();
const { runCron } = require("./runCron");
const { green, red } = require("chalk");
const express = require("express");
const router = require("../router");
const app = express();
const db = require("../db");

db.connect(process.env.DB_URL, err => {
  if (err) {
    return console.log(red(err));
  }

  router(app);

  app.listen(process.env.PORT, async () => {
    console.log(green("Server started"));
    console.log(green("Cron was started execution"));

    await runCron();

    console.log(green("Cron was executed successfully"));

    setTimeout(() => {
      db.disconnect();
      console.log("Db is disconnected and node is exited");
      process.exit();
    }, 15000);
  });
});
