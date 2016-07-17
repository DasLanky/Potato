var db = require('./db/auth-db.js');

module.exports = {
    verify: function(req) {
        if (req.user == undefined || req.pass == undefined) {
            return false;
        }
        console.log("Verifying authentication from " + req.user);
        if (db.isMatch(req.user, req.pass)) {
            return true;
        }
        else {
            //Username/password combination invalid
            return false;
        }
    },

    verifyAdmin: function(req) {
        if (req.user == undefined || req.pass == undefined)  {
            return false;
        }
        console.log("(admin) Verifying authentication from " + req.user);
        if (db.isAdmin(req.user, req.pass)) {
            return true;
        }
        else {
            //Username/password combination invalid
            return false;
        }
    }
};
