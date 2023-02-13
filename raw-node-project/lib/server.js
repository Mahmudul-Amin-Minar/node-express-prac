/*
Title: Server library
Description: server related files
Author: Mahmudul Amin Minar
Date: 22/11/22
*/

// dependencies
const http = require('http');
const { handleReqRes } = require('../helpers/handleReqRes');

// server object - module scaffolding
const server = {};

// configuration 
server.config = {
    port: 3000,
}

// create server
server.createServer = () => {
    const createServerVariable = http.createServer(server.handleReqRes);
    createServerVariable.listen(server.config.port, () => {
        console.log(`Listening to port ${server.config.port}`);
    });
};

// handle request response
server.handleReqRes = handleReqRes;

// start the server
server.init = () => {
    server.createServer();
};

module.exports = server;
