const mongoose = require("mongoose");

const connectBD = async (DATABASE_URL) => {
    try{
        const DB_OPTIONS = {
            dbName: "user",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        mongoose.set('strictQuery', false);
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log('Connected Successfully ... ');
    }catch(error){
        console.log(error);
    }
}

module.exports = connectBD;