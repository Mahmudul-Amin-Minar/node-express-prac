const express = require('express');
const passport = require('passport');

const router = express.Router();

// Auth with google
// GET/ auth/google
router.get('/google', passport.authenticate('google', {scope:['profile']}));

// desc: google auth callback 
// GET 
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
});

// Logout users
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
    });
    res.redirect('/');
});

module.exports = router;