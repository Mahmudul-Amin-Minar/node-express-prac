var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require(('cookie-parser'));
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');

var routes = require('./routes');
var setUpPassport = require('./setuppassport');

var app = express();
mongoose.connect('mongodb://127.0.0.1:27017/about_me')
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));;

setUpPassport();

app.set("port", process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: "oieuro8w25rijfkdsmaklfk",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get('port'), function(){
    console.log('Server started on port '+ app.get("port"));
})

