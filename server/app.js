require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uuidv1 = require('uuid/v1');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const webpack = require('webpack');
const bodyParser = require('body-parser');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackConfig = require('../webpack.dev.config.js');
const router = require('./router');
const db = require('./db');

const app = express();
app.use(morgan('combined'));
// const compiler = webpack(webpackConfig);

// initialize middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: webpackConfig.output.publicPath
// }));

app.use(cookieParser());
app.use(session({
  cookie: {maxAge: 1000 * 60 * 20},
  secret: uuidv1(),
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    db: process.env.DB_NAME,
    mongooseConnection: mongoose.connection
  })
}));
app.use(express.static('public'));

db.connect(process.env.DB_URL, (err) => {
  if (err) return console.error(err);
  router(app);
  app.listen(process.env.PORT, () => {
    console.log('server started');
  });
});