import { json } from 'body-parser';
import consola from 'consola';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

// import application constants 
import { DB, PORT } from './constants';


// Router imports
import userApis from './apis/users';

// import passport middleware 
require('./middlewares/passport-middleware');


// Initialize express application 
const app = express();

// apply application middlewares 
app.use(cors());
app.use(json());
app.use(passport.initialize());

// inject sub router and apis 
app.use('/user/', userApis);


const main = async () => {
    try{
        // connect with the database 
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        consola.success("Databse connected .. ");
        // start application listening for request on server 
        app.listen(PORT, () => consola.success(`server started on port ${PORT}`));
    }catch (err){
        consola.error(`Unable to start the server \n ${err}`);
    }
};

main();