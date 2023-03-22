const express = require('express');
const router = express.Router();

const math = require('../math');

router.get('/', function(req, res, next){
    if(req.query.fibonum){
        // calculate using async-awati function in this server 
        math.fibonacciAsync(req.query.fibonum, (err, fiboval) => {
            if(err){
                next(err);
            }else{
                res.render('fibonacci', {
                    title: "calculate fibonacci number",
                    fibonum: req.query.fibonum,
                    fiboval: fiboval,
                })
            }
        })
    }else{
        res.render('fibonacci', {
            title: "Calculate Fibonacci numbers",
            fiboval: undefined
        })
    }
})

module.exports = router;