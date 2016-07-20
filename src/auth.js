const _ = require('underscore')
   , crypto = require('crypto')
   , properties = require('../potato.json')
   , fs = require('fs')
   , cookieParser = require('cookie-parser');
var users = require(properties.userdb);
var tokens = require(properties.tokendb);

const NUM_BYTES = 32;

function hasToken(token) {
    for (tokenIndex in tokens) {
        if (tokens[tokenIndex].token == token) {
            return true;
        }
    }
    return false;
}

function newToken(_name, _token) {
    tokens.push({
        token: _token,
        name: _name
    });
}

function removeToken(token) {
    for (tokenIndex in tokens) {
        if (tokens[tokenIndex].token == token) {
            delete tokens[tokenIndex];
        }
    }
    return false;
}

module.exports = {
    export: function() {
        //Write out to userdb and tokendb
    },

    hasUser: function(name) {
        var type, user;
        for (typeName in users) {
            type = users[typeName];
            for (userName in type) {
                user = type[userName];
                if (user.name == name) {
                    return true;
                }
            }
        }
        return false;
    },

    checkUser: function(name, pass) {
        var type, user;
        for (typeName in users) {
            type = users[typeName];
            for (userName in type) {
                user = type[userName];
                console.log(user);
                if (user.name == name) {
                    if (user.pass == pass) {
                        return true;
                    }
                    return false;
                }
            }
        }
        return false;
    },

    getName: function(request) {
        var token;
        for (tokenName in tokens) {
            token = tokens[tokenName];
            if (token.token == request.session.cookie['connect.sid']) {
                return token.name;
            }
        }
    },

    register: function(request) {
        newToken(request.body.name, request.session.cookie['connect.sid']);
    },

    unregister: function(request) {
        removeToken(request.session.cookie['connect.sid']);
    },

    verify: function(request) {
        return hasToken(request.session.cookie['connect.sid']);
    }
}
