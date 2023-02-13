/*
Title: Environments
Description: Handle all environment related things
Author: Mahmudul Amin Minar
Date: 23/11/22
*/

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'sdjfklsdjflkdfgjlk',
    maxChecks: 5,
    twilio: {
        fromPhone: '+18056085418',
        accountSid: 'AC386282f1b2786b161be6771b304da28e',
        authToken: '1028fa8314bd40b930e8dcd8f8cb516d',
    }
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'sdjsdofikmlasdfkla;sd',
    maxChecks: 5,
    twilio: {
        fromPhone: '+18056085418',
        accountSid: 'AC386282f1b2786b161be6771b304da28e',
        authToken: '1028fa8314bd40b930e8dcd8f8cb516d',
    }
};

// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

// export module
module.exports = environmentToExport;
