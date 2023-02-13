/*
Title: Initial file
Description: initial file to start the node server and workers
Author: Mahmudul Amin Minar
Date: 22/11/22
*/

// dependencies
const server = require('./lib/server');
const workers = require('./lib/worker');

// app object - module scaffolding
const app = {};

// create server

app.init = () => {
    // start the server 
    server.init();
    // start the workers 
    workers.init();
}

app.init();

module.exports = app;