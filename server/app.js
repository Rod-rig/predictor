require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const uuidv1 = require("uuid/v1");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = require("./router");
const db = require("./db");

const app = express();
app.use(morgan("combined"));

// initialize middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 1000 * 60 * 20 },
    secret: uuidv1(),
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(express.static("public"));

db.connect(process.env.DB_URL, err => {
  if (err) {
    return console.error(err);
  }
  router(app);
  app.listen(process.env.PORT, () => {
    console.log("Server started");
  });
});

const shutdown = signal => {
  return err => {
    console.log(`${signal}...`);
    if (err) {
      console.error(err.stack || err);
    }
    setTimeout(() => {
      mongoose.connection.close(() => {
        console.log("Mongoose default connection is disconnected");
      });
      console.log("...waited 5s, exiting.");
      process.exit(err ? 1 : 0);
    }, 5000).unref();
  };
};

process
  .on("SIGTERM", shutdown("SIGTERM"))
  .on("SIGINT", shutdown("SIGINT"))
  .on("uncaughtException", shutdown("uncaughtException"));
