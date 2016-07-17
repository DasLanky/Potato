var db = require('./db/auth-db.js');

module.exports = {
    verify: function(req) {
        if (!("user" in req) || !("pass" in req)) {
            return false;
        }
        if (db.isMatch(req.user, req.pass)) {
            return true;
        }
        else {
            //Username/password combination invalid
            return false;
        }
    }

    verifyAdmin: function(req) {
        if (!("user" in req) || !("pass" in req)) {
            return false;
        }
        if (db.isAdmin(req.user, req.pass)) {
            return true;
        }
        else {
            //Username/password combination invalid
            return false;
        }
    }
};
