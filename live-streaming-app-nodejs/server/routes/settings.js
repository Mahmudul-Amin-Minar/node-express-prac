const express = require('express');
const shortid = require('shortid');
const User = require('../database/Schema').User;

const router = express.Router();

router.get('/stream_key', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    User.findOne({email: req.user.email}, (err, user) => {
        if(!err){
            res.json({
                stream_key: user.stream_key
            })
        }
    })
})

router.post('/stream_key', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    User.findOneAndUpdate({
        email:req.user.email
    },
    {
        upsert: true,
        new: true,
    }, (err, user) => {
        if(!err){
            res.json({
                stream_key: user.stream_key
            })
        }
    })
})

module.exports = router;