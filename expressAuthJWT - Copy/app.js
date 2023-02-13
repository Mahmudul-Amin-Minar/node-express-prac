const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const connectDB = require('./config/connectDB.js');
const userRoutes = require('./routes/userRoutes.js');

dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS Policy 
app.use(cors());

// Database connection 
connectDB(DATABASE_URL);

// json 
app.use(express.json());


// Load Routes 
app.use("/api/user", userRoutes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})