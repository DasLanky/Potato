const express = require('express');

var app = express();

app.set('views', __dirname + '../../web');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.static(__dirname + '../../web'));

app.get('/', function(req,res) {
    res.end('Hi there!');
});
app.listen(3000);
