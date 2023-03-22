const http = require('http');
const fs = require('fs')

const port = 3000;

function serveStaticFile(res, path, contentType, responseCode = 200){
    fs.readFile(path, (err, data) => {
        if(err){
            res.writeHead(500, {'Content-Type': 'text/html'});
            return res.end('500 - Internal Error');
        }
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
    })
}


const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/,
    '').toLowerCase();
    console.log(path);

    switch(path){
        case '/':
            res.write("Welcome to onnorokom pathshala");
            res.end();
            break;
        case '/privacy':
            serveStaticFile(res, './privacy.html', 'text/html');
            break;
        default:
            res.write("No page found");
            res.end();
            break;
    }
})

server.listen(port, () => {
    console.log(`Server started on port ${port};`);
})