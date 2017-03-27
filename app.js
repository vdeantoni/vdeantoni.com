var express = require('express');
var compression = require('compression');

var app = express();

app.use(compression());
app.use('/', express.static(__dirname + '/dist'));

app.listen(80);