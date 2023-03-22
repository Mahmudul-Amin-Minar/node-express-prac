const express = require('express');
const session = require('express-session');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const middleware = require('connect-ensure-login');
const fileStore = require('session-file-store')(session);
const config = require('./config/default');
const flash = require('connect-flash');
const path = require('path');
const port = 3333;

const passport = require('./auth/passport');
const node_media_server = require('./media_server');

app = express();
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/nodeStream', {useNewUrlParser: true});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static('public'));
app.use(flash());
app.use(require('cookie-parser')());
app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json({extended: true}));

app.use(session({
    store: new fileStore({
        path: './server/sessions'
    }),
    secret: config.server.secret,
    maxAge: Date().now + (60 * 1000 * 30),
    resave: true,
    saveUninitialized: true
}));

// Register app routes 
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/streams', require('./routes/streams'));
app.use('/settings', require('./routes/settings'));

app.get('*', middleware.ensureLoggedIn(), (req, res) => {
    res.render('index');
});
app.listen(port, () => console.log(`App listening on ${port}`));
node_media_server.run();