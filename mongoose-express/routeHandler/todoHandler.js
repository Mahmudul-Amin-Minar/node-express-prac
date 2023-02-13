const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');

const Todo = new mongoose.model("Todo", todoSchema);
const router = express.Router();
// get all the todos 
router.get('/', async(req, res) => {

});

// get a todo by id 
router.get('/:id', async(req, res) => {

});

// post a todo 
router.post('/', async(req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error: "there was a server side error!",
            })
        }else{
            res.status(200).json({
                message: "Todo was inserted successfully",
            })
        }
    });
});

// post multiple todo 
router.post('/all', async(req, res) => {

});

// put todo 
router.put('/:id', async(req, res) => {

});

// delete todo 
router.post('/:id', async(req, res) => {

});

module.exports = router;