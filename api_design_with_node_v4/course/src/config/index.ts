import merge from "lodash.merge";

// make sure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";

console.log(stage);
let envConfig;

// dynamically require each config depending on the stage we're in
if (stage === "production") {
    
  envConfig = require("./prod").default;
} else if (stage === "staging") {
  envConfig = require("./staging").default;
} else {
  envConfig = require("./local").default;
}

// const defaultConfig = {
//   stage,
//   dbUrl: process.env.DATABASE_URL,
//   jwtSecret: process.env.JWT_SECRET,
//   port: process.env.PORT,
//   logging: false,
// };

export default merge({
    stage,
    env: process.env.NODE_ENV,
    port: 3002,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    },
    envConfig
});