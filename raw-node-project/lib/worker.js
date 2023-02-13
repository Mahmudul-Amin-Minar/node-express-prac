/*
Title: Workers library
Description: worker related files
Author: Mahmudul Amin Minar
Date: 22/11/22
*/

// dependencies
const url = require('url');
const http = require('http');
const https = require('https');
const data = require('./data.js');
const { parseJSON } = require('../helpers/utilities');
const {sendTwilioSms} = require('../helpers/notifications');

// worker object - module scaffolding
const worker = {};

// lookup all the check from database
worker.gatherAllChecks = () => {
    // get all the checks 
    data.list('checks', (err1, checks) => {
        if(!err1 && checks && checks.length > 0){
            checks.forEach(check => {
                // read the chekData
                data.read('checks', check, (err2, originalCheckData) => {
                    if(!err2 && originalCheckData){
                        // pass the data to the validator 
                        worker.validateCheckData(parseJSON(originalCheckData));
                    }else{
                        console.log('Error: reading one of the checks data');
                    }
                })
            });
        }else{
            console.log('Error: Could not find any checks to process');
        }
    })
};

// validate individual data 
worker.validateCheckData = (originalCheckData) => {
    if(originalCheckData && originalCheckData.id){
        let originalData = originalCheckData
        originalData.state = typeof(originalData.state) === 'string' 
        && ['up', 'down'].indexOf(originalData.state) > -1 ? originalData.state : 'down';
        
        originalData.lastChecked = typeof(originalData.lastChecked) === 'number' 
        && originalData.lastChecked > 0 ? originalData.lastChecked : false;

        // https://www/google.com?a=5
        // pass to the next process 
        worker.performCheck(originalData);
    }else{
        console.log('Error: check was invalid or not properly formatted!');
    }
};

// perform check 
worker.performCheck = (originalCheckData) => {
    // prepare the initial check outcome 
    let checkOutCome = {
        error: false,
        responseCode: false
    };
    // mark the outcome has not been sent yet 
    let outcomeSent = false;
    // parse the hostname and full url from original data
    const parsedUrl = url.parse(`${originalCheckData.protocol}://${originalCheckData.url}`, true);
    const hostName = parsedUrl.hostname;
    const path = parsedUrl.path;

    // construct the request
    const requestDetails = {
        protocol: originalCheckData.protocol + ":",
        hostname: hostName,
        method: originalCheckData.method.toUpperCase(),
        path: path,
        timeout: originalCheckData.timeoutSeconds * 1000
    };

    const protocolToUse = originalCheckData.protocol  === 'http' ? http : https;
    let req = protocolToUse.request(requestDetails, (res) => {
        // grab the status of the response 
        const status = res.statusCode;
        console.log(status);
        // update the check outcome and pass to the next process 
        checkOutCome.responseCode = status;
        if(!outcomeSent){
            worker.processCheckOutcome(originalCheckData, checkOutCome);
            outcomeSent = true;
        }
    });
    req.on('error', (e) => {
        checkOutCome = {
            error: true,
            value: e,
        };
        if(!outcomeSent){
            worker.processCheckOutcome(originalCheckData, checkOutCome);
            outcomeSent = true;
        }
    });

    req.on('timeout', (e) => {
        checkOutCome = {
            error: true,
            value: 'timeout',
        }
        if(!outcomeSent){
            worker.processCheckOutcome(originalCheckData, checkOutCome);
            outcomeSent = true;
        }
    });
    // request send 
    req.end();
};

// save check outcome to database and send to next process 
worker.processCheckOutcome = (originalCheckData, checkOutCome) => {
    // check if checkOutCome is up or down 
    let state = !checkOutCome.error && checkOutCome.responseCode 
    && originalCheckData.successCodes.indexOf(checkOutCome.responseCode) > -1 ? 'up' : 'down';

    // decide whether we should alert the user or not 
    let alertWanted = originalCheckData.lastChecked && originalCheckData.state !== state ? true : false;

    // update the check data
    let newCheckData = originalCheckData;
    newCheckData.state = state;
    newCheckData.lastChecked = Date.now();

    // update the check to disk 
    data.update('checks', newCheckData.id, newCheckData, (err) => {
        if(!err){
            if(alertWanted){
                // send the check data to next process 
                worker.alertUserToStatusChange(newCheckData);
            }else{
                console.log('Alert is not needed as there is no state change');
            }
        }else{
            console.log('Error: trying to save check data of one of the checks');
        }
    })
}

// timer to execute the worker process once per minute 
worker.alertUserToStatusChange = (newCheckData) => {
    console.log(newCheckData);
    let msg = `Alert your check for ${newCheckData.method.toUpperCase} ${newCheckData.protocol}://${newCheckData.url} is currently ${newCheckData.state}`;

    sendTwilioSms(newCheckData.userPhone, msg, (err) => {
        if(!err){
            console.log(`User was alerted to a status change via sma: ${msg}`);
        }else{
            console.log('There was a problem sending sms to one of the user');
        }
    })
};

// timer to execute the worker process once per minute 
worker.loop = () => {
    setInterval(() => {
        worker.gatherAllChecks();
    }, 8000);
};

// start the worker
worker.init = () => {
    // execute all the checks 
    worker.gatherAllChecks();

    // call the loop so that checks continue 
    worker.loop();
};

module.exports = worker;
