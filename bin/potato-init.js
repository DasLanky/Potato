const express = require('express')
    , pug = require('pug')
    , nib = require('nib')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , fs = require('fs')
    , mime = require('mime');

var properties = require('../potato.json');
var auth = require('../src/auth.js');

//Create applet
var app = express();

app.use(bodyParser()); //Parse JS forms into req.body
app.set('view engine', 'pug'); //HTML generator engine is pug (Jade)

app.use(cookieParser()); //Cookie-parser for authentication

app.use(session({
    secret: 'potato',
    cookie: {
        maxAge: (new Date()).getTime(),
        token: "blank"
    }
}));

//Serve files within the web directory
app.set('views', __dirname + '/../web');
app.use(express.static(__dirname + '/../web'));

function verifySession(req, res) {
    if (!auth.verify(req)) {
        res.redirect('/login');
        return;
    }
}

app.get('/',
    function(req, res) {
    verifySession(req, res);
    res.render('index', {
        title: 'Potato',
        message: 'Potato Homepage',
        user: auth.getName(req)
    });
});

app.get('/cloud',
    function(req, res) {
    verifySession(req, res);
    var name = auth.getName(req);
    var baseURL;
    if (name == "admin") {
        baseURL = properties.path;
    }
    else {
        baseURL = properties.path + "public/";
    }
    var path = req.param('path').substr(baseURL.length());

    var fileStats = fs.statSync(baseURL + path);
    if (!fileStats.isDirectory()) {
        res.writeHead(200, {
            'Content-disposition': 'attachment; filename=' + req.params['fname'],
            'Content-type': mime.lookup(baseURL + path)
        });
        var readStream = fs.createReadStream(baseURL + path);
        readStream.pipe(res);
    }
    else {
        var fileList = [];
        fs.readdir(baseURL + path, function(err, files) {
            if (err) {
                console.log(err);
                return;
            }
            for (fileIndex in files) {
                var fileName = files[fileIndex];
                var stats = fs.statSync(baseURL + path + fileName);
                if (stats.isDirectory()) {
                    fileName = fileName + '/';
                }
                fileList.push(fileName);
            }
            res.render('cloud', {
                title: 'Potato Cloud',
                message: 'Potato Cloud',
                user: auth.getName(req),
                url: baseURL + path,
                fileList: fileList
            });
        });
    }
});

app.get('/login',
    function(req,res) {
    res.render('login', {
        title: 'Potato Login',
        message: 'Potato Login',
    });
});

app.post('/login', function(req, res) {
    console.log(req.cookies);
    console.log("User login with name " + req.body.name
              + " and password " + req.body.pass);
    if (!auth.hasUser(req.body.name)) {
        console.log("\tUser not found");
        res.redirect('/login');
        return;
    }
    else if (!auth.checkUser(req.body.name, req.body.pass)){
        console.log("\tIncorrect password");
        res.redirect('/login');
        return;
    }
    else {
        auth.register(req);
        res.render('index', {
            title: 'Potato',
            message: 'Potato Homepage',
            user: req.body.name
        });
    }
});

app.all('/logout',function(req, res) {
    auth.unregister(req);
    req.session.destroy();
    res.redirect('/login');
})

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

//Listen for incoming connections
app.listen(properties.port, function() {
    console.log("Test webserver listening on http://<HostAddress>:"
                + properties.port
                + "\n");
});
