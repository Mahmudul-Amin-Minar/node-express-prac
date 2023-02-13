var express = require('express');

var ALLOWED_IPS = [
    '127.0.0.1',
    '123.456.8.89'
];

var api = express.Router();

api.use(function(req, res, next){
    var userIsAllowed = ALLOWED_IPS.indexOf(req.ip) !== -1;
    if(!userIsAllowed){
        res.status(401).send('Not authorized');
    }else{
        next();
    }
});


module.exports = [
    api,
]

// api.get('/users')