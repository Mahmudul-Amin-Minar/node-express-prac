// const express = require('express');
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';
import router from './router';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get('/', (req, res, next) => {
//     setTimeout(() => {
//         next(new Error('oops'))
//     }, 1)
// });

app.get('/', (req, res) => {
    throw new Error('oops');
});


app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

app.use( (err, req, res, next) => {
    if(err.type === 'auth'){
        res.status(401).json({message: 'unauthorized'});
    }else if(err.type === 'input'){
        res.status(400).json({message: 'invalid input'});
    }else{
        res.status(500).json({message: 'error on us'});
    }
})

// module.exports = app;
export default app;