const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello ...');
        res.write('How are doing');
        res.end();
    } else if (req.url === '/about') {
        res.write('this is about page');
        res.end();
    } else {
        res.write('Not found');
        res.end();
    }
});

server.listen(3000);

console.log('listening on port 3000');
