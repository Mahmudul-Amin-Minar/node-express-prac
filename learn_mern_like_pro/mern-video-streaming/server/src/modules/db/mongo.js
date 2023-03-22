const { MongoClient } = require("mongodb");

let _db = null;

// create a connect 
const connect = async() => {
    const client = new MongoClient("mongodb://127.0.0.1:27017", {
        useNewUrlParser: true,
    });
    console.log("connecting to MongoDB");
    await client.connect();
    _db = client.db("videodb");
    console.log("connected to MongoDB");
    return _db;
};

// create a getdb 
const getDb = () => {
    return _db;
};

// export them 
module.exports = {
    connect,
    getDb,
};