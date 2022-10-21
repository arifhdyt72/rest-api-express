const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verification(){
    return function(req, rest, next){
        var tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            var token = tokenWithBearer.split(" ")[1];
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return rest.status(401).send({auth: false, message: "token is undefined!"});
                }else{
                    if(decoded.rows[0].role == 2){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({auth: false, message: "authorization level is denied!"});
                    }
                }
            })
        }else{
            return rest.status(401).send({auth: false, message: "token is empty!"});
        }
    }
}

module.exports = verification;