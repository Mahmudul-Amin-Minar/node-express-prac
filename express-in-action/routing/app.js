var express = require('express');
var path = require('path');

var apiRouter = require('./routes/api_router');

var app = express();

app.get('/olivia', function(request, response){
    response.send('Welcome to olivia homepage');
});

// app.get('/users/:user_id', function(req, res){
//     var user_id = parseInt(req.params.user_id, 10);
//     console.log(user_id);
// });

app.get(/^\/users\/(\d+)$/, function(req, res){
    var user_id = parseInt(req.params.user_id, 10);
    console.log(user_id);
    res.end()
});

app.get(/^\/users\/(\d+)-(\d+)$/, function(req, res){
    var user_id1 = parseInt(req.params[0], 10);
    var user_id2 = parseInt(req.params[1], 10);
    console.log(user_id1);
    console.log(user_id2);
    res.end()
});

app.get('/search', function(req, res){
    console.log(req.query);
    res.end();
})

app.use('/api', apiRouter);

app.use(function(request, response){
    response.status(404).send('page not found');
})

app.listen(3000);