var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

var evi_ip = '::ffff:127.0.0.1';

var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use(function(req, res, next){
    console.log(req.ip);
    if(req.ip === evi_ip){
        res.status(401).send("now allowed");
    }else{
        next();
    }
})

app.get('/', function(req, res){
    res.end('Homepage');
});
app.get('/about', function(req, res){
    res.redirect('/weather');
    // res.end('about');
});
app.get('/weather', function(req, res){
    res.end('weather');
});

app.use(function(req, res){
    res.statusCode = 404;
    res.end("404");
})

http.createServer(app).listen(3000);