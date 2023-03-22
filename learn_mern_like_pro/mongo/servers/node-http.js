const http = require('node:http');

// console.log(http);
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    res.writeHead(200);
    res.end('Thanks');
})

server.listen(3000, "localhost", () => {
    console.log(`server is listening on 3000 port`)
})