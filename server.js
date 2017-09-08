let express = require('express');
let bodyParser = require('body-parser');

let port = process.env.PORT || 8000;
let path = __dirname + '/';

let app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(path + 'public'));

app.post('/', urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    response.send(`${request.body.homeTeamName}`);
});

app.get('/', function (request, response) {
    response.sendFile(path + 'index.html');
});

app.listen(port, function () {
    console.log('server started');
});