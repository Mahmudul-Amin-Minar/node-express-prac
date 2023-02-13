var express = require('express');

var app = express();

app.get('/random/:min/:max', function(req, res){
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);

    if(isNaN(min) || isNaN(max)){
        res.status(400);
        res.json({error: 'Bad request'});
        return;
    }
    var result = Math.round((Math.random()*(max-min))+min);
    res.json({result: result});
});

app.get('/', function(req, res){
    res.send('You just sent a GET request');
})
app.post('/', function(req, res){
    res.send('You just sent a POST request');
})
app.put('/', function(req, res){
    res.send('You just sent a PUT request');
})
app.delete('/', function(req, res){
    res.send('You just sent a DELETE request');
})


app.listen(3000, function(){
    console.log('App started on port 3000');
})