const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/courseRoutes');

const data = require('./data/course_Module.json');


dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send({
        message: "Course Module"
    });
})

app.use('/api', routes);

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
})