var express = require('express');
var path = require('path');
var fs = require('fs');
var morgan = require('morgan');

var app = express();
var filePath = path.join(__dirname, 'static/3.jpg');

app.use(morgan('tiny'));

app.use(function(req, res, next){
    res.sendFile(filePath, function(err){
        if(err){
            next("Error sending file!");
        }else{
            console.log('File sent');
        }
    });
});

app.use(function(err, req, res, next){
    console.error(err);
    next(err);
});

app.use(function(req, res, next){
    res.status(500);
    res.send("Internal server error");
})

app.listen(3000, function(){
    console.log("App started on port 3000");
});