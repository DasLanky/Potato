const express = require('express')
    , pug = require('pug')
    , morgan = require('morgan')
    , nib = require('nib')
    , session = require('express-session');

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

//Use session middleware
app.use(session({
    secret: potatoProperties.sessionSecret,
    cookie: { maxAge: potatoProperties.timeout }
}));

//HTML generator engine is pug (Jade)
app.set('view engine', 'pug');

app.get('/', function(req,res) {
    //console.log(req); //Super verbose

    if (potatoAuth.verify(req)) {
        res.render('index', {
            title: 'Potato',
            message: 'Potato Homepage',
            user: req.user,
        });
    }
    else {
        res.render('login', {
            title: 'Potato Login',
            message: 'Potato Login'
        });
    }
});

app.get('/login/:user/:pass', function(req, res) {
    req.user = req.params.user;
    req.pass = req.params.pass;
    console.log('User attempted to login with name '
                + req.user
                + ' and password '
                + req.pass);
    if (potatoAuth.verify(req)) {
        console.log('\tAuthorized\n');
        res.render('index', {
            title: 'Potato',
            message: 'Potato Homepage',
            user: req.user
        });
    }
    else {
        console.log('\tDenied\n');
        res.render('login', {
            title: 'Potato Login',
            message: 'Potato Login'
        });
    }
})

//Listen for incoming connections
app.listen(potatoProperties.port, function() {
    console.log("Test webserver listening on http://<HostAddress>:"
                + potatoProperties.port
                + "\n");
});
