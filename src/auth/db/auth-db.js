const _ = require('underscore')

const potatoProperties = require('../../../potato.json');
const data = require(potatoProperties.userdb);

function exportToFile() {
    var fs = require('fs');
    fs.writeFile(potatoProperties.userdb + '.export',
                 JSON.stringify(data, null, 2),
                 function(err) {
                     if (err) {
                         return console.log(err);
                     }
                     console.log("Exported database to file");
                 });
}

//TODO: Change isAdmin to isOfType(user, pass, type)
function isAdmin(user, pass) {
    var type = data.users['admins'];
    for (itemName in type) {
        item = type[itemName];
        if (item.user == user && item.pass == pass) {
            return true;
        }
    }
}

function isMatch(user, pass) {
    var type, item;
    for (typeName in data.users) {
        type = data.users[typeName];
        for (itemName in type) {
            item = type[itemName];
            if (item.user == user && item.pass == pass) {
                return true;
            }
        }
    }
    return false;
}

function addSession(user, session) {
    if (data.sessions == undefined) {
        data.sessions = [];
    }
    data.sessions.push({
        "user": user,
        "expressSession": session
    });
    exportToFile();
}

function getSession(user, expressSession) {
    if (data.sessions == undefined) {
        return false;
    }
    for (var sessionID in data.sessions) {
        var session = data.sessions[sessionID];
        console.log(session.expressSession);
        console.log(expressSession);
        if (session.user == user
         && _.isEqual(session.expressSession, expressSession)) {
            return true;
        }
    }
    return false;
}

module.exports = {
    exportToFile: exportToFile,
    isAdmin: isAdmin,
    isMatch: isMatch,
    addSession: addSession,
    getSession: getSession
};
