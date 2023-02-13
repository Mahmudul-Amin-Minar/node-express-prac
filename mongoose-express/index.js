const express = require('express');
const mongoose = require('mongoose');

const todoHandler = require('./routeHandler/todoHandler');

const app = express();
app.use(express.json());

// database connection with mongoose
mongoose
    .connect('mongodb://0.0.0.0:27017/test', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err));

// application route
app.use('/todo', todoHandler);

// default error handler 
function errorHandler(err, req, res, next){
    if(res.headerSent){
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.listen(3000, () => {
    console.log("app listening on port 3000");
})