var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var tokenConfig = require('../config/token.js'); // get our config file

function verifyToken(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    if (!token)
        return res.json({ code: 403, msg: 'No token provided.' });

    // verifies secret and checks exp
    jwt.verify(token, tokenConfig.secret, function(err, decoded) {
        if (err)
            return res.json({ code: 500, msg: 'Failed to authenticate token.' });

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        req.permission_role = decoded.permission_role;
        next();
    });
}

module.exports = verifyToken;
