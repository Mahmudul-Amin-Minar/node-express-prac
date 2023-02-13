/*
Title: User Handler
Description: Handler to handle user related routes
Author: Mahmudul Amin Minar
Date: 23/11/22
*/

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');
const { user } = require('../../routes');

// module scaffolding
const handler = {};
handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._users = {};

// @TODO: authentication
handler._users.post = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === 'string'
        && requestProperties.body.firstName.length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string'
        && requestProperties.body.lastName.length > 0
            ? requestProperties.body.lastName
            : false;

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

    const { tosAgreement } = requestProperties.body;

    // console.log(firstName);
    // console.log(lastName);
    // console.log(password);
    // console.log(`tosAgreement ${tosAgreement}`);
    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that user doesnot already exist
        data.read('users', phone, (err) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };
                // store the user to db
                data.create('users', phone, userObject, (err1) => {
                    if (!err1) {
                        callback(200, {
                            message: 'User was created succesfully',
                        });
                    } else {
                        callback(500, {
                            error: 'Could not create user',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was a problem in server side',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};

// @TODO: authentication
handler._users.get = (requestProperties, callback) => {
    // check the phone number is valid 
    const phone = typeof requestProperties.queryString.phone === 'string'
    && requestProperties.queryString.phone.length === 11
        ? requestProperties.queryString.phone
        : false;
    if(phone){
        // verify token 
        let token = typeof(requestProperties.headerObject.token) === 'string' ? requestProperties.headerObject.token : false;
        tokenHandler._token.verify(token, phone, (tokenId) => {
            if(tokenId){
                data.read('users', phone, (err, u) => {
                    const user = { ...parseJSON(u) };
                    if(!err && user){
                        delete user.password;
                        callback(200, user);
                    }else{
                        callback(404, {
                            error: 'Requested user was not found',
                        })
                    }
                })
            }else{
                callback(403, {
                    error: 'Authentication fail',
                })
            }
        })
        // lookup the user
    }else{
        callback(404, {
            error: 'Requested user was not found',
        })
    }
};

// @TODO: authentication
handler._users.put = (requestProperties, callback) => {
    
    const phone = typeof requestProperties.body.phone === 'string'
    && requestProperties.body.phone.length === 11
        ? requestProperties.body.phone
        : false;

    const firstName =
        typeof requestProperties.body.firstName === 'string'
        && requestProperties.body.firstName.length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string'
        && requestProperties.body.lastName.length > 0
            ? requestProperties.body.lastName
            : false;

    const password =
        typeof requestProperties.body.password === 'string'
        && requestProperties.body.password.length > 0
            ? requestProperties.body.password
            : false;
    console.log(firstName);
    console.log(lastName);
    console.log(password);
    
    if(phone){
        if(firstName || lastName || password){
            // verify token 
        let token = typeof(requestProperties.headerObject.token) === 'string' ? requestProperties.headerObject.token : false;
        tokenHandler._token.verify(token, phone, (tokenId) => {
            if(tokenId){
                data.read('users', phone, (err, uData)=>{
                    const userData =  {...parseJSON(uData)};
                    console.log(userData);
                    if(!err && userData){
                        if(firstName){
                            userData.firstName = firstName;
                        }
                        if(lastName){
                            userData.lastName = lastName;
                        }
                        if(password){
                            userData.password = hash(password);
                        }
                        // store to database
                        data.update('users', phone, userData, (err) => {
                            if(!err){
                                callback(200, {
                                    message: 'User was updated successfully',
                                })
                            }else{
                                callback(500, {
                                    error: 'There was a problem in the server'
                                })
                            }
                        })
                    }else{
                        callback(400, {
                            error: 'You have a problem in your request',
                        })
                    }
                })
            }else{
                callback(403, {
                    error: 'Authentication fail',
                })
            }
        })
            // lookup the user
            
        }else{
            callback(400, {
                error: 'You have a problem in your request',
            })
        }
    }else{
        callback(400, {
            error: 'Invalid phone...'
        })
    }
};

// @TODO: authentication
handler._users.delete = (requestProperties, callback) => {
    const phone = typeof requestProperties.queryString.phone === 'string'
    && requestProperties.queryString.phone.length === 11
        ? requestProperties.queryString.phone
        : false;
    if(phone){
        let token = typeof(requestProperties.headerObject.token) === 'string' ? requestProperties.headerObject.token : false;
        tokenHandler._token.verify(token, phone, (tokenId) => {
            if(tokenId){
                data.read('users', phone, (err1, userData) => {
                    if(!err1 && userData){
                        data.delete('users', phone, (err2) => {
                            if(!err2){
                                callback(200, {
                                    message: 'user was deleted',
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
                callback(403, {
                    error: 'Authentication fail',
                })
            }
        })
        
    }else{
        callback(400, {
            error: 'There was a problem in your request',
        })
    }
};

module.exports = handler;
