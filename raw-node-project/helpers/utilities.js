/*
Title: Utilities
Description: Important utilities function
Author: Mahmudul Amin Minar
Date: 23/11/22
*/

// dependencies
const crypto = require('crypto');
const environments = require('./environments');

// module scaffolding
const utilities = {};

// parse json string to object
utilities.parseJSON = (jsonString) => {
    let output = {};
    try {
        output = JSON.parse(jsonString);
    } catch {
        console.log('balnk obj');
    }
    return output;
};

// hash string
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', environments.secretKey).update(str).digest('hex');
        return hash;
    }
    return false;
};

// create random string 
utilities.createRandomString = (strlength) => {
    let length = strlength;
    length = typeof(strlength) === 'number' && strlength > 0 ? strlength : false;
    
    if(length){
        let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = "";
        for(let i=1; i<=length; i++){
            let randomChar = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            output += randomChar;
        }
        return output;
    }else{
        return false;
    }
};

// export module
module.exports = utilities;
