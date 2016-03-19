var express = require('express');
var app = express();
var path = require('path');
var bodyParser=require('body-parser');

app.use(bodyParser.json());
// viewed at http://localhost:8080
app.use(express.static('public'));

app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + '/public/index.html'));
});

var port=Number(process.env.PORT || 8001);

app.listen(port);