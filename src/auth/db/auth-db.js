const potatoProperties = require('../../../potato.json');
const data = require(potatoProperties.userdb);

function isAdmin(user, pass) {
    return data.adminUserName == user && data.adminPassword == pass;
}

function isMatch(user, pass) {
    return (isAdmin(user, pass)
         || data.users.guests.indexOf({ "user" : user, "pass" : pass}) != -1);
}

module.exports = {
    isAdmin: isAdmin,
    isMatch: isMatch
};
