const express = require('express')
    , pug = require('pug')
    , morgan = require('morgan')
    , stylus = require('stylus')
    , nib = require('nib');

var app = express();

const port = 8080;

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}

morgan('combined', {
    skip: function(req, res) { return res.statusCode < 400 }
});

//Serve files within the web directory
app.set('views', __dirname + '/../../web');
app.use(express.static(__dirname + '/../../web'));

//HTML generator engine is pug (Jade)
app.set('view engine', 'pug');

//CSS generator engine is Stylus
app.use(stylus.middleware( {
    src: __dirname + '/../../web',
    compile: compile
}));

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
    console.log("Test webserver listenig on http://<HostAddress>:" + port + "\n");
});
