const express = require('express');
const cors = require('cors');

const app = express();

const router = require('./routes/productRouter')

var corsOptions = {
    origin: 'http://localhost:8081'
}

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes 
app.use('/api/products', router);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})