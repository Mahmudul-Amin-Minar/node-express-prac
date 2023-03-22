const redis = require('redis');
const axios = require('axios');
const express = require('express');

const client = redis.createClient();
const app = express();
const USERS_API = 'https://jsonplaceholder.typicode.com/users/';

app.get('/users', (req, res) => {
    try{
        axios.get(`${USERS_API}`).then(function (response){
            const users = response.data;
            console.log('Users retrieved from thr API');
            res.status(200).send(users);
        });
    }catch (err){
        res.status(500).send({error: err.message});
    }
});

app.get('/cached-users', (req, res) => {
    console.log('cached users');
    try {
        client.get('users', (err, data) => {
            if (err){
                console.log(err);
                res.status(400).send(err.message);
            }
            if (data){
                console.log('users retrieved from redis');
                res.status(200).send(JSON.parse(data));
            }else {
                axios.get(`${USERS_API}`).then(function (response){
                    const users = response.data;
                    client.setex('users', 600, JSON.stringify(users));
                    console.log('users retrieved from the api');
                    res.status(200).send(users);
                });
            }
        });
    }catch (err){
        res.status(500).send({error: err.message});
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server started at port: ${PORT}`);
})
