const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/Schema').User;
const shortid = require('shortid');


passport.serializeUser((obj, cb) => {
    cb(null, obj);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

// passport strategy for handling user registration 
passport.use('localRegister', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        const user = await User.findOne({$or: [{email: email}, {username: req.body.username}]});
        // if(!err){
        //     return done(err);
        // }
        if(user){
            if(user.email === email){
                req.flash('email', 'Email is already taken');
            }
            if(user.username === req.body.username){
                req.flash('username', 'Username is already taken');
            }
            return done(null, false);
        }else{
            let user = new User();
            user.email = email;
            user.password = user.generateHash(password);
            user.username = req.body.username;
            user.stream_key = shortid.generate();
            try {
                await user.save();
                return done(null, user);
            }catch (err) {
                throw err;
            }
        }
    }   
));

// passport strategy for authenticating users 
passport.use('localLogin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        const user = await User.findOne({'email': email});
            // if(err){
            //     return done(err);
            // }
        if(!user){
            return done(null, false, req.flash('email', 'Email doesn\'t exist'));
        }
        if(!user.validPassword(password)){
            return done(null, false, req.flash('password', 'Opps! wrong password.'));
        }
        return done(null, user);
    }
));

module.exports = passport;