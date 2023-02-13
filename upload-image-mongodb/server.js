const cors = require('cors');
const express = require('express');

const initRoutes = require('./src/routes');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
initRoutes(app);

let port = 8080;
app.listen(port, () => {
    console.log(`Running at localhost: ${port}`);
});