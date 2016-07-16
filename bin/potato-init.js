const express = require('express')
    , pug = require('pug')
    , morgan = require('morgan')
    , nib = require('nib');

//Custom modules
var potatoProperties = require('../potato.json');
var potatoAuth = require('../src/auth/auth.js');

console.log(potatoProperties);
console.log(potatoAuth);

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

app.get('/', function(req,res) {
    //console.log(req); //Super verbose

    if (potatoAuth.verify(req)) {
        res.render('index', {
            title: 'Potato',
            message: 'Potato Homepage'
        });
    }
    else {
        res.render('login', {
            title: 'Potato Login',
            message: 'Potato Login'
        });
    }
});

//Listen for incoming connections
app.listen(potatoProperties.port, function() {
    console.log("Test webserver listening on http://<HostAddress>:"
                + potatoProperties.port
                + "\n");
});
