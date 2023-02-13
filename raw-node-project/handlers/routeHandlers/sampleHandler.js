/*
Title: Sample Handler
Description: Sample Handler
Author: Mahmudul Amin Minar
Date: 22/11/22
*/

// module scaffolding
const handler = {};
handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);

    callback(200, {
        message: 'This is a sample url',
    });
};

module.exports = handler;
