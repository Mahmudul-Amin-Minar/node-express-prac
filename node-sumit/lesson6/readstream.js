const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write(`<html>
        <head>
            <title>Form</title>
        </head>
        <body>
            <form method="post" action="/process"><input name="message" id="" cols="30" rows="10"></input></form>
        </body>
    </html>`);
        res.write('How are doing');
        res.end();
    } else if (req.url === '/process' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            console.log('Stream Finished');
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
        });
        res.write('Thank you for submitting');
        res.end();
    } else {
        res.write('Not found');
        res.end();
    }
});

server.listen(3000);

console.log('listening on port 3000');
