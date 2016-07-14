const express = require('express')
    , pug = require('pug')
    , morgan = require('morgan')
    , stylus = require('stylus')
    , nib = require('nib');

var app = express();

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}

morgan('combined', {
    skip: function(req, res) { return res.statusCode < 400 }
});

app.set('views', __dirname + '/../../web');
app.set('view engine', 'pug');
app.use(stylus.middleware( {
    src: __dirname + '/../../web',
    compile: compile
}));
app.use(express.static(__dirname + '/../../web'));

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

console.log("Test webserver listening on http://localhost:3000\n"
          + " or http://127.0.0.1:3000");
app.listen(3000);
