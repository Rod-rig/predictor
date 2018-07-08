const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const db = require('./db');
const config = require('./config/config');

const app = express();

// initialize middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

db.connect(config.dbUrl, (err) => {
  if (err) return console.error(err);
  router(app);
  app.listen(config.port, () => {
    console.log('server started');
  });
});