/*
Title: Not found Handler
Description: 404 not found Handler
Author: Mahmudul Amin Minar
Date: 22/11/22
*/

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Your requested was not found',
    });
};

module.exports = handler;
