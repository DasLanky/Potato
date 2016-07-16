const express = require('express')
    , pug = require('pug')
    , morgan = require('morgan')
    , nib = require('nib');

//Custom modules
const potatoParse = require('../src/parse.js'); //potatoProperties

const port = potatoParse.potatoProperties.port
    , path = potatoParse.potatoProperties.path;

//Middleware init
morgan('combined', {
    skip: function(req, res) { return res.statusCode < 400 }
});

//Create applet
var app = express();

//Serve files within the web directory
app.set('views', __dirname + '/../web');
app.use(express.static(__dirname + '/../web'));

//HTML generator engine is pug (Jade)
app.set('view engine', 'pug');

//Set applet to serve
app.get('/', function(req,res) {
    console.log("Request using "
              + req.headers.host
              + " for "
              + req.url);
    res.render('index', {
        title: 'Potato',
        message: 'Potato Homepage'
    });
});

//Listen for incoming connections
app.listen(port, function() {
    console.log("Test webserver listening on http://<HostAddress>:" + port + "\n");
});
