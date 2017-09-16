const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const config = require('./config/config').dev;
const path = __dirname + '/';
const router = require('./router');
const db = require('./db');
const app = express();

let urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);

app.use(express.static(path + 'public'));
app.get('/', (req, res) => {
    res.sendFile(path + 'index.html');
});

db.connect(config.dbUrl, (err) => {
    if (err) return console.log(err);
    router(app);
    app.listen(config.port, () => {
        console.log('server started');
    });
});