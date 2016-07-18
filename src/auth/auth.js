var db = require('./db/auth-db.js');

module.exports = {
    verify: function(req) {
        console.log("IP to verify: " + req.connection.remoteAddress);
        //If no user/pass given, verify session
        if (req.user == undefined || req.pass == undefined) {
            if (req.session == undefined) {
                console.log("\tSession non-existant");
                return false;
            }
            if (!db.getSession(req.user, req.session)) {
                 console.log("\tSession not found");
                 return false;
            }
            return true;
        }
        console.log("\tVerifying login into " + req.user);
        if (db.isMatch(req.user, req.pass)) {
            //Successful login, create session
            db.addSession(req.user, req.session);
            console.log("\tVerified, added session");
            return true;
        }
        //Incorrect username/password combination
        return false;
    }
};
