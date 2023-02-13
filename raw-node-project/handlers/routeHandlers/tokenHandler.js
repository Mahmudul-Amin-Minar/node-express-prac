/*
Title: Token Handler
Description: Handler to handle token related routes
Author: Mahmudul Amin Minar
Date: 23/11/22
*/

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
const { createRandomString } = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');
const { user } = require('../../routes');

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._token = {};


handler._token.post = (requestProperties, callback) => {

    const phone =
        typeof requestProperties.body.phone === 'string'
        && requestProperties.body.phone.length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string'
        && requestProperties.body.password.length > 0
            ? requestProperties.body.password
            : false;

    if(phone && password){
        data.read('users', phone, (err1, userData) => {
            let hashedPassword = hash(password);
            if(hashedPassword === parseJSON(userData).password){
                let tokenId = createRandomString(20);
                let expires = Date.now() + 60*60*1000;
                let tokenObject = {
                    'phone': phone,
                    'id': tokenId,
                    'expires': expires
                };
                
                // store the token 
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if(!err2){
                        callback(200, tokenObject);
                    }else{
                        callback(500, {
                            error: "There was a problem in the server side",
                        })
                    }
                })
            }else{
                callback(400, {
                    error: 'password is not valid',
                });
            }
        })
    }else{
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};


handler._token.get = (requestProperties, callback) => {
    // check the id is valid 
    const id = typeof requestProperties.queryString.id === 'string'
    && requestProperties.queryString.id.length === 20
        ? requestProperties.queryString.id
        : false;
    if(id){
        // lookup the user
        data.read('tokens', id, (err, tokenData) => {
            const token = { ...parseJSON(tokenData) };
            if(!err && token){
                callback(200, token);
            }else{
                callback(404, {
                    error: 'Requested token was not found',
                })
            }
        })
    }else{
        callback(404, {
            error: 'Requested token was not found',
        })
    }
};

// @TODO: authentication
handler._token.put = (requestProperties, callback) => {
    const id =
        typeof requestProperties.body.id === 'string'
        && requestProperties.body.id.length === 20
            ? requestProperties.body.id
            : false;

    const extend =
    typeof requestProperties.body.extend === 'boolean'
    && requestProperties.body.extend === true
        ? true
        : false;

    if(id && extend){
        data.read('tokens', id, (err1, tokenData) => {
            let tokenObject = parseJSON(tokenData);
            if(tokenObject.expires > Date.now()){
                tokenObject.expires = Date.now() + 60*60*1000;
                // store the updated token 
                data.update('tokens', id, tokenObject, (err2) => {
                    if(!err2){
                        callback(200);
                    }else{
                        callback(500, {
                            error: 'There was a server side error',
                        });
                    }
                })
            }else{
                callback(400, {
                    error: 'Token already expired',
                });
            }
        });
    }else{
        callback(400, {
            error: 'There was a problem in your request',
        });
    }
};

// @TODO: authentication
handler._token.delete = (requestProperties, callback) => {
    // check the token if valid 
    const id = typeof requestProperties.queryString.id === 'string'
    && requestProperties.queryString.id.length === 20
        ? requestProperties.queryString.id
        : false;
    if(id){
        data.read('tokens', id, (err1, tokenData) => {
            if(!err1 && tokenData){
                data.delete('tokens', id, (err2) => {
                    if(!err2){
                        callback(200, {
                            message: 'token was deleted',
                        })
                    }else{
                        callback(500, {
                            error: 'There was a server side error',
                        })
                    }
                })
            }else{
                callback(500, {
                    error: 'there was a server error'
                })
            }
        })
    }else{
        callback(400, {
            error: 'There was a problem in your request',
        })
    }
};

handler._token.verify = (id, phone, callback) => {
    data.read('tokens', id, (err, tokenData) => {
        if(!err && tokenData){
            if(parseJSON(tokenData).phone === phone && parseJSON(tokenData).expires > Date.now()){
                callback(true);
            }else{
                callback(false);
            }
        }else{
            callback(false);
        }
    })
}

module.exports = handler;
