const express = require('express');

const { ensureAuth, ensureGuest } = require('../middlewares/auth');
const StoryModel = require('../models/Story');

const router = express.Router();

// Login/landing page 
// GET/
router.get('/', ensureGuest, (req, res) => {
    // res.send('Login');
    res.render('login', {
        layout: 'login',
    });
})

// Dashboard 
// GET
router.get('/dashboard', ensureAuth, async(req, res) => {
    try{
        const stories = await StoryModel.find({user:req.user.id}).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            stories,
        });
    }catch(err){
        console.log(err);
        res.render('error/500');
    }
})



module.exports = router;