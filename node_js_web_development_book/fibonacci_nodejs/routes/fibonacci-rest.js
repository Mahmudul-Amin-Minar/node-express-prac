const express = require('express');
const router = express.Router();
const http = require('http');
const { response } = require('../app');
const math = require('../math');

router.get('/', function(req, res, next){
    if(req.query.fibonum){
        var httpreq = http.request({
            host: "localhost",
            port: process.env.SERVERPORT,
            path: `/fibonacci/${Math.floor(req.query.fibonum)}`,
            method: 'GET'
        });
        httpreq.on('response', (response) => {
            response.on('data', (chunk) => {
                var data = JSON.parse(chunk);
                res.render('fibonacci', {
                    title: "Calculating fibonacci numbers",
                    finonum: req.query.fibonum,
                    fiboval: data.result
                })
            });
            res.on('error', (err) => {
                next(err);
            })
        })
        httpreq.on('error', (err) => {
            next(err);

        })
        httpreq.end();
    }else{
        res.render('fibonacci', {
            title: "Calculate fibonacci numbers",
            fiboval: undefined
        })
    }
})

module.exports = router;