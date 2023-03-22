const express = require('express');

const app = express();
const port = 3000;

app.use(express.raw());
app.use(express.text());
app.use(express.json());

app.post('/api/student', (req, res) => {
    console.log(req.body);
    res.send(`Thanks for posting`);
})

app.use('/api/student/:id/hello/:name', (req, res) => {
    console.log(`request recieved at ${new Date()}`);
    console.log({q: req.query, p: req.params})
    res.send('nice');
})

app.listen(port, () => {
    console.log(`listening on port 3000`);
})

