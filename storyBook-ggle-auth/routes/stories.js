const express = require('express');

const { ensureAuth } = require('../middlewares/auth');
const StoryModel = require('../models/Story');

const router = express.Router();

// show add page
// GET/
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add');
})

// process the add form
// POST
router.post('/', ensureAuth, async (req, res) => {
    try{
        req.body.user = req.user.id;
        await StoryModel.create(req.body);
        res.redirect('/dashboard');
    }catch(err){
        console.log(err);
        res.render('error/500');
    }
})

// show all stories 
router.get('/', ensureAuth, async (req, res) => {
    try{
        const stories = await StoryModel.find({status: 'public'})
                                        .populate('user')
                                        .sort({createdAt: 'desc'})
                                        .lean();
        res.render('stories/index', {stories});
    }catch(err){
        console.log(rrr);
        console.log('error/500')
    }
})

// Show the edit page 
// GET stories/edit/:id 
router.get('/edit/:id', ensureAuth, async (req, res) => {
    const story = await StoryModel.findOne({
        _id: req.params.id
    }).lean();

    if(!story){
        return res.render('error/404');
    }
    if(story.user != req.user.id){
        res.redirect('/stories')
    }else{
        res.render('stories/edit', {
            story
        })
    }
})


module.exports = router;