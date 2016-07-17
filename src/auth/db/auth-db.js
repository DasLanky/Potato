const data = require('./db.json');

module.exports = {
    isAdmin: function(user, pass) {
        return data.adminUserName == user && data.adminPassword == pass;
    },

    isMatch: function(user, pass) {
        return (isAdmin(user, pass)
             || data.users.guests.indexOf({ "user" : user, "pass" : pass}) != -1);
    }
};
